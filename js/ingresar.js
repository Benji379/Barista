function iniciarSesion() {
    var usuario = document.getElementById('idUsuarioIngresado').value;
    var password = document.getElementById('passIngresado').value;

    if (usuario === '' || password === '') {
        Swal.fire({
            icon: 'error',
            title: 'Campos incompletos',
            text: 'Por favor, completa todos los campos.',
            confirmButtonColor: '#C7A17A'
        });
        return;
    }

    fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => {
        var ipPublica = data.ip;

        var data = {
            nick: usuario,
            password: password,
            ip: ipPublica
        };

        fetch('dao/sesion.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Inicio de sesión exitoso',
                    text: '¡Bienvenido de nuevo!',
                    confirmButtonColor: '#C7A17A'
                }).then(() => {
                    window.location.href = 'index.html'; // Redirige a la página principal
                });
            } else if (response.status === 401) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error en el inicio de sesión',
                    text: 'Usuario o contraseña incorrectos.',
                    confirmButtonColor: '#C7A17A'
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error en el inicio de sesión',
                    text: 'Hubo un problema al iniciar sesión. Inténtalo de nuevo.',
                    confirmButtonColor: '#C7A17A'
                });
            }
        })
        .catch(error => {
            console.error('Error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error en el inicio de sesión',
                text: 'Hubo un problema al iniciar sesión. Inténtalo de nuevo.',
                confirmButtonColor: '#C7A17A'
            });
        });
    })
    .catch(error => {
        console.error('Error al obtener la IP pública:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error al obtener la IP pública',
            text: 'Hubo un problema al obtener tu IP pública. Inténtalo de nuevo.',
            confirmButtonColor: '#C7A17A'
        });
    });
}
