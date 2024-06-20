<?php
header('Content-Type: application/json');

$servername = "localhost:3306"; // Cambia a la dirección de tu servidor MySQL
$username = "root";
$password = ""; // Cambia a la contraseña de tu base de datos
$dbname = "barista";

// Crear la conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

// Recibir los datos del formulario
$data = json_decode(file_get_contents('php://input'), true);

$nombres = $data['nombres'];
$apellidos = $data['apellidos'];
$correo = $data['correo'];
$telefono = $data['telefono'];
$direccion = $data['direccion'];
$ciudad = $data['ciudad'];
$departamento = $data['departamento'];
$zip = $data['zip'];
$tipo = $data['tipo'];
$descripcion = $data['descripcion'];

// Realizar la inserción en la base de datos
$sql = "INSERT INTO contactanos (nombres, apellidos, correo, telefono, direccion, ciudad, departamento, zip, tipo, descripcion) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

if ($stmt = $conn->prepare($sql)) {
    $stmt->bind_param("ssssssssss", $nombres, $apellidos, $correo, $telefono, $direccion, $ciudad, $departamento, $zip, $tipo, $descripcion);

    if ($stmt->execute()) {
        // Inserción exitosa
        echo json_encode(array("success" => true));
    } else {
        // Error en la inserción
        echo json_encode(array("success" => false, "message" => "Error en la inserción"));
    }

    $stmt->close();
} else {
    // Error en la preparación de la sentencia SQL
    echo json_encode(array("success" => false, "message" => "Error en la preparación de la sentencia SQL"));
}

$conn->close();
?>
