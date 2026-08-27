console.log("Sistema de gestión de pedidos iniciado");

const pedidos = [
    {
        id: 1,
        cliente: "Juanito Pérez",
        producto: "Cheesecake de frambuesa",
        cantidad: 1,
        total: 35000,
        fechaEntrega: "2026-08-30",
        estado: "Pendiente"
    },
    {
        id: 2,
        cliente: "Mary González",
        producto: "Cupcakes",
        cantidad: 24,
        total: 28000,
        fechaEntrega: "2026-08-31",
        estado: "En producción"
    }
];

const tablaPedidos = document.querySelector("#tablaPedidos");

function mostrarPedidos() {

    tablaPedidos.innerHTML = "";

    pedidos.forEach((pedido) => {

        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${pedido.id}</td>
            <td>${pedido.cliente}</td>
            <td>${pedido.producto}</td>
            <td>${pedido.cantidad}</td>
            <td>${pedido.fechaEntrega}</td>
            <td>$${pedido.total.toLocaleString("es-CL")}</td>
            <td>
                <span class="badge bg-secondary">
                    ${pedido.estado}
                </span>
            </td>
        `;

        tablaPedidos.appendChild(fila);

    });

    actualizarIndicadores();

}

mostrarPedidos();


const formulario = document.querySelector("#formPedido");
const mensaje = document.querySelector("#mensaje");

formulario.addEventListener("submit", (event) => {

    event.preventDefault();

    const cliente = document.querySelector("#cliente").value.trim();
    const producto = document.querySelector("#producto").value.trim();
    const cantidad = Number(document.querySelector("#cantidad").value);
    const total = Number(document.querySelector("#total").value);
    const fechaEntrega = document.querySelector("#fechaEntrega").value;

    if (
        cliente === "" ||
        producto === "" ||
        cantidad <= 0 ||
        total <= 0 ||
        fechaEntrega === ""
    ) {

        mensaje.innerHTML = `
            <div class="alert alert-danger">
                Complete correctamente todos los campos.
            </div>
        `;

        return;
    }

    const nuevoPedido = {
        id: pedidos.length + 1,
        cliente: cliente,
        producto: producto,
        cantidad: cantidad,
        total: total,
        fechaEntrega: fechaEntrega,
        estado: "Pendiente"
    };

    pedidos.push(nuevoPedido);

    mostrarPedidos();

    mensaje.innerHTML = `
        <div class="alert alerta-personalizada">
            Pedido registrado correctamente.
        </div>
    `;

    formulario.reset();

});

function actualizarIndicadores() {

    document.querySelector("#totalPedidos").textContent =
        pedidos.length;

    document.querySelector("#pedidosProduccion").textContent =
        pedidos.filter(
            pedido => pedido.estado === "En producción"
        ).length;

    document.querySelector("#pedidosListos").textContent =
        pedidos.filter(
            pedido => pedido.estado === "Listo"
        ).length;

    let ventas = 0;

    pedidos.forEach((pedido) => {
        ventas = ventas + pedido.total;
    });

    document.querySelector("#totalVentas").textContent =
        `$${ventas.toLocaleString("es-CL")}`;

}