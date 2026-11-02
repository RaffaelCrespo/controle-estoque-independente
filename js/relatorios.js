
let graficoMateriais = null;
let graficoDescarte = null;

/* cores por categoria */

const coresCategorias = {
    "Embalagens": "#1E3A8A",
    "Acabamento": "#22c55e",
    "Ferramentas": "#f97316",
    "Elétricos": "#a855f7",
    "Fixadores": "#eab308",
    "Outros": "#64748b",
    "Sem categoria": "#94a3b8"
};

/* carregar relatórios */

function carregarRelatorios() {

    try {

        const materiais = StorageEstoque.listarMateriais();
        const descartes = StorageEstoque.listarDescartes();

        /* materiais */

        const categoriasMateriais = {};

        let totalMateriais = materiais.length;
        let totalQuantidade = 0;

        materiais.forEach(material => {

            const qtd = Number(material.quantidade);

            if (!Number.isFinite(qtd) || qtd < 0) {

                console.warn(
                    "Quantidade inválida no material:",
                    material.id
                );

                return;

            }

            totalQuantidade += qtd;

            const categoria = material.categoria || "Sem categoria";

            categoriasMateriais[categoria] =
                (categoriasMateriais[categoria] || 0) + qtd;

        });

        document.getElementById("totalMateriais").textContent =
            totalMateriais.toLocaleString("pt-BR");

        document.getElementById("totalQuantidade").textContent =
            totalQuantidade.toLocaleString("pt-BR");

        criarGrafico(
            "graficoMateriais",
            categoriasMateriais,
            "materiais"
        );

        /* descartes */

        const categoriasDescarte = {};

        let totalDescarte = 0;

        descartes.forEach(descarte => {

            const qtd = Number(descarte.quantidade);

            if (!Number.isFinite(qtd) || qtd < 0) {

                console.warn(
                    "Quantidade inválida no descarte:",
                    descarte.id
                );

                return;

            }

            totalDescarte += qtd;

            const categoria = descarte.categoria || "Sem categoria";

            categoriasDescarte[categoria] =
                (categoriasDescarte[categoria] || 0) + qtd;

        });

        document.getElementById("totalDescarte").textContent =
            totalDescarte.toLocaleString("pt-BR");

        criarGrafico(
            "graficoDescarte",
            categoriasDescarte,
            "descarte"
        );

    } catch (erro) {

        console.error("Erro ao carregar relatórios:", erro);

        alert("Não foi possível carregar os dados dos relatórios.");

    }

}

/* criar gráficos */

function criarGrafico(id, categorias, tipo) {

    const canvas = document.getElementById(id);

    if (!canvas) return;

    const graficoAnterior =
        tipo === "materiais" ? graficoMateriais : graficoDescarte;

    if (graficoAnterior) {
        graficoAnterior.destroy();
    }

    const labels = Object.keys(categorias);
    const values = Object.values(categorias);

    const total = values.reduce(
        (soma, valor) => soma + valor,
        0
    );

    if (total <= 0) {

        mostrarMensagemVazia(canvas);

        if (tipo === "materiais") {
            graficoMateriais = null;
        } else {
            graficoDescarte = null;
        }

        return;

    }

    removerMensagemVazia(canvas);

    const cores = labels.map(categoria =>
        coresCategorias[categoria] || "#64748b"
    );

    const novoGrafico = new Chart(canvas.getContext("2d"), {

        type: "doughnut",

        data: {

            labels: labels,

            datasets: [{

                data: values,

                backgroundColor: cores,

                borderColor: "#ffffff",

                borderWidth: 3,

                hoverOffset: 7

            }]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            cutout: "65%",

            plugins: {

                legend: {

                    position: "bottom",

                    labels: {

                        usePointStyle: true,

                        pointStyle: "circle",

                        padding: 18,

                        color: "#374151",

                        font: {
                            family: "Poppins",
                            size: 11
                        }

                    }

                },

                tooltip: {

                    callbacks: {

                        label: function(context) {

                            const valor = context.raw;

                            const percentual =
                                ((valor / total) * 100).toFixed(1);

                            return ` ${context.label}: ${valor.toLocaleString("pt-BR")} (${percentual}%)`;

                        }

                    }

                }

            }

        }

    });

    if (tipo === "materiais") {
        graficoMateriais = novoGrafico;
    } else {
        graficoDescarte = novoGrafico;
    }

}

/* mensagem vazia */

function mostrarMensagemVazia(canvas) {

    removerMensagemVazia(canvas);

    const mensagem = document.createElement("div");

    mensagem.className = "mensagem-grafico-vazio";

    mensagem.textContent = "Nenhum dado disponível";

    mensagem.style.display = "flex";
    mensagem.style.alignItems = "center";
    mensagem.style.justifyContent = "center";
    mensagem.style.position = "absolute";
    mensagem.style.inset = "0";
    mensagem.style.color = "#6b7280";
    mensagem.style.fontSize = "14px";

    canvas.parentElement.appendChild(mensagem);

}

function removerMensagemVazia(canvas) {

    const mensagem = canvas.parentElement.querySelector(
        ".mensagem-grafico-vazio"
    );

    if (mensagem) {
        mensagem.remove();
    }

}

/* inicialização */

document.addEventListener("DOMContentLoaded", () => {

    try {

        StorageEstoque.inicializar();

        carregarRelatorios();

    } catch (erro) {

        console.error("Erro ao iniciar relatórios:", erro);

        alert("Não foi possível iniciar os relatórios.");

    }

});
