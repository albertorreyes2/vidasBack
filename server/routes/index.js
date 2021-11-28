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

app.use(require('./campanas/index')); //IMPORT OF CAMPAIGNS FILE.
app.use(require('./donadores/index')); //IMPORT OF DONADORES FILE.
app.use(require('./graficas/index')); //IMPORT OF GRAPHS FILE.
app.use(require('./universidades/index')); //IMPORT OF UNI FILE.
app.use(require('./carreras/carreras')); //IMPORT OF CARRERAS FILE.

module.exports = app;