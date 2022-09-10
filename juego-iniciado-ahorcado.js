if (location.pathname == 'index.html') {
    var boton_info = document.querySelector(".informacion");
    var info = document.querySelector(".info");

    boton_info.addEventListener("click", mostrar_info)
    function mostrar_info() {
        if (info.style.display == "none") {
            info.style.display = "block";
        } else {
            info.style.display = "none";
        }
    }
}


if (location.pathname == 'agregar-palabra.html') {
    var boton_guardar = document.querySelector("#guardar");
    var nueva_palabra = document.querySelector("#nueva-palabra");
    var nueva = [];

    boton_guardar.addEventListener("click", obtener);
    function obtener() {
        if (nueva_palabra.value == "") {
            alert("No has ingresado ninguna palabra!");
        } else {
            nueva.push(nueva_palabra.value.toUpperCase());
            localStorage.setItem("nueva", nueva);
            location.assign("juego-iniciado.html");
        }
    };
};


if (location.pathname == 'juego-iniciado.html') {
    // variables que contienen elementos del HTML
    var boton_nuevo = document.querySelector("#nuevo");
    var boton_desistir = document.querySelector(".desistir");
    var canvas = document.querySelector("canvas")
    var pincel = canvas.getContext("2d");
    var ganaste = document.querySelector("#ganaste");
    var perdiste = document.querySelector("#perdiste");
    var letras_usadas = document.querySelector("#letras-usadas");
    var palabra_a_adivinar = document.querySelector("#palabra-a-adivinar");


    boton_nuevo.onclick = (reinicio); // reinicia el juego
    function reinicio() {
        window.location.reload();
        localStorage.clear();
    };

    boton_desistir.onclick = (desistir) // vuelve al menu principal
    function desistir() {
        window.location.assign("index.html");
        localStorage.clear();
    }

    // dibujo de la horca con muñeco
    pincel.fillStyle = "#F3F5FC";
    function horca() {
        pincel.fillRect(0, 487, 335, 5);
        pincel.fillRect(70, 0, 5, 492);
        pincel.fillRect(70, 0, 180, 5);
        pincel.fillRect(250, 0, 5, 60);
    };
    horca();

    function cabeza() {
        pincel.strokeStyle = "#F3F5FC";

        pincel.lineWidth = 5;
        pincel.arc(252.5, 100, 40, 0, 2 * Math.PI);
        pincel.stroke();
    };

    function cuerpo() {
        pincel.moveTo(252.5, 140);
        pincel.lineTo(252.5, 240);
        pincel.stroke();
    };

    function brazoIzquierdo() {
        pincel.moveTo(252.5, 140);
        pincel.lineTo(210, 190);
        pincel.stroke();
    };

    function brazoDerecho() {
        pincel.moveTo(252.5, 140);
        pincel.lineTo(295, 190);
        pincel.stroke();
    };

    function piernaIzquierda() {
        pincel.moveTo(252.5, 240);
        pincel.lineTo(210, 290);
        pincel.stroke();
    };

    function piernaDerecha() {
        pincel.moveTo(252.5, 240);
        pincel.lineTo(295, 290);
        pincel.stroke();
    };

    var cantidad_errores = 0; // contador de errores
    var opciones = ["ALURA", "PROGRAMADOR", "ORACLE", "LENGUAJE", "LOGICA", "DESARROLLO", "APRENDIZAJE", "JAVASCRIPT", "CODIGO", "LIBRERIA", "SOFTWARE", "RESPONSIVE", "BOOTSTRAP", "COOKIES", "FRONT-END", "BACK-END", "FULL-STACK"]; // palabras a elegir
    //import nueva from "./agregar-palabra.js"; // importa la palabra nueva
    var nueva = localStorage.getItem("nueva");
    var elegida = (opciones[Math.floor(Math.random() * opciones.length)]).split(""); // elige una palabra al azar
    var array_usadas = []; // array de letras presionadas
    var elegida2 = [...elegida]; // crea una copia de la palabra elegida
    var cant_intentos = document.querySelector(".cantidad");
    var vidas = 7;

    opciones.push(nueva);
    cant_intentos.innerHTML = vidas;

    for (let i = 0; i < elegida.length; i++) {
        const crear_span = document.createElement("span");
        crear_span.classList.add("span");
        palabra_a_adivinar.appendChild(crear_span); // crea tantos span como letras tenga la palabra elegida
    };

    // detecta la tecla presionada
    window.addEventListener("keypress", tecla_presionada);

    // utiliza la tecla presionada para realizar distintas acciones
    function tecla_presionada(e) {
        const span = document.querySelectorAll("#palabra-a-adivinar span");
        console.log(e.key.toUpperCase());
        let acerto = false;
        array_usadas.push(e.key.toUpperCase()); // empuja la letra hacia array_usadas
        const array_usadas2 = array_usadas.filter( // impide repeticion de letras en array_usadas

            function quitar(letra, i, usadas) {
                return i === usadas.indexOf(letra);
            });

        letras_usadas.innerHTML = array_usadas2.join(" ");

        for (let i = 0; i < elegida.length; i++) {
            if (e.key.toUpperCase() == elegida[i]) { // si la tecla presionada coincide con alguna de la palabra elegida:

                span[i].innerHTML = e.key.toUpperCase(); // coloca la letra acertada en el span y posicion correspondiente

                // elimina la(s) letra(s) acertada(s) de elegida2
                const letra_acertada = elegida2.indexOf(e.key.toUpperCase())
                if (letra_acertada > -1) {
                    elegida2.splice(letra_acertada, 1);
                }
                acerto = true;
            }

            if (elegida2.length == 0) { // si elegida2 llega a 0:
                ganaste.style.display = "block"; // visibiliza el div de juego ganado
            };
        };

        // dibuja el muñeco de acuerdo a la cantidad de errores que se cometen
        if (acerto == false) {
            cantidad_errores++;
            vidas--;
        };
        if (cantidad_errores == 1) {
            cabeza();
        };
        if (cantidad_errores == 2) {
            cuerpo();
        };
        if (cantidad_errores == 3) {
            brazoIzquierdo();
            cant_intentos.style.color = "var(--medio)"
        };
        if (cantidad_errores == 4) {
            brazoDerecho();
        };
        if (cantidad_errores == 5) {
            piernaIzquierda();
            cant_intentos.style.color = "var(--cancelar)";
        };
        if (cantidad_errores == 6) {
            piernaDerecha();
        };
        if (cantidad_errores == 7) { // si el contador de errores llega a 7:
            perdiste.style.display = "block"; // visibiliza el div de juego perdido
        };
        console.log(acerto);

        cant_intentos.innerHTML = vidas;

    };
};
