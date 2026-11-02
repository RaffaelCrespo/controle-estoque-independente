
let idEditando = null;

const tabela = document.getElementById("tabelaEstoque");
const modal = document.getElementById("modal");
const botaoSalvarEdicao = document.getElementById("btnSalvarEdicao");

/* carregar estoque */

function carregarEstoque() {

    try {

        const materiais = StorageEstoque.listarMateriais();

        tabela.innerHTML = "";

        if (materiais.length === 0) {

            const linha = document.createElement("tr");
            const coluna = document.createElement("td");

            coluna.colSpan = 7;
            coluna.textContent = "Nenhum material cadastrado.";

            linha.appendChild(coluna);
            tabela.appendChild(linha);

            return;

        }

        materiais.sort((a, b) =>
            (a.codigo || "").localeCompare(b.codigo || "")
        );

        materiais.forEach(material => {

            const linha = document.createElement("tr");

            const valores = [
                material.codigo || "",
                material.produto || "",
                material.categoria || "",
                material.quantidade ?? 0,
                material.unidade || "",
                material.fornecedor || ""
            ];

            valores.forEach((valor, indice) => {

                const coluna = document.createElement("td");

                coluna.textContent = valor;

                if (
                    indice === 1 &&
                    (material.reciclavel || "").toLowerCase().trim() === "sim"
                ) {
                    coluna.textContent += " ♻️";
                }

                linha.appendChild(coluna);

            });

            const colunaAcoes = document.createElement("td");

            const botaoEditar = document.createElement("button");

            botaoEditar.className = "edit";
            botaoEditar.textContent = "Editar";

            botaoEditar.addEventListener("click", () => {
                abrirModal(material.id, material);
            });

            const botaoExcluir = document.createElement("button");

            botaoExcluir.className = "delete";
            botaoExcluir.textContent = "Excluir";

            botaoExcluir.addEventListener("click", () => {
                excluir(material.id);
            });

            colunaAcoes.appendChild(botaoEditar);
            colunaAcoes.appendChild(botaoExcluir);

            linha.appendChild(colunaAcoes);
            tabela.appendChild(linha);

        });

    } catch (error) {

        console.error("Erro ao carregar estoque:", error);

        alert("Não foi possível carregar os materiais.");

    }

}

/* abrir modal */

function abrirModal(id, material) {

    idEditando = id;

    document.getElementById("editProduto").value =
        material.produto || "";

    document.getElementById("editCategoria").value =
        material.categoria || "";

    document.getElementById("editQuantidade").value =
        material.quantidade ?? 0;

    document.getElementById("editUnidade").value =
        material.unidade || "";

    document.getElementById("editFornecedor").value =
        material.fornecedor || "";

    modal.style.display = "flex";

}

/* fechar modal */

function fecharModal() {

    modal.style.display = "none";

    idEditando = null;

}

/* salvar edição */

function salvarEdicao() {

    if (!idEditando) return;

    const produto =
        document.getElementById("editProduto").value.trim();

    const categoria =
        document.getElementById("editCategoria").value.trim();

    const quantidade =
        Number(document.getElementById("editQuantidade").value);

    const unidade =
        document.getElementById("editUnidade").value.trim();

    const fornecedor =
        document.getElementById("editFornecedor").value.trim();

    if (
        !produto ||
        !categoria ||
        !Number.isInteger(quantidade) ||
        quantidade < 0
    ) {

        alert("Informe os dados corretamente e uma quantidade válida.");

        return;

    }

    try {

        botaoSalvarEdicao.disabled = true;
        botaoSalvarEdicao.textContent = "Salvando...";

        StorageEstoque.atualizarMaterial(idEditando, {

            produto,
            categoria,
            quantidade,
            unidade,
            fornecedor

        });

        alert("Material atualizado com sucesso!");

        fecharModal();

        carregarEstoque();

    } catch (error) {

        console.error("Erro ao atualizar material:", error);

        alert("Não foi possível atualizar o material.");

    } finally {

        botaoSalvarEdicao.disabled = false;
        botaoSalvarEdicao.textContent = "Salvar";

    }

}

/* excluir material */

function excluir(id) {

    if (!confirm("Tem certeza de que deseja excluir este material?")) {
        return;
    }

    try {

        StorageEstoque.excluirMaterial(id);

        alert("Material excluído com sucesso!");

        carregarEstoque();

    } catch (error) {

        console.error("Erro ao excluir material:", error);

        alert("Não foi possível excluir o material.");

    }

}

/* eventos */

document.getElementById("btnSalvarEdicao")
    .addEventListener("click", salvarEdicao);

document.getElementById("btnCancelarEdicao")
    .addEventListener("click", fecharModal);

/* inicialização */

StorageEstoque.inicializar();

carregarEstoque();
