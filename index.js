// Bienvenida

let nombre = prompt("Ingrese su nombre");
let apellido = prompt("Ingrese su apellido");
let celular = parseInt(prompt("Ingrese su número de celular"));
let contra = prompt("Ingrese su constraseña");

alert(
  `¡Hola ${nombre}! Le damos la bienvenida a Las Flores Pastelería. Vamos a verificar sus datos para poder realizar una compra segura...`
);

let user = "";
let pass = "";
let intentos = 3;

function login(nombre, contrasenia, intentos) {
  if (!(nombre === "" && contrasenia === "")) {
    while (intentos > 0 && (nombre !== user || contrasenia !== pass)) {
      user = prompt("Ingrese su nombre");
      pass = prompt("Ingrese su contraseña");

      if (user === nombre && pass === contrasenia) {
        alert(`¡Datos verificados ${user}! Disfrute su compra.`);
      } else {
        alert(
          `Nombre o contraseña incorrectos. Restan ${intentos--} intentos.`
        );
      }
    }
  }
}

login(nombre, contra, intentos);

// Creo objetos

class Productos {
  constructor(nombre, precio) {
    this.nombre = nombre.toUpperCase();
    this.precio = parseFloat(precio);
    this.vendido = false;
  }

  vender() {
    this.vendido = true;
  }
}

const torta = new Productos("Torta", 2500);
const budin = new Productos("Budin", 1000);
const pan = new Productos("Pan", 200);
const tarta = new Productos("Tarta", 500);
const galleta = new Productos("Galleta", 100);
const helado = new Productos("Helado", 50);

// Creo arrays

const productosActivos = [torta, budin, pan, tarta, galleta, helado];
const productosInactivos = [];

function elegirProductos() {
  let productoSeleccionado = parseInt(
    prompt(
      `${nombre}, ingrese 1 para torta\nIngrese 2 para budin\nIngrese 3 para pan\nIngrese 4 para tarta\nIngrese 5 para galleta\nIngrese 6 para helado\nPuede elegir hasta 3 productos.`
    )
  );

  if (productoSeleccionado === 1) {
    var nombre = torta;
  } else if (productoSeleccionado === 2) {
    var nombre = budin;
  } else if (productoSeleccionado === 3) {
    var nombre = pan;
  } else if (productoSeleccionado === 4) {
    var nombre = tarta;
  } else if (productoSeleccionado === 5) {
    var nombre = galleta;
  } else if (productoSeleccionado === 6) {
    var nombre = helado;
  } else alert("Producto inexistente o ya seleccionado");

  function cambiar(nombre) {
    nombre.vender();
    let index = productosActivos.indexOf(nombre);
    if (index != -1) {
      productosActivos.splice(index, 1);
      productosInactivos.push(nombre);
    } else {
      alert("Producto inexistente o ya seleccionado");
    }
  }

  cambiar(nombre);
}

for (let index = 0; index < 3; index++) {
  elegirProductos();
}

console.log(productosActivos);
console.log(productosInactivos);
