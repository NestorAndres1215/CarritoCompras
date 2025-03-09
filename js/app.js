//Variables
const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listaCursos = document.querySelector("#lista-cursos");
let articulosCarrito = [];
// Event listeners
listaCursos.addEventListener("click", agregarCurso);
carrito.addEventListener("click", eliminarCurso);
vaciarCarritoBtn.addEventListener("click", vaciarCarrito);
//Funciones
function agregarCurso(e) {
    e.preventDefault();
    if (e.target.classList.contains("agregar-carrito")) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}
function leerDatosCurso(curso) {
    //Crea un objeto con el contenido del curso
    const precioNuevo = curso.querySelector(".precio span").textContent;//Guardo el precio con $
    const infoCurso = {
        imagen: curso.querySelector("img").src,
        titulo: curso.querySelector("h4").textContent,
        precio: precioNuevo.slice(1),//le quito el carcater $
        id: curso.querySelector("a").getAttribute("data-id"),
        cantidad: 1,
    };
    //Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id)
    if (existe) {
        //Actualiza la cantidad
        articulosCarrito.map(curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                const precioNumero = Number.parseInt(infoCurso.precio);//Convertir string a int
                curso.precio = precioNumero * curso.cantidad;
                return curso;
            }
            else {
                return curso;
            }
        });
    }
    else {
        articulosCarrito.push(infoCurso); //Agrega elementos al array
    }

    carritoHTML(); //Llama funcion que guarda en el icono carrito
}
document.addEventListener("DOMContentLoaded", () => {
    const btnComprar = document.getElementById("btn-comprar");



    btnComprar.addEventListener("click", () => {
        if (articulosCarrito.length === 0) {
            alert("El carrito está vacío. Agrega productos antes de comprar.");
        } else {
            alert("¡Gracias por tu compra!");
            articulosCarrito.length = 0; // Vaciar el carrito
            carritoHTML(); // Volver a renderizar
        }
    });
});

function carritoHTML() {
    // Limpiar HTML
    limpiarHTML();

    const btnComprar = document.getElementById("btn-comprar");

    // Recorrer los artículos del carrito
    articulosCarrito.forEach((curso) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td style="text-align: center; vertical-align: middle;">
                <img src="${curso.imagen}" width="100">
            </td>
            <td style="text-align: center; vertical-align: middle;">
                ${curso.titulo}
            </td>
            <td style="text-align: center; vertical-align: middle;">
                $ ${curso.precio}
            </td>
            <td style="text-align: center; vertical-align: middle;">
                ${curso.cantidad}
            </td>
            <td style="text-align: center; vertical-align: middle;">
                <a href="#" class="borrar-curso" style="
                    background-color: #dc3545;
                    color: white;
                    padding: 8px 16px;
                    border-radius: 4px;
                    text-decoration: none;
                    font-size: 14px;
                    display: inline-block;
                    transition: background-color 0.3s ease, transform 0.2s ease;
                "data-id="${curso.id}"> ELIMINAR </a>
            </td>
        `;

        contenedorCarrito.appendChild(row);
    });

    // Mostrar u ocultar el botón de COMPRAR según haya productos en el carrito
    btnComprar.style.display = articulosCarrito.length > 0 ? "block" : "none";
}


//Elimina los cursos del tbody
function limpiarHTML() {
    contenedorCarrito.innerHTML = "";
}
//Elimina los cursos seleccionados del carrito
function eliminarCurso(e) {
    if (e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute("data-id");
        //elimina del arreglo de articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
        carritoHTML();//iterar sobre el carrito el HTML
    }
}
// Vacia elementos del carrito
function vaciarCarrito(e) {
    if (e.target.classList.contains('button1')) {
        articulosCarrito = [];
        carritoHTML();
    }
}