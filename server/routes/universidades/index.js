/**
 * universidades/index.js 
 * 
 * Uni archive, here are all universities table request.
 * 
 * Code by: ITI Alejandro Partida / ITI Gustavo Reyes / ITI Fernando Rivas 
 * 
 * 28 Nov. 2021
 */
const express = require('express');
const app = express()
const con = require('../../db/db');

/**
 * @method get/uni/getUniversidades
 * @summary Request to get all Univer. availables
 */
app.get('/uni/getUniversidades', [], (req, res) => {
    con.query(`SELECT * FROM universidades;`, (err, result) => {
        if (err) {
            return res.json({ ok: true, message: `Ocurrio un error`, err });
        } else {
            return res.json({ ok: true, result: result });
        }
    });
});

app.get('/universidades/getUniversidades', (req, res) => {

    con.query('SELECT * FROM universidades', (err, unis) => {
        if(err) {
            console.log(err);
            res.json({ok: false, message: 'Ocurrió un error'})
        } else {
            res.json({ok: true, result: unis});
        }

    })

})


module.exports = app;