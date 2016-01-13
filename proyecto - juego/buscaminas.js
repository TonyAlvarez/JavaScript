/*
 * Variables y constantes globales
 */
var NUM_COLUMNAS_FACIL = 8;
var NUM_FILAS_FACIL = 8;
var NUM_MINAS_FACIL = 10;

var NUM_COLUMNAS_MEDIO = 16;
var NUM_FILAS_MEDIO = 16;
var NUM_MINAS_MEDIO = 40;

var NUM_COLUMNAS_DIFICIL = 31;
var NUM_FILAS_DIFICIL = 16;
var NUM_MINAS_DIFICIL = 99;

var num_columnas = NUM_COLUMNAS_FACIL;
var num_filas = NUM_FILAS_FACIL;
var num_minas = NUM_MINAS_FACIL;

var ESTADO_STOP = 0;
var ESTADO_PLAY = 1;
var ESTADO_GAMEOVER = 2;
var ESTADO_GAMEWIN = 3;

var CASILLA_OCULTA = 0;
var CASILLA_MINA = 1;
var CASILLA_REVELADA = 2;
var CASILLA_BANDERA_CORRECTA = 3;
var CASILLA_BANDERA_EQUIVOCADA = 4;

var tablero;
var estado = ESTADO_STOP;
var minasRestantes = num_minas;

var tiempoJuego = 0;
var timerID;

//Variable donde se guardará el Timeout para el doble click
var espera;
//Tiempo de espera entre single click y doble click
var TIEMPO_ESPERA = 250;

/**
 * Iniciar una partida en dificultad facil cuando se cargue la página
 */
window.onload = function () {
    iniciarJuego();
};

/**
 * Iniciar el juego por primera vez
 */
function iniciarJuego() {
    configurarEventos();
    inicializarArray();
    colocarMinas();
    crearTablero();
    actualizarContadorMinas();
}

/**
 * Se configura la dificultad de la partida
 */
function configurarDificultad() {
    var dificultad = document.getElementById("dificultad").value;

    if (dificultad == "facil") {
        num_columnas = NUM_COLUMNAS_FACIL;
        num_filas = NUM_FILAS_FACIL;
        num_minas = NUM_MINAS_FACIL;
    } else if (dificultad == "medio") {
        num_columnas = NUM_COLUMNAS_MEDIO;
        num_filas = NUM_FILAS_MEDIO;
        num_minas = NUM_MINAS_MEDIO;
    } else if (dificultad == "dificil") {
        num_columnas = NUM_COLUMNAS_DIFICIL;
        num_filas = NUM_FILAS_DIFICIL;
        num_minas = NUM_MINAS_DIFICIL;
    }

    crearTablero();
    reiniciarJuego();
}

/**
 * Configurar eventos
 */
function configurarEventos() {
    var carita = document.getElementById("cara-estado");
    carita.onmousedown = function () {
        switch (estado) {
            case ESTADO_PLAY:
                document.getElementById("cara-estado").className = "cara-sorpresa cara-pressed";
                break;
            case ESTADO_GAMEOVER:
                document.getElementById("cara-estado").className = "cara-gameover cara-pressed";
                break;
            case ESTADO_GAMEWIN:
                document.getElementById("cara-estado").className = "cara-gamewin cara-pressed";
                break;
        }
    };
    carita.onmouseup = function () {
        reiniciarJuego();
    };
    carita.onmousemove = function () {
        switch (estado) {
            case ESTADO_PLAY:
                document.getElementById("cara-estado").className = "cara-sonriente cara-normal";
                break;
            case ESTADO_GAMEOVER:
                document.getElementById("cara-estado").className = "cara-gameover cara-normal";
                break;
            case ESTADO_GAMEWIN:
                document.getElementById("cara-estado").className = "cara-gamewin cara-normal";
                break;
        }
    };

    document.onmousedown = function () {
        if (estado == ESTADO_PLAY)
            document.getElementById("cara-estado").className = "cara-sorpresa cara-normal";
    };

    document.onmouseup = function () {
        if (estado == ESTADO_PLAY)
            document.getElementById("cara-estado").className = "cara-sonriente cara-normal";
    };
}

/**
 * Al hacer click en la carita se reinicia el juego
 */
function reiniciarJuego() {
    estado = ESTADO_STOP;
    minasRestantes = num_minas;
    tiempoJuego = 0;
    clearInterval(timerID);
    inicializarArray();
    colocarMinas();
    reiniciarTablero();
    actualizarContadorMinas();
    actualizarContadorTiempo();
    document.getElementById("cara-estado").className = "cara-normal normal";
}

/**
 * Crear el array bidimensional que servirá para saber que hay en cada casilla del tablero
 */
function inicializarArray() {

    tablero = [];

    for (var x = 0; x < num_columnas; x++) {
        tablero.push([]);
        for (var y = 0; y < num_filas; y++) {
            tablero[x].push(0);
        }
    }
}

/**
 * Colocar las minas aleatoriamente en el array bidimensional
 */
function colocarMinas() {

    //Esta función coloca las minas aleatoriamente en el tablero
    var posX, posY;

    for (var i = 0; i < num_minas; i++) {

        posX = Math.floor(Math.random() * num_columnas);
        posY = Math.floor(Math.random() * num_filas);

        //Comprobar que no haya una mina ya colocada en esta posicion
        while (tablero[posX][posY] != 0) {
            posX = Math.floor(Math.random() * num_columnas);
            posY = Math.floor(Math.random() * num_filas);
        }

        tablero[posX][posY] = CASILLA_MINA;
    }
}


/**
 * Añadir las celdas necesarias a la tabla y configurar los eventos de los mismas.
 */
function crearTablero() {
    var tabla = document.getElementById("tabla");

    //Eliminamos todos los elementos de la tabla
    while (tabla.firstChild)
        tabla.removeChild(tabla.firstChild);

    for (var y = 0; y < num_filas; y++) {

        var fila = tabla.insertRow(y);

        for (var x = 0; x < num_columnas; x++) {
            var celda = fila.insertCell(x);
            celda.id = "celda" + y + "-" + x;
            celda.setAttribute("oncontextmenu", "return false;");
            celda.onmouseup = clickCasilla;
            celda.ondblclick = dobleClickCasilla;
        }
    }
}

/**
 * Al reiniciar el juego, reiniciar todas las celdas de la tabla
 */
function reiniciarTablero() {
    var tabla = document.getElementById("tabla");

    //Recorremos todas las celdas para eliminar las clases
    for (var columna = 0; columna < num_columnas; columna++) {
        for (var fila = 0; fila < num_filas; fila++) {
            tabla.rows[fila].cells[columna].className = "";
        }
    }
}

/**
 * Click (derecho o izquierdo) en una casilla
 *
 * Al hacer click derecho en una casilla:
 *
 * 1 - Si es una casilla sin revelar -> Se marca con una bandera (Correcta o incorrecta)
 * 2 - Si es una casilla ya marcada -> Se desmarca (Como oculta o como mina)
 * 3 - Si ya está revelada -> Se ignora
 *
 * Al hacer click izquierdo en una casilla:
 *
 * 1 - Si es una mina -> Fin del juego
 * 2 - Si es una casilla vacia con minas alrededor -> Se revela y se pone un número
 * 3 - Si es una casilla vacía sin minas alrededor -> Se revela la casilla clicada y todas las adyacentes.
 * 4 - Si es una casilla ya revelada o marcada con bandera -> Se ignora
 *
 */
function clickCasilla(evento) {

    //Comprobar que el juego no se ha finalizado
    if (estado <= ESTADO_PLAY) {

        //El juego se inicia con este click, ponemos en marcha el contador del tiempo
        if (estado == ESTADO_STOP) {

            //El contador del tiempo es un setInterval que llama a una función anonima,
            // que a su vez llama a la función que actualiza el contador del tablero.
            timerID = setInterval(
                function () {
                    tiempoJuego++;
                    actualizarContadorTiempo();
                }, 1000);

            estado = ESTADO_PLAY;
        }

        if (espera)
            clearTimeout(espera);

        //Cogemos la posición del puntero, y el elemento que hay en esa posición
        var x = evento.clientX, y = evento.clientY;
        var elementClicked = document.elementFromPoint(x, y);

        //Recorremos todas las celdas para comparar el ID con el de la celda clicada
        for (var columna = 0; columna < num_columnas; columna++) {
            for (var fila = 0; fila < num_filas; fila++) {

                //Si la celda actual tiene el mismo ID que la celda clicada, mostramos su posicion
                if (elementClicked.id == tabla.rows[fila].cells[columna].id) {

                    //Comprobar que la casilla aún no ha sido revelada
                    if (tablero[columna][fila] != CASILLA_REVELADA) {

                        //Click derecho, poner o quitar bandera
                        if (evento.button == 2 && evento.which == 3) {

                            //Si ya hay bandera correcta, se quita y se pone una mina
                            if (tablero[columna][fila] == CASILLA_BANDERA_CORRECTA) {
                                tablero[columna][fila] = CASILLA_MINA;
                                tabla.rows[fila].cells[columna].className = "";
                                minasRestantes++;
                                //Si ya hay bandera equivocada, se quita y se pone una casilla vacia oculta
                            } else if (tablero[columna][fila] == CASILLA_BANDERA_EQUIVOCADA) {
                                tablero[columna][fila] = CASILLA_OCULTA;
                                tabla.rows[fila].cells[columna].className = "";
                                minasRestantes++;
                                //Si hay mina, se marca como bandera correcta
                            } else if (tablero[columna][fila] == CASILLA_MINA) {
                                tablero[columna][fila] = CASILLA_BANDERA_CORRECTA;
                                tabla.rows[fila].cells[columna].className = "flag";
                                minasRestantes--;
                                //Si no hay mina, bandera equivocada
                            } else {
                                tablero[columna][fila] = CASILLA_BANDERA_EQUIVOCADA;
                                tabla.rows[fila].cells[columna].className = "flag";
                                minasRestantes--;
                            }

                            actualizarContadorMinas();

                            //Click izquierdo en casilla sin revelar y sin bandera, se revela la casilla
                        } else if (tablero[columna][fila] < CASILLA_REVELADA) {

                            console.log("Click en: " + columna + " - " + fila);
                            revelarCelda(columna, fila, 1);
                        }
                    }

                    //Aumentamos los indices para salir de los dos búcles y evitar iteraciones innecesarias
                    columna = num_columnas;
                    fila = num_filas;
                }
            }
        }
    }
}

/**
 * Cuando se hace doble click en una casilla, si ya se han marcado todas las minas que tiene alrededor, se revela el resto de casillas.
 * Si una mina se ha marcado mal, se revelará la verdadera posición de la mina y el jego habrá finalizado.
 */
function dobleClickCasilla(evento) {

    //Si se ha finalizado el juego, se ignora el click
    if (estado == ESTADO_PLAY) {

        //Se limpia el Timeout para que no salte el single click
        if (espera)
            clearTimeout(espera);

        //Cogemos la posición del puntero, y el elemento que hay en esa posición
        var x = evento.clientX, y = evento.clientY;
        var elementClicked = document.elementFromPoint(x, y);

        //Recorremos todas las celdas para comparar el ID con el de la celda clicada
        for (var columna = 0; columna < num_columnas; columna++) {
            for (var fila = 0; fila < num_filas; fila++) {

                //Si la celda actual tiene el mismo ID que la celda clicada, mostramos su posicion
                if (elementClicked.id == tabla.rows[fila].cells[columna].id) {

                    //Si la casilla está revelada y hay tantas banderas marcadas alrededor como minas tiene alrededor, se revelan las casillas de alrededor restantes
                    if (tablero[columna][fila] == CASILLA_REVELADA &&
                        contarMinasAdyacentes(columna, fila) == contarBanderasAdyacentes(columna, fila)) {
                        console.log("Doble click en: " + columna + " - " + fila);
                        revelarColindantes(columna, fila, 2);
                    }

                    //Aumentamos los indices para salir de los dos búcles y evitar iteraciones innecesarias
                    columna = num_columnas;
                    fila = num_filas;
                }
            }
        }
    }
}

/**
 * Función que revela una casilla determinada
 *
 * Hay 3 posibilidades para que una casilla sea revelada:
 *
 *  1 - Que se haya clicado en ella
 *  2 - Que se haya hecho doble click en una casilla colindante
 *  3 - que tenga una casilla vacía colindante y se haya revelado automáticamente
 */
function revelarCelda(x, y, click) {

    //Comprobar que la casilla aún no ha sido revelada y que no tiene banderas
    if (tablero[x][y] < CASILLA_REVELADA) {
        if (click == 1) {
            console.log("Revelar por click: " + x + " - " + y);
        } else if (click == 2) {
            console.log("Revelar por doble click colindante: " + x + " - " + y);
        } else {
            //Cuando se descubre una casilla vacia, se revelan las colindantes automaticamente
            console.log("Revelar por casilla vacia colindante: " + x + " - " + y);
        }

        var celda = tabla.rows[y].cells[x];

        //Comprobar si tiene una mina
        if (tablero[x][y] == CASILLA_MINA && click > 0) {
            celda.className = "pressed minePressed";
            gameOver(x, y);
        } else {
            //Marcar la casilla como revelada
            celda.className = "pressed";
            tablero[x][y] = CASILLA_REVELADA;

            //Compobar cuantas minas tiene alrededor
            var minasColindantes = contarMinasAdyacentes(x, y);

            //Si no hay minas alrededor se revela la casilla y las casillas adyacentes.
            if (minasColindantes == 0) {
                revelarColindantes(x, y, 0);
                //Si hay minas alrededor se revela la casilla y se pone el numero de minas que tiene alrededor.
            } else {
                celda.className = "pressed mines" + minasColindantes;
            }
        }


        //Si la casilla que se acaba de revelar no ea una mina, comprobar el final del juego
        if (estado == ESTADO_PLAY) {
            console.log("Comprobar final; " + comprobarFinal());
            if (comprobarFinal()) {
                //Juego ganado
                gameWin();
            }
        }
    }
}

/**
 * Función que revela las casillas colindantes de una casilla determinada
 *
 * Cuando una casilla no tiene ninguna mina alrededor, las casillas colindantes se revelan automáticamente con esta función.
 */
function revelarColindantes(x, y, click) {

    if (x > 0 && y > 0)
        revelarCelda(x - 1, y - 1, click);

    if (x > 0)
        revelarCelda(x - 1, y, click);

    if (x > 0 && y < num_filas - 1)
        revelarCelda(x - 1, y + 1, click);

    if (y < num_filas - 1)
        revelarCelda(x, y + 1, click);

    if (y < num_filas - 1 && x < num_columnas - 1)
        revelarCelda(x + 1, y + 1, click);

    if (x < num_columnas - 1)
        revelarCelda(x + 1, y, click);

    if (x < num_columnas - 1 && y > 0)
        revelarCelda(x + 1, y - 1, click);

    if (y > 0)
        revelarCelda(x, y - 1, click);
}

/**
 * Función que devuelve el  número de minas que tiene alrededor una casilla determinada
 */
function contarMinasAdyacentes(x, y) {
    var minasColindantes = 0;

    if (x > 0 && y > 0 && tablero[x - 1][y - 1] == CASILLA_MINA || x > 0 && y > 0 && tablero[x - 1][y - 1] == CASILLA_BANDERA_CORRECTA)
        minasColindantes++;

    if (x > 0 && tablero[x - 1][y] == CASILLA_MINA || x > 0 && tablero[x - 1][y] == CASILLA_BANDERA_CORRECTA)
        minasColindantes++;

    if (x > 0 && y < num_filas - 1 && tablero[x - 1][y + 1] == CASILLA_MINA || x > 0 && y < num_filas - 1 && tablero[x - 1][y + 1] == CASILLA_BANDERA_CORRECTA)
        minasColindantes++;

    if (y < num_filas && tablero[x][y + 1] == CASILLA_MINA || y < num_filas && tablero[x][y + 1] == CASILLA_BANDERA_CORRECTA)
        minasColindantes++;

    if (y < num_filas && x < num_columnas - 1 && tablero[x + 1][y + 1] == CASILLA_MINA || y < num_filas && x < num_columnas - 1 && tablero[x + 1][y + 1] == CASILLA_BANDERA_CORRECTA)
        minasColindantes++;

    if (x < num_columnas - 1 && tablero[x + 1][y] == CASILLA_MINA || x < num_columnas - 1 && tablero[x + 1][y] == CASILLA_BANDERA_CORRECTA)
        minasColindantes++;

    if (x < num_columnas - 1 && y > 0 && tablero[x + 1][y - 1] == CASILLA_MINA || x < num_columnas - 1 && y > 0 && tablero[x + 1][y - 1] == CASILLA_BANDERA_CORRECTA)
        minasColindantes++;

    if (y > 0 && tablero[x][y - 1] == CASILLA_MINA || y > 0 && tablero[x][y - 1] == CASILLA_BANDERA_CORRECTA)
        minasColindantes++;

    return minasColindantes;
}

/**
 * Función que devuelve el número de banderas que tiene alrededor una casilla determinada
 */
function contarBanderasAdyacentes(x, y) {
    var banderasColindantes = 0;

    if (x > 0 && y > 0 && tablero[x - 1][y - 1] == CASILLA_BANDERA_EQUIVOCADA || x > 0 && y > 0 && tablero[x - 1][y - 1] == CASILLA_BANDERA_CORRECTA)
        banderasColindantes++;

    if (x > 0 && tablero[x - 1][y] == CASILLA_BANDERA_EQUIVOCADA || x > 0 && tablero[x - 1][y] == CASILLA_BANDERA_CORRECTA)
        banderasColindantes++;

    if (x > 0 && y < num_filas - 1 && tablero[x - 1][y + 1] == CASILLA_BANDERA_EQUIVOCADA || x > 0 && y < num_filas - 1 && tablero[x - 1][y + 1] == CASILLA_BANDERA_CORRECTA)
        banderasColindantes++;

    if (y < num_filas && tablero[x][y + 1] == CASILLA_BANDERA_EQUIVOCADA || y < num_filas && tablero[x][y + 1] == CASILLA_BANDERA_CORRECTA)
        banderasColindantes++;

    if (y < num_filas && x < num_columnas - 1 && tablero[x + 1][y + 1] == CASILLA_BANDERA_EQUIVOCADA || y < num_filas && x < num_columnas - 1 && tablero[x + 1][y + 1] == CASILLA_BANDERA_CORRECTA)
        banderasColindantes++;

    if (x < num_columnas - 1 && tablero[x + 1][y] == CASILLA_BANDERA_EQUIVOCADA || x < num_columnas - 1 && tablero[x + 1][y] == CASILLA_BANDERA_CORRECTA)
        banderasColindantes++;

    if (x < num_columnas - 1 && y > 0 && tablero[x + 1][y - 1] == CASILLA_BANDERA_EQUIVOCADA || x < num_columnas - 1 && y > 0 && tablero[x + 1][y - 1] == CASILLA_BANDERA_CORRECTA)
        banderasColindantes++;

    if (y > 0 && tablero[x][y - 1] == CASILLA_BANDERA_EQUIVOCADA || y > 0 && tablero[x][y - 1] == CASILLA_BANDERA_CORRECTA)
        banderasColindantes++;

    return banderasColindantes;
}

/**
 * Si hay tantas casillas sin revelar como minas en el tablero,
 * quiere decir que se han descubierto todas las casillas que no son minas, y se ha ganado el juego.
 */
function comprobarFinal() {

    var casillasRestantes = 0;

    //Recorremos todas las celdas para contar las que faltan por revelar
    for (var columna = 0; columna < num_columnas; columna++) {
        for (var fila = 0; fila < num_filas; fila++) {

            //Comprobar que la casilla no esté revelada
            if (tablero[columna][fila] != CASILLA_REVELADA)
                casillasRestantes++;

            //Si hay más casillas sin revelar que minas en el tablero, aún no se ha finalizado el juego.
            //Devolvemos false para evitar iteraciones innecesarias.
            if (casillasRestantes > num_minas)
                return false;
        }
    }


    //Si aún no hemos devuelto false, es que ya se ha finalizado el juego,
    //porque es imposible que haya menos casillas sin revelar que minas en el tablero.
    return true;
}

/**
 * Fin del juego, partida perdida.
 *
 * Se pasa la posición de la mina que ha explotado.
 */
function gameOver(x, y) {
    estado = ESTADO_GAMEOVER;
    clearInterval(timerID);
    document.getElementById("cara-estado").className = "cara-gameover cara-normal";
    revelarMinas(false, x, y);
}

/**
 * Fin del juego, partida ganada.
 */
function gameWin() {
    estado = ESTADO_GAMEWIN;
    minasRestantes = 0;
    actualizarContadorMinas();
    document.getElementById("cara-estado").className = "cara-gamewin cara-normal";
    clearInterval(timerID);
    revelarMinas(true);

    alert("¡Enhorabuena! \n\nHas acabado el juego en " + tiempoJuego + "s.");
}

/**
 * Revelar todas las minas cuando se finaliza el juego
 *
 * La mina que ha explotado se marca en rojo
 */
function revelarMinas(win, columna, fila) {
    for (var y = 0; y < num_filas; y++) {
        for (var x = 0; x < num_columnas; x++) {

            //La mina que ha explotado
            if (x == columna && y == fila) {
                tabla.rows[y].cells[x].className = "minePressed";
                //Minas sin explotar
            } else if (tablero[x][y] == CASILLA_MINA) {
                if (win)
                    tabla.rows[y].cells[x].className = "flag";
                else
                    tabla.rows[y].cells[x].className = "mineUnpressed";
                //Banderas mal puestas
            } else if (tablero[x][y] == CASILLA_BANDERA_EQUIVOCADA) {
                tabla.rows[y].cells[x].className = "wrongMine";
            }
        }
    }
}

/**
 * Actualiza el contador de minas restantes cada vez que se pone o se quita una bandera.
 */
function actualizarContadorMinas() {
    var unidades = Math.floor(minasRestantes % 10);
    var decenas = Math.floor(minasRestantes / 10 % 10);
    var centenas = Math.floor(minasRestantes / 100 % 10);

    var contadorUnidades = document.getElementById("minas-unidades");
    var contadorDecenas = document.getElementById("minas-decenas");
    var contadorCentenas = document.getElementById("minas-centenas");

    contadorUnidades.src = "./img/contador" + unidades + ".png";
    contadorDecenas.src = "./img/contador" + decenas + ".png";
    contadorCentenas.src = "./img/contador" + centenas + ".png";
}

/**
 * Actualiza el contador del tiempo transcurrido.
 */
function actualizarContadorTiempo() {
    var unidades = Math.floor(tiempoJuego % 10);
    var decenas = Math.floor(tiempoJuego / 10 % 10);
    var centenas = Math.floor(tiempoJuego / 100 % 10);

    var contadorUnidades = document.getElementById("tiempo-unidades");
    var contadorDecenas = document.getElementById("tiempo-decenas");
    var contadorCentenas = document.getElementById("tiempo-centenas");

    contadorUnidades.src = "./img/contador" + unidades + ".png";
    contadorDecenas.src = "./img/contador" + decenas + ".png";
    contadorCentenas.src = "./img/contador" + centenas + ".png";
}