// Inicio

let nombreUsuario = document.getElementById("nombre");

nombreUsuario.onblur = () => {
  var x = document.getElementById("nombre");
  x.value = x.value.toLowerCase();
  x.value = x.value[0].toUpperCase() + x.value.slice(1);
};

let apellidoUsuario = document.getElementById("apellido");

apellidoUsuario.onblur = () => {
  var x = document.getElementById("apellido");
  x.value = x.value.toLowerCase();
  x.value = x.value[0].toUpperCase() + x.value.slice(1);
};

let datos = document.getElementById("datos");
let miForm = document.getElementById("formulario");

miForm.addEventListener("submit", validarForm);
miForm.addEventListener("submit", delayChangePage);

function validarForm(e) {
  e.preventDefault();
  localStorage.setItem("nombreUsuario", nombreUsuario.value);
  datos.innerHTML = `¡Bienvenido ${nombreUsuario.value}, que disfrute su compra! En breve será redirigido a la sección de compras.`;
  console.log(
    `El usuario ingresado fue ${nombreUsuario.value} ${apellidoUsuario.value}`
  );
}

function delayChangePage() {
  setTimeout(function changePage() {
    document.location.href = "./pages/productos.html";
  }, 3500);
}
