let criar_array = document.getElementById("criar_array");
let ordenar = document.getElementById("ordenar");
let min = 1;
let max = 80;
let num_barras = 80;
let array = new Array(num_barras);
let barras = document.getElementById("barras");
var velocidadeSelect = document.getElementById('velocidadeSelect');
let selectedValue = velocidadeSelect.value || 100; 
let tipoOrdenacaoSelect = document.getElementById('tipoOrdenacao');
let tipoOrdenacao = tipoOrdenacaoSelect.value || 'bubbleSort';

velocidadeSelect.addEventListener('change', function () {
    selectedValue = velocidadeSelect.value;
});

tipoOrdenacaoSelect.addEventListener('change', function () {
    tipoOrdenacao = tipoOrdenacaoSelect.value;
});

async function sortArray(array, speed) {
    switch (tipoOrdenacao) {
        case 'bubbleSort':
            return await bubbleSort(array, speed);
        case 'troca':
            return await troca(array, speed);
        default:
            return array;
    }
}

function criar_array_aleatorio() {
    for (let i = 0; i < num_barras; i++) {
        array[i] = Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function bubbleSort(array, speed) {
    let conjunto = document.getElementsByClassName("barra");
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                for (let k = 0; k < array.length; k++) {
                    if (k !== j && k !== j + 1) {
                        conjunto[k].style.backgroundColor = "grey";
                    }
                }
                let aux = array[j];
                array[j] = array[j + 1];
                array[j + 1] = aux;
                conjunto[j].style.height = array[j] * 10 + "px";
                conjunto[j].style.backgroundColor = "green";
                conjunto[j + 1].style.height = array[j + 1] * 10 + "px";
                conjunto[j + 1].style.backgroundColor = "green";

                await sleep(speed);
            }
        }
        await sleep(speed);
    }
    return array;
}

async function troca(array, speed) {
    let conjunto = document.getElementsByClassName("barra");
    let trocou = true;
    while (trocou) {
        trocou = false;
        for (let j = 0; j < array.length - 1; j++) {
            if (array[j] > array[j + 1]) {
                for (let k = 0; k < array.length; k++) {
                    if (k !== j && k !== j + 1) {
                        conjunto[k].style.backgroundColor = "grey";
                    }
                }
                let aux = array[j];
                array[j] = array[j + 1];
                array[j + 1] = aux;
                conjunto[j].style.height = array[j] * 10 + "px";
                conjunto[j].style.backgroundColor = "green";
                conjunto[j + 1].style.height = array[j + 1] * 10 + "px";
                conjunto[j + 1].style.backgroundColor = "green";
                trocou = true;
                await sleep(speed);
            }
        }
    }
    return array;
}

document.addEventListener("DOMContentLoaded", function () {
    criar_array_aleatorio();
    renderizar_barras(array);
});

function renderizar_barras(array) {
    for (let i = 0; i < array.length; i++) {
        let barra = document.createElement("div");
        barra.classList.add("barra");
        barra.style.height = array[i] * 10 + "px";
        barras.appendChild(barra);
    }
}

criar_array.addEventListener("click", function () {
    criar_array_aleatorio();
    barras.innerHTML = "";
    renderizar_barras(array);
});

ordenar.addEventListener("click", async function () {
    await sortArray(array, selectedValue);
});