import { destino } from "./destino.js";

const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modal-container");
const cantCarrito = document.getElementById("cant-carrito");

let destinosToShow = destino
let carrito = [];
var cantidad = new Map()
var cantTotal = 0

const loadCatalog = () => {
    const tablebody = document.querySelector("#tablebody");

    destinosToShow.forEach(destino => {
        const tr = document.createElement("tr");

        let tdId = document.createElement("td");
        tdId.textContent = destino.id;
        tdId.setAttribute("style", "display: none;")
        tr.appendChild(tdId);

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

        let tdAsientos = document.createElement("td");
        tdAsientos.textContent = destino.asientos;
        tr.appendChild(tdAsientos);

        let tdPrecio = document.createElement("td");
        tdPrecio.textContent = destino.precio;
        tr.appendChild(tdPrecio);

        let tdBoton = document.createElement("td");
        const bttn = document.createElement("button");
        bttn.className = "btn btn-success";
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

const agregarACarrito = function (e) {
    cantTotal++;
    let btn = e.target;
    // Fila a la que pertenece el botón
    let tr = btn.closest('tr');

    let tds = tr.querySelectorAll('td');
   
    var producto = {
        id: tds[0].innerText,
        origen: tds[2].innerText,
        destino: tds[3].innerText,
        fechaSalida: tds[4].innerText,
        fechaLlegada: tds[5].innerText,
        categoria: tds[6].innerText,
        precio: tds[8].innerText
    };
    
    let cant = cantidad.get(producto.id)
    if(cant){
        cantidad.set(producto.id,cant+1)
    }else{
        cantidad.set(producto.id,1)
    }
    if(!carrito.find(p => producto.id == p.id)){
        carrito.push(producto);
    }  
    carritoCounter();
}

/* Filtrar */
const tabla = document.getElementById("table-catalog").tBodies[0];

const buscaTabla = function () {
    $('#ida').removeClass()
    let filas = tabla.querySelectorAll('tr');
    let origen = document.getElementById("origen").value
    let destino = document.getElementById("destino").value
    let ida = document.getElementById("ida").value
    if(ida.length==0){
        $('#ida').addClass('error')
        return;
    }
        
    let cantPas = document.getElementById("cantpas").value
    let categoria = document.getElementById("categoria").value


    var dateParts = ida.split("-");
    ida = dateParts[2]+"/"+dateParts[1]+"/"+dateParts[0]
    
    let count = 0;
    for(let r of filas){
        let datos = r.querySelectorAll('td')
        let fechaIda = datos[4].innerText
        
        if (datos[2].innerText==origen && datos[3].innerText==destino && fechaIda==ida && Number(cantPas)<=Number(datos[7].innerText) && datos[6].innerText==categoria)
            tabla.rows[count].style.display = null;
        else
            tabla.rows[count].style.display = 'none';
        count++;
    }
}
document.getElementById("filtrar").addEventListener('click', buscaTabla);

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
        let cant = cantidad.get(producto.id)
        let carritoContent = document.createElement("div");
        carritoContent.className = "modal-content";
        carritoContent.innerHTML = 
        `<p>Cantidad: ${cant}</p>
        <p>Origen: ${producto.origen}</p>
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
    var total = 0;
    for(let e of carrito){
        total += cantidad.get(e.id)*Number(e.precio.substring(1)); //cantidad por precio
    }
        const totalCompra = document.createElement("div");
        totalCompra.className = "total-compra";
        totalCompra.innerHTML = `Total: ${"$"+total}`;
        modalContainer.append(totalCompra);

    const boton = document.createElement("button");
    boton.innerText = "Confirmar compra";
    boton.className = "boton-compra";
    modalContainer.append(boton);

};

verCarrito.addEventListener("click", pintarCarrito);


const eliminarProducto = () => {
    const foundId = carrito.find((element) => element.id);
    cantTotal = cantTotal-cantidad.get(foundId.id)
    cantidad.delete(foundId.id)
    carrito = carrito.filter((carritoId) => {
        return carritoId !== foundId;
    });
    pintarCarrito();
    carritoCounter();
};

const carritoCounter = () => {
    cantCarrito.style.display = "block";
    cantCarrito.innerText = cantTotal;
};
