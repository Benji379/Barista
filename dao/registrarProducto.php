<?php
// Verificar si se recibieron datos del formulario
if ($_SERVER["REQUEST_METHOD"] == "POST") {
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

    // Obtener los datos del formulario
    $nombre = $_POST['nombre'];
    $precio = $_POST['precio'];
    $descripcion = $_POST['descripcion'];
    $imagen = $_FILES['imagen']['tmp_name']; // Ruta temporal del archivo
    $imagen_contenido = addslashes(file_get_contents($imagen)); // Convertir imagen a formato binario

    // Preparar la consulta SQL para insertar datos en la tabla
    $sql = "INSERT INTO productos (nombre, precio, descripcion, foto) VALUES ('$nombre', '$precio', '$descripcion', '$imagen_contenido')";

    // Ejecutar la consulta
    if ($conn->query($sql) === TRUE) {
        echo json_encode(array("message" => "Producto registrado correctamente"));
    } else {
        echo json_encode(array("error" => "Error al registrar el producto: " . $conn->error));
    }

    // Cerrar la conexión
    $conn->close();
}
?>
