
// acesso à demonstração independente

document.addEventListener("DOMContentLoaded", () => {

    const formulario = document.getElementById("loginForm");

    if (!formulario) return;

    const botaoEntrar = formulario.querySelector('button[type="submit"]');

    formulario.addEventListener("submit", (event) => {

        event.preventDefault();

        const textoOriginal = botaoEntrar.textContent;

        botaoEntrar.disabled = true;
        botaoEntrar.textContent = "Preparando demonstração...";

        try {

            // inicializar armazenamento local
            StorageEstoque.inicializar();

            // abrir o dashboard
            window.location.href = "pages/dashboard.html";

        } catch (erro) {

            console.error("Erro ao iniciar demonstração:", erro);

            alert(
                "Não foi possível iniciar a demonstração. " +
                "Verifique os dados armazenados e tente novamente."
            );

            botaoEntrar.disabled = false;
            botaoEntrar.textContent = textoOriginal;

        }

    });

});
