/**
 * donadores/index.js 
 * 
 * Archivo de peticiones de donadores. Aqui se encuentran las peticiones de donadores
 * 
 * Code by: ITI Alejandro Partida / ITI Gustavo Reyes / ITI Fernando Rivas 
 * 
 * 27 Nov. 2021
 */
const express = require('express');
const app = express()
const con = require('../../db/db');

/**
 * @method post/graph/ByPreDon
 * @summary Reqest to get a graph of donadores by camp.
 * * it shows the amount of predonantes & donadores by camp
 * 
 * @param {number} id_campana  Camp id to generate graph of.
 */
app.post('/graph/ByPreDon', [], (req, res) => {
    const { id_campana = null } = req.body
    if (id_campana != null) {
        con.query(`SELECT 
        (SELECT COUNT(*) WHERE cd.si_dono = 0) AS predonantes,
        (SELECT COUNT(*) WHERE cd.si_dono = 1) AS donantes 
        FROM campana_donador AS cd WHERE cd.id_campana = ?;`, [id_campanas], (err, result) => {
            if (err) {
                return res.json({ ok: true, message: `Ocurrio un error`, err });
            } else {
                return res.json({ ok: true, result: result })
            }
        });
    } else {
        res.json({ ok: false, message: 'Faltan datos' });
    }

});

/**
 * @method post/graficas/getDonadoresGraph
 * @summary Reqest to get a graph of donadores by blood & camp. 
 * * it shows the amount of donadores by blood type and camp.
 * 
 * @param {number} id_campana Camp id to generate graph of.
 */
app.post('/graph/ByBloodType', [], (req, res) => {
    const { id_campana = null } = req.body
    if (id_campana != null) {
        con.query(`SELECT COUNT(*) AS cantidad, ts.nombre AS blood_type
        FROM donadores AS d INNER JOIN 
        campana_donador AS cd INNER JOIN
        tipos_sangre AS ts ON (d.id_tipo_sangre = ts.id AND d.id = cd.id_donador)
        WHERE cd.si_dono = 1 AND cd.id_campana = ? GROUP BY ts.nombre;`, [id_campanas], (err, result) => {
            if (err) {
                return res.json({ ok: true, message: `Ocurrio un error`, err });
            } else {
                return res.json({ ok: true, result: result })
            }
        });
    } else {
        res.json({ ok: false, message: 'Faltan datos' });
    }

});

/**
 * @method post/graph/ByStForDon
 * @summary Reqest to get a graph of donadores by blood & camp. 
 * * it shows the amount of donadores by type(student/foreing) and camp.
 * 
 * @param {number} id_campana Camp id to generate graph of.
 */
app.post('/graph/ByStForDon', [], (req, res) => {
    const { id_campana = null } = req.body
    if (id_campana != null) {
        con.query(`SELECT COUNT(*) AS amount, d.estudiante FROM 
        donadores AS d INNER JOIN 
        campana_donador AS cd ON (d.id = cd.id_donador)
        WHERE cd.si_dono = 1 AND cd.id_campana = ?
        GROUP BY d.estudiante;`, [id_campanas], (err, result) => {
            if (err) {
                return res.json({ ok: true, message: `Ocurrio un error`, err });
            } else {
                return res.json({ ok: true, result: result })
            }
        });
    } else {
        res.json({ ok: false, message: 'Faltan datos' });
    }
});

/**
 * @method post/graph/ByStForDon
 * @summary Reqest to get a graph of donadores by blood & camp. 
 * * it shows the amount of predonadores by type(student/foreing) and camp.
 * 
 * @param {number} id_campana Camp id to generate graph of.
 */
app.post('/graph/ByStForPreDon', [], (req, res) => {
    const { id_campana = null } = req.body
    if (id_campana != null) {
        con.query(`SELECT COUNT(*) AS amount, d.estudiante FROM 
        donadores AS d INNER JOIN 
        campana_donador AS cd ON (d.id = cd.id_donador)
        WHERE cd.si_dono = 0 AND cd.id_campana = ?
        GROUP BY d.estudiante;`, [id_campanas], (err, result) => {
            if (err) {
                return res.json({ ok: true, message: `Ocurrio un error`, err });
            } else {
                return res.json({ ok: true, result: result })
            }
        });
    } else {
        res.json({ ok: false, message: 'Faltan datos' });
    }
});


/**
 * @method post/graph/ByStForDon
 * @summary Reqest to get a graph of donadores by uni & camp. 
 * * it shows the amount of predonadores & donantes by university and camp.
 * 
 * @param {number} id_campana Camp id to generate graph of.
 */
app.post('/graph/ByUniPreDon', [], (req, res) => {
    const { id_campana = null } = req.body
    if (id_campana != null) {
        con.query(`SELECT 
        (SELECT COUNT(*) WHERE cd.si_dono = 0) AS amount_pre, 
        (SELECT COUNT(*) WHERE cd.si_dono = 1) AS amount_don, 
        u.nombre FROM 
        donadores AS d INNER JOIN 
        campana_donador AS cd INNER JOIN
        estudiante AS e INNER JOIN 
        universidades AS u INNER JOIN 
        carreras AS c ON d.id = cd.id_donador AND d.id = e.id_donador AND e.id_uni = u.id AND e.id_carrera = c.id
        WHERE cd.id_campana = ? GROUP BY u.id;`, [id_campanas], (err, result) => {
            if (err) {
                return res.json({ ok: true, message: `Ocurrio un error` });
            } else {
                return res.json({ ok: true, result: result });
            }
        });
    } else {
        res.json({ ok: false, message: 'Faltan datos' });
    }
});


module.exports = app;