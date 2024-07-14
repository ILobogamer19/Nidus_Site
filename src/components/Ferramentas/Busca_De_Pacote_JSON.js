export default async function Busca_De_Pacote_JSON(
  Nome_Do_Arquivo_Para_Pesquisa
) {
  const Arquivo_JSON = await fetch(
    "./data/" + Nome_Do_Arquivo_Para_Pesquisa + ".json"
  );

  const Arquivo = await Arquivo_JSON.json();

  return await Arquivo;
}

export async function Busca_De_Configuracoes_JSON(Variavel_obtida) {
  const Pacote_De_Configuracao_JSON = await fetch(
    "./data/Pacote_De_Configuracao.json"
  );

  const Pacote_De_Configuracao = await Pacote_De_Configuracao_JSON.json();

  return await Pacote_De_Configuracao;
}
