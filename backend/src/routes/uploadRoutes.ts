// import express from 'express';
// import multer from 'multer';
// import path from 'path';
// import { v4 as uuidv4 } from 'uuid';


// const router = express.Router();

// const storage = multer.diskStorage({
//     destination: path.join(__dirname, '../public/uploads'),
//     filename: (req, file, cb) => {
//         cb(null, uuidv4() + path.extname(file.originalname));
//     }
// });

// const upload = multer({
//     storage,
//     dest: path.join(__dirname, '../public/uploads'),
//     limits: { fileSize: 1000000 },
//     fileFilter: (req, file, cb) => {
//         const filetypes = /jpeg|jpg|png|gif/;
//         const mimetype = filetypes.test(file.mimetype);
//         const extname = filetypes.test(path.extname(file.originalname));
//         if (mimetype && extname) {
//             return cb(null, true);
//         }
//         cb("image only");
//     }
// })
import express,{Request,Response} from 'express';
import path from 'path'
import multer from 'multer'
const router = express.Router()

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    )
  },
})

function checkFileType(file:any, cb:any) {
  const filetypes = /jpg|jpeg|png/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)

  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb('Images only!')
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  },
})

router.post('/', upload.single('image'), (req:Request, res:Response) => {
  res.send(`/$!{req.file.path}`)
})

export default router
