document.getElementById('blog-link').addEventListener('click', function (event) {
    event.preventDefault(); // Evita el comportamiento predeterminado del enlace.
    document.querySelector('#blog').scrollIntoView({
        behavior: 'smooth'
    });
});
document.getElementById('categorias-link').addEventListener('click', function (event) {
    event.preventDefault(); // Evita el comportamiento predeterminado del enlace.
    document.querySelector('#categorias').scrollIntoView({
        behavior: 'smooth'
    });
});
document.getElementById('productos-link').addEventListener('click', function (event) {
    event.preventDefault(); // Evita el comportamiento predeterminado del enlace.
    document.querySelector('#productos').scrollIntoView({
        behavior: 'smooth'
    });
});