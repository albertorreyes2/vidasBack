/**
 * campanas/carreras.js 
 * 
 * HTTP Requests regarding Carreras table.
 * 
 * Coded by: ITI Alejandro Partida / ITI Gustavo Reyes / ITI Fernando Rivas 
 * 
 * 28 Nov. 2021
 */


 const express = require('express');
 const app = express()
 const con = require('../../db/db');


 app.get('/carreras/getCarreras', (req, res) => {
    
    con.query('SELECT * FROM carreras', (err, carreras) => {
        if(err) {
            res.json({ok: false, message: 'Ocurrió un error'}); 
            console.log(err);
        } else {
            res.json({ok: true, result: carreras});
        }
    })

 })


 module.exports = app;