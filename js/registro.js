function validarCamposObligatorios() {
    var usuario = document.getElementById('idUsuario').value;
    var correo = document.getElementById('idEmail').value;
    var password = document.getElementById('idPassword').value;
    var passwordConfir = document.getElementById('idPasswordConfirmar').value;

    if (usuario === '' || correo === '' || password === '' || passwordConfir === '') {
        Swal.fire({
            icon: 'error',
            title: 'Campos incompletos',
            text: 'Por favor, completa todos los campos.',
            confirmButtonColor: '#C7A17A'
        });
        return false;
    }

    if (password !== passwordConfir) {
        Swal.fire({
            icon: 'error',
            title: 'Contraseñas no coinciden',
            text: 'Las contraseñas no coinciden.',
            confirmButtonColor: '#C7A17A'
        });
        return false;
    }

    return true;
}

function registrarUsuario() {
    if (!validarCamposObligatorios()) {
        return;
    }

    var usuario = document.getElementById('idUsuario').value;
    var correo = document.getElementById('idEmail').value;
    var password = document.getElementById('idPassword').value;

    var data = {
        nick: usuario,
        email: correo,
        password: password
    };

    Swal.fire({
        title: 'Confirmar Registro',
        text: "Nuevo Registro",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#C7A17A',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, envíalo!'
    }).then((result) => {
        if (result.isConfirmed) {
            fetch('dao/registrarUsuario.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(response => {
                if (response.ok) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Registro exitoso',
                        text: '¡Te has registrado correctamente!',
                        confirmButtonColor: '#C7A17A'
                    }).then((result) => {
                        window.location.href = 'index.html';
                    });
                } else if (response.status === 409) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Usuario ya existe',
                        text: 'El nombre de usuario ya está en uso. Por favor, elige otro.',
                        confirmButtonColor: '#C7A17A'
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error en el registro',
                        text: 'Hubo un problema al registrar tu cuenta. Inténtalo de nuevo.'
                    });
                }

            }).catch(error => {
                console.error('Error:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error en el registro',
                    text: 'Hubo un problema al registrar tu cuenta. Inténtalo de nuevo.',
                    confirmButtonColor: '#C7A17A'
                });
            });
        }
    });
}
