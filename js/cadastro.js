
const form = document.getElementById("formCadastro");

form.addEventListener("submit", (e) => {

    e.preventDefault();

    const botaoSalvar = form.querySelector('button[type="submit"]');
    const textoOriginal = botaoSalvar.textContent;

    const produto = document.getElementById("produto").value.trim();
    const categoria = document.getElementById("categoria").value.trim();
    const quantidade = Number(document.getElementById("quantidade").value);
    const unidade = document.getElementById("unidade").value.trim();
    const fornecedor = document.getElementById("fornecedor").value.trim();
    const reciclavel = document.getElementById("reciclavel").value;
    const descricao = document.getElementById("descricao").value.trim();

    if (
        !produto ||
        !categoria ||
        !Number.isInteger(quantidade) ||
        quantidade <= 0
    ) {

        alert("Preencha os campos obrigatórios e informe uma quantidade válida.");
        return;

    }

    try {

        botaoSalvar.disabled = true;
        botaoSalvar.textContent = "Salvando...";

        const novoMaterial = StorageEstoque.cadastrarMaterial({

            produto,
            categoria,
            quantidade,
            unidade,
            fornecedor,
            reciclavel,
            descricao

        });

        alert(
            "Material cadastrado com sucesso!\nCódigo: " +
            novoMaterial.codigo
        );

        form.reset();

    } catch (error) {

        console.error("Erro ao cadastrar material:", error);

        alert("Não foi possível cadastrar o material. Tente novamente.");

    } finally {

        botaoSalvar.disabled = false;
        botaoSalvar.textContent = textoOriginal;

    }

});
