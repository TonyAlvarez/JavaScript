/**
 * Created by Tony on 3/2/16.
 */
function Departamento(idDepartamento, nombreDep) {
    this.idDepartamento = idDepartamento;
    this.nombreDep = nombreDep;
}

var arrayDepartamentos = [];

/**
 * Función que devuelve el nombre de un departamente a partir del ID que se le pasa como argumento
 *
 * @param idDepartamento
 * @returns {*}
 */
function getNombreDepartamento(idDepartamento) {
    for (var i = 0; i < arrayDepartamentos.length; i++) {

        var current = arrayDepartamentos[i];

        if (current.idDepartamento == idDepartamento)
            return current.nombreDep;

    }
}

/**
 * Añade un empleado al array de empleados
 *
 * @param departamento
 */
function addDepartamento(departamento) {
    arrayDepartamentos.push(departamento);
}
