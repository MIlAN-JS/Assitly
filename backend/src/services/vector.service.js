import {PDFParse} from "pdf-parse"  // ✅ default import
import fs from "fs"
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters"
import { MistralAIEmbeddings } from "@langchain/mistralai"
import config from "../config/env.config.js"
import { Pinecone } from '@pinecone-database/pinecone' 

const uploadPdfService = async ({pdf , businessId}) => {
    try {
       
    let dataBuffer = fs.readFileSync(pdf);

    const parser = new PDFParse({
        data: dataBuffer
    })

    const data = await parser.getText()

        // step 2: chunk
        const splitter = new RecursiveCharacterTextSplitter({
            chunkSize: 500,
            chunkOverlap: 0
        })
        const chunks = await splitter.splitText(data.text)
        console.log("Total chunks:", chunks.length)

        // step 3: embed
        const embeddings = new MistralAIEmbeddings({
            apiKey: config.MISTRAL_API_KEY,
            model: "mistral-embed"
        })
        const embeddedDocs = await Promise.all(
            chunks.map(async (chunk) => {
                const embedding = await embeddings.embedQuery(chunk)
                return { text: chunk, embedding }
            })
        )
        console.log("Total embedded docs:", embeddedDocs.length)

        // step 4: upsert to pinecone
        const pc = new Pinecone({ apiKey: config.PINECONE_API_KEY })
        const index = pc.index("assistly").namespace(businessId)

//    const fakeEmbedding1024 = Array.from({ length: 1024 }, (_, i) =>
//   Math.sin(i) * 0.01
// );

// const result = await index.upsert({
//   records: [
//     {
//       id: "test-doc-1",
//       values: fakeEmbedding1024,
//       metadata: {
//         text: "this is a test document for 1024-d pinecone index"
//       }
//     }
//   ]
// });

// const stats = await index.describeIndexStats();
// console.log(stats);

     
       const result = await index.upsert({
            records: embeddedDocs.map((doc, i) => ({
                id: `doc-${i}`,
                values: doc.embedding,
                metadata: {
                    text: doc.text
                }
            }))
        })

        console.log("success")


return true

    } catch (error) {
        console.error("uploadPdfService error:", error.message)
        throw error
    }
}


const queryPinecone = async({  message , businessId})=>{

    const pc = new Pinecone({ apiKey: config.PINECONE_API_KEY })
        const index = pc.index("assistly").namespace(businessId)

   const embeddings = new MistralAIEmbeddings({
            apiKey: config.MISTRAL_API_KEY,
            model: "mistral-embed"
        })
        const queryEmbedding = await embeddings.embedQuery(message)

  const result =   await index.query({
  vector: queryEmbedding,
  topK: 1,
  includeMetadata: true
});
console.log(result)
return result.matches?.[0]?.metadata?.text

}






export { uploadPdfService , queryPinecone }