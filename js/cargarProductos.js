document.addEventListener('DOMContentLoaded', function () {
    // Función para cargar los productos al cargar la página
    cargarProductos();

    // Función para cargar los productos desde el servidor
    function cargarProductos() {
        fetch('dao/obtenerProductos.php')
            .then(response => response.json())
            .then(data => {
                // Llamar a la función para mostrar los productos en la página
                mostrarProductos(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    // Función para mostrar los productos en la página
    function mostrarProductos(productos) {
        var container = document.querySelector('.container-products');

        // Limpiar el contenido existente del contenedor
        container.innerHTML = '';

        // Recorrer los productos y generar el HTML para cada uno
        productos.forEach(function (producto) {
            var card = document.createElement('div');
            card.classList.add('card-product');

            var imgContainer = document.createElement('div');
            imgContainer.classList.add('container-img');

            var img = document.createElement('img');
            img.src = 'data:image/png;base64,' + producto.foto; // Aquí asumiendo que la foto está codificada en base64
            img.alt = producto.nombre;

            var content = document.createElement('div');
            content.classList.add('content-card-product');

            var title = document.createElement('h3');
            title.textContent = producto.nombre;

            var price = document.createElement('p');
            price.classList.add('price');
            price.textContent = 'S/' + producto.precio;

            // Agregar elementos al DOM
            imgContainer.appendChild(img);
            content.appendChild(title);
            content.appendChild(price);
            card.appendChild(imgContainer);
            card.appendChild(content);
            container.appendChild(card);
        });
    }
});
