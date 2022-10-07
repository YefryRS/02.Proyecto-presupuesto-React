
const generarId = () => {
    const ramdom = Math.random().toString().substr(2)
    const fecha = Date.now().toString(36)
    return ramdom + fecha
}

const formatearFecha = fecha => {
    const fechaNueva = new Date(fecha);
    const opciones = {
        year: "numeric",
        month: "long",
        day: "2-digit"
    }

    return fechaNueva.toLocaleDateString("es-ES",opciones)
}

const formatearCantidad = (cantidad) => {

    return cantidad.toLocaleString("es-CO", {
        style: "currency",
        currency:"COP"
})
}

export {generarId, formatearFecha, formatearCantidad}