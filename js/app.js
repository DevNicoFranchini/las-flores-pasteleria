// Página de Inicio

// Declaro variables

let nombreUsuario = document.getElementById("nombre");
let apellidoUsuario = document.getElementById("apellido");
let celularUsuario = document.getElementById("phone");
let datos = document.getElementById("datos");
let miForm = document.getElementById("formulario");

nombreUsuario.onblur = () => {
  let x = document.getElementById("nombre");
  x.value = x.value.toLowerCase();
  x.value = x.value[0].toUpperCase() + x.value.slice(1);
};

apellidoUsuario.onblur = () => {
  let x = document.getElementById("apellido");
  x.value = x.value.toLowerCase();
  x.value = x.value[0].toUpperCase() + x.value.slice(1);
};

miForm.addEventListener("submit", validarForm);
miForm.addEventListener("submit", delayChangePage);

function validarForm(e) {
  e.preventDefault();
  localStorage.setItem("nombreUsuario", nombreUsuario.value);

  Swal.fire({
    position: "center",
    icon: "success",
    title: `¡Bienvenido ${nombreUsuario.value}, que disfrute su compra!
    En breve será redirigido a la sección de compras.`,
    showConfirmButton: false,
    timer: 3500,
    width: "50rem",
  });
}

function delayChangePage() {
  setTimeout(function changePage() {
    document.location.href = "./pages/productos.html";
  }, 3500);
}
