const { threadId } = require("worker_threads");

class Metro {

    constructor(origen, destino, tren = null) {
        this.origen = origen;
        this.destino = destino;
        this.tren = tren;
        this.peso = -1;
        this.laMejor = [];
        this.rutas = [];
        this.verdes = [];
        this.rojas = [];
        this.rutaEntrada = "./entrada.txt";
    }

    leerEntrada() {
        let fs = require("fs");
        let text = fs.readFileSync(this.rutaEntrada, 'utf8');
        return text.toString();
    }
    
    cargarRedMetro() {
        let entrada = this.leerEntrada();
        let ruta = [];
        let verdes = [];
        let rojas = [];
        
        entrada.split(/\n/).forEach(function (line, index){
            if(index == 0) {
                line.replace(/\r/, '').split(';').forEach(function(data){
                    let par = data.split(',');
                    let key = par[0];
                    let val = par[1];
                    if(ruta[key] === undefined) {
                        ruta[key] = [val];
                    } else {
                        let act = ruta[key];
                        act.push(val);
                        ruta[key] = act;
                    }
                    if(ruta[val] == undefined) {
                        ruta[val] = [key];
                    } else {
                        let act = ruta[val];
                        act.push(key);
                        ruta[val] = act;
                    }
                });
            }
            
            if(index == 1) {
                let par = line.replace(/\r/, '').split(';');
                let ver = par[0];
                let roj = par[1];
                ver.split(',').forEach(function(data){
                    verdes.push(data);
                });
                roj.split(',').forEach(function(data){
                    rojas.push(data);
                });
            }
        });
        this.rutas = ruta;
        this.verdes = verdes;
        this.rojas = rojas;

    }

    encuentraRuta(ruta, destino) {
        let self = this;
        let actual = ruta.slice(-1).pop();

        self.rutas[actual].forEach(function(estacion){
            if(!ruta.includes(estacion)) {
                let posibleRuta = JSON.parse(JSON.stringify(ruta));
                posibleRuta.push(estacion);
                if(estacion != destino) {
                    self.encuentraRuta(posibleRuta, destino);
                } else {
                    if(self.tren == 'R') {
                        self.verdes.forEach(function(est) {
                            let index = posibleRuta.indexOf(est);
                            if (index > -1) {
                                posibleRuta.splice(index, 1);
                            }
                        });
                    }
                    if(self.tren == 'V') {
                        self.rojas.forEach(function(est) {
                            let index = posibleRuta.indexOf(est);
                            if (index > -1) {
                                posibleRuta.splice(index, 1);
                            }
                        });
                    }

                    let ult = posibleRuta.slice(-1).pop();
                    if(ult == destino) {
                        console.log("Posible: " + posibleRuta);
                        if(self.peso == -1 || posibleRuta.length < self.peso) {
                            self.peso = posibleRuta.length;
                            self.laMejor = posibleRuta;
                        }
                    }
                }
            }
        });
    }

    buscarMejorRuta() {
        this.cargarRedMetro();
        let ruta = [this.origen];
        this.encuentraRuta(ruta, this.destino);
        if(this.peso == -1) {
            let color = (this.tren=='R'?' con tren rojo':(this.tren=='V'?' con tren verde':''));
            throw new Error("No encuentra ruta posible entre " + this.origen + " y " + this.destino + color);
        } else {
            console.log('La mejor es: ' + this.laMejor);
        }
    }

}

module.exports = Metro;
