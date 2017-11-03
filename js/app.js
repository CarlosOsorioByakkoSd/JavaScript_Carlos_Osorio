var Calculator = {
    screen: "",
    keyboardCalc: "",
    elemento: "",
    num: "0",
    numGuardado: "0",
    operacionCurso: false,
    tipoOperacion: "",
    resuladoFinal: "",
    solucion: 0,
    numSigno: 0,
    screenInicial: true,
    decimal: false,
    //Inicio del objeto
    init: function () {
        this.loadData();
        this.addKeyDown();
    },
    //Carga de informacion del DOM
    loadData: function () {
        this.screen = document.getElementById("display");
        this.keyboardCalc = document.getElementsByClassName("tecla");
    },
    //Animacion teclas
    addKeyDown: function () {
        for (var i = 0; i < this.keyboardCalc.length; i++) {
            this.keyboardCalc[i].onclick = this.KeyDown;
        }
    },
    KeyDown: function (event) {
        Calculator.elemento = event.target;
        Calculator.elemento.style = "transform: perspective(600px) translateZ(-35px) rotateZ(-0.5deg) rotateX(-10deg);";
        setTimeout(function () {
            Calculator.elemento.style = "transform: none";
        }, 100)
        Calculator.principalProceso();
    },
    //Funcion principal
    principalProceso: function () {
        switch (this.elemento.alt) {
            case "mas":
                this.operarValores("+");
                break;
            case "menos":
                this.operarValores("-");
                break;
            case "por":
                this.operarValores("*");
                break;
            case "dividido":
                this.operarValores("/");
                break;
            case "igual":
                this.totalOperacion();
                break;
            case "On":
                this.screenClear();
                break;
            case "signo":
                this.cambiarSigno();
            default:
                this.screenDisplay();
                break;

        }
    },
    //Mostrar inforamcion en el Display
    screenDisplay: function () {
        if (this.elemento.alt != "signo" && this.elemento.alt != "raiz") {
            if (this.num.length > 7) {
                alert("Solo se permiten 8 numeros");
            } else {
                if (this.num == "0" || this.screenInicial == true) {
                    this.screen.innerHTML = this.elemento.alt;
                    this.num = this.elemento.alt;
                    if (this.elemento.alt == "punto") {
                        this.screen.innerHTML = "0.";
                        this.num = "0.";
                        this.decimal = true;
                    }
                    this.screenInicial = false;
                } else {
                    if (this.elemento.alt == "punto" && this.decimal == false) {
                        this.screen.innerHTML += ".";
                        this.num += ".";
                        this.decimal = true;
                    } else {
                        if (this.elemento.alt == "punto" && this.decimal == true) {
                            //NO HACER NADA
                        } else {
                            this.screen.innerHTML += this.elemento.alt;
                            this.num += this.elemento.alt;
                        }
                    }
                }
            }
        }
    },
    //Limpar pantalla
    screenClear: function () {
        this.num = "0";
        this.contadorNum = 0;
        this.screenInicial = true;
        this.decimal = false;
        this.numGuardado = "0";
        this.screen.innerHTML = this.num;
    },
    //Cambio de signo
    cambiarSigno: function () {
        this.numSigno = Number(this.num);
        this.numSigno = -this.numSigno;
        this.num = String(this.numSigno);
        this.screen.innerHTML = this.num;
    },
    //Operacion de dos numeros
    operarValores: function (opera) {
        this.totalOperacion();
        this.numGuardado = this.num;
        this.tipoOperacion = opera;
        this.operacionCurso = true;
        this.screenInicial = true;
    },
    //Total de la Operacion
    totalOperacion: function () {
        if (this.operacionCurso == false) {
            this.screen.innerHTML = this.num;
        } else {
            this.resuladoFinal = this.numGuardado + this.tipoOperacion + this.num;
            this.solucion = eval(this.resuladoFinal);
            this.screen.innerHTML = this.solucion;
            this.num = this.solucion;
            this.operacionCurso = false;
            this.screenInicial = true;
        }
    },

}

Calculator.init();
