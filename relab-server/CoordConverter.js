const proj4 = require('proj4');
const parse = require('wellknown');
const Feature = require('./models/feature.model.js');
const FeatureCollection = require('./models/featureCollection.model.js');

//Per mostrarle con il nostro programma, qui vengono convertite le coordinate dal wkt quando sono in SQL, al
//formato GeoJson
module.exports = class CoordConverter {
    constructor()
    {
        proj4.defs("EPSG:32632", "+proj=utm +zone=32 +datum=WGS84 +units=m +no_defs");
    }
    generateGeoJson(recordset) {
        let geoJsonHeader = new FeatureCollection();
        let i = 0;
        for (const record of recordset) {  
            let media = record["media"];
            let somma = record["somma"];
            let polygonGeometry = parse(record["WKT"]);
            //let geom = this._convertPolygon(polygonGeometry); // converto in "WGS 84" 
            let geom = (polygonGeometry); // non converto più in "WGS 84" 
            // e metto la geometry  geojson
            geoJsonHeader.features.push(new Feature(i,geom, media, somma));
        }
        return geoJsonHeader;
    }

    _convertPolygon(geometry) {
        let polygon = geometry.coordinates[0];
        for (let index = 0; index < polygon.length; index++) {
            const coord = polygon[index];
            geometry.coordinates[0][index] = proj4("EPSG:32632", "WGS84").forward(coord);
        }
        return geometry;
    }

}