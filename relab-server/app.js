const express = require('express');
const app = new express();
const sql = require('mssql');
const CC = require('./CoordConverter.js');
const sqlUtils = require('./SqlUtils.js');
const coordConverter =  new CC();

//Per accedere al server, si userà queste credenziali
const config = {
    user: 'PCTO', 
    password: 'xxx123#',
    server: "213.140.22.237", 
    database: 'Katmai', 
}

app.get('/', function (req, res) {
    sqlUtils.connect(req, res, sqlUtils.makeSqlRequest);
 });

app.get('/ci_vettore/:foglio', function (req, res) {
   console.log(req.params.foglio);
   sqlUtils.connect(req, res, sqlUtils.ciVettRequest);
});

//In questo metodo, si crea la query per la richiesta dei dati, eseguita con sqlRequest.query
function makeSqlRequest(req, res) {
    let sqlRequest = new sql.Request();
    let q = 'SELECT DISTINCT TOP (100) [GEOM].STAsText() FROM [Katmai].[dbo].[interventiMilano]';
    sqlRequest.query(q, (err, result) => {sendQueryResults(err,result,res)}); 
}



function sendQueryResults(err,result, res)
{
    if (err) console.log(err); 
    res.send(coordConverter.generateGeoJson(result.recordset));  
}

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});