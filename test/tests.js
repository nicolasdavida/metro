const {describe} = require('mocha');
const assert = require('assert');
const expect = require('chai').expect;

const Metro = require('../metro.js');

describe('Test ruta A -> F:', function() {

    it('Tren rojo debería ser A->B->C->H->F', function() {
        let metro = new Metro('A', 'F', 'R');
        metro.buscarMejorRuta();
        assert(metro.laMejor.toString() === 'A,B,C,H,F');
    });
    
    it('Tren verde debería ser A->B->C->D->E->F', function() {
        let metro = new Metro('A', 'F', 'V');
        metro.buscarMejorRuta();
        assert(metro.laMejor.toString() === 'A,B,C,D,E,F');
    });
    
    it('Tren sin color debería ser A->B->C->D->E->F', function() {
        let metro = new Metro('A', 'F');
        metro.buscarMejorRuta();
        assert(metro.laMejor.toString() === 'A,B,C,D,E,F');
    });

});

describe('Test ruta C -> I:', function() {

    it('Tren rojo no debería dar ruta posible', function() {
        let metro = new Metro('C', 'I', 'R');
        var testFunc = function() {
            metro.buscarMejorRuta();
        };
        expect(testFunc).to.throw(Error);
    });
    
    it('Tren verde debería ser C->G->I', function() {
        let metro = new Metro('C', 'I', 'V');
        metro.buscarMejorRuta();
        assert(metro.laMejor.toString() === 'C,G,I');
    });
    
    it('Tren sin color debería ser C->G->H->I', function() {
        let metro = new Metro('C', 'I');
        metro.buscarMejorRuta();
        assert(metro.laMejor.toString() === 'C,G,H,I');
    });

});

describe('Test ruta A -> X:', function() {
    
    it('No debería dar ruta posible', function() {
        let metro = new Metro('A', 'X');
        var testFunc = function() {
            metro.buscarMejorRuta();
        };
        expect(testFunc).to.throw(Error);
    });

});