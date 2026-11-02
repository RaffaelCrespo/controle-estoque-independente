
const select = document.getElementById("materialSelect");
const quantidadeInput = document.getElementById("quantidade");
const motivoSelect = document.getElementById("motivoSelect");
const motivoOutro = document.getElementById("motivoOutro");
const grupoMotivoOutro = document.getElementById("grupoMotivoOutro");
const botaoRegistrar = document.getElementById("btnRegistrarDescarte");

/* carregar materiais */

function carregarMateriais() {

    try {

        const materiais = StorageEstoque.listarMateriais();

        select.innerHTML = '<option value="">Selecione um material</option>';

        materiais.sort((a, b) =>
            a.produto.localeCompare(b.produto, "pt-BR")
        );

        materiais.forEach(material => {

            const opcao = document.createElement("option");

            opcao.value = material.id;

            opcao.textContent =
                `${material.produto} - Estoque disponível: ${material.quantidade}`;

            opcao.disabled = material.quantidade <= 0;

            select.appendChild(opcao);

        });

    } catch (error) {

        console.error("Erro ao carregar materiais:", error);

        alert("Não foi possível carregar os materiais.");

    }

}

/* campo outro motivo */

motivoSelect.addEventListener("change", () => {

    const mostrar = motivoSelect.value === "Outro";

    grupoMotivoOutro.style.display = mostrar ? "flex" : "none";

    motivoOutro.required = mostrar;

    if (!mostrar) {
        motivoOutro.value = "";
    }

});

/* registrar descarte */

botaoRegistrar.addEventListener("click", () => {

    const id = select.value;
    const qtd = Number(quantidadeInput.value);

    let motivo = motivoSelect.value;

    if (!id || !Number.isInteger(qtd) || qtd <= 0) {

        alert("Selecione um material e informe uma quantidade válida.");

        return;

    }

    if (!motivo) {

        alert("Selecione o motivo do descarte.");

        return;

    }

    if (motivo === "Outro") {

        motivo = motivoOutro.value.trim();

        if (!motivo) {

            alert("Informe o motivo do descarte.");

            return;

        }

    }

    botaoRegistrar.disabled = true;

    botaoRegistrar.innerHTML =
        '<i class="fa-solid fa-spinner fa-spin"></i> Registrando...';

    try {

        // atualizar estoque e registrar histórico
        StorageEstoque.registrarDescarte(id, qtd, motivo);

        alert("Descarte registrado com sucesso!");

        // limpar formulário
        quantidadeInput.value = "";
        motivoOutro.value = "";
        select.value = "";
        motivoSelect.value = "Quebra";

        grupoMotivoOutro.style.display = "none";
        motivoOutro.required = false;

        // atualizar quantidades disponíveis
        carregarMateriais();

    } catch (error) {

        console.error("Erro ao registrar descarte:", error);

        if (error.message === "Quantidade insuficiente no estoque.") {

            alert("A quantidade informada é maior que o estoque disponível.");

        } else if (error.message === "Material não encontrado.") {

            alert("O material selecionado não foi encontrado.");

        } else if (error.message === "Informe uma quantidade válida.") {

            alert("Informe uma quantidade válida.");

        } else if (error.message === "Informe o motivo do descarte.") {

            alert("Selecione o motivo do descarte.");

        } else {

            alert("Não foi possível registrar o descarte. Tente novamente.");

        }

    } finally {

        botaoRegistrar.disabled = false;

        botaoRegistrar.innerHTML =
            '<i class="fa-solid fa-recycle"></i> Registrar Descarte';

    }

});

/* inicialização */

StorageEstoque.inicializar();

carregarMateriais();
