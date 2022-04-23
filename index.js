/* // Bienvenida

let nombreUsuario = prompt("Ingrese su nombre");
let apellido = prompt("Ingrese su apellido");
let celular = parseInt(prompt("Ingrese su número de celular"));
let contra = prompt("Ingrese su constraseña");

alert(
  `¡Hola ${nombreUsuario}! Le damos la bienvenida a Las Flores Pastelería. Vamos a verificar sus datos para poder realizar una compra segura...`
);

let user = "";
let pass = "";
let intentos = 3;

function login(nombreUsuario, contrasenia, intentos) {
  if (!(nombreUsuario === "" && contrasenia === "")) {
    while (intentos > 0 && (nombreUsuario !== user || contrasenia !== pass)) {
      user = prompt("Ingrese su nombre");
      pass = prompt("Ingrese su contraseña");

      if (user === nombreUsuario && pass === contrasenia) {
        alert(`¡Datos verificados ${user}! Disfrute su compra.`);
      } else {
        alert(
          `Nombre o contraseña incorrectos. Restan ${intentos--} intentos.`
        );
      }
    }
  }
}

login(nombreUsuario, contra, intentos);

console.log(`El usuario que ha ingresado es ${nombreUsuario} ${apellido}`);

// Creo objetos

class Productos {
  constructor(nombre, precio, cantidad) {
    this.nombre = nombre.toUpperCase();
    this.precio = parseFloat(precio);
    this.cantidad = parseFloat(cantidad);
    this.vendido = false;
  }

  vender() {
    this.vendido = true;
  }
}

const torta = new Productos("Torta", 2500, 4);
const budin = new Productos("Budin", 1000, 5);
const pan = new Productos("Pan", 200, 10);
const tarta = new Productos("Tarta", 500, 1);
const galleta = new Productos("Galleta", 100, 20);
const helado = new Productos("Helado", 50, 2);

// Creo arrays

const productosActivos = [torta, budin, pan, tarta, galleta, helado];
const productosInactivos = [];

function elegirProductos() {
  let productoSeleccionado = parseInt(
    prompt(
      `${nombreUsuario}, ingrese 1 para ${torta.nombre} - $${torta.precio}\nIngrese 2 para ${budin.nombre} - $${budin.precio}\nIngrese 3 para ${pan.nombre} - $${pan.precio} \nIngrese 4 para ${tarta.nombre} - $${tarta.precio} \nIngrese 5 para ${galleta.nombre} - $${galleta.precio} \nIngrese 6 para ${helado.nombre} - $${helado.precio} \nPuede elegir hasta 3 productos.`
    )
  );

  if (productoSeleccionado === 1) {
    var nombre = torta;
    console.log(`Restan ${torta.cantidad - 1} tortas.`);
  } else if (productoSeleccionado === 2) {
    var nombre = budin;
    console.log(`Restan ${budin.cantidad - 1} budines.`);
  } else if (productoSeleccionado === 3) {
    var nombre = pan;
    console.log(`Restan ${pan.cantidad - 1} panes.`);
  } else if (productoSeleccionado === 4) {
    var nombre = tarta;
    console.log(`Restan ${tarta.cantidad - 1} tartas.`);
  } else if (productoSeleccionado === 5) {
    var nombre = galleta;
    console.log(`Restan ${galleta.cantidad - 1} galletas.`);
  } else if (productoSeleccionado === 6) {
    var nombre = helado;
    console.log(`Restan ${helado.cantidad - 1} helados.`);
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
console.log(productosInactivos); */

// Inicio

let usuario = document.getElementById("usuario");

usuario.onblur = () => {
  var x = document.getElementById("usuario");
  x.value = x.value.toLowerCase();
};

let datos = document.getElementById("datos");
let miForm = document.getElementById("formulario");
miForm.addEventListener("submit", validarForm);

function validarForm(e) {
  e.preventDefault();
  datos.innerHTML = `¡Datos ingresados correctamente!
  Bienvenido ${usuario.value}`;
  console.log(`El usuario ingresado fue ${usuario.value}`);
}
