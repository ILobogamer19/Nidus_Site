import React, { useState, useEffect } from "react";

import Input_Tipo_Radio from "./Subcomponents_Banner_Apresentacoes/Input_Tipo_Radio";
import Imagens_Do_Slide from "./Subcomponents_Banner_Apresentacoes/Imagens_Do_Slide";
import Navegacao_Entre_Slides from "./Subcomponents_Banner_Apresentacoes/Navegacao_Entre_Slides";
import styled from "styled-components";

const Imagens_de_Slide_Json = await fetch("./data/Slides_Apresentacao.json");
const Imagens_de_Slide = await Imagens_de_Slide_Json.json();

const Div_Slides = styled.div`
  display: flex;
  height: 100%;
`;

var Imagens_A_Serem_Exibidas = [];

const Tempo_Padrao_Troca_De_Slide = 5;

var Teste_De_Execucao = true;

export default function Banner_Apresentacoes(Atributos) {
  const [
    Temporizador_Para_Troca_Automatica,
    setTemporizador_Para_Troca_Automatica,
  ] = useState(Tempo_Padrao_Troca_De_Slide);

  useEffect(() => {
    if (Teste_De_Execucao) {
      Teste_De_Execucao = false;
      Imagens_de_Slide.map((item) => {
        if (Atributos.Banco_De_Banners == item.Banco_De_Banners) {
          Imagens_A_Serem_Exibidas = [...Imagens_A_Serem_Exibidas, item];
        }
      });
    }
  }, []);

  var Quantia_De_Imagens_Exibida = Imagens_A_Serem_Exibidas.length;

  const Slide_Ocupacao = Math.ceil(100 * Quantia_De_Imagens_Exibida);

  return (
    <>
      <div className="Imagens_De_Apresentacoes Opacidade_De_Itens_Para_Temas">
        <Div_Slides
          style={{
            width: Slide_Ocupacao + "%",
          }}
        >
          <Input_Tipo_Radio Banco_De_Banners={Atributos.Banco_De_Banners} />
          <Imagens_Do_Slide
            Banco_De_Banners={Atributos.Banco_De_Banners}
            Slide_Ocupacao_Quantia={Slide_Ocupacao}
            setTemporizador_Para_Troca_Automatica={
              setTemporizador_Para_Troca_Automatica
            }
            Tempo_Padrao_Troca_De_Slide={Tempo_Padrao_Troca_De_Slide}
          />
          <Navegacao_Entre_Slides
            Banco_De_Banners={Atributos.Banco_De_Banners}
            Temporizador_Para_Troca_Automatica={
              Temporizador_Para_Troca_Automatica
            }
            setTemporizador_Para_Troca_Automatica={
              setTemporizador_Para_Troca_Automatica
            }
            Tempo_Padrao_Troca_De_Slide={Tempo_Padrao_Troca_De_Slide}
          />
        </Div_Slides>
      </div>
    </>
  );
}
