
<?php
header("access-control-allow-origin: *");
header("Content-Type: application/xml; charset=utf-8");
$opt = trim(utf8_decode($_POST["opt"]));
$EMP_NO = trim(utf8_decode($_POST["EMP_NO"]));
$APELLIDO = trim(addslashes(utf8_decode($_POST["APELLIDO"])));
$OFICIO = trim(addslashes(utf8_decode($_POST["OFICIO"])));
$DIRECTOR = trim(utf8_decode($_POST["DIRECTOR"]));
if ($DIRECTOR == "")
    $DIRECTOR = "NULL";
$FECHA_ALTA = trim(utf8_decode($_POST["FECHA_ALTA"]));
if ($FECHA_ALTA == "")
    $FECHA_ALTA = "NULL";
$SALARIO = trim(utf8_decode($_POST["SALARIO"]));
if ($SALARIO == "")
    $SALARIO = "NULL";
$COMISION = trim(utf8_decode($_POST["COMISION"]));
if ($COMISION == "")
    $COMISION = "NULL";
$DEP_NO = utf8_decode($_POST["DEP_NO"]);
$con = mysql_connect("localhost", "root", "alualualu") or die(mysql_error());
mysql_select_db("CURSO") or die(mysql_error());

function dameDepartamentos()
{
    echo '<DEPARTAMENTOS>';
    $query = "SELECT DEP_NO, DNOMBRE  FROM DEPARTAMENTOS ORDER BY DNOMBRE";
    $result = mysql_query($query);
    $numReg = mysql_num_rows($result);
    for ($i = 0; $i < $numReg; $i++) {
        $row = mysql_fetch_array($result);
        echo '<DEPARTAMENTO>';
        echo '<DEP_NO>';
        echo utf8_encode($row["DEP_NO"]);
        echo '</DEP_NO>';
        echo '<DNOMBRE>';
        echo utf8_encode($row["DNOMBRE"]);
        echo '</DNOMBRE>';
        echo '</DEPARTAMENTO>';
    }
    echo '</DEPARTAMENTOS>';
}

function dameDirectores()
{
    echo '<DIRECTORES>';
    $query = "SELECT EMP_NO, APELLIDO  FROM EMPLEADOS ORDER BY APELLIDO";
    $result = mysql_query($query);
    $numReg = mysql_num_rows($result);
    for ($i = 0; $i < $numReg; $i++) {
        $row = mysql_fetch_array($result);
        echo '<DIRECTOR>';
        echo '<EMP_NO>';
        echo utf8_encode($row["EMP_NO"]);
        echo '</EMP_NO>';
        echo '<APELLIDO>';
        echo utf8_encode($row["APELLIDO"]);
        echo '</APELLIDO>';
        echo '</DIRECTOR>';
    }
    echo '</DIRECTORES>';
}

function dameEmpleados()
{
    echo '<EMPLEADOS>';
    $query = "SELECT EMP_NO, APELLIDO  FROM EMPLEADOS ORDER BY APELLIDO";
    $result = mysql_query($query);
    $numReg = mysql_num_rows($result);
    for ($i = 0; $i < $numReg; $i++) {
        $row = mysql_fetch_array($result);
        echo '<EMPLEADO>';
        echo '<EMP_NO>';
        echo utf8_encode($row["EMP_NO"]);
        echo '</EMP_NO>';
        echo '<APELLIDO>';
        echo utf8_encode($row["APELLIDO"]);
        echo '</APELLIDO>';
        echo '</EMPLEADO>';
    }
    echo '</EMPLEADOS>';
}


function dameDatosEmpleado($empleado)
{
    $query = "SELECT EMP_NO, APELLIDO, OFICIO, DIRECTOR, FECHA_ALTA, SALARIO, COMISION, DEP_NO  FROM EMPLEADOS WHERE EMP_NO = '" . $empleado . "'";
    $result = mysql_query($query);
    $numReg = mysql_num_rows($result);
    for ($i = 0; $i < $numReg; $i++) {
        $row = mysql_fetch_array($result);
        echo '<EMPLEADO>';
        echo '<EMP_NO>';
        echo utf8_encode($row["EMP_NO"]);
        echo '</EMP_NO>';
        echo '<APELLIDO>';
        echo utf8_encode($row["APELLIDO"]);
        echo '</APELLIDO>';
        echo '<OFICIO>';
        echo utf8_encode($row["OFICIO"]);
        echo '</OFICIO>';
        echo '<DIRECTOR>';
        echo utf8_encode($row["DIRECTOR"]);
        echo '</DIRECTOR>';
        echo '<FECHA_ALTA>';
        echo utf8_encode($row["FECHA_ALTA"]);
        echo '</FECHA_ALTA>';
        echo '<SALARIO>';
        echo utf8_encode($row["SALARIO"]);
        echo '</SALARIO>';
        echo '<COMISION>';
        echo utf8_encode($row["COMISION"]);
        echo '</COMISION>';
        echo '<DEP_NO>';
        echo utf8_encode($row["DEP_NO"]);
        echo '</DEP_NO>';
        echo '</EMPLEADO>';
    }
}


function dameDatosEmpleados()
{
    $query = "SELECT EMP_NO, APELLIDO, OFICIO, DIRECTOR, FECHA_ALTA, SALARIO, COMISION, DEP_NO FROM EMPLEADOS";
    $result = mysql_query($query);
    $numReg = mysql_num_rows($result);
    for ($i = 0; $i < $numReg; $i++) {
        $row = mysql_fetch_array($result);
        echo '<EMPLEADO>';
        echo '<EMP_NO>';
        echo utf8_encode($row["EMP_NO"]);
        echo '</EMP_NO>';
        echo '<APELLIDO>';
        echo utf8_encode($row["APELLIDO"]);
        echo '</APELLIDO>';
        echo '<OFICIO>';
        echo utf8_encode($row["OFICIO"]);
        echo '</OFICIO>';
        echo '<DIRECTOR>';
        echo utf8_encode($row["DIRECTOR"]);
        echo '</DIRECTOR>';
        echo '<FECHA_ALTA>';
        echo utf8_encode($row["FECHA_ALTA"]);
        echo '</FECHA_ALTA>';
        echo '<SALARIO>';
        echo utf8_encode($row["SALARIO"]);
        echo '</SALARIO>';
        echo '<COMISION>';
        echo utf8_encode($row["COMISION"]);
        echo '</COMISION>';
        echo '<DEP_NO>';
        echo utf8_encode($row["DEP_NO"]);
        echo '</DEP_NO>';
        echo '</EMPLEADO>';
    }
}


function insertEmpleado($EMP_NO, $APELLIDO, $OFICIO, $DIRECTOR, $FECHA_ALTA, $SALARIO, $COMISION, $DEP_NO)
{
    $query = "INSERT INTO EMPLEADOS (EMP_NO, APELLIDO, OFICIO, DIRECTOR, FECHA_ALTA, SALARIO, COMISION, DEP_NO) VALUES " .
        "(" . $EMP_NO . ", '" .
        $APELLIDO . "', '" .
        $OFICIO . "', " .
        $DIRECTOR . ", '" .
        $FECHA_ALTA . "', " .
        $SALARIO . ", " .
        $COMISION . ", " .
        $DEP_NO . ");";
    $boolResult = mysql_query($query);
    if (!$boolResult)
        echo "<ERROR>" . utf8_encode($query) . "</ERROR>";
}


function updateEmpleado($EMP_NO, $APELLIDO, $OFICIO, $DIRECTOR, $FECHA_ALTA, $SALARIO, $COMISION, $DEP_NO)
{
    $query = "UPDATE EMPLEADOS SET " .
        "APELLIDO = '" . $APELLIDO . "', " .
        "OFICIO = '" . $OFICIO . "', " .
        "DIRECTOR = " . $DIRECTOR . ", " .
        "FECHA_ALTA = '" . $FECHA_ALTA . "', " .
        "SALARIO = " . $SALARIO . ", " .
        "COMISION = " . $COMISION . ", " .
        "DEP_NO = " . $DEP_NO . " " .
        "WHERE EMP_NO = " . $EMP_NO . " ";
    $boolResult = mysql_query($query);
    if (!$boolResult)
        echo "<ERROR>" . utf8_encode($query) . "</ERROR>";
}

function deleteEmpleado($EMP_NO)
{
    $query = "DELETE FROM EMPLEADOS " .
        "WHERE EMP_NO = " . $EMP_NO . " ";
    $boolResult = mysql_query($query);
    if (!$boolResult)
        echo "<ERROR>" . utf8_encode($query) . "</ERROR>";
}

echo '<?xml version="1.0" encoding="UTF-8"?>';
echo '<DATOS>';
switch ($opt) {
    case "dep":
        dameDepartamentos();
        break;
    case "dir":
        dameDirectores();
        break;
    case "depdir":
        dameDepartamentos();
        dameDirectores();
        break;
    case "lisemp":
        dameEmpleados();
        break;
    case "datemps":
        dameDatosEmpleados();
        break;
    case "datemp":
        dameDatosEmpleado($EMP_NO);
        break;
    case "ins":
        insertEmpleado($EMP_NO, $APELLIDO, $OFICIO, $DIRECTOR, $FECHA_ALTA, $SALARIO, $COMISION, $DEP_NO);
        break;
    case "upd":
        updateEmpleado($EMP_NO, $APELLIDO, $OFICIO, $DIRECTOR, $FECHA_ALTA, $SALARIO, $COMISION, $DEP_NO);
        break;
    case "del":
        deleteEmpleado($EMP_NO);
        break;
    default:
        echo "<ERROR>Sin_opcion_en_el_switch.</ERROR>";
}
echo '</DATOS>';
?>



