document.addEventListener('DOMContentLoaded', function () {

localStorage.clear();


// pagina index con carga de cliente nuevo y Login de cliente existente 


  const formularioNuevoCliente = document.getElementById('NuevoClienteForm');

  // evento para el envío del formulario
  formularioNuevoCliente.addEventListener('submit', function (event) {
    event.preventDefault(); // Evitar que el formulario se envíe

  // Obtener los valores del formulario
      const nombre = document.getElementById('nombre').value;
      const apellido = document.getElementById('apellido').value;
      const dni = document.getElementById('dni').value;
      const email = document.getElementById('email').value;
      const usuario = document.getElementById('usuario').value;
      const password = document.getElementById('password').value;

  // Mostrar mensaje al usuario
      const confirmacion=Swal.fire({
        title: 'Bienvenido!',
        text: 'Cliente registrado con exito',
        icon: 'success',
        confirmButtonText: 'ok'
      })
      
      if (confirmacion) {
        // Limpiar los campos del formulario
          document.getElementById('nombre').value = '';
          document.getElementById('apellido').value = '';
          document.getElementById('dni').value = '';
          document.getElementById('email').value = '';
          document.getElementById('usuario').value = '';
          document.getElementById('password').value = '';
      }

  // Obtener los datos del localStorage (si existen)
  let clientes = JSON.parse(localStorage.getItem('clientes')) || [];

  // Agregar el nuevo cliente a la lista
      const nuevoCliente = {
        nombre,
        apellido,
        dni,
        email,
        usuario,
        password
      };

      clientes.push(nuevoCliente);

  // Convierto a JSON y almaceno en localStorage
      localStorage.setItem('clientes', JSON.stringify(clientes));
  });
});



// Logica para formulario de login
const formularioLogin = document.getElementById('clienteForm');


formularioLogin.addEventListener('submit', function (event) {
  event.preventDefault();

  const usr = document.getElementById('usuario2').value;
  const pass = document.getElementById('password2').value;

  // Función para obtener el cliente almacenado en el localStorage
  function obtenerClienteAlmacenado() {
  const clienteAlmacenado = localStorage.getItem('clientes');
  return clienteAlmacenado ? JSON.parse(clienteAlmacenado) : [];
}

  // Obtener los datos del localStorage (si existen)
  const clientes = obtenerClienteAlmacenado();

  // Verificar si el usuario y la contraseña coinciden con algún cliente registrado
  
  const clienteEncontrado = clientes.find(cliente =>
    cliente.usuario.trim() === usr.trim() && cliente.password.trim() === pass.trim()
  );

  if (clienteEncontrado) {
    Swal.fire({
      title: 'Bienvenido a X-CHANGE',
      text: 'cliente activo',
      icon: 'success',
      confirmButtonText: 'ok'
    });

    setTimeout(function () {
      // Almacenar el cliente de la sesion actual en el LocalStorage
      localStorage.setItem('clienteSesion', JSON.stringify(clienteEncontrado));

      // Redirigir al usuario a la pagina de operacion despues de 2 segundos
      window.location.href = 'pages/operacion.html';
    }, 2000); 
  } else {
    confirmacion = Swal.fire({
      title: 'Error!',
      text: 'usuario y/o contraseña incorrectos',
      icon: 'error',
      confirmButtonText: 'ok'
    });

    if (confirmacion) {
      // Limpiar los campos del formulario
      document.getElementById('usuario2').value = '';
      document.getElementById('password2').value = '';
    }
  }
});


  //funcion para mostrar la tabla de cotizaciones 
      
  function mostrarCotizaciones() {
    const cotizacionesTabla = document.getElementById('cotizacionesTabla');
    const cotizacionesBody = document.getElementById('cotizacionesBody');
    
    // Limpiar contenido anterior
    cotizacionesBody.innerHTML = '';

    // Obtener las cotizaciones desde el archivo JSON mediante fetch
    fetch('./data/cotizaciones.json')
        .then(response => response.json())
        .then(data => {
            const cotizaciones = data.monedas;

            cotizaciones.forEach(cotizacion => {
              const row = document.createElement('tr');
              row.innerHTML = `<td>${cotizacion.bandera} ${cotizacion.iso}</td><td>${cotizacion.compra}</td><td>${cotizacion.venta}</td>`;
              cotizacionesBody.appendChild(row);
            });

            // Cambiar el estilo directamente
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


