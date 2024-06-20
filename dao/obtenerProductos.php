<?php
// Conexión a la base de datos (cambia los valores según tu configuración)
$servername = "localhost:3306"; // Cambia a la dirección de tu servidor MySQL
    $username = "root";
    $password = ""; // Cambia a la contraseña de tu base de datos
    $dbname = "barista";


// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Consulta SQL para obtener todos los productos
$sql = "SELECT nombre, precio, foto FROM productos";
$result = $conn->query($sql);

$productos = array();

if ($result->num_rows > 0) {
    // Obtener los datos de cada producto y agregarlos al array
    while($row = $result->fetch_assoc()) {
        // Convertir la imagen de formato binario a base64
        $imagen_base64 = base64_encode($row['foto']);
        // Agregar la imagen en base64 al array de productos
        $row['foto'] = $imagen_base64;
        $productos[] = $row;
    }
}

// Devolver los productos en formato JSON
echo json_encode($productos);

// Cerrar la conexión
$conn->close();
?>