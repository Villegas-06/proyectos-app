'use strict';

let User = require('../models/user_model');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

exports.createUser = function (req, res) {
    const { name, lastname, username, email, password, userType } = req.body;
    if (name && lastname && username && email && password && userType) {
        let newUser = new User({
            ...req.body,
        });
        User.addUser(newUser, (err, user) => {
            if (err) {
                res.status(400).json({
                    success: false,
                    message: "Error al registrar un usuario",
                    data: err
                });
            } else {
                delete user._doc.password;
                res.status(201).json({
                    success: true,
                    message: "Usuario registrado con exito.",
                    data: user._doc,
                })
            }
        })
    } else {
        res.status(400).json({ success: false, message: "Informacion incompleta" })
    }
}

exports.authenticate = function (req, res) {
    const { email = '', password = '' } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            data: "Es necesario el email y la contraseña",
        });
    }

    User.get({ email: email }, function (error, user) {
        if (!error) {
            if (!user || user == null) {
                return res.status(404).json({ success: false, data: 'Usuario no encontrado' });
            }

            User.comparePassword(
                password,
                user._doc.password,

                async (err, isMatch) => {
                    if (err) {
                        return res.status(500).json({ success: false, data: err });
                    }

                    if (isMatch) {
                        //Checks if user is approved
                        const token = jwt.sign({ user }, config.secret);
                        await delete user.password;
                        res.status(200).json({
                            success: true,
                            data: {
                                token: "JWT" + token,
                                user: user,
                            },
                        });
                    } else {
                        return res.status(200).json({
                            success: false,
                            message: "Contraseña incorrecta.",
                        })
                    }
                }
            )
        } else {
            return res.status(500).json({ success: false, data: error });
        }
    });
}