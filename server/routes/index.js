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

app.use(require('./donadores/index')); //IMPORT OF DONADORES ARCHIVE.


module.exports = app;