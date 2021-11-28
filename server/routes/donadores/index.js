/**
 * donadores/index.js 
 * 
 * Dondadores archive, here are all donadores table request.
 * 
 * Code by: ITI Alejandro Partida / ITI Gustavo Reyes / ITI Fernando Rivas 
 * 
 * 27 Nov. 2021
 */
const express = require('express');
const app = express()
const con = require('../../db/db');

/**
 * @method GET/getDonadores
 * @summary Get all data from donadores table based on idCampana
 * 
 * @param
 */
app.get('/donadores/getDonadores', [], (req, res) => {
    const { idCampana } = req.query;

    con.query(`SELECT camp.nombre AS campana, CONCAT(d.nombre, " ", d.apellido_p, " ", d.apellido_m) AS nombre, d.fecha_nacimiento, d.correo, d.cel, d.tel, d.resp_nombre, d.resp_tel, 
    d.estudiante, ts.nombre AS tipo_sangre, uni.nombre AS universidad, carr.nombre AS carrera
    FROM campana_donador cd
    INNER JOIN donadores d ON cd.id_donador = d.id
    INNER JOIN campana camp ON camp.id = cd.id_campana
    INNER JOIN tipos_sangre ts ON d.id_tipo_sangre = ts.id
    LEFT JOIN estudiante e ON e.id_donador = d.id
    LEFT JOIN universidades uni ON e.id_uni = uni.id
    LEFT JOIN carreras carr ON e.id_carrera = carr.id WHERE cd.id_campana = ?`, [idCampana], (err, result) => {
        if (err) {
            logs.error(1, err, req);
            return res.json({ ok: true, message: `Ocurrio un error`, err });
        } else {
            return res.json({ ok: true, result: result });
        }
    });

});


/**
 * @method post/donador/newDonador
 * @summary Request to add a new donador, it saves the new entry into the DataBase
 * 
 * Data required *
 * @param {String} nombre *
 * @param {String} apellido_p *
 * @param {String} apellido_m
 * @param {String} fecha_nacimiento *
 * @param {String} correo *
 * @param {String} tel 
 * @param {String} cel *
 * @param {String} matricula
 * @param {number} id_carrera
 * @param {number} id_campana* 
 * @param {number} estudiante *
 * @param {String} resp_nombre *
 * @param {String} resp_tel *
 * @param {number} id_tipo_sangre *
 * @param {number} id_uni
 * @param {number} id_carreras
 * @param {string} matricula 
 */
app.post('/donador/newDonador', [], (req, res) => {
    const { nombre = null, apellido_p = null, apellido_m = '', fecha_nacimiento = null, id_campana = null, correo = null, tel = '', cel = null, matricula = null, estudiante = 0, resp_nombre = null, resp_tel = null, id_tipo_sangre = null, id_uni = null, id_carreras = null } = req.body
    if (nombre != null && apellido_p != null && fecha_nacimiento != null && id_campana != null && correo != null && cel != null && resp_nombre != null && resp_tel != null && id_tipo_sangre != null) {
        //BEGIN TRANSACTION TO SAVE DATA

        con.getConnection((err, con) => {
            if (err) {
                console.log(err)
            } else {
                con.beginTransaction(err => {
                    if (err) {
                        con.rollback(() => {
                            console.log(err);
                            con.release();
                            res.json({ ok: false, message: "Ocurrion un error." });
                        });
                    } else {
                        //INSERT DATA INTO DONADOR TABLE
                        con.query(`INSERT INTO donadores (nombre, apellido_p, apellido_m ,fecha_nacimiento, correo, tel, cel, estudiante, resp_nombre, resp_tel, id_tipo_sangre) VALUES (?,?,?,?,?,?,?,?,?,?,?) `, [nombre, apellido_p, apellido_m, fecha_nacimiento, correo, tel, cel, estudiante, resp_nombre, resp_tel, id_tipo_sangre], (err, donador) => {
                            if (err) {
                                con.rollback(() => {
                                    console.log(err);
                                    con.release();
                                    return res.json({ ok: false, message: 'Ocurrio un error' });
                                });
                            } else {
                                if (donador.affectedRows > 0) {
                                    //INSERT DATA INTO campana_donador
                                    con.query(`INSERT INTO campana_donador (id_campana, id_donador) VALUES (?,?) `, [id_campana, donador.insertId], (err, campana_donador) => {
                                        if (err) {
                                            con.rollback(() => {
                                                console.log(err);
                                                con.release();
                                                res.json({ ok: false, message: "Ocurrion un error." });
                                            });
                                        } else {
                                            if (campana_donador.affectedRows > 0) {
                                                if (estudiante) {
                                                    // IN CASE DONADOR IS STUDENT INSERT DATA INTO 
                                                    if (id_carreras != null && id_uni != null) {
                                                        con.query(`INSERT INTO estudiante (id_donador, id_uni, id_carrera, matricula) VALUES (?,?,?,?) `, [donador.insertId, id_uni, id_carreras, matricula], (err, result) => {
                                                            if (err) {
                                                                con.rollback(() => {
                                                                    console.log(err);
                                                                    con.release();
                                                                    return res.json({ ok: false, message: 'Ocurrio un error' });
                                                                });
                                                            } else {
                                                                con.commit(err => {
                                                                    if (err) {
                                                                        con.rollback(() => {
                                                                            console.log(err);
                                                                            con.release();
                                                                            return res.json({ ok: false, message: 'Ocurrio un error' });
                                                                        });
                                                                    } else {
                                                                        return res.json({ ok: true, message: '¡Guardado con éxito!' });
                                                                    }
                                                                });
                                                            }
                                                        });
                                                    } else {
                                                        con.rollback(() => {
                                                            console.log(err);
                                                            con.release();
                                                            return res.json({ ok: false, message: 'Asegurate de llenar todos los campos necesarios del estudiante.' });
                                                        });
                                                    }

                                                } else {
                                                    con.commit(err => {
                                                        if (err) {
                                                            con.rollback(() => {
                                                                console.log(err);
                                                                con.release();
                                                                return res.json({ ok: false, message: 'Ocurrio un error' });
                                                            });
                                                        } else {
                                                            return res.json({ ok: true, message: '¡Guardado con éxito!' });
                                                        }
                                                    })
                                                }
                                            } else {
                                                con.rollback(() => {
                                                    console.log(err);
                                                    con.release();
                                                    return res.json({ ok: false, message: "No fue posible guardar el donador :(" });
                                                });
                                            }
                                        }
                                    });
                                } else {
                                    con.rollback(() => {
                                        console.log(err);
                                        con.release();
                                        return res.json({ ok: false, message: "No fue posible guardar el donador :(" });
                                    });
                                }
                            }
                        });
                    }
                });
            }
        });

    } else return res.json({ ok: false, message: 'Asegurate de llenar todos los campos necesarios.' });
});


module.exports = app;