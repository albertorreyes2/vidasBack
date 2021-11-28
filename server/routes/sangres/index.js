/**
 * campanas/index.js 
 * 
 * Campanas archive, here are all campaign table request.
 * 
 * Code by: ITI Alejandro Partida / ITI Gustavo Reyes / ITI Fernando Rivas 
 * 
 * 28 Nov. 2021
 */
const express = require('express');
const app = express()
const con = require('../../db/db');

/**
 * @method get/sangre/getTiposSangre
 * @summary Request to get all blood types availables
 */
app.get('/sangre/getTiposSangre', [], (req, res) => {
    con.query(`SELECT * FROM tipos_sangre;`, (err, result) => {
        if (err) {
            return res.json({ ok: true, message: `Ocurrio un error`, err });
        } else {
            return res.json({ ok: true, result: result });
        }
    });
});


module.exports = app;