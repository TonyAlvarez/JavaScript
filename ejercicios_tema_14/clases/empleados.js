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

Empleado.prototype.setApellido = function(apellido) {
    this.apellido = apellido;
};

Empleado.prototype.setOficio = function(oficio) {
    this.oficio = oficio;
};

Empleado.prototype.setDirector = function(director) {
    this.director = director;
};

Empleado.prototype.setFechaAlta = function(fechaAlta) {
    this.fechaAlta = fechaAlta;
};

Empleado.prototype.setSalario = function(salario) {
    this.salario = salario;
};

Empleado.prototype.setComision = function(comision) {
    this.comision = comision;
};

Empleado.prototype.setDepartamento = function(departamento) {
    this.departamento = departamento;
};


/*
 * ARRAY Y METODOS AUXILIARES PARA MANEJAR LOS EMPELADOS
 */

var arrayEmpleados = [];

/**
 * Función que devuelve el empleado con el ID que se le pasa como argumento
 *
 * @param idEmpleado
 * @returns {*}
 */
function getEmpleado(idEmpleado) {
    for (var i = 0; i < arrayEmpleados.length; i++) {

        if (arrayEmpleados[i].idEmpleado == idEmpleado)
            return arrayEmpleados[i];

    }
}

/**
 * Función que elimina el empleado del array usando el ID para encontrarlo
 *
 * @param idEmpleado
 * @returns {*}
 */
function deleteEmpleado(idEmpleado) {

    for (var i = 0; i < arrayEmpleados.length; i++) {
        if (arrayEmpleados[i].idEmpleado == idEmpleado) {
            arrayEmpleados.splice(i, 1);
            return;
        }
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

    //Si se han eliminado todos los empleados, se empieza por el ID 1
    if (arrayEmpleados.length == 0)
        return 0;
    else
        return arrayEmpleados[arrayEmpleados.length - 1].idEmpleado;
}