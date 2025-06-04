// Essa função é responsável por definir o título da página
// é interessante que o título da página seja alterado na pagina de detalhes do filme
// mas tambem pode ser usado em outras partes do site

export function setTitlePage(title) {
  document.title = `${title} - Movie Universe`
}