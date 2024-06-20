document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('form').addEventListener('submit', function(e) {
        e.preventDefault(); // Evita que el formulario se envíe de forma predeterminada
        
        // Obtener los valores de los campos del formulario
        var nombre = document.getElementById('name').value;
        var precio = document.getElementById('precio').value;
        var descripcion = document.getElementById('message').value;
        var imagen = document.getElementById('imagen').files[0]; // Obtener la primera imagen seleccionada

        // Verificar si se llenaron todos los campos
        if (nombre === '' || precio === '' || descripcion === '' || !imagen) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Complete todos los campos',
                confirmButtonColor: '#C7A17A'
            });
            return; // Detener el proceso si falta algún campo
        }

        // Crear un objeto FormData para enviar datos de formulario, incluyendo archivos
        var formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('precio', precio);
        formData.append('descripcion', descripcion);
        formData.append('imagen', imagen);

        // Enviar la solicitud AJAX usando fetch
        fetch('dao/registrarProducto.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            // Manejar la respuesta del servidor
            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: data.message,
                confirmButtonColor: '#C7A17A'
            });
            console.log(data); // Puedes mostrar un mensaje de éxito o hacer otra acción
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});
