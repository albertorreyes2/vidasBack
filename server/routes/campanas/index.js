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
 * @method post/
 * @summary
 * 
 * @param
 */
app.get('/campaign/getCamps', [verifyToken, generalRateLimit], (req, res) => {
    con.query(`SELECT * FROM campana;`, (err, result) => {
        if (err) {
            return res.json({ ok: true, message: `Ocurrio un error`, err });
        } else {
            return res.json({ ok: true, result: result });
        }
    });
});


/**
 * @method post/campaign/newCamp
 * @summary Reqeust to add a new campaign into the database.
 * 
 * @param {date} fecha
 * @param {string} nombre
 */
app.post('/campaign/newCamp', [verifyToken, generalRateLimit], (req, res) => {
    const { fecha = null, nombre = null } = req.body
    if (fecha != null && nombre != null) {
        con.query(`INSERT INTO campana (fecha, nombre) VALUES (?,?)`, [fecha, nombre], (err, campaign) => {
            if (err) {
                logs.error(1, err, req);
                return verifyRFToken(req, res, { ok: true, message: `Ocurrió un error`, err });
            } else {
                if (campaign.affectedRows > 0) return verifyRFToken(req, res, { ok: true, message: "¡Guardado con éxito!" });
                else return verifyRFToken(req, res, { ok: false, message: "No fué posible guardar la campaña :(" });
            }
        });
    } else {
        return res.json({ ok: false, message: "Faltan Datos" });
    }
});



module.exports = app;