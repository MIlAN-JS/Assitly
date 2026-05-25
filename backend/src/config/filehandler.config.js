import Imagekit from "imagekit"
import config from "./env.config.js"


const imageKit = new Imagekit({
    privateKey : config.IMAGEKIT_PRIVATE_KEY,
    publicKey : config.IMAGEKIT_PUBLIC_KEY,
    urlEndpoint : config.IMAGEKIT_ENDPOINT
})


export  {
    imageKit
}