import { destino } from "./destino.js";

const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modal-container");
const cantCarrito = document.getElementById("cant-carrito");

let plantsToShow = destino
let carrito = [];

const loadCatalog = () => {
    const tablebody = document.querySelector("#tablebody");

    plantsToShow.forEach(destino => {
        const tr = document.createElement("tr");

        let tdImg = document.createElement("td");
        const imagen = document.createElement("img");
        imagen.src = destino.imgSrc;
        imagen.width = 100;
        tdImg.appendChild(imagen);
        tr.appendChild(tdImg);

        let tdOrigen = document.createElement("td");
        tdOrigen.textContent = destino.origen;
        tr.appendChild(tdOrigen);

        let tdDestino = document.createElement("td");
        tdDestino.textContent = destino.destino;
        tr.appendChild(tdDestino);

        let tdFechaSalida = document.createElement("td");
        tdFechaSalida.textContent = destino.fechaSalida;
        tr.appendChild(tdFechaSalida);

        let tdFechaLlegada = document.createElement("td");
        tdFechaLlegada.textContent = destino.fechaLlegada;
        tr.appendChild(tdFechaLlegada);

        let tdCategoria = document.createElement("td");
        tdCategoria.textContent = destino.categoria;
        tr.appendChild(tdCategoria);

        let tdPrecio = document.createElement("td");
        tdPrecio.textContent = destino.precio;
        tr.appendChild(tdPrecio);

        let tdBoton = document.createElement("td");
        const bttn = document.createElement("button");
        bttn.textContent = 'Agregar a carrito';
        tdBoton.textContent = "";
        tdBoton.appendChild(bttn);
        tdBoton.addEventListener('click', (producto) => {
            agregarACarrito(producto);
        })
        tr.appendChild(tdBoton);

        tablebody.appendChild(tr);
    });
}

var id = 0;
const agregarACarrito = function (e) {
    let btn = e.target;
    // Fila a la que pertenece el botón
    let tr = btn.closest('tr');

    let tds = tr.querySelectorAll('td');

    id++;
    var producto = {
        id: id,
        origen: tds[1].innerText,
        destino: tds[2].innerText,
        fechaSalida: tds[3].innerText,
        fechaLlegada: tds[4].innerText,
        categoria: tds[5].innerText,
        precio: tds[6].innerText
    };
    carrito.push(producto);
    carritoCounter();
}

/* Filtrar */
const filterInput = document.getElementById('filter');
const tabla = document.getElementById("table-catalog").tBodies[0];

const buscaTabla = function () {
    var texto = filterInput.value.toLowerCase();
    var r = 0;
    var row = tabla.rows[r];
    while (row = tabla.rows[r++]) {
        if (row.innerText.toLowerCase().indexOf(texto) !== -1)
            row.style.display = null;
        else
            row.style.display = 'none';
    }
}
filterInput.addEventListener('keyup', buscaTabla);

loadCatalog()

/* CARRITO */
const pintarCarrito = () => {
    modalContainer.innerHTML = "";
    modalContainer.style.display = "flex";
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header"
    modalHeader.innerHTML = `
    <h1 class="model-header-title">Carrito</h1>`;


    modalContainer.append(modalHeader);

    const modalButton = document.createElement("h1");
    modalButton.innerText = "x";
    modalButton.className = "modal-header-button";

    modalButton.addEventListener("click", () => {
        modalContainer.style.display = "none";
    });

    modalHeader.append(modalButton);

    carrito.forEach((producto) => {
        console.log(carrito);
        let carritoContent = document.createElement("div");
        carritoContent.className = "modal-content";
        carritoContent.innerHTML = `<p>Origen: ${producto.origen}</p>
        <p>Destino: ${producto.destino}</p> 
        <p>Fecha Salida: ${producto.fechaSalida}</p>
        <p>Fecha Llegada: ${producto.fechaLlegada}</p>
        <p>Categoria: ${producto.categoria}</p>
        <p>Precio: ${producto.precio}</p>`;

        modalContainer.append(carritoContent);

        let eliminar = document.createElement("span");
        eliminar.innerText = "❌";
        eliminar.classList = "delete-product";
        carritoContent.append(eliminar);

        eliminar.addEventListener("click", eliminarProducto);
    });
    const total = carrito.reduce((acc, el) => acc + parseInt(el.precio),0);
        const totalCompra = document.createElement("div");
        totalCompra.className = "total-compra";
        totalCompra.innerHTML = `Total: ${total}`;
        modalContainer.append(totalCompra);

    const boton = document.createElement("button");
    boton.innerText = "Confirmar compra";
    boton.className = "boton-compra";
    modalContainer.append(boton);

};

verCarrito.addEventListener("click", pintarCarrito);


const eliminarProducto = () => {
    const foundId = carrito.find((element) => element.id);

    carrito = carrito.filter((carritoId) => {
        return carritoId !== foundId;
    });
    pintarCarrito();
    carritoCounter();
};

const carritoCounter = () => {
    cantCarrito.style.display = "block";
    cantCarrito.innerText = carrito.length;
};
