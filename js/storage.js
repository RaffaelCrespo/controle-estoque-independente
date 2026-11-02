
/* armazenamento local */

const StorageEstoque = (() => {

    const CHAVE = "controleEstoqueDemo_v1";

    /* identificadores */

    function gerarId() {

        if (crypto.randomUUID) {
            return crypto.randomUUID();
        }

        return Date.now().toString(36) +
            Math.random().toString(36).substring(2);

    }

    function gerarCodigo() {

        return "MAT-" +
            gerarId().replace(/-/g, "").substring(0, 6).toUpperCase();

    }

    /* dados iniciais demonstração */

    function criarDadosIniciais() {

        const materiais = [
            {
                id: gerarId(),
                codigo: "MAT-A10001",
                produto: "Parafuso sextavado M8",
                categoria: "Fixadores",
                quantidade: 250,
                unidade: "Unidade",
                fornecedor: "Aço Forte",
                reciclavel: "Não",
                descricao: "Parafusos para montagem industrial.",
                criadoEm: new Date().toISOString()
            },
            {
                id: gerarId(),
                codigo: "MAT-A10002",
                produto: "Chapa de aço 2mm",
                categoria: "Acabamento",
                quantidade: 85,
                unidade: "Unidade",
                fornecedor: "Metalúrgica Paraná",
                reciclavel: "Sim",
                descricao: "Chapas utilizadas na fabricação de peças.",
                criadoEm: new Date().toISOString()
            },
            {
                id: gerarId(),
                codigo: "MAT-A10003",
                produto: "Cabo elétrico 2,5mm",
                categoria: "Elétricos",
                quantidade: 120,
                unidade: "Metro",
                fornecedor: "Eletro Sul",
                reciclavel: "Sim",
                descricao: "Cabos para instalações elétricas.",
                criadoEm: new Date().toISOString()
            },
            {
                id: gerarId(),
                codigo: "MAT-A10004",
                produto: "Caixa de papelão",
                categoria: "Embalagens",
                quantidade: 60,
                unidade: "Unidade",
                fornecedor: "Embala Paraná",
                reciclavel: "Sim",
                descricao: "Embalagens para armazenamento.",
                criadoEm: new Date().toISOString()
            },
            {
                id: gerarId(),
                codigo: "MAT-A10005",
                produto: "Disco de corte 4.1/2",
                categoria: "Ferramentas",
                quantidade: 35,
                unidade: "Unidade",
                fornecedor: "Ferramentas Brasil",
                reciclavel: "Não",
                descricao: "Discos utilizados em operações de corte.",
                criadoEm: new Date().toISOString()
            },
            {
                id: gerarId(),
                codigo: "MAT-A10006",
                produto: "Perfil de alumínio",
                categoria: "Acabamento",
                quantidade: 48,
                unidade: "Unidade",
                fornecedor: "Alumínio Sul",
                reciclavel: "Sim",
                descricao: "Perfis utilizados em estruturas.",
                criadoEm: new Date().toISOString()
            },
            {
                id: gerarId(),
                codigo: "MAT-A10007",
                produto: "Arruela lisa M8",
                categoria: "Fixadores",
                quantidade: 400,
                unidade: "Unidade",
                fornecedor: "Aço Forte",
                reciclavel: "Não",
                descricao: "Arruelas para fixação.",
                criadoEm: new Date().toISOString()
            },
            {
                id: gerarId(),
                codigo: "MAT-A10008",
                produto: "Luva de proteção",
                categoria: "Outros",
                quantidade: 90,
                unidade: "Par",
                fornecedor: "EPI Paraná",
                reciclavel: "Não",
                descricao: "Equipamento de proteção individual.",
                criadoEm: new Date().toISOString()
            }
        ];

        const descartes = [
            {
                id: gerarId(),
                materialId: materiais[0].id,
                produto: materiais[0].produto,
                categoria: materiais[0].categoria,
                quantidade: 12,
                motivo: "Quebra",
                data: new Date().toISOString()
            },
            {
                id: gerarId(),
                materialId: materiais[4].id,
                produto: materiais[4].produto,
                categoria: materiais[4].categoria,
                quantidade: 4,
                motivo: "Dano",
                data: new Date().toISOString()
            }
        ];

        return { materiais, descartes };

    }

    /* leitura e gravação */

    function lerBanco() {

        const dados = localStorage.getItem(CHAVE);

        if (!dados) {
            throw new Error("Os dados da demonstração não foram inicializados.");
        }

        const banco = JSON.parse(dados);

        if (
            !banco ||
            !Array.isArray(banco.materiais) ||
            !Array.isArray(banco.descartes)
        ) {
            throw new Error("Os dados armazenados estão inválidos.");
        }

        return banco;

    }

    function salvarBanco(banco) {

        localStorage.setItem(CHAVE, JSON.stringify(banco));

    }

    function inicializar() {

        if (localStorage.getItem(CHAVE) === null) {

            salvarBanco(criarDadosIniciais());

        } else {

            lerBanco();

        }

    }

    /* materiais */

    function listarMateriais() {

        return lerBanco().materiais;

    }

    function obterMaterial(id) {

        return lerBanco().materiais.find(
            material => material.id === id
        );

    }

    function cadastrarMaterial(dados) {

        const banco = lerBanco();

        const novoMaterial = {
            id: gerarId(),
            codigo: gerarCodigo(),
            produto: dados.produto,
            categoria: dados.categoria,
            quantidade: dados.quantidade,
            unidade: dados.unidade,
            fornecedor: dados.fornecedor,
            reciclavel: dados.reciclavel,
            descricao: dados.descricao || "",
            criadoEm: new Date().toISOString()
        };

        banco.materiais.push(novoMaterial);

        salvarBanco(banco);

        return novoMaterial;

    }

    function atualizarMaterial(id, alteracoes) {

        const banco = lerBanco();

        const indice = banco.materiais.findIndex(
            material => material.id === id
        );

        if (indice === -1) {
            throw new Error("Material não encontrado.");
        }

        const camposPermitidos = [
            "produto",
            "categoria",
            "quantidade",
            "unidade",
            "fornecedor"
        ];

        camposPermitidos.forEach(campo => {

            if (alteracoes[campo] !== undefined) {
                banco.materiais[indice][campo] = alteracoes[campo];
            }

        });

        salvarBanco(banco);

        return banco.materiais[indice];

    }

    function excluirMaterial(id) {

        const banco = lerBanco();

        const quantidadeAnterior = banco.materiais.length;

        banco.materiais = banco.materiais.filter(
            material => material.id !== id
        );

        if (banco.materiais.length === quantidadeAnterior) {
            throw new Error("Material não encontrado.");
        }

        salvarBanco(banco);

    }

    /* descartes */

    function listarDescartes() {

        return lerBanco().descartes;

    }

    function registrarDescarte(materialId, quantidade, motivo) {

        const banco = lerBanco();

        const material = banco.materiais.find(
            item => item.id === materialId
        );

        if (!material) {
            throw new Error("Material não encontrado.");
        }

        if (
            !Number.isInteger(quantidade) ||
            quantidade <= 0
        ) {
            throw new Error("Informe uma quantidade válida.");
        }

        if (quantidade > material.quantidade) {
            throw new Error("Quantidade insuficiente no estoque.");
        }

        if (!motivo) {
            throw new Error("Informe o motivo do descarte.");
        }

        material.quantidade -= quantidade;

        banco.descartes.push({

            id: gerarId(),
            materialId: material.id,
            produto: material.produto,
            categoria: material.categoria,
            quantidade,
            motivo,
            data: new Date().toISOString()

        });

        // salva a alteração do estoque e o descarte juntos
        salvarBanco(banco);

        return true;

    }

    /* funções disponveis do sistema */

    return {
        inicializar,
        listarMateriais,
        obterMaterial,
        cadastrarMaterial,
        atualizarMaterial,
        excluirMaterial,
        listarDescartes,
        registrarDescarte
    };

})();

/* disponibilizar o armazenamento para as páginas */
window.StorageEstoque = StorageEstoque;
