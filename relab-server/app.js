const express = require('express');

const app = new express();

const cors = require('cors');

const sql = require('mssql');
const sqlUtils = require('./SqlUtils.js');

app.use(new cors());

//Per accedere al server, si userà queste credenziali
const config = {
    user: 'PCTO', 
    password: 'xxx123#',
    server: "213.140.22.237", 
    database: 'Katmai', 
}

//Questi URL quando inseriti risponderanno alle nostre richieste SQL
app.get('/', function (req, res) {
    sqlUtils.connect(req, res, sqlUtils.makeSqlRequest);
 });

app.get('/ci_vettore/:foglio', function (req, res) {
   console.log(req.params.foglio);
   sqlUtils.connect(req, res, sqlUtils.ciVettRequest);
});

app.get('/ci_geovettore/:lng/:lat/:r', function (req, res) {
    console.log(req.params);
    //richiamo il metodo che ottiene l'elenco dei vettori energetici
    sqlUtils.connect(req, res, sqlUtils.ciVettGeoRequest);
});

app.get('/geogeom/:lng/:lat/:r', function (req, res) {
     //richiamo il metodo che ottiene l'elenco dei vettori energetici
    sqlUtils.connect(req, res, sqlUtils.geoGeomRequest);
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