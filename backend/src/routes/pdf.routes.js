import express from 'express'
import { pdfUploadController } from '../controllers/pdf.controller.js'
import checkUser from '../middlewares/auth.middleware.js'
import multer from 'multer'


const pdfRouter = express.Router()

const storage = multer.diskStorage({
  destination: "uploads/",filename: (req, file, cb) => {
  cb(null, Date.now() + "-" + file.originalname);
}
});

const upload = multer({ storage });

pdfRouter.use(checkUser)



pdfRouter.post("/upload-pdf/:botId",upload.single("questionPdf"), pdfUploadController)


export default pdfRouter