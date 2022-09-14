function dibujarCanvas(){
    tablero.linerWidth = 8;   
    tablero.lineCap = "round";   
    tablero.lineJoin = "round";   
    tablero.fillStyle = "#F3F5F6";
    tablero.strokeStyle = "#8A3871";
    tablero.beginPath();
    tablero.moveTo(650, 500);
    tablero.lineTo(900, 500);
    tablero.stroke();
    tablero.closePath();
}

function dibujarLinea(){
    tablero.linerWidth= 8;   
    tablero.lineCap= "round";   
    tablero.lineJoin= "round";   
    tablero.fillStyle= "#F3F5F6";
    tablero.strokeStyle= "#8A3871"
    let anchura = 600/palabrabraSecreta.length;
    for (let i = 0; i < palabrabraSecreta.length; i++){
        tablero.moveTo(500 + (anchura*i), 640)
        tablero.lineTo(550 + (anchura*i), 640)
    }
    tablero.stroke();
    tablero.closePath();
}

function armarMunexo(){
    switch (contador) {
        case 4:
            sfx.error.play();
            poste();
            break;
        case 3:
            sfx.error.play();
            soporte();
            break;
        case 2:
            sfx.error.play();
            cabeza();
            break;
        case 1:
            sfx.error.play();
            torso();
            break;
        case 0:
            sfx.error.play();
            pies();
            sfx.juego.stop();
            div_letra.style.display = "none";
            canvas_juego.style.display = "none";
            btnera_juego.style.display = "none";
            aviso_losser.style.display = "flex";
            sfx.gameover.play();
            break;
    }
}


function poste(){
    tablero.beginPath();
    tablero.moveTo(700, 100);
    tablero.lineTo(700, 500);
    tablero.stroke();
    tablero.closePath();
    tablero.beginPath();
    tablero.moveTo(700, 100);
    tablero.lineTo(800, 100);
    tablero.stroke();
    tablero.closePath();

}

function soporte(){
    tablero.beginPath();
    tablero.moveTo(800, 100);
    tablero.lineTo(800, 150);
    tablero.stroke();
    tablero.closePath();
    tablero.beginPath();
    tablero.moveTo(800, 100);
    tablero.lineTo(800, 150);
    tablero.stroke();
    tablero.closePath();
}

function cabeza(){
    tablero.beginPath();
    tablero.arc(800, 180, 30, 0, Math.PI*2, false);

    //ojos
    tablero.moveTo(800, 170);
    tablero.lineTo(780, 180);
    tablero.moveTo(800, 180);
    tablero.lineTo(780, 170);
    tablero.moveTo(800, 170);
    tablero.lineTo(820, 180);
    tablero.moveTo(802, 180);
    tablero.lineTo(820, 170);
    tablero.stroke();
    tablero.closePath();

    //boca
    tablero.beginPath();
    tablero.arc(800, 200, 10, 0, Math.PI, true)
    tablero.stroke();
    tablero.closePath();
}

function torso(){
    //torso
    tablero.beginPath();
    tablero.moveTo(800, 350);
    tablero.lineTo(800, 210);
    tablero.stroke();
    tablero.closePath();

    // Brazos
    tablero.beginPath();
    tablero.moveTo(800, 250);
    tablero.lineTo(760, 270);
    tablero.stroke();
    tablero.closePath();

    tablero.beginPath();
    tablero.moveTo(800, 250);
    tablero.lineTo(840, 270);
    tablero.stroke();
    tablero.closePath();
}

function pies(){
    // pies
    tablero.beginPath();
    tablero.moveTo(800, 350);
    tablero.lineTo(760, 370);
    tablero.stroke();
    tablero.closePath();

    tablero.beginPath();
    tablero.moveTo(800, 350);
    tablero.lineTo(840, 370);
    tablero.stroke();
    tablero.closePath();
}
