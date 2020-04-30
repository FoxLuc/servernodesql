//E in questa classe verranno collezionati gli oggetti feature
module.exports = class FeatureCollection {
    constructor(index, geometry) {
        this.type = "FeatureCollection";
        this.features = [];
    }
}