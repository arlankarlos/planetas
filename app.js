/**
 * Preenche a div com id "resultado-pesquisa" com uma lista
 * de destaque com titulo e descricao de cada objeto na lista
 * "dados".
 */
function pesquisar() {
  let section = document.getElementById("resultado-pesquisa");


  let campoPesquisa = document.getElementById("campo-pesquisa").value;

  if (campoPesquisa ==""){
    section.innerHTML = "<div class='destaque'>Insira um termo para pesquisar</div>";
    return
  }

  campoPesquisa = campoPesquisa.toLowerCase();
  let lowerCaseTitulo = ""
  let lowerCaseDescricao = ""
  let lowerCaseTags = ""

  let resultados = "";

  // exibe cada objeto dentro da lista de planetas
  for (let dado of dados) {
    lowerCaseTitulo = dado.titulo.toLowerCase()
    lowerCaseDescricao = dado.descricao.toLowerCase()
    lowerCaseTags = dado.tags.toLowerCase()

    if (lowerCaseTitulo.includes(campoPesquisa) || 
    lowerCaseDescricao.includes(campoPesquisa) ||
    lowerCaseTags.includes(campoPesquisa)) {
      resultados += `
         <div class="destaque">
            <h2>${dado.titulo}</h2>
             <p>
                ${dado.descricao}
               </p>
            </div>
            <br />
        `;
    }
  }

  if (resultados == "") {
    resultados = '<div class="destaque">Nenhum resultado encontrado</div>';
  }

  section.innerHTML = resultados;
}

const input = document.getElementById("campo-pesquisa");
const botao = document.getElementById("meuBotao");
input.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    botao.click();
  }
})




