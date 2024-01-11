'use strict';

const constructorProject = require('../models/constructor_model');

exports.getAll = function (req, res) {
    constructorProject.getAll({})
        .then(result => {
            return res.json(result);
        })
        .catch(err => {
            console.error("Error al obtener proyectos:", err);
            return res.status(500).json({
                success: false,
                message: 'Error al obtener proyectos',
                data: err
            });
        });
};

exports.create = function (req, res) {
    const projectObj = {
        project_name: req.body.project_name,
        initial_project_date: new Date(req.body.initial_project_date),
        final_project_date: new Date(req.body.final_project_date),
        images: req.body.images ? req.body.images : [],
        items_list: req.body.items_list ? req.body.items_list : [],
    };

    constructorProject.create(projectObj)
        .then(result => {
            return res.status(201).json({
                success: true,
                message: "Proyecto creado correctamente",
                data: result
            });
        })
        .catch(err => {
            console.error("Error al crear el proyecto:", err);
            return res.status(400).json({
                success: false,
                message: 'Error al crear un proyecto',
                data: err
            });
        });
};
