document.addEventListener('DOMContentLoaded', () => {
    inicializarTema();
    configurarCategorias();
    configurarCatalogo();
    configurarBuscadorCatalogo();
    configurarSelectores();
    configurarCarruselOutfits();
    actualizarContadorCesta();
    renderizarCarrito(); // Solo actuará si estamos en cesta.html
});

// =========================================
// MODO OSCURO
// =========================================
function inicializarTema() {
    const btnTheme = document.getElementById('toggle-theme');
    if (btnTheme) {
        // Revisar si el usuario ya tenía el modo oscuro guardado
        if (localStorage.getItem('theme') === 'dark') {
            document.body.classList.add('dark-theme');
        }

        btnTheme.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            const isDark = document.body.classList.contains('dark-theme');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }
}

// =========================================
// SELECCIÓN DE TALLAS Y COLORES
// =========================================
function configurarSelectores() {
    // Manejar clics en las tallas
    const botonesTalla = document.querySelectorAll('.tallas button');
    botonesTalla.forEach(btn => {
        btn.onclick = (e) => {
            // Quitar clase active a los hermanos
            const hermanos = e.target.parentElement.querySelectorAll('button');
            hermanos.forEach(b => b.classList.remove('active'));
            // Agregar clase active al clickeado
            e.target.classList.add('active');
        };
    });

    // Manejar clics en los colores
    const botonesColor = document.querySelectorAll('.colores button');
    botonesColor.forEach(btn => {
        btn.onclick = (e) => {
            const hermanos = e.target.parentElement.querySelectorAll('button');
            hermanos.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');

            const card = e.target.closest('.card');
            if (card) cambiarImagenPorColor(card, e.target.classList[0]);
        };
    });
}

function cambiarImagenPorColor(card, color) {
    const imagenes = JSON.parse(card.dataset.imagenes || '{}');
    const nuevaImagen = imagenes[color];
    const img = card.querySelector('img');

    if (!nuevaImagen || !img) return;

    img.src = nuevaImagen;
    card.dataset.imagen = nuevaImagen;
}

function obtenerCatalogoProductos() {
    return [
        { categoria: 'abrigos', nombre: 'Noir Drift Hoodie', precio: 2500, imagen: 'img/abrigo-1.png', descripcion: 'Abrigo streetwear premium con corte comodo para uso diario.', tallas: ['S', 'M', 'L', 'XL'], colores: ['unico'] },
        { categoria: 'abrigos', nombre: 'Studio Cloud Jacket', precio: 2800, imagen: 'img/abrigo-2.png', descripcion: 'Abrigo urbano de acabado moderno y estructura relajada.', tallas: ['S', 'M', 'L', 'XL'], colores: ['unico'] },
        { categoria: 'abrigos', nombre: 'Midnight Crown Coat', precio: 3000, imagen: 'img/abrigo-4.png', descripcion: 'Abrigo statement con presencia premium para outfits fuertes.', tallas: ['S', 'M', 'L', 'XL'], colores: ['unico'] },
        { categoria: 'tshirt', nombre: 'WWG Signal Tee', precio: 1450, imagen: 'img/wwg-negro.png', descripcion: 'T-shirt WWG de corte casual con grafica frontal.', tallas: ['S', 'M', 'L', 'XL'], colores: ['negro', 'azul', 'blanco'], imagenes: { negro: 'img/wwg-negro.png', azul: 'img/wwg-azul.png', blanco: 'img/wwg-blanco.png' } },
        { categoria: 'tshirt', nombre: 'Stateside Classic Tee', precio: 1500, imagen: 'img/usa-negro.png', descripcion: 'T-shirt USA con estilo urbano y fit comodo.', tallas: ['S', 'M', 'L', 'XL'], colores: ['negro', 'blanco'], imagenes: { negro: 'img/usa-negro.png', blanco: 'img/usa-blanco.png' } },
        { categoria: 'tshirt', nombre: 'Atelier Polo 03', precio: 1600, imagen: 'img/poloche-3.png', descripcion: 'Poloche premium de textura suave para un look limpio.', tallas: ['S', 'M', 'L', 'XL'], colores: ['unico'] },
        { categoria: 'pantalones', nombre: 'Utility Cargo Pant', precio: 2300, imagen: 'img/cargo-negro.png', descripcion: 'Pantalon cargo con bolsillos utilitarios y fit urbano.', tallas: ['28', '30', '32', '34'], colores: ['negro', 'blanco', 'gris', 'crema', 'oliva'], imagenes: { negro: 'img/cargo-negro.png', blanco: 'img/cargo-blanco.png', gris: 'img/cargo-gris.png', crema: 'img/cargo-crema.png', oliva: 'img/cargo-oliva.png' } },
        { categoria: 'pantalones', nombre: 'Metro Relaxed Pant', precio: 2100, imagen: 'img/pantalon-2.png', descripcion: 'Pantalon casual de silueta moderna para combinaciones streetwear.', tallas: ['28', '30', '32', '34'], colores: ['unico'] },
        { categoria: 'pantalones', nombre: 'Avenue Wide Pant', precio: 2200, imagen: 'img/pantalon-3.png', descripcion: 'Pantalon versatil con caida comoda y acabado contemporaneo.', tallas: ['28', '30', '32', '34'], colores: ['unico'] },
        { categoria: 'accesorios', nombre: 'Crown Logo Cap', precio: 900, imagen: 'img/gorra-negra.png', descripcion: 'Gorra ajustable con logo frontal, ideal para cerrar outfits urbanos.', tallas: [], colores: ['negro', 'blanco'], imagenes: { negro: 'img/gorra-negra.png', blanco: 'img/gorra-blanca.png' } },
        { categoria: 'accesorios', nombre: 'Daily Utility Backpack', precio: 1800, imagen: 'img/mochila.negra.png', descripcion: 'Mochila resistente con espacio amplio para uso diario.', tallas: [], colores: ['negro', 'blanco'], imagenes: { negro: 'img/mochila.negra.png', blanco: 'img/mochila-blanca.png' } },
        { categoria: 'accesorios', nombre: 'Steel Halo Chain', precio: 5000, imagen: 'img/collar-dorado.png', descripcion: 'Collar metalico minimalista para complementar looks streetwear.', tallas: [], colores: ['dorado', 'blanco'], imagenes: { dorado: 'img/collar-dorado.png', blanco: 'img/collar-blanco.png' } }
    ];
}

function pintarProductoEnCard(card, producto) {
    card.dataset.category = producto.categoria;
    card.dataset.nombre = producto.nombre;
    card.dataset.precio = producto.precio;
    card.dataset.imagen = producto.imagen;
    card.dataset.imagenes = JSON.stringify(producto.imagenes || {});
    card.dataset.search = `${producto.nombre} ${producto.categoria} ${producto.descripcion}`.toLowerCase();

    const imagen = card.querySelector('img');
    const titulo = card.querySelector('h3, h4');
    const descripcion = card.querySelector('.descripcion');
    const precio = card.querySelector('.precio');
    const tallas = card.querySelector('.tallas');
    const colores = card.querySelector('.colores');

    if (imagen) {
        imagen.src = producto.imagen;
        imagen.alt = producto.nombre;
    }
    if (titulo) titulo.textContent = producto.nombre;
    if (descripcion) descripcion.textContent = producto.descripcion;
    if (precio) precio.innerHTML = `RD$ <span>${producto.precio.toLocaleString()}</span>`;
    if (tallas) {
        tallas.innerHTML = producto.tallas.map(talla => `<button>${talla}</button>`).join('');
        const opcionTalla = tallas.closest('.opciones');
        if (opcionTalla) opcionTalla.style.display = producto.tallas.length ? '' : 'none';
    }
    if (colores) {
        colores.innerHTML = producto.colores.map(color => `<button class="${color}"></button>`).join('');
    }
}

function crearCardProducto(producto) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <h4>${producto.nombre}</h4>
        <p class="descripcion">${producto.descripcion}</p>
        <p class="precio">RD$ <span>${producto.precio.toLocaleString()}</span></p>
        <div class="opciones">
            <p>Talla:</p>
            <div class="tallas"></div>
        </div>
        <div class="opciones">
            <p>Color:</p>
            <div class="colores"></div>
        </div>
        <button class="btn-comprar" onclick="agregarProducto(this)">Agregar al carrito</button>
    `;
    pintarProductoEnCard(card, producto);
    return card;
}

// =========================================
// FILTRO DE CATEGORIAS
// =========================================
function configurarCategorias() {
    const botonesCategoria = document.querySelectorAll('.category-btn');
    const gridsProductos = document.querySelectorAll('#productos .grid-productos');
    const gridProductos = gridsProductos[0];

    if (!botonesCategoria.length || !gridProductos) return;

    const catalogo = obtenerCatalogoProductos();

    const plantilla = gridProductos.querySelector('.card');
    if (!plantilla) return;

    gridsProductos.forEach((grid, index) => {
        if (index === 0) return;

        grid.querySelectorAll('.card').forEach(card => {
            gridProductos.appendChild(card);
        });

        const article = grid.closest('article');
        if (article) article.remove();
    });

    while (gridProductos.querySelectorAll('.card').length < catalogo.length) {
        gridProductos.appendChild(plantilla.cloneNode(true));
    }

    const productos = gridProductos.querySelectorAll('.card');

    productos.forEach((card, index) => {
        const producto = catalogo[index];
        if (!producto) {
            card.remove();
            return;
        }

        pintarProductoEnCard(card, producto);
    });

    function filtrarCategoria(categoria) {
        productos.forEach(card => {
            const visible = card.dataset.category === categoria;
            card.classList.toggle('is-hidden', !visible);
        });
    }

    botonesCategoria.forEach(btn => {
        btn.addEventListener('click', () => {
            botonesCategoria.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filtrarCategoria(btn.dataset.category);
        });
    });

    const activa = document.querySelector('.category-btn.active') || botonesCategoria[0];
    filtrarCategoria(activa.dataset.category);
}

function configurarCatalogo() {
    const gridCatalogo = document.querySelector('.catalog-page .grid-productos');
    if (!gridCatalogo) return;

    gridCatalogo.innerHTML = '';
    obtenerCatalogoProductos().forEach(producto => {
        gridCatalogo.appendChild(crearCardProducto(producto));
    });
}

function configurarBuscadorCatalogo() {
    const catalogPage = document.querySelector('.catalog-page');
    const form = document.querySelector('.catalog-page .search-box');
    const input = document.querySelector('.catalog-page .search-box input');
    const grid = document.querySelector('.catalog-page .grid-productos');

    if (!catalogPage || !form || !input || !grid) return;

    let empty = document.querySelector('.catalog-empty');
    if (!empty) {
        empty = document.createElement('p');
        empty.className = 'catalog-empty';
        empty.textContent = 'No encontramos productos con esa busqueda.';
        empty.hidden = true;
        grid.after(empty);
    }

    function filtrar() {
        const termino = input.value.trim().toLowerCase();
        const cards = grid.querySelectorAll('.card');
        let visibles = 0;

        cards.forEach(card => {
            const texto = card.dataset.search || card.textContent.toLowerCase();
            const visible = !termino || texto.includes(termino);
            card.classList.toggle('is-hidden', !visible);
            if (visible) visibles++;
        });

        empty.hidden = visibles > 0;
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        filtrar();
    });

    input.addEventListener('input', filtrar);
}

// =========================================
// LÓGICA DEL CARRITO (AGREGAR)
// =========================================
// Esta función se llama desde el HTML: onclick="agregarProducto(this)"
window.agregarProducto = function(btn) {
    const card = btn.closest('.card');
    
    // Obtener datos del dataset
    const nombre = card.dataset.nombre;
    const precio = parseInt(card.dataset.precio);
    const imagen = card.dataset.imagen || card.querySelector('img').src;

    // Obtener selecciones
    const btnTalla = card.querySelector('.tallas button.active');
    const btnColor = card.querySelector('.colores button.active');

    if ((!btnTalla && card.dataset.category !== 'accesorios') || !btnColor) {
        alert("Por favor, selecciona una talla y un color para " + nombre);
        return;
    }

    const talla = btnTalla ? btnTalla.textContent : 'Unica';
    // Tomamos la primera clase del botón de color (ej. "negro", "blanco")
    const color = btnColor.classList[0]; 

    const productoNuevo = {
        id: `${nombre}-${talla}-${color}`, // ID único basado en las opciones
        nombre: nombre,
        precio: precio,
        imagen: imagen,
        talla: talla,
        color: color,
        cantidad: 1
    };

    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Verificar si ya existe el mismo producto con la misma talla y color
    const indexExistente = carrito.findIndex(p => p.id === productoNuevo.id);

    if (indexExistente !== -1) {
        carrito[indexExistente].cantidad += 1; // Aumentar cantidad
    } else {
        carrito.push(productoNuevo); // Agregar nuevo
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContadorCesta();
    
    // Feedback visual opcional
    const textoOriginal = btn.textContent;
    btn.textContent = "¡Agregado!";
    btn.style.backgroundColor = "var(--accent-color)";
    setTimeout(() => {
        btn.textContent = textoOriginal;
        btn.style.backgroundColor = "";
    }, 1500);
}

// =========================================
// OUTFITS COMPLETOS
// =========================================
window.agregarOutfit = function(btn) {
    const card = btn.closest('.outfit-card');
    if (!card) return;

    const nombre = card.dataset.nombre;
    const precio = parseInt(card.dataset.precio);
    const imagen = card.dataset.imagen || card.querySelector('img').src;

    const productoNuevo = {
        id: `${nombre}-outfit-completo`,
        nombre: nombre,
        precio: precio,
        imagen: imagen,
        talla: 'Set completo',
        color: 'Seleccionado',
        cantidad: 1
    };

    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const indexExistente = carrito.findIndex(p => p.id === productoNuevo.id);

    if (indexExistente !== -1) {
        carrito[indexExistente].cantidad += 1;
    } else {
        carrito.push(productoNuevo);
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContadorCesta();

    const textoOriginal = btn.textContent;
    btn.textContent = 'Agregado';
    setTimeout(() => {
        btn.textContent = textoOriginal;
    }, 1400);
}

function configurarCarruselOutfits() {
    const slider = document.querySelector('.outfits-slider');
    const prev = document.querySelector('.outfit-prev');
    const next = document.querySelector('.outfit-next');

    if (!slider || !prev || !next) return;

    function mover(direccion) {
        const card = slider.querySelector('.outfit-card');
        const distancia = card ? card.offsetWidth + 18 : 320;
        slider.scrollBy({ left: distancia * direccion, behavior: 'smooth' });
    }

    prev.addEventListener('click', () => mover(-1));
    next.addEventListener('click', () => mover(1));
}

function actualizarContadorCesta() {
    const contadores = document.querySelectorAll('.cart-count');
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
    // Sumar la cantidad total de artículos
    const totalArticulos = carrito.reduce((acc, prod) => acc + prod.cantidad, 0);
    
    contadores.forEach(contador => {
        contador.textContent = totalArticulos;
    });
}

// =========================================
// LÓGICA DEL CARRITO (RENDERIZAR EN CESTA.HTML)
// =========================================
function renderizarCarrito() {
    // Verificar si estamos en la página del carrito buscando el contenedor principal
    const contenedorCarrito = document.querySelector('.carrito-container');
    
    // Si no estamos en cesta.html, salir de la función
    if (!contenedorCarrito || document.querySelector('.carrito-total') === null) return; 

    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
    // Limpiar el contenedor actual (manteniendo el h1 y la sección de total)
    const itemsActuales = document.querySelectorAll('.carrito-item');
    itemsActuales.forEach(item => item.remove());

    let totalDinero = 0;
    let mensajeWhatsApp = "Hola S7E11N, me gustaría hacer el siguiente pedido:%0A";

    if (carrito.length === 0) {
        const mensajeVacio = document.createElement('p');
        mensajeVacio.textContent = "Tu carrito está vacío.";
        mensajeVacio.classList.add('carrito-item');
        document.querySelector('h1').after(mensajeVacio);
    } else {
        // Invertir el array para insertar después del H1 en orden correcto
        carrito.forEach((producto, index) => {
            totalDinero += (producto.precio * producto.cantidad);
            mensajeWhatsApp += `- ${producto.cantidad}x ${producto.nombre} (Talla: ${producto.talla}, Color: ${producto.color}) - RD$ ${producto.precio * producto.cantidad}%0A`;

            const itemHTML = document.createElement('div');
            itemHTML.classList.add('carrito-item');
            itemHTML.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <div class="info">
                    <h3>${producto.nombre}</h3>
                    <p>Talla: ${producto.talla}</p>
                    <p>Color: ${producto.color}</p>
                </div>
                <div class="cantidad">
                    <button onclick="cambiarCantidad(${index}, -1)">-</button>
                    <span>${producto.cantidad}</span>
                    <button onclick="cambiarCantidad(${index}, 1)">+</button>
                </div>
                <p class="precio">RD$ ${producto.precio * producto.cantidad}</p>
                <button class="eliminar" onclick="eliminarProducto(${index})"><i class="fa-solid fa-trash"></i></button>
            `;
            // Insertar justo después del H1
            document.querySelector('h1').after(itemHTML);
        });
    }

    // Actualizar el total y el enlace de WhatsApp
    const h2Total = document.querySelector('.carrito-total h2');
    if(h2Total) h2Total.textContent = `Total: RD$ ${totalDinero.toLocaleString()}`;

    mensajeWhatsApp += `%0ATotal: RD$ ${totalDinero.toLocaleString()}`;
    const btnWhatsapp = document.querySelector('.carrito-total .btn-comprar');
    if(btnWhatsapp) {
        // Asegúrate de cambiar '1809XXXXXXX' por el número real en tu HTML, aquí solo actualizamos el texto dinámico.
        const numeroBase = btnWhatsapp.href.split('?')[0]; 
        btnWhatsapp.href = `${numeroBase}?text=${mensajeWhatsApp}`;
    }
}

window.cambiarCantidad = function(index, cambio) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
    if (carrito[index]) {
        carrito[index].cantidad += cambio;
        
        if (carrito[index].cantidad <= 0) {
            carrito.splice(index, 1); // Eliminar si la cantidad llega a 0
        }
        
        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarContadorCesta();
        renderizarCarrito(); // Recargar la vista
    }
}

window.eliminarProducto = function(index) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContadorCesta();
    renderizarCarrito();
}

// Configuración de Idioma y Moneda
const configS7 = {
    tasaCambio: 60, // 1 USD = 60 RD$
    actual: 'es',
    traducciones: {
        es: {
            buscar: "Buscar...",
            agregar: "AÑADIR",
            outfit: "AÑADIR OUTFIT",
            total: "Total: RD$ ",
            finalizar: "PAGAR POR WHATSAPP",
            monedaSymbol: "RD$ "
        },
        en: {
            buscar: "Search...",
            agregar: "ADD TO CART",
            outfit: "ADD OUTFIT",
            total: "Total: USD$ ",
            finalizar: "CHECKOUT VIA WHATSAPP",
            monedaSymbol: "USD$ "
        }
    }
};

function cambiarConfiguracion(lang) {
    const data = configS7.traducciones[lang];
    configS7.actual = lang;

    // 1. Cambiar Placeholders
    const searchInput = document.querySelector('.search-box input');
    if (searchInput) searchInput.placeholder = data.buscar;

    // 2. Cambiar botones por zona sin afectar acciones diferentes.
    document.querySelectorAll('#productos .btn-comprar').forEach(btn => {
        btn.innerText = data.agregar;
    });

    document.querySelectorAll('.outfit-card .btn-comprar').forEach(btn => {
        btn.innerText = data.outfit;
    });

    const checkout = document.querySelector('.carrito-total .btn-comprar');
    if (checkout) checkout.innerText = data.finalizar;

    // 3. Convertir precios del carrito si esta pagina los muestra.
    actualizarPreciosCarrito(lang);
}

function actualizarPreciosCarrito(lang) {
    const totalElement = document.querySelector('.carrito-total h2');
    if (!totalElement) return;

    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let totalRD = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);

    if (lang === 'en') {
        let totalUSD = (totalRD / configS7.tasaCambio).toFixed(2);
        totalElement.innerText = `Total: USD$ ${totalUSD}`;
    } else {
        totalElement.innerText = `Total: RD$ ${totalRD.toLocaleString()}`;
    }
}

// Inicializar el escuchador
document.addEventListener('DOMContentLoaded', () => {
    const selector = document.querySelector('.select-minimal');
    if (selector) {
        selector.addEventListener('change', (e) => {
            const val = e.target.value.toLowerCase();
            if (val.includes('english') || val.includes('usd')) {
                cambiarConfiguracion('en');
            } else {
                cambiarConfiguracion('es');
            }
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {

    const slides = document.querySelectorAll(".slide");
    const next = document.querySelector(".next");
    const prev = document.querySelector(".prev");

    if (!slides.length || !next || !prev) return;

    let index = 0;

    function showSlide(i){

        slides.forEach(slide => {
            slide.classList.remove("active");
        });

        slides[i].classList.add("active");
    }

    next.addEventListener("click", () => {

        index++;

        if(index >= slides.length){
            index = 0;
        }

        showSlide(index);
    });

    prev.addEventListener("click", () => {

        index--;

        if(index < 0){
            index = slides.length - 1;
        }

        showSlide(index);
    });

    // AUTOMÁTICO

    setInterval(() => {

        index++;

        if(index >= slides.length){
            index = 0;
        }

        showSlide(index);

    }, 5000);

});
// =====================================
// HEADER SCROLL
// =====================================

const header = document.getElementById("main-header");

let lastScroll = 0;

window.addEventListener("scroll", () => {

    if (!header) return;

    const currentScroll = window.pageYOffset;

    if(currentScroll > 50){
        header.classList.add("scrolled");
    }else{
        header.classList.remove("scrolled");
    }

    if(currentScroll > lastScroll){
        header.classList.add("header-hidden");
    }else{
        header.classList.remove("header-hidden");
    }

    lastScroll = currentScroll;
});