//#region Importes
import React, { useState, useEffect } from "react";
//#endregion

//#region Importação de Json
const Imagens_de_Slide_Json = await fetch("./data/Slides_Apresentacao.json");
const Imagens_de_Slide = await Imagens_de_Slide_Json.json();
//#endregion

//#region Aplicação de navegação de slides
export default function Navegacao_Entre_Slides({
  setTemporizador_Para_Troca_Automatica,
  Temporizador_Para_Troca_Automatica,
  Tempo_Padrao_Troca_De_Slide,
  Banco_De_Banners,
}) {
  //#region Função que Avança para o proximo slide quando clicar em um botão ou quando o tempo do temporizador acaba
  function Avancar_Slide() {
    setTemporizador_Para_Troca_Automatica(Tempo_Padrao_Troca_De_Slide);
    var Proximo_Input_Radio;
    var Primeiro_Slide_Existente = 99999999999;
    var Atual_Input_Radio_Selecionado;

    Imagens_de_Slide.map((item) => {
      if (
        Primeiro_Slide_Existente > item.Id &&
        Banco_De_Banners == item.Banco_De_Banners
      ) {
        Primeiro_Slide_Existente = item.Id;
      }
    });

    if (document.querySelector("input[name='Slides_Control']:checked")) {
      var Atual_Input_Radio_Selecionado = document.querySelector(
        "input[name='Slides_Control']:checked"
      );
    } else {
      var Atual_Input_Radio_Selecionado = document.getElementById(
        "Barra_De_Pesquisa_" + Primeiro_Slide_Existente
      );
    }

    const Numero_Do_Id_Ativo = Atual_Input_Radio_Selecionado.value;

    var Numero_Do_Id_Para_Ativar = parseInt(Numero_Do_Id_Ativo) + 1;

    if (
      document.getElementById("Barra_De_Pesquisa_" + Numero_Do_Id_Para_Ativar)
    ) {
      Proximo_Input_Radio = document.getElementById(
        "Barra_De_Pesquisa_" + Numero_Do_Id_Para_Ativar
      );
    } else {
      Proximo_Input_Radio = document.getElementById(
        "Barra_De_Pesquisa_" + Primeiro_Slide_Existente
      );
    }
    Proximo_Input_Radio.click();
  }
  //#endregion

  //#region Timer de avanço de slide após 10 segundos

  useEffect(() => {
    const Intervalo_De_Troca_De_Slide = setInterval(() => {
      if (Temporizador_Para_Troca_Automatica) {
        setTemporizador_Para_Troca_Automatica(
          (Valor_Antigo) => Valor_Antigo - 1
        );
      }
    }, 1000);

    return () => clearInterval(Intervalo_De_Troca_De_Slide);
  }, []);

  useEffect(() => {
    if (Temporizador_Para_Troca_Automatica == 0) {
      document.getElementById("Botao_De_Avancar_Para_O_Proximo_Slide").click();
      if (Temporizador_Para_Troca_Automatica == 0) {
        setTemporizador_Para_Troca_Automatica(Tempo_Padrao_Troca_De_Slide);
      }
    }
  }, [Temporizador_Para_Troca_Automatica]);
  //#endregion

  //#region Retorno JSX

  return (
    <div className="Navegacao_Entre_Slides">
      {Imagens_de_Slide.map((item) => {
        if (Banco_De_Banners == item.Banco_De_Banners) {
          return (
            <label
              className="Barra_De_Navegacao_De_Imagem"
              htmlFor={"Slide_" + item.Id}
              key={item.Id + item.Imagem}
              id={"Barra_De_Pesquisa_" + item.Id}
              style={
                item.Id == 1
                  ? { backgroundColor: "rgb(29, 29, 29)" }
                  : { backgroundColor: "" }
              }
              onClick={() => {
                // setTemporizador_Para_Troca_Automatica(
                //   Tempo_Padrao_Troca_De_Slide
                // );
                setTimeout(() => {
                  var Todos_Os_Input_Radio_De_Navegacao =
                    document.querySelectorAll(
                      ".Input_Tipo_Radio_Alteracao_Slide"
                    );

                  Todos_Os_Input_Radio_De_Navegacao.forEach((item) => {
                    var Label_Correspondente = document.getElementById(
                      "Barra_De_Pesquisa_" + item.value
                    );
                    Label_Correspondente.style.backgroundColor = "";
                    if (item.checked) {
                      Label_Correspondente.style.backgroundColor =
                        "rgb(29, 29, 29)";
                    }
                  });
                }, 50);
              }}
            ></label>
          );
        }
      })}
      <button
        onClick={Avancar_Slide}
        className="Botao_Proximo_Slide"
        id="Botao_De_Avancar_Para_O_Proximo_Slide"
        aria-label="Botão de avançar slide"
      ></button>
    </div>
  );

  //#endregion
}
//#endregion
