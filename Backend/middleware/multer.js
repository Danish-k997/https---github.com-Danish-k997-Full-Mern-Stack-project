import multer from "multer";
import path from "path"
import fs from "fs";


const stroge = multer.diskStorage({
  filename:function(req,file,callback){
   callback(null,file.originalname)
  }
})
 
const upload = multer({storage:stroge}) 

export default upload;