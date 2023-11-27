alert("Bienvenido a X-CHANGE");

let operacion;
let moneda=0;
let cantidad=0;
const compra = 1;
const venta = 2;
let tipo_cambio;
let resultado = 0;
let continuar;

let dolar_compra = 950;
let dolar_venta = 1050;
let libra_compra = 1100;
let libra_venta = 1150;
let real_compra = 450;
let real_venta = 550;
let euro_compra = 1080;
let euro_venta = 1180;

do{

operacion = prompt("Ingrese tipo de operacion (1-compra/2-venta)");

console.log(operacion);

moneda = prompt("Ingrese el código de la moneda que desea cambiar\n(1-Libra/2-Dolar/3-Real/4-Euro)");

console.log(moneda);


operacion = parseInt(operacion);


function operar_compra(cotizacion, cantidad) {
    res = cotizacion * cantidad
    return res
}

function operar_venta(cantidad,cotizacion) {
    res = cantidad/cotizacion
    return res
}

function mostrar(mensaje) {
    alert(mensaje)
    console.log(mensaje)
}

//el tipo de operacion se ve desde el lado de la entidad 

if(operacion!=1 && operacion!=2){
    alert("opcion invalida")
}else{
    if (operacion == 1) {
    switch (moneda) {
        case '1':
            cantidad = prompt("Ingrese la cantidad de libras a cambiar");
            console.log(cantidad);
            tipo_cambio = libra_compra;
            resultado=operar_compra(tipo_cambio, cantidad);
            mostrar("Usted recibe " + resultado.toFixed(2) + " pesos");
            break;
        case '2':
            cantidad = prompt("Ingrese la cantidad de Dolares a cambiar");
            console.log(cantidad);
            tipo_cambio = dolar_compra;
            resultado=operar_compra(tipo_cambio, cantidad);
            mostrar("Usted recibe " + resultado.toFixed(2)  + " pesos");
            break;
        case '3':
            cantidad = prompt("Ingrese la cantidad de Reales a cambiar");
            console.log(cantidad);
            tipo_cambio = real_compra;
            resultado=operar_compra(tipo_cambio, cantidad);
            mostrar("Usted recibe " + resultado.toFixed(2)  + " pesos");
            break;
        case '4':
            cantidad = prompt("Ingrese la cantidad de Euros a cambiar");
            console.log(cantidad);
            tipo_cambio = euro_compra;
            resultado=operar_compra(tipo_cambio, cantidad);
            mostrar("Usted recibe " + resultado.toFixed(2)  + " pesos");
            break;
        default:
            console.log("Opción inválida");
            break;
        }
    } else {
    switch (moneda) {
        case '1':
            cantidad = prompt("Ingrese la cantidad de Pesos a cambiar");
            console.log(cantidad);
            tipo_cambio = libra_venta;
            resultado=operar_venta(cantidad,tipo_cambio);
            mostrar("Usted recibe " + resultado.toFixed(2)  + " Libras");
            break;
        case '2':
            cantidad = prompt("Ingrese la cantidad de Pesos a cambiar");
            console.log(cantidad);
            tipo_cambio = dolar_venta;
            resultado=operar_venta(cantidad,tipo_cambio);
            mostrar("Usted recibe " + resultado.toFixed(2)  + " Dolares");
            break;
        case '3':
            cantidad = prompt("Ingrese la cantidad de Pesos a cambiar");
            console.log(cantidad);
            tipo_cambio = real_venta;
            resultado=operar_venta(cantidad,tipo_cambio);
            mostrar("Usted recibe " + resultado.toFixed(2)  + " Reales");
            break;
        case '4':
            cantidad = prompt("Ingrese la cantidad de Pesos a cambiar");
            console.log(cantidad);
            tipo_cambio = euro_venta;
            resultado=operar_venta(cantidad,tipo_cambio);
            mostrar("Usted recibe " + resultado.toFixed(2)  + " Euros");
            break;
        default:
            console.log("Opción inválida");
            break;
        }
    }
}
continuar = confirm("¿Desea realizar otra operación?");
} while (continuar);
