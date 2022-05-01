
    var prova = document.getElementById("Vidas");
    prova.disabled = true;

    const name = prompt("What's your name? :)")
    document.getElementById("nomUsuari").innerHTML += (name + ":");

    const options = document.querySelectorAll(".options");
    
    let pRecarga = 0;
    let cRecarga = 0;
    let pVidas = 1;
    let cVidas = 1;
    let numRondes = 0;

    var botodispara = document.getElementById("Dispara");
    botodispara.disabled = pRecarga === 0;

    document.getElementById("afegir_precarga").innerHTML += pRecarga;
    document.getElementById("afegir_crecarga").innerHTML += cRecarga;
    document.getElementById("afegir_pvidas").innerHTML += pVidas;
    document.getElementById("afegir_cvidas").innerHTML += cVidas;

    options.forEach((option) => {
        option.addEventListener("click", function () {
        const pInput = this.id;
        
        const cOptions = ["recarga", "escut", "dispara", "vidas"];
        let cInput = cOptions[Math.floor(Math.random() * 4)];

        // document.getElementById("quefacomputer").innerHTML = pInput;
        // document.getElementById("quefacomputer").innerHTML += "  ";
        // document.getElementById("quefacomputer").innerHTML += cInput;
        // document.getElementById("quefacomputer").innerHTML += "  ";
        // document.getElementById("quefacomputer").innerHTML += numRondes;

        ++numRondes;

        // si el computer intenta dispara i no te recargas, fa una recarga
        if (cInput === "dispara" && cRecarga === 0) {
            cInput = "recarga";
        }
        while (numRondes % 5 != 0 && cInput === "vidas") {
            cInput = cOptions[Math.floor(Math.random() * 4)];
        }

        if (numRondes % 5 === 0) prova.disabled = false;
        else prova.disabled = true;

        //botodispara.disabled = pRecarga === 0;

        // et mostra el que fa el bot amb delay
        setTimeout(function(){
            document.getElementById("botresponse").src = document.getElementById(cInput).src;
            compareInputs(pInput, cInput);
            updateValors();},0);
        });
    });

    function compareInputs(pInput, cInput) {
        const currentMatch = `${pInput} vs ${cInput}`;
        // if (pInput === cInput) {
            // alert(`${currentMatch} is a Tie`);
            //return;
        //}

        /*if (numRondes % 5 === 0) {
            cInput = "vidas";
        }*/

        // si el jugador decideix recarregar
        if (pInput === "Recarga") {
            pRecarga++;
            if (cInput === "recarga") {
                cRecarga++;
            }
            else if (cInput === "dispara" && cRecarga > 0) {
                --cRecarga;
                muerte("p");
            }
            else if (cInput === "vidas") {
                ++cVidas;
                updateVidas();
            }
            else if (cInput === "escut") {} // no passa res
        }

        // si el jugador decideix disparar
        if (pInput === "Dispara") {
            // if (pRecarga === 0) {}
            if (cInput === "vidas" && pRecarga > 0) {
                --pRecarga;
            }
            else if (cInput === "vidas" && pRecarga === 0) {
                ++cVidas;
                updateVidas();
            }
            else if (cInput === "escut" && pRecarga > 0) {
                --pRecarga;
            }
            else if (cInput === "escut" && pRecarga === 0) {}
            else if (cInput === "recarga") {
                cRecarga++;
                if (pRecarga > 0)  {
                    --pRecarga;
                    muerte("c");
                }
            }
            else if (cInput === "dispara") {
                --cRecarga;
                if (pRecarga > 0) {
                    --pRecarga;
                    muertedos(); // quan es disparen els dos alhora
                }
                else {
                    muerte("p");
                }
            }
        }

        // si el jugador decideix posar escut
        if (pInput === "Escut") {
            if (cInput === "recarga") {
                ++cRecarga;
            }
            else if (cInput === "dispara" && cRecarga > 0) {
                --cRecarga;
            }
            else if (cInput === "dispara" && cRecarga === 0) {
                ++cRecarga;
            }
            else if (cInput === "escut") {}
            else if (cInput === "vidas") {
                ++cVidas;
                updateVidas();
            }
        }

        if (pInput === "Vidas") {
            ++pVidas;
            updateVidas();
            if (cInput === "recarga") {
                ++cRecarga;
            }
            else if (cInput === "dispara") {
                --cRecarga;
            }
            else if (cInput === "escut") {}
            else if (cInput === "vidas") {
                ++cVidas;
            }
        }

        //if (cInput === "Recarga") {
            //  cRecarga++;
        //}       
        
        botodispara.disabled = pRecarga === 0;
    }

    // actualitza el valor de les recargues
    function updateValors() {
        document.getElementById("afegir_precarga").textContent = "Recharge: "+ pRecarga;
        document.getElementById("afegir_crecarga").textContent = "Recharge: "+ cRecarga;
    }

    // quan algu perd una vida
    function muerte(who) {
        if (who === "p") {
            --pVidas;
            updateVidas();
            if (pVidas === 0) {
                // RESULTAT: GUANYA COMPUTER
                fin(0);
            }
        }
        else if (who === "c") {
            --cVidas;
            updateVidas();
            if (cVidas === 0) {
                // RESULTAT: GUANYA PLAYER
                fin(1);
            }
        }
    }

    // quan els dos es disparen
    function muertedos() {
        --pVidas;
        --cVidas;
        updateVidas();
        if (pVidas === 0 && cVidas === 0) {
            // RESULTAT: EMPATEN PLAYER I COMPUTER
            fin(2);
        }
        else if (pVidas === 0) {
            // RESULTAT: GUANYA COMPUTER
            fin(0);
        }
        else if (cVidas === 0) {
            // RESULTAT: GUANYA PLAYER
            fin(1);
        }
    }

    // actualitza valor de les vides dels jugadors
    function updateVidas() {
        document.getElementById("afegir_pvidas").textContent = "Lives: "+ pVidas;
        document.getElementById("afegir_cvidas").textContent = "Lives: "+ cVidas;
    }

    // quan algu perd definitivament la partida (vidas = 0)
    function fin(g) {
        // 0: guanya computer, 1: guanya player, 2: empaten

        setTimeout(function(){
            btnStart = document.getElementById('start-win');
        if (g === 1) {
            var overlay = document.getElementById('winOverlay'),
            popup = document.getElementById('winPopup');
            btnStart = document.getElementById('start-win');
        }
        else if (g === 0) {
            var overlay = document.getElementById('loseOverlay'),
            popup = document.getElementById('losePopup');
            btnStart = document.getElementById('start-lose');
        }
        else if (g === 2) {
            var overlay = document.getElementById('tieOverlay'),
            popup = document.getElementById('tiePopup');
            btnStart = document.getElementById('start-tie');
        }
        btnCerrarPopup = document.getElementById('btn-cerrar-popup'),
        overlay.classList.add('active');
        popup.classList.add('active');

        btnStart.addEventListener('click', function(e){
            e.preventDefault();
            overlay.classList.remove('active');
            popup.classList.remove('active');
            start();});
        },750);
    }

    function start() {
        pRecarga = 0;
        cRecarga = 0;
        updateValors();
        pVidas = 1;
        cVidas = 1;
        updateVidas();
        document.getElementById("botresponse").src = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Question_mark_%28black%29.svg/480px-Question_mark_%28black%29.svg.png"
        numRondes = 0;
        if (numRondes % 5 === 0) prova.disabled = false;
        else prova.disabled = true;
        botodispara.disabled = pRecarga === 0;
    }
            