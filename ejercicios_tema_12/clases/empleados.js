/**
 * Created by Tony on 3/2/16.
 */
function Empleado(idEmpleado, apellido, oficio, director, fechaAlta, salario, comision, departamento) {
    this.idEmpleado = idEmpleado;
    this.apellido = apellido;
    this.oficio = oficio;
    this.director = director;
    this.fechaAlta = fechaAlta;
    this.salario = salario;
    this.comision = comision;
    this.departamento = departamento;
}

var arrayEmpleados = [];

/**
 * Función que devuelve el empleado con el ID que se le pasa como argumento
 *
 * @param idEmpleado
 * @returns {*}
 */
function getEmpleado(idEmpleado) {
    for (var i = 0; i < arrayEmpleados.length; i++) {

        var current = arrayEmpleados[i];

        if (current.idEmpleado == idEmpleado)
            return current;

    }
}


/**
 * Función que devuelve la posicion del empleado en el Array de empleados
 *
 * @param idEmpleado
 * @returns {*}
 */
function getIndiceEmpleado(idEmpleado) {
    for (var i = 0; i < arrayEmpleados.length; i++) {

        var current = arrayEmpleados[i];

        if (current.idEmpleado == idEmpleado)
            return i;

    }
}


/**
 * Función que devuelve el ID de empleado más alto
 *
 * @returns {*}
 */
function getMaxID() {

    return arrayEmpleados[arrayEmpleados.length - 1].idEmpleado;
}