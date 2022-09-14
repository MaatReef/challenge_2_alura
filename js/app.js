// Requisitos:
// - Debe funcionar solo con letras mayúsculas;
// - No deben ser utilizadas letras con acentos ni caracteres especiales;
// - Al completar o dibujo de la horca, debe ser mostrado un mensaje "Fin del juego" en la pantalla;
// - Si se completa la palabra correcta antes de que se acaben los intentos, debe ser mostrado un mensaje de "Ganaste, Felicidades!" en la pantalla.
// - La página debe tener los guiones indicando cada letra da palabra, separados por un espacio;
// - Para comenzar el juego la página debe tener un botón de "Iniciar Juego";
// - No debe ser posible escribir números dentro del juego.
// - Las letras equivocadas deben aparecer en la pantalla, pero no pueden aparecer de forma repetida;
// - Las letras correctas deben aparecer en la pantalla encima de los guiones, en la posición correcta em relación a la palabra.

// Extras:
// - La página debe tener un campo para inserción de texto con la finalidad de adicionar nuevas palabras al juego, e un botón "Agregar palabra".

//Sonidos
// let error = new Audio("../music/auch.mp3");
// let win = new Audio("../music/clapclap.mp3");
// let gameover = new Audio("../music/dameover.mp3");
// let juego = new Audio("../music/eleccion.mp3");
// let eleccion = new Audio("../music/juego.mp3");
// let check = new Audio("../music/yes.mp3");

var sfx = {
    error: new Howl({
      src: ["../music/auch.mp3"],
      volume: 0.3
    }),
    win: new Howl({
      src: ["../music/clapclap.mp3"],
      volume: 0.4
    }),
    gameover: new Howl({
      src: ["../music/dameover.mp3"],
      volume: 0.2
    }),
    juego: new Howl({
      src: ["../music/eleccion.mp3"],
      volume: 0.1
    }),
    eleccion: new Howl({
      src: ["../music/juego.mp3"],
      volume: 0.2
    }),
    check: new Howl({
      src: ["../music/yes.mp3"],
      volume: 0.3
    })
  };


//Selectores
let palabras = ["VERDAD", "VALOR", "APTITUD", "FUERZA"];
let tablero = document.getElementById("horca").getContext("2d");
let input_palabra = document.getElementById("text_area");
let div_letra = document.getElementById("text_letra");
let input_letra = document.getElementById("input_letra").value;
let canvas_juego = document.getElementById("div_ahorcado");
let cabecera = document.getElementById("header");
let aviso_winner = document.getElementById("aviso_winner");
let aviso_losser = document.getElementById("aviso_loser");


let palabrabraSecreta = "";

//botoneras
let btnera_principal = document.getElementById("btnera_principal");
let btnera_palabra = document.getElementById("btnera_palabra");
let btnera_juego = document.getElementById("btnera_juego");
let footer = document.getElementById("footer");

// botones
let btn_iniciar = document.getElementById("btn_iniciar");
let btn_agregar = document.getElementById("btn_agregar");
let btn_guardar = document.getElementById("btn_guardar");
let btn_cancelar = document.getElementById("btn_cancelar");
let btn_desistir = document.getElementById("btn_desistir");

// Palabra Secreta
function escogerPalabraSecreta(){
    let palabra = palabras[Math.floor(Math.random() * palabras.length)];
    palabrabraSecreta = palabra;
    console.log(palabrabraSecreta);
    return palabrabraSecreta;
}

function reiniciarJuego(){
    window.location.reload()
}
function reiniciarJuegoDelay(){
    setTimeout(() => {
        window.location.reload()  
    }, 3000);
}
function iniciarJuego(){
    sfx.juego.play();
    escogerPalabraSecreta()
    dibujarCanvas()
    dibujarLinea()
}

function guardarPalabra(){
    let palabra_guardada = document.getElementById("input_palabra").value;

    if(palabra_guardada.length > 8){
        swal({
            text: "Máximo de 8 Letras Excedido",
        });
        document.getElementsByClassName("input")[0].value = "";
    }else if(palabra_guardada.length == 0){
        swal({
            text: "No Ingresaste una Palabra",
        });
        document.getElementsByClassName("input")[0].value = "";
    }else{
        palabras.push(palabra_guardada.toUpperCase());
        console.log(palabras);
    
        swal(`Palabra: ${palabra_guardada.toUpperCase()} guardada.`, {
            buttons: ["¿Agregar Otra?", "Jugar"],
        }).then((value) => {
                if(value){
                    btnera_principal.style.display = "none";
                    cabecera.style.display = "none";
                    btnera_juego.style.display = "flex";
                    canvas_juego.style.display = "flex";
                    div_letra.style.display = "flex";
                    btnera_palabra.style.display = "none";
                    input_palabra.style.display = "none"
                    
                    iniciarJuego();
                } else {
                    document.getElementsByClassName("input")[0].value = "";
                }
            });
    }
}

function filtrarBoton(e){
    quitarBotonera(e)
}

function quitarBotonera(e){
    if(e.classList.contains("btn_iniciar")){  
        btnera_principal.style.display = "none";
        footer.style.display = "none";
        cabecera.style.display = "none";
        btnera_juego.style.display = "flex";
        canvas_juego.style.display = "flex";
        div_letra.style.display = "flex";
        iniciarJuego();
    } else if (e.classList.contains("btn_agregar")){
        sfx.eleccion.play();
        input_palabra.style.display = "flex";
        btnera_principal.style.display = "none";
        footer.style.display = "none";
        btnera_palabra.style.display = "flex";
    } else if (e.classList.contains("btn_cancelar")){
        btnera_juego.style.display = "none";
        btnera_palabra.style.display = "none";
        btnera_principal.style.display = "flex";
        footer.style.display = "flex";
        canvas_juego.style.display = "none";
        cabecera.style.display = "flex";
        input_palabra.style.display = "none"
        div_letra.style.display = "none";
        window.location.reload()
    }
}

function captarTecla(input_letra) {
    let tecla_presionada = input_letra.keyCode;
    input_letra.value = "";
    patron = /[A-Z]/;
    let tecla_enviada = String.fromCharCode(tecla_presionada);
    let test = patron.test(tecla_enviada);
    if (!test){
        swal({
            text: "Ingresar solo Letras",
        });
        document.getElementsByClassName("input")[0].value = "";

        document.getElementsByClassName("input")[0].value = "";
    }
    document.getElementsByClassName("input")[0].value = "";
    letra_press(tecla_enviada, tecla_presionada);
}

function chequeando(event) { 
    let tecla_presionada = event.keyCode;

    patron = /[A-Z]/;
    let tecla_enviada = String.fromCharCode(tecla_presionada);
    let test = patron.test(tecla_enviada);

    if (!test){
        swal({
            text: "Solo podrás ingresar Letras",
        });
         document.getElementsByClassName("input")[0].value = "";
         document.getElementsByClassName("input")[0].value = "";
    }
}

function letra_press(tecla_enviada, tecla_presionada){   
    if(tecla_presionada >= 65 && tecla_presionada <= 90){

        if (palabrabraSecreta.includes(tecla_enviada)){
            dibujarLetra(tecla_enviada);
        } else{
            dibujarLetraIncorrecta(tecla_enviada);
        }
    }
}

let correctas = [];
let palabra_descompuesta = [];
function dibujarLetra(correcta){
    sfx.check.play();
    let anchura = 600/palabrabraSecreta.length;
    for (let i = 0; i < palabrabraSecreta.length; i++){
        let reemplazar = palabrabraSecreta[i];

        if(reemplazar == reemplazar && !palabra_descompuesta.includes(reemplazar)){
        palabra_descompuesta.push(reemplazar);
        }
        if(correcta == reemplazar ) {
            tablero.font="25pt Verdana";
            tablero.strokeStyle="green";
            tablero.lineWidth = 2;
            tablero.strokeText(correcta, 510 + (anchura*i), 630);

            if(correcta == reemplazar && !correctas.includes(correcta)){
                correctas.push(correcta);
            }
          
        }

    }
    
    ganastes();
    document.getElementsByClassName("input2")[0].value = "";

}


function ganastes(){
    let letras_correctas = JSON.stringify(correctas);
    let palabra_entera = JSON.stringify(palabra_descompuesta);
    if(letras_correctas.length == palabra_entera.length){
        sfx.juego.stop();
        sfx.win.play();
        let confetti = new Confetti('demo');
        confetti.setCount(75);
        confetti.setSize(1);
        confetti.setPower(25);
        confetti.setFade(false);
        confetti.destroyTarget(true);
        div_letra.style.display = "none";
        canvas_juego.style.display = "none";
        btnera_juego.style.display = "none";
        aviso_winner.style.display = "flex";
    }
}

let contador = 5;
let width = 2;
let equivocadas = [];
function dibujarLetraIncorrecta(equivocada){   
    for (let i = 0; i < palabrabraSecreta.length; i++) {
        caracter = palabrabraSecreta[i];
        if(caracter != equivocada && !equivocadas.includes(equivocada)){
            equivocadas.push(equivocada);
            contador = contador - 1;
            tablero.font="25pt Verdana";
            tablero.strokeStyle="red";
            tablero.lineWidth = 2;
            tablero.strokeText(equivocadas, 510, 700);
            break;
        }
    }
    armarMunexo()
    document.getElementsByClassName("input2")[0].value = "";
}