document.addEventListener('DOMContentLoaded', function () {

//verificacion para evitar que se pueda volver atras una vez que se cerró la sesión

// Verificar si hay una sesión activa
const clienteSesion = localStorage.getItem('clienteSesion');

// Si no hay sesión activa, redirigir a la página de inicio de sesión
if (!clienteSesion) {
    window.location.href = 'index.html';
}

// Obtener los datos del localStorage (si existen)
let clientes = JSON.parse(localStorage.getItem('clientes')) || [];

});
  
// Función para obtener el cliente almacenado en el localStorage
  function obtenerClienteAlmacenado() {
    const clienteAlmacenado = localStorage.getItem('clientes');
    return clienteAlmacenado ? JSON.parse(clienteAlmacenado) : [];
  }
  
  
// Obtener los datos del localStorage (si existen)
  const clientes = obtenerClienteAlmacenado();
  
//logica para las operaciones 
  
// cambio array de objetos por json con fetch 

// Obtengo las cotizaciones desde el archivo json usando fetch

fetch('../data/cotizaciones.json')
.then(response => {
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
})
.then(data => {
  const cotizaciones = data.monedas;

})
.catch(error => {
  console.error('Error al obtener las cotizaciones:', error);
  Swal.fire({
    icon: 'error',
    title: 'Error al obtener las cotizaciones',
    text: error.message || 'Ha ocurrido un error al obtener las cotizaciones.',
  });
});


// Función para mostrar el resultado con el nombre del cliente de la sesión actual
function mostrarResultadoConCliente(resultado, monedaRecepcion) {
// Obtener el cliente de la sesión actual del LocalStorage
  const clienteSesion = JSON.parse(localStorage.getItem('clienteSesion'));


  const leyenda = clienteSesion
    ? `Cliente: ${clienteSesion.nombre} ${clienteSesion.apellido} recibe: ${resultado.toFixed(0)} ${monedaRecepcion}`
    : `Cliente no registrado recibe: ${resultado.toFixed(0)} ${monedaRecepcion}`;

  // Muestro la leyenda en el div "resultado"
  document.getElementById('resultado').innerText = leyenda;
}

 // funcion para darle un numero a cada operacion arrancando desde el 1001
function obtenerNumeroOperacion() {
  let numeroOperacion = localStorage.getItem('numeroOperacion') || 1000;
  localStorage.setItem('numeroOperacion', ++numeroOperacion);
  return numeroOperacion;
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
  document.getElementById('cantidadVenta').value = '';
  document.getElementById('cantidadCompra').value = '';
}
  
  
// Agrego un botón para borrar la última operación
  const botonBorrar = document.createElement('button');
  botonBorrar.className = 'btn';
  botonBorrar.innerText = 'Borrar última operación';
  botonBorrar.addEventListener('click', borrarUltimaOperacion);
    


// Crear y añadir el botón al contenedor
const botonBorrarContainer = document.getElementById('botonBorrarContainer');
botonBorrarContainer.appendChild(botonBorrar);
botonBorrar.className = 'btn boton-borrar-operaciones';


  
  
// Actualizo llamada a la función mostrarResultado para incluir al cliente
  function almacenarOperacion(tipoOperacion, monedaPago, monedaRecepcion, cantidad, resultado) {
    const numeroOperacion = obtenerNumeroOperacion();
    const clienteSesion = JSON.parse(localStorage.getItem('clienteSesion'));
    
// Obtener la fecha y hora actual con Luxon
    const fechaHoraActual = luxon.DateTime.utc().toISO();

    const operacion = {
      numero: numeroOperacion,
      cliente: {
        nombre: clienteSesion.nombre,
        apellido: clienteSesion.apellido,
        usuario:clienteSesion.usuario
      },
        monedaPago,
        monedaRecepcion,
        cantidad,
        resultado,
        tipo: tipoOperacion,
        fechaHora: fechaHoraActual,
      };
    
      let operaciones = JSON.parse(localStorage.getItem('operaciones')) || [];
      operaciones.push(operacion);
      localStorage.setItem('operaciones', JSON.stringify(operaciones));
    }

    //Calculos compra/venta usando json/fetch
    
    
    function calcularCompra() {
      const cantidad = parseFloat(document.getElementById('cantidadCompra').value);
      const monedaPago = document.getElementById('monedaPagoCompra').value;
      const monedaRecepcion = document.getElementById('monedaRecepcionCompra').value;
  
      // Obtengo las cotizaciones desde el archivo JSON mediante fetch
      fetch('../data/cotizaciones.json')
          .then(response => response.json())
          .then(data => {
              const cotizaciones = data.monedas;
  
              // Busco la cotización correspondiente a la moneda de pago
              const cotizacion = cotizaciones.find(c => c.iso.toLowerCase() === monedaPago.toLowerCase());
              const cotizacionCompra = cotizacion ? cotizacion.compra : 1;
  
              const resultadoCompra = operar_compra(cotizacionCompra, cantidad);
              mostrarResultadoConCliente(resultadoCompra, monedaRecepcion);
  
              // Almaceno la operación en el localStorage
              almacenarOperacion('Compra', monedaPago, monedaRecepcion, cantidad, resultadoCompra);
          })
          .catch(error => {
              console.error('Error al obtener las cotizaciones:', error);
              Swal.fire({
                  icon: 'error',
                  title: 'Error al obtener las cotizaciones',
                  text: error.message || 'Ha ocurrido un error al obtener las cotizaciones.',
              });
          });
  }
  

  function calcularVenta() {
    const cantidad = parseFloat(document.getElementById('cantidadVenta').value);
    const monedaPago = document.getElementById('monedaPagoVenta').value;
    const monedaRecepcion = document.getElementById('monedaRecepcionVenta').value;

    fetch('../data/cotizaciones.json')
        .then(response => response.json())
        .then(data => {
            const cotizaciones = data.monedas;

            const cotizacion = cotizaciones.find(c => c.iso.toLowerCase() === monedaRecepcion.toLowerCase());
            const cotizacionVenta = cotizacion ? cotizacion.venta : 1;

            const resultadoVenta = operar_venta(cantidad, cotizacionVenta);
            mostrarResultadoConCliente(resultadoVenta, monedaRecepcion);

            
            almacenarOperacion('Venta', monedaPago, monedaRecepcion, cantidad, resultadoVenta);
        })
        .catch(error => {
            console.error('Error al obtener las cotizaciones:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error al obtener las cotizaciones',
                text: error.message || 'Ha ocurrido un error al obtener las cotizaciones.',
            });
        });
}

    
// Función para mostrar el historial de operaciones 

// Obtén el botón "Ver Operaciones" por su ID

const btnVerOperaciones = document.getElementById('btnVerOperaciones');

btnVerOperaciones.addEventListener('click', function () {
  
  const operacionesTabla = document.getElementById('operacionesTabla');
  operacionesTabla.style.display = operacionesTabla.style.display === 'block' ? 'none' : 'block';
  if (operacionesTabla.style.display === 'block') {
    llenarTablaOperaciones();
  }
});
    
// Función para llenar la tabla de operaciones

function llenarTablaOperaciones() {
  const tbody = document.getElementById('operacionesBody');
  tbody.innerHTML = '';

  const operaciones = obtenerOperacionesDelUsuario();
  const clienteSesion = JSON.parse(localStorage.getItem('clienteSesion'));

  operaciones.forEach(operacion => {
      // Filtrar solo las operaciones del usuario actual
      if (operacion.cliente.usuario === clienteSesion.usuario) {
          const row = document.createElement('tr');
          const fechaFormateada = luxon.DateTime.fromISO(operacion.fechaHora).setLocale('es').toLocaleString(luxon.DateTime.DATETIME_SHORT);
          row.innerHTML = `<td>${operacion.numero}</td><td>${operacion.cliente.usuario}</td><td>${operacion.monedaPago}</td><td>${operacion.cantidad}</td>
          <td>${operacion.monedaRecepcion}</td><td>${operacion.resultado.toFixed(0)}</td>
          <td>${operacion.tipo}</td><td>${fechaFormateada}</td>`;
          tbody.appendChild(row);
      }
  });
}

    
  // Función para obtener las operaciones del usuario almacenadas en el LocalStorage
    function obtenerOperacionesDelUsuario() {
      const operacionesAlmacenadas = localStorage.getItem('operaciones') || '[]';
      return JSON.parse(operacionesAlmacenadas);
    }

    //funcion para mostrar la tabla de cotizaciones 

    function mostrarCotizaciones() {
      const cotizacionesTabla = document.getElementById('cotizacionesTabla');
      const cotizacionesBody = document.getElementById('cotizacionesBody');
      
      cotizacionesBody.innerHTML = '';

      fetch('../data/cotizaciones.json')
          .then(response => response.json())
          .then(data => {
              const cotizaciones = data.monedas;
  
              cotizaciones.forEach(cotizacion => {
                const row = document.createElement('tr');
                row.innerHTML = `<td>${cotizacion.bandera} ${cotizacion.iso}</td><td>${cotizacion.compra}</td><td>${cotizacion.venta}</td>`;
                cotizacionesBody.appendChild(row);
              });
  
              cotizacionesTabla.style.display = cotizacionesTabla.style.display === 'none' ? 'block' : 'none';
          })
          .catch(error => {
            console.error('Error al obtener las cotizaciones:', error);
            Swal.fire({
              icon: 'error',
              title: 'Error al obtener las cotizaciones',
              text: error.message || 'Ha ocurrido un error al obtener las cotizaciones.',
            });
          });
          
  }
  
//cierre de sesion
  
const formCerrarSesion = document.getElementById('formCerrarSesion');


formCerrarSesion.addEventListener('submit', function (event) {
    event.preventDefault();

    // Limpia la información de la sesión almacenada en el LocalStorage
    localStorage.removeItem('clienteSesion');

    // Redirige al usuario a la página de inicio de sesión (index.html)
    window.location.href = '../index.html';
});




