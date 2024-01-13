const multer = require('multer');
const fs = require('fs');
const ConstructorProject = require('../models/constructor_model');

const upload = multer({ dest: 'public/images' });

const uploadImages = async function (req, res) {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: 'No files were uploaded.' });
        }

        const projectId = req.params.projectId;
        const fileNameFromFrontend = req.body.fileName;

        if (!fileNameFromFrontend) {
            return res.status(400).json({ error: 'File name from the frontend is missing.' });
        }

        console.log(req.files);

        const uploadedImages = req.files.map((file, index) => {
            // Cambiar el nombre del archivo al nombre proporcionado desde el frontend
            const newName = `${projectId}_${fileNameFromFrontend}_${index}${path.extname(file.originalname)}`;
            fs.renameSync(file.path, `uploads/${newName}`);
            return newName;
        });

        // Update the database with the uploaded images
        const project = await ConstructorProject.findOneAndUpdate(
            { _id: projectId },
            { $push: { images: uploadedImages } },
            { new: true }
        );

        return res.status(200).json({ success: true, project });
    } catch (error) {
        console.error('Error al cargar imágenes:', error);
        return res.status(500).json({ error: 'Error al cargar imágenes.' });
    }
};

const getImages = async function (req, res) {
    try {
        const projectId = req.params.projectId;
        const project = await ConstructorProject.findById(projectId);

        if (!project) {
            return res.status(404).json({ error: 'Proyecto no encontrado.' });
        }

        return res.status(200).json({ images: project.images });
    } catch (error) {
        console.error('Error al obtener imágenes:', error);
        return res.status(500).json({ error: 'Error al obtener imágenes.' });
    }
};

module.exports = {
    upload,
    uploadImages,
    getImages,
};
