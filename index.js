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



















// Script para cargar automáticamente las nuevas imágenes del CMS
// Coloca este script al final de tu página HTML, antes del </body>

document.addEventListener('DOMContentLoaded', function() {
    loadNewImages();
});

async function loadNewImages() {
    const carruselContainer = document.querySelector('.carrusel-imagenes');
    
    try {
        // Intentar cargar archivos del CMS
        const response = await fetch('/principales2/');
        
        if (!response.ok) {
            console.log('No se pudo acceder automáticamente. Usando método alternativo...');
            await loadImagesFromFileList();
            return;
        }
        
        const text = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');
        const links = doc.querySelectorAll('a[href$=".md"]');
        
        for (let link of links) {
            const filename = link.getAttribute('href');
            await loadImageFromMarkdown(filename, carruselContainer);
        }
        
        // Si no encontró ninguna imagen nueva, intentar método alternativo
        if (links.length === 0) {
            await loadImagesFromFileList();
        }
        
    } catch (error) {
        console.log('Error cargando imágenes automáticamente:', error);
        await loadImagesFromFileList();
    }
}

// Método alternativo: buscar archivos de imagen directamente
async function loadImagesFromFileList() {
    const carruselContainer = document.querySelector('.carrusel-imagenes');
    
    // Lista de posibles nombres de archivos nuevos
    // El cliente puede agregar aquí los nombres de las nuevas imágenes
    const newImageFiles = [
        'nueva-imagen-1.jpg',
        'nueva-imagen-2.jpg',
        'nueva-imagen-3.png',
        // Agregar más nombres de archivo aquí cuando el cliente suba nuevas imágenes
    ];
    
    for (let filename of newImageFiles) {
        try {
            // Verificar si la imagen existe
            const response = await fetch(`/principales2/${filename}`);
            if (response.ok) {
                // Crear y agregar la nueva imagen al carrusel
                const newImg = document.createElement('img');
                newImg.src = `/principales2/${filename}`;
                newImg.alt = filename.replace(/\.[^/.]+$/, ""); // Quitar extensión para alt
                
                // Agregar al final del carrusel
                carruselContainer.appendChild(newImg);
                
                console.log(`Imagen agregada: ${filename}`);
            }
        } catch (error) {
            console.log(`Imagen ${filename} no encontrada`);
        }
    }
}

// Cargar imagen desde archivo markdown del CMS
async function loadImageFromMarkdown(filename, container) {
    try {
        const response = await fetch(`/principales2/${filename}`);
        const text = await response.text();
        
        // Extraer información del archivo markdown
        const imagenMatch = text.match(/imagen:\s*(.+)/);
        const altMatch = text.match(/alt:\s*(.+)/);
        
        if (imagenMatch) {
            const imagePath = imagenMatch[1].trim();
            
            // Verificar que no sea una imagen que ya existe
            const existingImages = container.querySelectorAll('img');
            let imageExists = false;
            
            for (let img of existingImages) {
                if (img.src.includes(imagePath)) {
                    imageExists = true;
                    break;
                }
            }
            
            // Solo agregar si no existe
            if (!imageExists) {
                const newImg = document.createElement('img');
                newImg.src = imagePath;
                newImg.alt = altMatch ? altMatch[1].trim() : 'Nueva imagen';
                
                // Agregar al final del carrusel
                container.appendChild(newImg);
                
                console.log(`Nueva imagen agregada desde CMS: ${imagePath}`);
            }
        }
    } catch (error) {
        console.log(`Error cargando ${filename}:`, error);
    }
}

// Función para actualizar manualmente (opcional)
function agregarImagenManual(nombreArchivo, textoAlt = '') {
    const carruselContainer = document.querySelector('.carrusel-imagenes');
    const newImg = document.createElement('img');
    
    newImg.src = `/principales2/${nombreArchivo}`;
    newImg.alt = textoAlt || nombreArchivo.replace(/\.[^/.]+$/, "");
    
    // Agregar al final
    carruselContainer.appendChild(newImg);
    
    console.log(`Imagen agregada manualmente: ${nombreArchivo}`);
}





