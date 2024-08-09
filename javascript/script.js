// ---------------- TUTORIAL -------------------
/*document.addEventListener('DOMContentLoaded', function () {
    const btnOpen = document.querySelector('.tutorial__btn');
    const overlay = document.querySelector('.tutorial__overlay');
    const btnClose = document.querySelector('#closeTutorial');

    btnOpen.addEventListener('click', function () {
        overlay.style.display = 'block';
    });

    btnClose.addEventListener('click', function () {
        overlay.style.display = 'none';
    });
});*/


// ------------------ CATEGORIAS -----------------------

document.addEventListener('DOMContentLoaded', function () {
    const categoriasButtons = document.querySelectorAll('.categorias__button');
    const comidasSections = document.querySelectorAll('.comida');

    categoriasButtons.forEach(button => {
        button.addEventListener('click', function () {
            const categoriaId = button.id;

            // Ocultar todas las secciones de comida excepto la que corresponde a la categoría seleccionada
            comidasSections.forEach(seccion => {
                if (categoriaId === 'todo' || seccion.id === categoriaId) {
                    seccion.style.display = 'flex'; // Mostrar la sección correspondiente
                } else {
                    seccion.style.display = 'none'; // Ocultar las demás secciones
                }
            });

            // Encontrar la primera sección visible para hacer scroll hacia ella
            const seccionVisible = Array.from(comidasSections).find(seccion => {
                return seccion.style.display !== 'none';
            });

            // Hacer scroll suave hacia la sección visible
            if (seccionVisible) {
                seccionVisible.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    });
});




// -------------- carrito -----------------------------


document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM completamente cargado y parseado.');

    const carritoButton = document.querySelector('.carrito');
    const pedidoDiv = document.querySelector('.pedido');
    const cerrarButton = document.querySelector('.cerrar');

    if (carritoButton) {
        carritoButton.addEventListener('click', () => {
            console.log('Botón carrito clicado.');
            pedidoDiv.classList.add('mostrar');
        });
    } else {
        console.error('No se encontró el botón carrito.');
    }

    if (cerrarButton) {
        cerrarButton.addEventListener('click', () => {
            console.log('Botón cerrar clicado.');
            pedidoDiv.classList.remove('mostrar');
        });
    } else {
        console.error('No se encontró el botón cerrar.');
    }
});



// -------------- AGREGAR CANTIDAD INPUT -------------

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.input-container').forEach(function(container) {
        const decrementButton = container.querySelector('.btn-decrement');
        const incrementButton = container.querySelector('.btn-increment');
        const inputNumber = container.querySelector('.comidas__inputNumber');

        decrementButton.addEventListener('click', function() {
            let currentValue = parseInt(inputNumber.value) || 0;
            if (currentValue > 0) {
                inputNumber.value = currentValue - 1;
            }
        });

        incrementButton.addEventListener('click', function() {
            let currentValue = parseInt(inputNumber.value) || 0;
            inputNumber.value = currentValue + 1;
        });

        // Evitar que el usuario ingrese un número menor que 0 manualmente
        inputNumber.addEventListener('input', function() {
            if (inputNumber.value < 0) {
                inputNumber.value = 0;
            }
        });
    });
});


// ----------------------- VER MAS ----------------------------


document.addEventListener("DOMContentLoaded", function () {
    const itemsPerPage = 50;
    let currentPage = 1;
    
    const items = document.querySelectorAll('.comida');
    const button = document.getElementById('verMasBtn');
    
    function showItems() {
        const start = (currentPage - 1) * itemsPerPage;
        const end = currentPage * itemsPerPage;

        items.forEach((item, index) => {
            if (index >= start && index < end) {
                item.style.display = 'block';
            }
        });

        if (end >= items.length) {
            button.style.display = 'none';
        } else {
            currentPage++;
        }
    }

    // Inicialmente ocultar todos los elementos
    items.forEach(item => item.style.display = 'none');

    // Mostrar los primeros elementos
    showItems();

    // Agregar evento al botón "Ver más"
    button.addEventListener('click', showItems);
});



// ---------------- lista de pedidos -------------------------



document.addEventListener('DOMContentLoaded', function () {
    // Selección de elementos del DOM
    const botonesComida = document.querySelectorAll('.comida__cta');
    const pedidoContainer = document.querySelector('.pedido__container');
    const nuevoLightbox = document.getElementById('nuevo-lightbox');
    const cerrarLightbox = document.getElementById('cerrar-lightbox');
    const enviarPedido = document.getElementById('pedido__enviar-nuevo');
    const enviarPedidoLocal = document.getElementById('pedido__enviar-nuevo-local'); // Este ID no existe en el HTML
    const enviarPedidoLocal2 = document.getElementById('pedido__enviar-nuevo-local2'); // ID correcto
    const direccionInput = document.getElementById('direccion-nuevo');
    const callesInput = document.getElementById('calles-nuevo');
    const pisoInput = document.getElementById('piso-nuevo');
    const nombreInput = document.getElementById('nombre-nuevo');
    const mensajeInput = document.getElementById('mensaje-nuevo');
    const nombreInput2 = document.getElementById('nombre-nuevo-2');
    const totalPedidoElement = document.getElementById('total');

    // Verificar si los elementos necesarios están presentes
    if (botonesComida.length > 0 && pedidoContainer && totalPedidoElement) {
        let totalAcumulado = 0; // Variable para almacenar el total acumulado de los pedidos
        const detallesPedido = []; // Array para almacenar los detalles del pedido

        // Event Listener para los botones de comida
        botonesComida.forEach(function (boton) {
            boton.addEventListener('click', function (event) {
                event.preventDefault(); // Evitar comportamiento por defecto del botón

                // Obtener los elementos relevantes del pedido actual
                const comida = this.parentElement.querySelector('.comida__name').textContent.trim();
                const cantidad = parseInt(this.parentElement.querySelector('.comidas__inputNumber').value, 10);
                const precioString = this.parentElement.querySelector('.comida__precio').textContent.trim();
                const precio = parseFloat(precioString.slice(1));

                // Validar que la cantidad sea un número válido y mayor que cero
                if (!isNaN(cantidad) && cantidad > 0) {
                    const total = cantidad * precio;
                    totalAcumulado += total;
                    totalPedidoElement.textContent = `TOTAL: $${totalAcumulado.toLocaleString('es-ES', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

                    // Crear un nuevo elemento para mostrar el detalle del pedido
                    const detallePedido = document.createElement('div');
                    detallePedido.classList.add('pedido__item');
                    detallePedido.innerHTML = `
                        <span class="pedido__cantidad">${cantidad}</span>
                        <span class="pedido__producto">${comida}</span>
                        <span class="pedido__precio">$${total.toFixed(0)}</span>
                    `;

                    const botonQuitar = document.createElement('button');
                    botonQuitar.textContent = 'Quitar';
                    botonQuitar.classList.add('quitar__pedido');
                    detallePedido.appendChild(botonQuitar);

                    pedidoContainer.appendChild(detallePedido);

                    botonQuitar.addEventListener('click', function () {
                        totalAcumulado -= total;
                        totalPedidoElement.textContent = `TOTAL: $${totalAcumulado.toFixed(0)}`;
                        pedidoContainer.removeChild(detallePedido);
                        const index = detallesPedido.indexOf(detallePedido);
                        if (index !== -1) detallesPedido.splice(index, 1);
                    });

                    detallesPedido.push(detallePedido);
                    mostrarMensaje('Pedido agregado');
                    this.parentElement.querySelector('.comidas__inputNumber').value = '';
                } else {
                    alert('Ingrese una cantidad válida.');
                }
            });
        });

        // Event Listener para el botón de enviar pedido (delivery)
        enviarPedido.addEventListener('click', function () {
            const phoneNumber = '543815411429';  // Tu número de teléfono
            const nombre = nombreInput.value;
            const mensaje = mensajeInput.value;
            const direccion = direccionInput.value;
            const calles = callesInput.value;
            const piso = pisoInput.value;

            if (detallesPedido.length > 0 && nombre.trim() !== '' && direccion.trim() !== '' && calles.trim() !== '') {
                const mensajeConfirmacion = construirMensajeConfirmacion(nombre, mensaje, direccion, calles, piso, totalAcumulado, detallesPedido);
                const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(mensajeConfirmacion)}`;
                window.open(whatsappURL, '_blank');
                alert('Pedido enviado por WhatsApp');
                nuevoLightbox.style.display = 'none';
                nombreInput.value = '';
                mensajeInput.value = '';
                direccionInput.value = '';
                callesInput.value = '';
                pisoInput.value = '';
                pedidoContainer.innerHTML = '';
                totalPedidoElement.textContent = 'TOTAL: $0.00';
                totalAcumulado = 0;
                detallesPedido.length = 0;
            } else {
                alert('Agregue al menos un pedido y complete los campos requeridos.');
            }
        });

        // Event Listener para el nuevo botón de enviar pedido (retiro en local)
        enviarPedidoLocal2.addEventListener('click', function () {
            const nombre = nombreInput2.value; // Obtener el valor del nuevo campo
            if (detallesPedido.length > 0 && nombre.trim() !== '') {
                const mensajeConfirmacionLocal2 = construirMensajeConfirmacionLocal2(nombre, detallesPedido);
                const whatsappURL = `https://wa.me/543815411429?text=${encodeURIComponent(mensajeConfirmacionLocal2)}`;
                window.open(whatsappURL, '_blank');
                alert('Pedido para retiro en local enviado por WhatsApp');
                nombreInput2.value = ''; // Limpiar el nuevo campo
                pedidoContainer.innerHTML = '';
                totalPedidoElement.textContent = 'TOTAL: $0.00';
                totalAcumulado = 0;
                detallesPedido.length = 0;
            } else {
                alert('Agregue al menos un pedido y complete el nombre.');
            }
        });

        // Event Listener para cerrar el lightbox
        cerrarLightbox.addEventListener('click', function () {
            nuevoLightbox.style.display = 'none';
        });

        // Función para mostrar mensajes emergentes
        function mostrarMensaje(mensaje) {
            const mensajePopup = document.querySelector('.mensaje__popup');
            mensajePopup.style.display = 'block';
            mensajePopup.classList.add('show');
            setTimeout(function () {
                mensajePopup.classList.remove('show');
                setTimeout(function () {
                    mensajePopup.style.display = 'none';
                }, 500);
            }, 1000);
        }

        // Función para construir el mensaje de confirmación para el delivery
        function construirMensajeConfirmacion(nombre, mensaje, direccion, calles, piso, total, detalles) {
            let mensajeConfirmacion = `*¡Nuevo pedido para enviar!*\n`;
            mensajeConfirmacion += `*Nombre:* ${nombre}\n`;
            mensajeConfirmacion += `*Dirección:* ${direccion}\n`;
            mensajeConfirmacion += `*Entre calles*: ${calles}\n`;
            if (piso.trim() !== '') {
                mensajeConfirmacion += `*Piso:* ${piso}\n`;
            }
            if (mensaje.trim() !== '') {
                mensajeConfirmacion += `*Mensaje opcional:* ${mensaje}\n\n`;
            }
            mensajeConfirmacion += `*Detalles del pedido*:\n`;
            detalles.forEach(function (detalle) {
                const cantidad = detalle.querySelector('.pedido__cantidad').textContent.trim();
                const producto = detalle.querySelector('.pedido__producto').textContent.trim();
                const precio = detalle.querySelector('.pedido__precio').textContent.trim();
                mensajeConfirmacion += `${cantidad} ${producto} - ${precio}\n`;
            });
            mensajeConfirmacion += `\n*TOTAL:* $${total.toLocaleString('es-ES', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}\n\n`;
            mensajeConfirmacion += `También puedes abonar por transferencia:\n`;
            mensajeConfirmacion += `*Alias:* lepa2024\n`;
            mensajeConfirmacion += `*CBU:* 00231005669870000000\n`;
            mensajeConfirmacion += `--Recuerda adjuntar el comprobante por aquí.--\n`;
            return mensajeConfirmacion;
        }

        // Función para construir el mensaje de confirmación para retiro en local
        function construirMensajeConfirmacionLocal2(nombre, detalles) {
            let mensajeConfirmacionLocal2 = `*¡Nuevo pedido para retirar en local!*\n`;
            mensajeConfirmacionLocal2 += `*Nombre de quien retira:* ${nombre}\n\n`;
            mensajeConfirmacionLocal2 += `*Detalles del pedido*:\n`;
            detalles.forEach(function (detalle) {
                const cantidad = detalle.querySelector('.pedido__cantidad').textContent.trim();
                const producto = detalle.querySelector('.pedido__producto').textContent.trim();
                const precio = detalle.querySelector('.pedido__precio').textContent.trim();
                mensajeConfirmacionLocal2 += `${cantidad} ${producto} - ${precio}\n`;
            });
            mensajeConfirmacionLocal2 += `\n*TOTAL:* $${totalAcumulado.toLocaleString('es-ES', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}\n\n`;
            mensajeConfirmacionLocal2 += `*Horario para retirar tu pedido:* Lunes a viernes de 9:00 a 13:hs y de 17:00 a 20:30hs:\n`;
            mensajeConfirmacionLocal2 += `*Estamos en Avenida Independencia 2359*\n`;
            mensajeConfirmacionLocal2 += `También puedes abonar por transferencia:\n`;
            mensajeConfirmacionLocal2 += `*Alias:* lepa2024\n`;
            mensajeConfirmacionLocal2 += `*CBU:* 00231005669870000000\n`;
            mensajeConfirmacionLocal2 += `--Recuerda adjuntar el comprobante por aqui.--\n`;
            return mensajeConfirmacionLocal2;
        }
    } else {
        console.error('Faltan elementos necesarios en el DOM.');
    }
});




// --------------------- DELIVERY O LOCAL -------------------------




document.addEventListener('DOMContentLoaded', () => {
    const deliveryButton = document.querySelector('.delivery');
    const confirmacionDiv = document.querySelector('.inputs__confirmacion');
    const botonHouse = document.querySelector('.house');
    const retiroLocal = document.querySelector('.retiroLOCAL');

    if (deliveryButton && confirmacionDiv && botonHouse && retiroLocal) {
        deliveryButton.addEventListener('click', () => {
            // Ocultar el contenedor de retiro local si está visible
            if (retiroLocal.classList.contains('visible')) {
                retiroLocal.classList.remove('visible');
            }
            // Alternar la visibilidad del contenedor de confirmación
            confirmacionDiv.classList.toggle('activo');
        });

        botonHouse.addEventListener('click', () => {
            // Ocultar el contenedor de confirmación si está visible
            if (confirmacionDiv.classList.contains('activo')) {
                confirmacionDiv.classList.remove('activo');
            }
            // Alternar la visibilidad del contenedor de retiro local
            retiroLocal.classList.toggle('visible');
        });
    } else {
        console.error('Uno o más elementos no se encontraron en el DOM.');
    }
});










// ----------------- cerrar lightbox --------------


document.addEventListener('DOMContentLoaded', function () {
    const pedidoConfirmar = document.getElementById('pedido__confirmar');
    const nuevoLightbox = document.getElementById('nuevo-lightbox');
    const cerrarLightbox = document.getElementById('cerrar-lightbox');

    pedidoConfirmar.addEventListener('click', function () {
        nuevoLightbox.style.display = 'block';
    });

    cerrarLightbox.addEventListener('click', function () {
        nuevoLightbox.style.display = 'none';
    });
});
