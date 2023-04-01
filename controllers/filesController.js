const File = require('../models/').File
const path = require('path');
const fs = require('fs')



const UPLOAD_PATH = path.join(__dirname,'..','public','uploads'); // define upload directory


const getFiles = async (req,res) => {
    try{
        const files = await File.findAll()
        res.status(200).send(files)
    }catch(err){
        return res.status(500).send(err)
    }
}

const getFile = async (req,res) => {
    try{
        const file = await File.findOne({
            where:{
                id:req.params.id
            }
        })
        if(!file) return res.status(404).send("File not found")
        return res.status(200).send(file)
    }catch(err){
        return res.status(500).send(err)
    }
}


const deleteFile = async (req,res) => {
    try{
        const id = req.params.id
        const file = await File.findOne({
            where:{
                id
            }
        })
        if(!file) return res.status(404).send("File not found")
        await File.destroy({
            where:{
                id
            }
        })
        return res.status(204).send("File removed successfully")
    }catch(err){
        return res.status(500).send(err)
    }
}

const postFile = async (req,res) => {
    if(req.file.size > 10000000) return res.status(405).send("File is too large")

    try{
        const uploadedFile = req.file;
        // Store the uploaded file in the specified directory
        const targetPath = path.join(UPLOAD_PATH, uploadedFile.originalname);
        fs.renameSync(uploadedFile.path, targetPath);
        const newFile = await File.create({
            name:uploadedFile.originalname,
            url: targetPath,
            size: req.file.size,
        })
        return res.status(201).send(newFile)
    }catch(err){
        return res.status(500).send(err)
    }

}

module.exports ={ getFiles,getFile,deleteFile,postFile }
