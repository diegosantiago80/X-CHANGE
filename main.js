alert("Bienvenido a X-CHANGE");

let operacion;
let cantidad = 0;
let tipo_cambio;
let resultado = 0;
let acum_ars = 0,
  acum_usd = 0,
  acum_gbp = 0,
  acum_brl = 0,
  acum_eur = 0;
let continuar;

// El "iso" (ISO 4217) es la norma internacional que establece los códigos estandarizados de las monedas de los diferentes países del mundo


//declaracion de monedas como objetos 

const dolar = {
  codigo: 2,
  iso: "usd",
  compra: 1000,
  venta: 1200,
};
const libra = {
  codigo: 1,
  iso: "gbp",
  compra: 1350,
  venta: 1600,
};
const real = {
  codigo: 3,
  iso: "brl",
  compra: 1000,
  venta: 1050,
};
const euro = {
  codigo: 4,
  iso: "eur",
  compra: 1250,
  venta: 1500,
};

//declaracion de array de objetos 

const moneda = [dolar, real, euro, libra];

// Ordenamiento del array por codigo

moneda.sort((a, b) => a.codigo - b.codigo);

do {
  function mostrarTablaEnAlert(arr) {
    let tableString = "Código | ISO | Compra | Venta\n";
    for (const moneda of arr) {
      tableString += `${moneda.codigo}|----->${moneda.iso} |    ${moneda.compra} |    ${moneda.venta}\n`;
    }
    alert(tableString);
  }

  mostrarTablaEnAlert(moneda);

  operacion = prompt("Ingrese tipo de operacion (1-compra/2-venta)");

  // Comprobacion para arreglar el error de la primer pre-entrega
  if (operacion != 1 && operacion != 2) {
    console.log("no existe el tipo de operacion ingresada");
    alert("no existe el tipo de operacion ingresada");
  } else {
    console.log(operacion);

    seleccion = prompt(
      "Ingrese el código de la moneda que desea cambiar\n(1-Libra/2-Dolar/3-Real/4-Euro)"
    );

    console.log(seleccion);

    //busqueda de moneda por codigo en el array para luego operar

    const monedaEncontrada = moneda.find((m) => m.codigo == parseInt(seleccion));

    operacion = parseInt(operacion);

    function operar_compra(cotizacion, cantidad) {
      res = cotizacion * cantidad;
      return res;
    }

    function operar_venta(cantidad, cotizacion) {
      res = cantidad / cotizacion;
      return res;
    }

    function mostrar(mensaje) {
      alert(mensaje);
      console.log(mensaje);
    }

    function mostrarAcumuladoPorMoneda(acumulado, iso) {
        alert(`Ud recibe en ${iso}: ${acumulado.toFixed(2)}`);
        console.log(`Ud recibe en ${iso}: ${acumulado.toFixed(2)}`);
      }
      
      
      

    // El tipo de operacion se ve desde el lado de la entidad
    if (operacion != 1 && operacion != 2) {
      alert("opcion invalida");
    } else {
      if (operacion == 1) {
        cantidad = parseFloat(
          prompt(`Ingrese la cantidad de ${monedaEncontrada.iso} a cambiar`)
        );
        tipo_cambio = monedaEncontrada.compra;
        resultado = operar_compra(tipo_cambio, cantidad);
        mostrar(`Usted recibe ${resultado.toFixed(2)} pesos`);
        acum_ars += resultado;
      } else {
        cantidad = parseFloat(
          prompt(`Ingrese la cantidad de pesos a cambiar a ${monedaEncontrada.iso}`)
        );
        tipo_cambio = monedaEncontrada.venta;
        resultado = operar_venta(cantidad, tipo_cambio);
        mostrar(`Usted recibe ${resultado.toFixed(2)} ${monedaEncontrada.iso}`);
        switch (monedaEncontrada.codigo) {
          case 1:
            acum_gbp += resultado;
            acum_ars-=cantidad;
            break;
          case 2:
            acum_usd += resultado;
            acum_ars-=cantidad;
            break;
          case 3:
            acum_brl += resultado;
            acum_ars-=cantidad;
            break;
          case 4:
            acum_eur += resultado;
            acum_ars-=cantidad;
            break;
        }
      }
    }
  }
  continuar = confirm("¿Desea realizar otra operación?");
} while (continuar);

if(acum_ars>0){
    mostrar(`Se acreditara en el CBU declarado la suma de ${acum_ars.toFixed(2)} pesos`);
}else{

    mostrar(`Se debitara de su cuenta la suma de ${Math.abs(acum_ars).toFixed(2)} pesos`);
}

if (acum_gbp > 0) {
    mostrarAcumuladoPorMoneda(acum_gbp, "GBP");
  }
  
  if (acum_usd > 0) {
    mostrarAcumuladoPorMoneda(acum_usd, "USD");
  }
  
  if (acum_brl > 0) {
    mostrarAcumuladoPorMoneda(acum_brl, "BRL");
  }
  
  if (acum_eur > 0) {
    mostrarAcumuladoPorMoneda(acum_eur, "EUR");
  }
  
  

mostrar("Gracias por utilizar los servicios de grupo x-change");
