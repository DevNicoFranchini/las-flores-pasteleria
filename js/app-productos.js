let persona = localStorage.getItem("nombreUsuario");
saludo.innerHTML = `¡Hola ${persona}! ¿Qué vas a llevar hoy?`;

const cards = document.getElementById("cards");
const items = document.getElementById("items");
const itemsOrden = document.getElementById("items-orden");
const footer = document.getElementById("footer");
const footerOrden = document.getElementById("footer-orden");
const templateCard = document.getElementById("template-card").content;
const templateFooter = document.getElementById("template-footer").content;
const templateFooterOrden = document.getElementById(
  "template-footer-orden"
).content;
const templateCarrito = document.getElementById("template-carrito").content;
const templateOrden = document.getElementById("template-orden").content;
const fragment = document.createDocumentFragment();
const enviarPedido = document.getElementById("enviar-pedido");
let carrito = {};

// Carrito
document.addEventListener("DOMContentLoaded", () => {
  fetchData();
  if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
    pintarCarrito();
    pintarOrden();
  }
});
cards.addEventListener("click", (e) => {
  addCarrito(e);
});

items.addEventListener("click", (e) => {
  btnAccion(e);
});

const fetchData = async () => {
  try {
    const res = await fetch("../productos.json");
    const data = await res.json();
    pintarCards(data);
    // console.log(data);
  } catch (error) {
    console.log(error);
  }
};

const pintarCards = (data) => {
  data.forEach((producto) => {
    templateCard.querySelector("h3").textContent = producto.title;
    templateCard.querySelector("span").textContent = producto.precio;
    templateCard.querySelector("h4").textContent = producto.description;
    templateCard.querySelector("img").setAttribute("src", producto.image);
    templateCard.querySelector(".btn-dark").dataset.id = producto.id;
    const clone = templateCard.cloneNode(true);
    fragment.appendChild(clone);
  });
  cards.appendChild(fragment);
};

const addCarrito = (e) => {
  if (e.target.classList.contains("btn-dark")) {
    setCarrito(e.target.parentElement);
  }
  e.stopPropagation();
};

const setCarrito = (objeto) => {
  const producto = {
    id: objeto.querySelector(".btn-dark").dataset.id,
    title: objeto.querySelector("h3").textContent,
    precio: objeto.querySelector("span").textContent,
    cantidad: 1,
  };

  if (carrito.hasOwnProperty(producto.id)) {
    producto.cantidad = carrito[producto.id].cantidad + 1;
  }

  carrito[producto.id] = { ...producto };
  pintarCarrito();
  pintarOrden();
};

const pintarCarrito = () => {
  items.innerHTML = "";
  Object.values(carrito).forEach((producto) => {
    templateCarrito.querySelector("th").textContent = producto.id;
    templateCarrito.querySelectorAll("td")[0].textContent = producto.title;
    templateCarrito.querySelectorAll("td")[1].textContent = producto.cantidad;
    templateCarrito.querySelector(".btn-info").dataset.id = producto.id;
    templateCarrito.querySelector(".btn-danger").dataset.id = producto.id;
    templateCarrito.querySelector("span").textContent =
      producto.cantidad * producto.precio;
    const clone = templateCarrito.cloneNode(true);
    fragment.appendChild(clone);
  });
  items.appendChild(fragment);

  pintarFooter();

  localStorage.setItem("carrito", JSON.stringify(carrito));
};

const pintarFooter = () => {
  footer.innerHTML = "";
  if (Object.keys(carrito).length === 0) {
    footer.innerHTML = `<th scope="row" colspan="5"> Carrito vacío - comience a comprar!</th>`;
    return;
  }

  const nCantidad = Object.values(carrito).reduce(
    (acc, { cantidad }) => acc + cantidad,
    0
  );
  const nPrecio = Object.values(carrito).reduce(
    (acc, { cantidad, precio }) => acc + cantidad * precio,
    0
  );

  templateFooter.querySelectorAll("td")[0].textContent = nCantidad;
  templateFooter.querySelector("span").textContent = nPrecio;

  const clone = templateFooter.cloneNode(true);
  fragment.appendChild(clone);
  footer.appendChild(fragment);

  const btnVaciar = document.getElementById("vaciar-carrito");
  btnVaciar.addEventListener("click", () => {
    vaciarCarrito();
    pintarCarrito();
    pintarOrden();
  });
};

const pintarFooterOrden = () => {
  footerOrden.innerHTML = "";
  if (Object.keys(carrito).length === 0) {
    footerOrden.innerHTML = `<th scope="row" colspan="5"> Carrito vacío - comience a comprar!</th>`;
    return;
  }

  const nCantidad = Object.values(carrito).reduce(
    (acc, { cantidad }) => acc + cantidad,
    0
  );
  const nPrecio = Object.values(carrito).reduce(
    (acc, { cantidad, precio }) => acc + cantidad * precio,
    0
  );

  templateFooterOrden.querySelectorAll("td")[0].textContent = nCantidad;
  templateFooterOrden.querySelector("span").textContent = nPrecio;

  const clone = templateFooterOrden.cloneNode(true);
  fragment.appendChild(clone);
  footerOrden.appendChild(fragment);
};

const btnAccion = (e) => {
  if (e.target.classList.contains("btn-info")) {
    const producto = carrito[e.target.dataset.id];
    producto.cantidad++;
    carrito[e.target.dataset.id] = { ...producto };
    pintarCarrito();
    pintarOrden();
  }

  if (e.target.classList.contains("btn-danger")) {
    const producto = carrito[e.target.dataset.id];
    producto.cantidad--;
    if (producto.cantidad === 0) {
      delete carrito[e.target.dataset.id];
    }
    pintarCarrito();
    pintarOrden();
  }

  e.stopPropagation();
};

const pintarOrden = () => {
  itemsOrden.innerHTML = "";
  Object.values(carrito).forEach((producto) => {
    templateOrden.querySelector("th").textContent = producto.id;
    templateOrden.querySelectorAll("td")[0].textContent = producto.title;
    templateOrden.querySelectorAll("td")[1].textContent = producto.cantidad;
    templateOrden.querySelector("span").textContent =
      producto.cantidad * producto.precio;
    const clone = templateOrden.cloneNode(true);
    fragment.appendChild(clone);
  });
  itemsOrden.appendChild(fragment);

  pintarFooterOrden();

  localStorage.setItem("carrito", JSON.stringify(carrito));
};

enviarPedido.addEventListener("click", () => {
  Swal.fire({
    position: "center",
    icon: "success",
    iconColor: "black",
    title: `¡${persona} su pedido fue enviado, que lo disfrute!`,
    color: "black",
    showConfirmButton: false,
    timer: 3500,
    width: "50rem",
    background: "#f2c4da",
  }).then(() => {
    vaciarCarrito();
    pintarCarrito();
    pintarOrden();
    location.reload();
    window.scrollTo(0, 0);
  });

  const vaciarCarrito = () => {
    carrito = {};
    localStorage.removeItem(carrito);
  };
});
