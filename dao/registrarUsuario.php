<?php
header('Content-Type: application/json');

$servername = "localhost:3306"; // Cambia a la dirección de tu servidor MySQL
$username = "root";
$password = ""; // Cambia a la contraseña de tu base de datos
$dbname = "barista";

// Crea la conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verifica la conexión
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

// Recibir los datos del formulario
$data = json_decode(file_get_contents('php://input'), true);

$nombre = $data['nick'];
$correo = $data['email'];
$passwordd = $data['password'];

// Verificar si el usuario ya existe
$sql_check = "SELECT * FROM usuario WHERE nick = ?";
$stmt_check = $conn->prepare($sql_check);

if ($stmt_check) {
    $stmt_check->bind_param("s", $nombre);
    $stmt_check->execute();
    $result_check = $stmt_check->get_result();

    if ($result_check->num_rows > 0) {
        // El usuario ya existe
        http_response_code(409); // Código de estado 409 Conflict
        echo json_encode(array("message" => "El usuario ya existe"));
        $stmt_check->close();
        $conn->close();
        exit();
    }
    $stmt_check->close();
}

// Realizar la inserción en la base de datos
$sql = "INSERT INTO usuario (nick, email, password) VALUES (?, ?, ?)";

if ($stmt = $conn->prepare($sql)) {
    $stmt->bind_param("sss", $nombre, $correo, $passwordd);

    if ($stmt->execute()) {
        // Inserción exitosa
        http_response_code(200);
        echo json_encode(array("message" => "Registro exitoso"));
    } else {
        // Error en la inserción
        http_response_code(500);
        echo json_encode(array("message" => "Error en el registro"));
    }

    $stmt->close();
} else {
    // Error en la preparación de la sentencia SQL
    http_response_code(500);
    echo json_encode(array("message" => "Error en la preparación de la sentencia SQL"));
}

$conn->close();
?>
