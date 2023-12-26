alert("Bienvenido a X-CHANGE");

document.addEventListener('DOMContentLoaded', function () {
  
  const formularioCliente = document.getElementById('clienteForm');

  // evento para el envío del formulario
  formularioCliente.addEventListener('submit', function (event) {
      event.preventDefault(); // Evitar que el formulario se envíe

      // Obtener los valores del formulario
      const nombre = document.getElementById('nombre').value;
      const apellido = document.getElementById('apellido').value;
      const dni = document.getElementById('dni').value;
      const email = document.getElementById('email').value;

      // Mostrar mensaje al usuario
      alert('Cliente registrado');

      // Obtener los datos del localStorage (si existen)
      let clientes = JSON.parse(localStorage.getItem('clientes')) || [];

      // Agregar el nuevo cliente a la lista
      const nuevoCliente = {
          nombre,
          apellido,
          dni,
          email
      };
      clientes.push(nuevoCliente);

      // Convierto a JSON y almaceno en localStorage
      localStorage.setItem('clientes', JSON.stringify(clientes));
  });
});

// declaro las monedas como objetos 

const dolar = { codigo: 2, iso: "usd", compra: 1000, venta: 1200 };
const libra = { codigo: 1, iso: "gbp", compra: 1350, venta: 1600 };
const real = { codigo: 3, iso: "brl", compra: 950, venta: 1050 };
const euro = { codigo: 4, iso: "eur", compra: 1250, venta: 1500 };

// Función para obtener el cliente almacenado en el localStorage
function obtenerClienteAlmacenado() {
    const clienteAlmacenado = localStorage.getItem('clientes');
    return clienteAlmacenado ? JSON.parse(clienteAlmacenado) : [];
  }

  // Función para mostrar el resultado con el nombre del cliente
  function mostrarResultadoConCliente(resultado, monedaRecepcion) {
    // Obtengo el cliente almacenado
    const clientes = obtenerClienteAlmacenado();

    // Obtengo el último cliente registrado
    const ultimoCliente = clientes.length > 0 ? clientes[clientes.length - 1] : null;

    // Creo la leyenda cliente/moneda
    const leyenda = ultimoCliente
      ? `Cliente: ${ultimoCliente.nombre} ${ultimoCliente.apellido} recibe: ${resultado.toFixed(0)} ${monedaRecepcion}`
      : `Cliente no registrado recibe: ${resultado.toFixed(0)} ${monedaRecepcion}`;

    // Muestro la leyenda en el div "resultado"
    document.getElementById('resultado').innerText = leyenda;
  }


function operar_compra(cotizacion, cantidad) {
  return cotizacion * cantidad;
}

function operar_venta(cantidad, cotizacion) {
  return cantidad / cotizacion;
}

 // Función para borrar los datos de la última operación
function borrarUltimaOperacion() {
    // Limpiar el contenido del div "resultado"
    document.getElementById('resultado').innerText = '';
}


// Agrego un botón para borrar la última operación
  const botonBorrar = document.createElement('button');
  botonBorrar.className = 'btn';
  botonBorrar.innerText = 'Borrar última operación';
  botonBorrar.addEventListener('click', borrarUltimaOperacion);
  

  const botonBorrarContainer = document.getElementById('botonBorrarContainer');
  botonBorrarContainer.appendChild(botonBorrar);


  // Actualizo llamada a la función mostrarResultado para incluir al cliente
  function calcularCompra() {
    const cantidad = parseFloat(document.getElementById('cantidadCompra').value);
    const monedaPago = document.getElementById('monedaPagoCompra').value;
    const monedaRecepcion = document.getElementById('monedaRecepcionCompra').value;

    let cotizacion;

            // Obtenengo la cotización según la moneda de pago
            switch (monedaPago) {
                case 'usd':
                    cotizacion = dolar.compra;
                    break;
                case 'gbp':
                    cotizacion = libra.compra;
                    break;
                case 'brl':
                    cotizacion = real.compra;
                    break;
                case 'eur':
                    cotizacion = euro.compra;
                    break;
                default:
                    cotizacion = 1;
            }

    const resultadoCompra = operar_compra(cotizacion, cantidad);
    mostrarResultadoConCliente(resultadoCompra, monedaRecepcion);
  }


  function calcularVenta() {
    const cantidad = parseFloat(document.getElementById('cantidadVenta').value);
    const monedaPago = document.getElementById('monedaPagoVenta').value;
    const monedaRecepcion = document.getElementById('monedaRecepcionVenta').value;

    let cotizacion;
      
          // Obtenengo la cotización según la moneda de recepción
          switch (monedaRecepcion) {
              case 'usd':
                  cotizacion = dolar.venta;
                  break;
              case 'gbp':
                  cotizacion = libra.venta;
                  break;
              case 'brl':
                  cotizacion = real.venta;
                  break;
              case 'eur':
                  cotizacion = euro.venta;
                  break;
              default:
                  cotizacion = 1;
          }
      
    const resultadoVenta = operar_venta(cantidad, cotizacion);
    mostrarResultadoConCliente(resultadoVenta, monedaRecepcion);
  }

  //funcion para mostrar la tabla de cotizaciones 
      
  function mostrarCotizaciones() {
    const cotizacionesTabla = document.getElementById('cotizacionesTabla');
    const cotizaciones = [
        { moneda: 'USD', compra: 1000, venta: 1200, bandera: '🇺🇸' },
        { moneda: 'GBP', compra: 1350, venta: 1600, bandera: '🇬🇧' },
        { moneda: 'BRL', compra: 950, venta: 1050, bandera: '🇧🇷' },
        { moneda: 'EUR', compra: 1250, venta: 1500, bandera: '🇪🇺' }
    ];

    const cotizacionesBody = document.getElementById('cotizacionesBody');
    cotizacionesBody.innerHTML = ''; // Limpiar contenido previo

    cotizaciones.forEach(cotizacion => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${cotizacion.bandera} ${cotizacion.moneda}</td><td>${cotizacion.compra}</td><td>${cotizacion.venta}</td>`;
        cotizacionesBody.appendChild(row);
    });
    // Cambiar el estilo directamente
    cotizacionesTabla.style.display = cotizacionesTabla.style.display === 'none' ? 'block' : 'none';
}
