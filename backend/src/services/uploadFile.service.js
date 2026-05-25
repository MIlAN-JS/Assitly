import {imageKit} from "../config/filehandler.config.js";

const uploadImageService = async (file) => {
  try {
  

  const response = await imageKit.upload({
  file: file.buffer,
  fileName:file.originalname,
  folder : "botAvatars"
});
console.log(response)
   return response.url

  } catch (error) {

   throw error
   
  }
};
export default uploadImageService;