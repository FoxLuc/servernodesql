const sql = require('mssql');
const CC = require('./CoordConverter.js');

const coordConverter =  new CC();
 
const config = {
    user: 'PCTO',  
    password: 'xxx123#', 
    server: "213.140.22.237",  
    database: 'Katmai', 
}

module.exports = class SqlUtils {

    static connect(req, res, connectedCallback)
    {
        sql.connect(config, (err) => {
            if (err) console.log(err);  
            else connectedCallback(req, res);      
        });
    }

    static makeSqlRequest(req, res) {
        let sqlRequest = new sql.Request();
        let q = 'SELECT DISTINCT TOP (100) [GEOM].STAsText() FROM [Katmai].[dbo].[interventiMilano]';
        sqlRequest.query(q, (err, result) => {SqlUtils.sendQueryResults(err,result,res)}); 
    }
    
    static sendQueryResults(err,result, res)
    {
        if (err) console.log(err); 
        res.send(coordConverter.generateGeoJson(result.recordset));  
    }

    static ciVettRequest(req, res) {
        let sqlRequest = new sql.Request();
        let foglio = req.params.foglio;
        let q = `SELECT INDIRIZZO, WGS84_X, WGS84_Y, CLASSE_ENE, EP_H_ND, CI_VETTORE, FOGLIO, SEZ
        FROM [Katmai].[dbo].[interventiMilano]
        WHERE FOGLIO = ${foglio}`
       sqlRequest.query(q, (err, result) => {SqlUtils.sendCiVettResult(err,result,res)}); 
    }

    static sendCiVettResult(err,result, res)
    {
        if (err) console.log(err);
        res.send(result.recordset);
    }
}