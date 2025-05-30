// Mostrar solo el listado de la categoría seleccionada y filtrar productos
document.querySelectorAll('.boton-pequeno').forEach(function(btn) {
  btn.addEventListener('click', function() {
    var categoria = btn.getAttribute('data-categoria');

    // Oculta todos los listados de categoría
    document.querySelectorAll('.listado-categoria').forEach(function(listado) {
      listado.style.display = 'none';
    });

    // Muestra el listado de la categoría seleccionada (si existe)
    var listado = document.getElementById('listado-' + categoria);
    if (listado) listado.style.display = 'block';

    // Filtra productos en la galería
    document.querySelectorAll('.galeria .producto').forEach(function(prod) {
      if (categoria === 'todas' || prod.classList.contains('categoria-' + categoria)) {
        prod.style.display = '';
      } else {
        prod.style.display = 'none';
      }
    });
  });
});



const carrusel = document.querySelector('.carrusel-imagenes');
const prevBtn = document.querySelector('.carrusel-btn.prev');
const nextBtn = document.querySelector('.carrusel-btn.next');

let imagenAncho = 0;

function setImagenAncho() {
  const imagen = carrusel.querySelector('img');
  if (imagen) {
    imagenAncho = imagen.offsetWidth + 10; // incluye el gap
  }
}

// Calcula el ancho al cargar la página
window.addEventListener('load', setImagenAncho);
// Calcula el ancho si la ventana cambia de tamaño
window.addEventListener('resize', setImagenAncho);
// Calcula el ancho si la imagen carga después
carrusel.querySelectorAll('img').forEach(img => {
  img.addEventListener('load', setImagenAncho);
});

prevBtn.addEventListener('click', () => {
  setImagenAncho();
  carrusel.scrollBy({
    left: -imagenAncho,
    behavior: 'smooth'
  });
});

nextBtn.addEventListener('click', () => {
  setImagenAncho();
  carrusel.scrollBy({
    left: imagenAncho,
    behavior: 'smooth'
  });
});


// Oculta todos los productos de la galería al cargar la página
document.querySelectorAll('.galeria .producto').forEach(function(prod) {
  prod.style.display = 'none';
});










document.querySelectorAll('.boton-pequeno').forEach(btn => {
  btn.addEventListener('click', function() {
    const categoria = btn.getAttribute('data-categoria');
    const destino = document.getElementById('listado-' + categoria);
    if(destino) {
      setTimeout(() => {
        const offset = 60; // Cambia este valor según el espacio que quieras dejar arriba (en píxeles)
        const top = destino.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }, 100);
    }
  });
});



let scrollInterval;
const btnSubir = document.getElementById('btnSubir');

btnSubir.addEventListener('mousedown', function() {
  scrollInterval = setInterval(() => {
    window.scrollBy(0, -10); // Cambia -30 para más o menos velocidad
  }, 10); // Cada 10ms
});

btnSubir.addEventListener('mouseup', function() {
  clearInterval(scrollInterval);
});

btnSubir.addEventListener('mouseleave', function() {
  clearInterval(scrollInterval);
});

// Para pantallas táctiles
btnSubir.addEventListener('touchstart', function(e) {
  e.preventDefault();
  scrollInterval = setInterval(() => {
    window.scrollBy(0, -10);
  }, 10);
});

btnSubir.addEventListener('touchend', function() {
  clearInterval(scrollInterval);
});












let scrollDownInterval;
const btnBajar = document.getElementById('btnBajar');

btnBajar.addEventListener('mousedown', function() {
  scrollDownInterval = setInterval(() => {
    window.scrollBy(0, 10); // Cambia 30 para más o menos velocidad
  }, 10);
});

btnBajar.addEventListener('mouseup', function() {
  clearInterval(scrollDownInterval);
});

btnBajar.addEventListener('mouseleave', function() {
  clearInterval(scrollDownInterval);
});

// Para pantallas táctiles
btnBajar.addEventListener('touchstart', function(e) {
  e.preventDefault();
  scrollDownInterval = setInterval(() => {
    window.scrollBy(0, 10);
  }, 10);
});

btnBajar.addEventListener('touchend', function() {
  clearInterval(scrollDownInterval);
});











fetch('https://opensheet.elk.sh/1Z0QMIwO6au52CieJTlbuxpy1A7SGDBePsKFJxlvz6DE/carrusel')
  .then(res => res.json())
  .then(data => {
    const carrusel = document.querySelector('.carrusel-imagenes');
    console.log("Datos recibidos:", data);
    data.forEach(row => {
      console.log("Fila:", row);
      if(row.url && row.nombre) {
        console.log("Agregando imagen:", row.url, row.nombre);
        const img = document.createElement('img');
        img.src = row.url;
        img.alt = row.nombre;
        img.style.maxWidth = "250px";
        img.style.margin = "10px";
        img.style.display = "inline-block";
        carrusel.appendChild(img);
      }
    });
    setImagenAncho && setImagenAncho();
  });









