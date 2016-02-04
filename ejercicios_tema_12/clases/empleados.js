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
 * Función que devuelve el apellido de un empleado a partir del ID que se le pasa como argumento
 *
 * @param idEmpleado
 * @returns {*}
 */
function getNombreEmpleado(idEmpleado) {
    for (var i = 0; i < arrayEmpleados.length; i++) {

        var current = arrayEmpleados[i];

        if (current.idEmpleado == idEmpleado)
            return current.apellido;

    }
}

/**
 * Añade un empleado al array de empleados
 *
 * @param empleado
 */
function addEmpleado(empleado) {
    arrayEmpleados.push(empleado);
}
