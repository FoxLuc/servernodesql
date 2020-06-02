//Qui viene definito il modello feature

//Inoltre, nel modello feature, abbiamo aggiunto la media e la somma dell'EP_H_ND che serviranno a definire le classi energetiche nelle
//zone catastali
module.exports = class Feature{
    constructor(id, geometry, media, somma) {
        this.type = "Feature";
        this.properties = new Properties(id, media, somma);
        this.geometry = geometry; 
    }
}


class Properties
{
    constructor(id, media, somma)
    {
        this.id = id;
        this.media = media;
        this.somma = somma;
    }
}