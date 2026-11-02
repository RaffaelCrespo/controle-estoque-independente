
let grafico = null;

let totalEntradas = 0;
let totalSaidas = 0;

/* inicialização */

document.addEventListener("DOMContentLoaded", () => {

    try {

        StorageEstoque.inicializar();

        carregarDashboard();

    } catch (erro) {

        console.error("Erro ao iniciar dashboard:", erro);

        alert("Não foi possível carregar os dados da demonstração.");

    }

});

function carregarDashboard() {

    mostrarSaudacao();
    mostrarData();

    carregarMateriais();
    carregarDescartes();

}

/* materiais */

function carregarMateriais() {

    try {

        const materiais = StorageEstoque.listarMateriais();

        let totalMateriais = materiais.length;
        let reciclaveis = 0;

        totalEntradas = 0;

        materiais.forEach(item => {

            const quantidade = Number(item.quantidade);

            if (Number.isFinite(quantidade)) {
                totalEntradas += quantidade;
            }

            if (
                (item.reciclavel || "").toLowerCase().trim() === "sim"
            ) {
                reciclaveis++;
            }

        });

        atualizarCards(
            totalMateriais,
            reciclaveis,
            totalEntradas,
            totalSaidas
        );

        atualizarGrafico(totalEntradas, totalSaidas);

    } catch (erro) {

        console.error("Erro ao carregar materiais:", erro);

        alert("Não foi possível carregar os materiais.");

    }

}

/* descartes */

function carregarDescartes() {

    try {

        const descartes = StorageEstoque.listarDescartes();

        totalSaidas = 0;

        descartes.forEach(descarte => {

            const quantidade = Number(descarte.quantidade);

            if (Number.isFinite(quantidade)) {
                totalSaidas += quantidade;
            }

        });

        atualizarCards(
            null,
            null,
            totalEntradas,
            totalSaidas
        );

        atualizarGrafico(totalEntradas, totalSaidas);

    } catch (erro) {

        console.error("Erro ao carregar descartes:", erro);

        alert("Não foi possível carregar os descartes.");

    }

}

/* cards */

function atualizarCards(materiais, reciclaveis, entradas, saidas) {

    const cards = document.querySelectorAll(".card h2");

    if (cards.length < 4) return;

    if (materiais !== null) {
        cards[0].textContent = materiais;
    }

    if (reciclaveis !== null) {
        cards[1].textContent = reciclaveis;
    }

    cards[2].textContent = entradas.toLocaleString("pt-BR");
    cards[3].textContent = saidas.toLocaleString("pt-BR");

}

/* gráfico */

function atualizarGrafico(entradas, saidas) {

    const canvas = document.getElementById("graficoEstoque");

    if (!canvas) return;

    if (grafico) {
        grafico.destroy();
    }

    grafico = new Chart(canvas.getContext("2d"), {

        type: "bar",

        data: {

            labels: ["Entradas", "Saídas"],

            datasets: [{

                label: "Movimentação do Estoque",

                data: [entradas, saidas],

                backgroundColor: [
                    "#22c55e",
                    "#ef4444"
                ],

                borderRadius: 12

            }]

        },

        options: {

            responsive: true,
            maintainAspectRatio: false,

            plugins: {

                tooltip: {

                    enabled: true,

                    callbacks: {

                        label: function(context) {

                            return `Quantidade: ${context.parsed.y.toLocaleString("pt-BR")}`;

                        }

                    }

                },

                legend: {
                    display: false
                }

            },

            scales: {

                y: {
                    beginAtZero: true,
                    ticks: {
                        precision: 0
                    }
                }

            }

        }

    });

}

/* saudação */

function mostrarSaudacao() {

    const hora = new Date().getHours();

    let mensagem = "Boa noite!";

    if (hora < 12) {
        mensagem = "Bom dia!";
    } else if (hora < 18) {
        mensagem = "Boa tarde!";
    }

    document.querySelector("header h1").textContent =
        mensagem + " 👋";

}

/* data */

function mostrarData() {

    const hoje = new Date();

    document.querySelector("header p").textContent =
        "Hoje é " + hoje.toLocaleDateString("pt-BR");

}
