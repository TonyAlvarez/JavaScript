/*****************************************************************************************

 funcions.js

 ******************************************************************************************/
//Funció que s'executa quan es carreguen les dades de la pàgina
function myFunction() {
    //Es crea l'objecte de la classe classTabla

    var myTabla = new ClassTabla(document.body, 'miTabla', 3, 4, "texto");

    //assignar als botons els esdeveniments onclick
    document.getElementById('afFi').onclick = function () {
        myTabla.insertaFila(parseInt(document.getElementById('numFila').value), document.getElementById('texte').value)
    };

    document.getElementById('afCo').onclick = function () {
        myTabla.insertaColumna(parseInt(document.getElementById('numColumna').value), document.getElementById('texte').value)
    };

    document.getElementById('esCo').onclick = function () {
        myTabla.borraColumna(parseInt(document.getElementById('numColumna').value))
    };

    document.getElementById('esFi').onclick = function () {
        myTabla.borraFila(parseInt(document.getElementById('numFila').value))
    };

    document.getElementById('caVaCe').onclick = function () {
        myTabla.cambiaCelda(parseInt(document.getElementById('numFila').value), parseInt(document.getElementById('numColumna').value), document.getElementById('texte').value)
    };

    document.getElementById('caCeTa').onclick = function () {
        myTabla.cambiaCeldasTabla(document.getElementById('texte').value)
    };

    document.getElementById('caCo').onclick = function () {
        myTabla.cambiaFondo(document.getElementById('html5colorpicker').value)
    };

}