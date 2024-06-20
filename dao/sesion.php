<?php
header('Content-Type: application/json');

$servername = "localhost:3309"; // Cambia a la dirección de tu servidor MySQL
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

$usuarioIngresado = $data['nick'];
$passwordIngreso = $data['password'];
$ipPublica = $data['ip'];

// Verificar las credenciales del usuario
$sql = "SELECT * FROM usuario WHERE nick = ? AND password = ?";
$stmt = $conn->prepare($sql);

if ($stmt) {
    $stmt->bind_param("ss", $usuarioIngresado, $passwordIngreso);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // Inicio de sesión exitoso, registrar la sesión
        $sqlSesion = "INSERT INTO sesiones (idUsuario, ip) VALUES (?, ?)";
        $stmtSesion = $conn->prepare($sqlSesion);
        
        if ($stmtSesion) {
            $stmtSesion->bind_param("ss", $usuarioIngresado, $ipPublica);
            if ($stmtSesion->execute()) {
                http_response_code(200);
                echo json_encode(array("message" => "Inicio de sesión exitoso"));
            } else {
                http_response_code(500);
                echo json_encode(array("message" => "Error al registrar la sesión"));
            }
            $stmtSesion->close();
        } else {
            http_response_code(500);
            echo json_encode(array("message" => "Error en la preparación de la sentencia SQL para registrar la sesión"));
        }
    } else {
        // Credenciales incorrectas
        http_response_code(401);
        echo json_encode(array("message" => "Credenciales incorrectas"));
    }

    $stmt->close();
} else {
    // Error en la preparación de la sentencia SQL
    http_response_code(500);
    echo json_encode(array("message" => "Error en la preparación de la sentencia SQL"));
}

$conn->close();
?>
