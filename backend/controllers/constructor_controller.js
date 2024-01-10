'use strict'

const constructorProject = require('../models/constructor_model');

exports.getAll = function (req, res) {
    constructorProject.getAll({}, function (err, result) {
        if (!err) {
            return res.json(result)
        } else {
            return res.send(err)
        }
    })
}

exports.create = function (req, res) {
    const projectObj = {
        project_name: req.body.project_name,
        initial_project_date: new Date(req.body.initial_project_date),
        final_project_date: new Date(req.body.final_project_date),
        images: req.body.images ? req.body.images : [],
    };

    constructorProject.create(projectObj, function (err, result) {
        if (!err) {
            res.status(201).json({
                success: true,
                message: "Proyecto creado correctamente",
                data: result
            })
        } else {
            res.status(400).json({
                success: false,
                message: 'Error al crear un proyecto',
                data: err
            })
        }
    })
}