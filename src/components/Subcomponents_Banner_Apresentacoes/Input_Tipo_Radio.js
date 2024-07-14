import React, { useState, useEffect } from "react";

const Imagens_de_Slide_Json = await fetch("./data/Slides_Apresentacao.json");

const Imagens_de_Slide = await Imagens_de_Slide_Json.json();

var Imagens_A_Serem_Exibidas = [];

export default function Input_Tipo_Radio(Atributos) {
  const [Input_Radio_Selecionado, setInput_Radio_Selecionado] = useState(1);

  const Atualizar_O_Input_Selecionado = (evento) => {
    setInput_Radio_Selecionado(parseInt(evento.target.value));
  };

  var Primeiro_Slide_Existente = 9999999;

  Imagens_de_Slide.map((item) => {
    if (Atributos.Banco_De_Banners == item.Banco_De_Banners) {
      if (Primeiro_Slide_Existente > item.Id) {
        Primeiro_Slide_Existente = item.Id;
      }

      Imagens_A_Serem_Exibidas = [...Imagens_A_Serem_Exibidas, item];
    }
  });

  var Quantia_De_Imagens_Exibida = Imagens_A_Serem_Exibidas.length;

  const Slide_Ocupacao = Math.ceil(100 / Quantia_De_Imagens_Exibida);

  const [
    Numero_Fixo_Ocupacao_Individual_Do_Slide,
    setNumero_Fixo_Ocupacao_Individual_Do_Slide,
  ] = useState(Slide_Ocupacao);

  useEffect(() => {
    document
      .getElementById("Barra_De_Pesquisa_" + Primeiro_Slide_Existente)
      .click();
  }, []);

  return (
    <>
      {Imagens_de_Slide.map((item) => {
        if (Atributos.Banco_De_Banners == item.Banco_De_Banners) {
          return (
            <input
              type="radio"
              name="Slides_Control"
              id={"Slide_" + item.Id}
              value={item.Id}
              checked={Input_Radio_Selecionado == item.Id}
              onChange={Atualizar_O_Input_Selecionado}
              key={item.Id}
              className="Input_Tipo_Radio_Alteracao_Slide"
              onClick={() => {
                var Valor_De_Espaco_Que_O_Input_Dara =
                  (item.Id - Primeiro_Slide_Existente) *
                  Numero_Fixo_Ocupacao_Individual_Do_Slide;

                document.querySelector(".Primeiro_Slide")
                  ? (document.querySelector(
                      ".Primeiro_Slide"
                    ).style.marginLeft =
                      "-" + Valor_De_Espaco_Que_O_Input_Dara + "%")
                  : window.location.reload();
              }}
            />
          );
        } else {
          return "";
        }
      })}
    </>
  );
}
