document.addEventListener("DOMContentLoaded", () => {
    // 1. LOGIN (1 Administrador y 1 Cliente)
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const usuario = document.getElementById("usuario").value.trim();
            const password = document.getElementById("password").value.trim();
            const mensajeError = document.getElementById("mensajeError");

            if (usuario === "" || password === "") {
                mensajeError.textContent = "Completa el usuario y la contraseña.";
                return;
            }

            if (usuario === "admin" && password === "12345") {
                localStorage.setItem("usuarioActivo", "admin");
                localStorage.setItem("rolUsuario", "admin");
                window.location.href = "pages/inicio.html";
            } else if (usuario === "cliente" && password === "autos123") {
                localStorage.setItem("usuarioActivo", "cliente");
                localStorage.setItem("rolUsuario", "cliente");
                window.location.href = "pages/inicio.html";
            } else {
                mensajeError.textContent = "Usuario o contraseña incorrectos.";
            }
        });
    }

    // 2. SESIÓN Y PERMISOS
    const btnCerrarSesion = document.getElementById("btnCerrarSesion");
    if (btnCerrarSesion) {
        const usuarioActivo = localStorage.getItem("usuarioActivo");
        const rolUsuario = localStorage.getItem("rolUsuario");

        if (!usuarioActivo || !rolUsuario) {
            window.location.href = "../index.html";
            return;
        }

        const userDisplay = document.getElementById("userDisplay");
        if (userDisplay) {
            userDisplay.textContent = `${usuarioActivo} (${rolUsuario})`;
        }

        if (rolUsuario === "cliente") {
            document.querySelectorAll(".solo-admin").forEach((el) => {
                el.style.display = "none";
            });
            if (window.location.pathname.includes("clientes.html")) {
                window.location.href = "inicio.html";
            }
        }

        btnCerrarSesion.addEventListener("click", (e) => {
            e.preventDefault();
            localStorage.removeItem("usuarioActivo");
            localStorage.removeItem("rolUsuario");
            window.location.href = "../index.html";
        });
    }

    // 3. MENÚ CELULAR
    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");
    if (menuToggle && mainNav) {
        menuToggle.addEventListener("click", () => {
            mainNav.classList.toggle("active");
        });
    }

    // 4. FILTRO POR TIPO DE AUTO (autos.html)
    const filterButtons = document.querySelectorAll(".filter-btn");
    const autoCards = document.querySelectorAll(".auto-card[data-categoria]");

    filterButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            filterButtons.forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");

            const filtro = btn.getAttribute("data-filter");
            autoCards.forEach((card) => {
                const categoria = card.getAttribute("data-categoria");
                card.style.display =
                    filtro === "todos" || categoria === filtro ? "block" : "none";
            });
        });
    });

    // 5. COMPRA / RESERVA DE AUTO (autos.html)
    const botonesComprar = document.querySelectorAll(".btn-comprar");
    const autoInput = document.getElementById("autoSeleccionado");
    const precioInput = document.getElementById("precioSeleccionado");
    const formCompra = document.getElementById("formCompra");

    botonesComprar.forEach((btn) => {
        btn.addEventListener("click", () => {
            if (autoInput) autoInput.value = btn.getAttribute("data-auto");
            if (precioInput) precioInput.value = "$us " + btn.getAttribute("data-precio");
        });
    });

    if (formCompra) {
        formCompra.addEventListener("submit", (e) => {
            e.preventDefault();
            const comprador = document.getElementById("compradorNombre").value.trim();
            const pago = document.getElementById("metodoPago").value;
            const confirmacion = document.getElementById("confirmacionCompra");

            if (!autoInput.value) {
                confirmacion.style.color = "#9f1239";
                confirmacion.style.backgroundColor = "#ffe4e6";
                confirmacion.textContent = "Selecciona un auto primero.";
                return;
            }

            confirmacion.style.color = "#166534";
            confirmacion.style.backgroundColor = "#dcfce7";
            confirmacion.textContent = `Listo: ${autoInput.value} para ${comprador} (${pago}).`;
            formCompra.reset();
        });
    }

    // 6. REGISTRO DE CLIENTES (clientes.html)
    const formCliente = document.getElementById("formCliente");
    const tablaClientes = document.getElementById("tablaClientes");

    if (formCliente && tablaClientes) {
        formCliente.addEventListener("submit", (e) => {
            e.preventDefault();
            const ci = document.getElementById("cliCi").value.trim();
            const nombre = document.getElementById("cliNombre").value.trim();
            const tel = document.getElementById("cliTel").value.trim();
            const auto = document.getElementById("cliAuto").value.trim();

            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${ci}</td>
                <td>${nombre}</td>
                <td>${tel}</td>
                <td>${auto}</td>
            `;
            tablaClientes.appendChild(fila);
            formCliente.reset();
        });
    }
});document.addEventListener("DOMContentLoaded", () => {
    // 1. LOGIN POR ROL (index.html)
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const usuario = document.getElementById("usuario").value.trim();
            const password = document.getElementById("password").value.trim();
            const mensajeError = document.getElementById("mensajeError");

            if (usuario === "" || password === "") {
                mensajeError.textContent = "Completa el usuario y la contraseña.";
                return;
            }

            const esAdmin =
                (usuario === "admin" || usuario === "admin@automotors.bo") &&
                password === "12345";

            const esComprador =
                (usuario === "cliente" || usuario === "cliente@automotors.bo") &&
                password === "autos123";

            if (esAdmin) {
                localStorage.setItem("usuarioActivo", usuario);
                localStorage.setItem("rolUsuario", "admin");
                window.location.href = "pages/inicio.html";
            } else if (esComprador) {
                localStorage.setItem("usuarioActivo", usuario);
                localStorage.setItem("rolUsuario", "comprador");
                window.location.href = "pages/inicio.html";
            } else {
                mensajeError.textContent = "Usuario o contraseña incorrectos.";
            }
        });
    }

    // 2. SESIÓN Y PERMISOS
    const btnCerrarSesion = document.getElementById("btnCerrarSesion");
    if (btnCerrarSesion) {
        const usuarioActivo = localStorage.getItem("usuarioActivo");
        const rolUsuario = localStorage.getItem("rolUsuario");

        if (!usuarioActivo || !rolUsuario) {
            window.location.href = "../index.html";
            return;
        }

        const userDisplay = document.getElementById("userDisplay");
        if (userDisplay) {
            userDisplay.textContent = `${usuarioActivo} (${rolUsuario})`;
        }

        if (rolUsuario === "comprador") {
            document.querySelectorAll(".solo-admin").forEach((el) => {
                el.style.display = "none";
            });
            if (window.location.pathname.includes("clientes.html")) {
                window.location.href = "inicio.html";
            }
        }

        btnCerrarSesion.addEventListener("click", (e) => {
            e.preventDefault();
            localStorage.removeItem("usuarioActivo");
            localStorage.removeItem("rolUsuario");
            window.location.href = "../index.html";
        });
    }

    // 3. MENÚ CELULAR
    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");
    if (menuToggle && mainNav) {
        menuToggle.addEventListener("click", () => {
            mainNav.classList.toggle("active");
        });
    }

    // 4. FILTRO POR CATEGORÍA DE AUTO (autos.html)
    const filterButtons = document.querySelectorAll(".filter-btn");
    const autoCards = document.querySelectorAll(".auto-card[data-categoria]");

    filterButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            filterButtons.forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");

            const filtro = btn.getAttribute("data-filter");
            autoCards.forEach((card) => {
                const categoria = card.getAttribute("data-categoria");
                card.style.display =
                    filtro === "todos" || categoria === filtro ? "block" : "none";
            });
        });
    });

    // 5. SELECCIÓN Y COMPRA/VENTA DE AUTOS (autos.html)
    const botonesComprar = document.querySelectorAll(".btn-comprar");
    const autoInput = document.getElementById("autoSeleccionado");
    const precioInput = document.getElementById("precioSeleccionado");
    const formCompra = document.getElementById("formCompra");

    botonesComprar.forEach((btn) => {
        btn.addEventListener("click", () => {
            if (autoInput) autoInput.value = btn.getAttribute("data-auto");
            if (precioInput) precioInput.value = "$us " + btn.getAttribute("data-precio");
        });
    });

    if (formCompra) {
        formCompra.addEventListener("submit", (e) => {
            e.preventDefault();
            const comprador = document.getElementById("compradorNombre").value.trim();
            const pago = document.getElementById("metodoPago").value;
            const confirmacion = document.getElementById("confirmacionCompra");

            if (!autoInput.value) {
                confirmacion.style.color = "#9b001c";
                confirmacion.style.backgroundColor = "#ffe5e9";
                confirmacion.textContent = "Primero selecciona un auto del catálogo.";
                return;
            }

            confirmacion.style.color = "#15803d";
            confirmacion.style.backgroundColor = "#dcfce7";
            confirmacion.textContent = `Solicitud registrada: ${autoInput.value} para ${comprador} (${pago}).`;
            formCompra.reset();
        });
    }

    // 6. REGISTRO DE CLIENTES (clientes.html)
    const formCliente = document.getElementById("formCliente");
    const tablaClientes = document.getElementById("tablaClientes");

    if (formCliente && tablaClientes) {
        formCliente.addEventListener("submit", (e) => {
            e.preventDefault();
            const ci = document.getElementById("cliCi").value.trim();
            const nombre = document.getElementById("cliNombre").value.trim();
            const tel = document.getElementById("cliTel").value.trim();
            const auto = document.getElementById("cliAuto").value.trim();

            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${ci}</td>
                <td>${nombre}</td>
                <td>${tel}</td>
                <td>${auto}</td>
            `;
            tablaClientes.appendChild(fila);
            formCliente.reset();
        });
    }
});document.addEventListener("DOMContentLoaded", () => {
    // 1. VALIDACIÓN DE LOGIN (index.html)
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const usuario = document.getElementById("usuario").value.trim();
            const password = document.getElementById("password").value.trim();
            const mensajeError = document.getElementById("mensajeError");

            // Credenciales válidas
            const validUser = "admin";
            const validEmail = "admin@automotors.bo";
            const validPass = "12345";

            if (usuario === "" || password === "") {
                mensajeError.textContent = "Por favor, completa todos los campos.";
                return;
            }

            if ((usuario === validUser || usuario === validEmail) && password === validPass) {
                localStorage.setItem("usuarioActivo", usuario);
                window.location.href = "pages/inicio.html";
            } else {
                mensajeError.textContent = "Usuario o contraseña incorrectos.";
            }
        });
    }

    // 2. PROTECCIÓN DE SESIÓN Y MENÚ MÓVIL EN PÁGINAS INTERNAS
    const btnCerrarSesion = document.getElementById("btnCerrarSesion");
    if (btnCerrarSesion) {
        const usuarioActivo = localStorage.getItem("usuarioActivo");
        if (!usuarioActivo) {
            window.location.href = "../index.html";
        }

        const userDisplay = document.getElementById("userDisplay");
        if (userDisplay && usuarioActivo) {
            userDisplay.textContent = usuarioActivo;
        }

        btnCerrarSesion.addEventListener("click", (e) => {
            e.preventDefault();
            localStorage.removeItem("usuarioActivo");
            window.location.href = "../index.html";
        });
    }

    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");
    if (menuToggle && mainNav) {
        menuToggle.addEventListener("click", () => {
            mainNav.classList.toggle("active");
        });
    }

    // 3. SIMULACIÓN DE VENTA DE AUTOS (autos.html)
    const botonesVender = document.querySelectorAll(".btn-vender");
    const autoInput = document.getElementById("autoSeleccionado");
    const precioInput = document.getElementById("precioSeleccionado");
    const formVenta = document.getElementById("formVenta");

    botonesVender.forEach((btn) => {
        btn.addEventListener("click", () => {
            autoInput.value = btn.getAttribute("data-auto");
            precioInput.value = "$us " + btn.getAttribute("data-precio");
        });
    });

    if (formVenta) {
        formVenta.addEventListener("submit", (e) => {
            e.preventDefault();
            const comprador = document.getElementById("compradorNombre").value.trim();
            const confirmacion = document.getElementById("confirmacionVenta");

            if (!autoInput.value) {
                confirmacion.style.color = "#d90429";
                confirmacion.textContent = "Primero selecciona un vehículo del catálogo.";
                return;
            }

            confirmacion.style.color = "#198754";
            confirmacion.textContent = `¡Venta registrada! ${autoInput.value} vendido a ${comprador}.`;
            formVenta.reset();
        });
    }

    // 4. REGISTRO DE CLIENTES (clientes.html)
    const formCliente = document.getElementById("formCliente");
    const tablaClientes = document.getElementById("tablaClientes");

    if (formCliente && tablaClientes) {
        formCliente.addEventListener("submit", (e) => {
            e.preventDefault();
            const ci = document.getElementById("cliCi").value.trim();
            const nombre = document.getElementById("cliNombre").value.trim();
            const tel = document.getElementById("cliTel").value.trim();
            const auto = document.getElementById("cliAuto").value.trim();

            const nuevaFila = document.createElement("tr");
            nuevaFila.innerHTML = `
                <td>${ci}</td>
                <td>${nombre}</td>
                <td>${tel}</td>
                <td>${auto}</td>
            `;
            tablaClientes.appendChild(nuevaFila);
            formCliente.reset();
        });
    }
});