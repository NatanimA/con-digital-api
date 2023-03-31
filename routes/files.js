const router = require('express').Router()
const {getFiles,getFile,deleteFile,postFile} = require('../controllers/filesController')
const multer = require('multer')
const path = require('path');

const UPLOAD_PATH = path.join('../public/uploads');

// Multer configuration for upload
const upload = multer({
  dest: UPLOAD_PATH,
});

router.route('/')
    .get( async (req,res) => {
        return await getFiles(req,res)
    })

    .post(upload.single('file'),async (req,res) => {
        return await postFile(req,res)
    })

router.route('/:id')
    .get(async (req,res) => {
        return await getFile(req,res);
    })

    .delete(async (req,res) => {
        return await deleteFile(req,res)
    })


module.exports = router
