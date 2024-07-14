//#region Importacoes
//#region __ Hooks
import { useEffect, useState } from "react";
//#endregion __

//#region __ Ferramentas
import { Busca_De_Configuracoes_JSON } from "../Ferramentas/Busca_De_Pacote_JSON";
//#endregion __
//#endregion

//#region Configuracoes
var Pacote_De_Configuracao = await Busca_De_Configuracoes_JSON();

var Produtos_Informacoes = Pacote_De_Configuracao.Produtos;

//#endregion

export default function Produtos_Principais({ Filtro_Ativo }) {
  const [Imagem_Focada_Atualmente, setImagem_Focada_Atualmente] = useState();

  const Construcao_De_Produtos = (item) => {
    return (
      <div
        className="Produto_Individual_Card_Padronizado"
        key={"Produto_Individual_Card_Padronizado" + item.Id}
        onMouseEnter={() => {
          setImagem_Focada_Atualmente(item.Nome);
        }}
        onMouseLeave={() => {
          setImagem_Focada_Atualmente();
        }}
      >
        <img
          style={
            Imagem_Focada_Atualmente == item.Nome
              ? {
                  opacity: 0,
                }
              : {
                  opacity: 1,
                }
          }
          className="Imagem_Do_Produto_Padronizado"
          src={"./img/" + item.Tipo + "/" + item.Nome + "/1.png"}
        />
        <img
          style={
            Imagem_Focada_Atualmente == item.Nome
              ? {
                  opacity: 1,
                }
              : {
                  transition: "opacity 0.3s ease",
                  opacity: 0,
                }
          }
          className="Imagem_Do_Produto_Padronizado Segunda_Parte"
          src={"./img/" + item.Tipo + "/" + item.Nome + "/2.png"}
        />
        <p className="Nome_Do_Produto_Padronizado">{item.Nome}</p>
        <p className="Colecao_Do_Produto_Padronizado">{item.Colecao}</p>
        <p className="Preco_Do_Produto_Padronizado">
          R${" "}
          {item.Preco.toString().includes(".")
            ? item.Preco.toString().replace(".", ",")
            : item.Preco + ",00"}
        </p>
      </div>
    );
  };

  // Filtrar os produtos com base no Filtro_Ativo
  const produtosFiltrados = Filtro_Ativo
    ? Produtos_Informacoes.filter((item) => item.Filtros.includes(Filtro_Ativo))
    : Produtos_Informacoes;

  return (
    <div className="Produtos_Principais_Conjunto">
      {produtosFiltrados.map((item) => Construcao_De_Produtos(item))}
    </div>
  );
}
