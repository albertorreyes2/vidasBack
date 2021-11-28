/**
 * server/index.js 
 * 
 * Archivo de uso de rutas de la aplicacion.
 * 
 * Code by: ITI Alejandro Partida / ITI Gustavo Reyes / ITI Fernando Rivas 
 * 
 * Nov. 2021
 */
const express = require('express')
const app = express()
const db = require('../../db/db');

/**
 * @method post/getDonadores
 * @summary Reqeust to get all data from donadores table
 * 
 * @param
 */
app.post('/getDonadores', [], (req, res) => {
    const { } = req.body

    db.query(``, [], (err, result) => {
        if (err) {
            logs.error(1, err, req);
            return verifyRFToken(req, res, { ok: true, message: `Ocurrio un error`, err });
        } else {
            return verifyRFToken(req, res, { ok: true, result: result })
        }
    });

});


/**
 * @method post/donador/newDonador
 * @summary Request to add a ner donador, it saves the new entry into the DataBase
 * 
 * Fields requireds :
 * @param {String} nombre *
 * @param {String} apellido_p *
 * @param {String} apellido_m
 * @param {String} fecha_n *
 * @param {String} correo *
 * @param {String} tel 
 * @param {String} cel *
 * @param {String} matricula
 * @param {number} id_carrera
 * @param {number} estudiante *
 * @param {String} resp_nombre *
 * @param {String} resp_tel *
 * @param {String} resp_direccion *
 * @param {number} id_tipo_sangre *
 * @param {number} id_uni
 * @param {number} id_carreras
 */
app.post('/donador/newDondador', [], (req, res) => {
    const { nombre = null, apellido_p = null, apellido_m = '', fecha_n = null, correo = null, tel = '', cel = null, matricula = null, estudiante = 0, resp_nombre = null, resp_tel = null, resp_direccion = null, id_tipo_sangre = null, id_uni = null, id_carreras = null } = req.body
    if (nombre != null && apellido_p != null && fecha_n != null && correo != null && cel != null && resp_nombre != null && resp_tel != null && resp_direccion != null && id_tipo_sangre != null) {
        db.query(`INSERT INTO donadores (nombre, apellido_p, apellido_m ,fecha_n, correo, tel, cel, estudiante, resp_nombre, resp_tel, resp_direccion, id_tipo_sangre)`, [nombre, apellido_p, apellido_m, fecha_n, correo, tel, cel, estudiante, resp_nombre, resp_tel, resp_direccion, id_tipo_sangre], (err, result) => {
            if (err) {
                return res.json({ ok: false, message: 'Ocurrio un error' });
            } else {
                if (result.affectedRows > 0) {
                    if (estudiante) {
                        con.query(`INSERT INTO `, [], (err, result) => {
                            if (err) {
                                return res.json({ ok: false, message: 'Ocurrio un error' });
                            } else {
                                return verifyRFToken(req, res, { ok: true, result: result })
                            }
                        });
                    } else {
                        return res.json({ ok: true, result: result });
                    }
                } else {
                    return res.json({ ok: false, message: "No fue posible guardar el donador :(" })
                }
            }
        });
    } else {
        res.json({ ok: false, message: 'Asegurate de llenar todos los campos necesarios.' });
    }

});


module.exports = app;