document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('contact_form').addEventListener('submit', function(event) {
        event.preventDefault(); // Evita el envío del formulario por defecto

        // Obtener los valores de los campos del formulario
        var nombres = document.getElementsByName('first_name')[0].value;
        var apellidos = document.getElementsByName('last_name')[0].value;
        var correo = document.getElementsByName('email')[0].value;
        var telefono = document.getElementsByName('phone')[0].value;
        var direccion = document.getElementsByName('address')[0].value;
        var ciudad = document.getElementsByName('city')[0].value;
        var departamento = document.getElementsByName('state')[0].value;
        var zip = document.getElementsByName('zip')[0].value;
        var tipo = document.querySelector('input[name="hosting"]:checked');
        var descripcion = document.getElementsByName('comment')[0].value;

        // Verificar si todos los campos están llenos
        if (!nombres || !apellidos || !correo || !telefono || !direccion || !ciudad || !departamento || !zip || !tipo || !descripcion) {
            Swal.fire({
                icon: 'error',
                title: 'Campos incompletos',
                text: 'Por favor, completa todos los campos.',
                confirmButtonColor: '#C7A17A'
            });
            return;
        }

        // Obtener el valor del tipo
        tipo = tipo.value;

        // Crear un objeto con los datos del formulario
        var data = {
            nombres: nombres,
            apellidos: apellidos,
            correo: correo,
            telefono: telefono,
            direccion: direccion,
            ciudad: ciudad,
            departamento: departamento,
            zip: zip,
            tipo: tipo,
            descripcion: descripcion
        };

        // Enviar los datos al servidor mediante fetch
        fetch('dao/contactanos.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                Swal.fire({
                    icon: 'success',
                    title: '¡Registro exitoso!',
                    text: 'Gracias por contactarnos.',
                    confirmButtonColor: '#C7A17A'
                }).then(() => {
                    document.getElementById('contact_form').reset();
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error en el registro',
                    text: 'Hubo un problema al registrar tu contacto. Inténtalo de nuevo.',
                    confirmButtonColor: '#C7A17A'
                });
            }
        })
        .catch(error => {
            console.error('Error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error en el registro',
                text: 'Hubo un problema al registrar tu contacto. Inténtalo de nuevo.',
                confirmButtonColor: '#C7A17A'
            });
        });
    });
});
