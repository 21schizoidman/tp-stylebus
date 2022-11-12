import { destino } from "./destino.js";

let plantsToShow = destino

const laodCatalog = () => {
    let tableData = document.getElementById('table-catalog')
    let table = `<table data-toggle="table" id="table-catalog">
    <thead>
    <tr>
    <th>Imagen</th>
    <th>Origen</th>
    <th>Destino</th>
    <th>Fecha salida</th>
    <th>Fecha llegada</th>
    <th>Categoria</th>
    </tr>
    </thead>
    <tbody>
    `

    plantsToShow.forEach((plant, i) => {
        table = table + `<tr>
        <td><img src="${plant.imgSrc}" /></td>
        <td>${plant.origen}</td>
        <td>${plant.destino}</td>
        <td>${plant.fechaSalida}</td>
        <td>${plant.fechaLlegada}</td>
        <td>${plant.categoria}</td>
    </tr>`
    })

    table = table +
        `</tbody>
    </table>`
        ;

    tableData.innerHTML = table
}
laodCatalog()

const filterCatalog = (word) => {
    if (word.length === 0) {
        plantsToShow = destino;
    } else {
        plantsToShow = destino.filter(plant => {
            return (
                plant.origen.toLowerCase().includes(word.toLowerCase()) ||
                plant.destino.toLowerCase().includes(word.toLowerCase()) ||
                plant.fechaSalida.toLowerCase().includes(word.toLowerCase()) ||
                plant.fechaLlegada.toLowerCase().includes(word.toLowerCase()) ||
                plant.categoria.toLowerCase().includes(word.toLowerCase()) 
            )
        })
    }
    laodCatalog()
}
const filterInput = document.getElementById('filter')
let toFilter = ""
filterInput.addEventListener('keyup', (e) => {
    if (e.key == "Backspace") {
        if (toFilter !== "") toFilter = toFilter.slice(0, toFilter.length - 1)
    } else {
        toFilter = toFilter + e.key.toLocaleLowerCase()
    }
    filterCatalog(toFilter)
})
