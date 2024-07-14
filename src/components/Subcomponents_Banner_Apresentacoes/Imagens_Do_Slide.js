import styled from "styled-components";
import { useEffect, useState } from "react";

const Imagens_de_Slide_Json = await fetch("./data/Slides_Apresentacao.json");

const Imagens_de_Slide = await Imagens_de_Slide_Json.json();

var Imagens_A_Serem_Exibidas = [];

var Id_Primeiro_Slide = 9999999;

export default function Imagens_Do_Slide({
  setTemporizador_Para_Troca_Automatica,
  Tempo_Padrao_Troca_De_Slide,
  Banco_De_Banners,
  Slide_Ocupacao_Quantia,
}) {
  const [Style_Da_Div_Principal, setStyle_Da_Div_Principal] = useState({
    width: "100%",
    maxWidth: window.innerWidth + "px",
    transition: "none",
  });

  useEffect(() => {
    setStyle_Da_Div_Principal((prev) => {
      return {
        ...prev,
        transition: "1s",
      };
    });
  }, []);

  Imagens_de_Slide.map((item) => {
    if (Banco_De_Banners == item.Banco_De_Banners) {
      if (Id_Primeiro_Slide > item.Id) {
        Id_Primeiro_Slide = item.Id;
      }
      Imagens_A_Serem_Exibidas = [...Imagens_A_Serem_Exibidas, item];
    }
  });

  var Slide_Ocupacao = Slide_Ocupacao_Quantia;

  return (
    <>
      {Imagens_de_Slide.map((item) => {
        if (Banco_De_Banners == item.Banco_De_Banners) {
          return (
            <div
              className={
                "Slide Conjunto_Slide_Itens_Div" +
                (item.Id == Id_Primeiro_Slide ? " Primeiro_Slide" : " ")
              }
              key={item.Imagem}
              style={Style_Da_Div_Principal}
            >
              <div
                className={
                  "Conteudo_Do_Slide_Clicavel Numero_Personalizacao_Individual_" +
                  item.Id
                }
              >
                {item.Extras && (
                  <div
                    className="Informacoes_Extras_No_Banner"
                    onMouseOver={() => {
                      setTemporizador_Para_Troca_Automatica(false);
                    }}
                    onMouseLeave={() => {
                      setTemporizador_Para_Troca_Automatica(
                        Tempo_Padrao_Troca_De_Slide
                      );
                    }}
                  >
                    <p className="Extra_Titulo_Centralizado">
                      {item.Titulo_Centralizado}
                    </p>
                    <i className="Extra_Sub_Titulo_Centralizado">
                      {item.Sub_Titulo_Centralizado}
                    </i>
                  </div>
                )}
              </div>

              <img
                src={item.Imagem}
                alt={
                  "Slide com " +
                  item.Imagem.replace("img/", "")
                    .replace(".webp", "")
                    .replace("_", " ")
                }
              />
            </div>
          );
        }
      })}
    </>
  );
}
