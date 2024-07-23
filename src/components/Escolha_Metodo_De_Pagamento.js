import { useEffect, useState } from "react";

import axios from "axios";

import Metodo_De_Pagamento_Cartao_De_Credito from "./Subcomponents_Escolha_Metodo_De_Pagamento/Metodo_De_Pagamento_Cartao_De_Credito";

export default function Escolha_De_Metodo_De_Pagamento({
  Definir_Forma_De_Pagamento_Escolhida_Atual,
  Definir_Endereco_Atual_Da_Pagina_Local,
  Valor_Total_Guardado_Dentro_Do_Carrinho,
  Quantidade_De_Itens_Adicionados_No_Carrinho,
  Estilo_De_Compra_Carrinho_Ou_Unica,
  Forma_De_Pagamento_Escolhida_Atual,
}) {
  const [Metodo_De_Pagamento_Escolhido, setMetodo_De_Pagamento_Escolhido] =
    useState();
  const [Confirmacao_De_Valores_Cobrados, setConfirmacao_De_Valores_Cobrados] =
    useState(false);

  useEffect(() => {
    setConfirmacao_De_Valores_Cobrados(false);
    Calculo_De_Frete();

    console.log("Executado");
  }, []);

  const Calculo_De_Frete = () => {
    console.log("Calculo iniciado");

    const options = {
      method: "POST",
      url: "https://melhorenvio.com.br/api/v2/me/shipment/calculate",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer token",
        "User-Agent": "Aplicação (email para contato técnico)",
      },
      data: {
        from: { postal_code: "01002001" },
        to: { postal_code: "90570020" },
        package: { height: 4, width: 12, length: 17, weight: 0.3 },
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  useEffect(() => {
    if (Metodo_De_Pagamento_Escolhido == "Cartao_De_Credito_Ou_Debito") {
      Definir_Forma_De_Pagamento_Escolhida_Atual(
        <Metodo_De_Pagamento_Cartao_De_Credito
          Valor_Total_Guardado_Dentro_Do_Carrinho={
            Valor_Total_Guardado_Dentro_Do_Carrinho
          }
        />
      );
    } else if (Metodo_De_Pagamento_Escolhido == "Pix") {
      setConfirmacao_De_Valores_Cobrados(false);
      Definir_Forma_De_Pagamento_Escolhida_Atual();
    } else if (Metodo_De_Pagamento_Escolhido == "Boleto") {
      setConfirmacao_De_Valores_Cobrados(false);
      Definir_Forma_De_Pagamento_Escolhida_Atual();
    }

    console.log(Metodo_De_Pagamento_Escolhido);
  }, [Confirmacao_De_Valores_Cobrados, Metodo_De_Pagamento_Escolhido]);

  useEffect(() => {
    if (
      Confirmacao_De_Valores_Cobrados &&
      Forma_De_Pagamento_Escolhida_Atual &&
      Metodo_De_Pagamento_Escolhido
    ) {
      Definir_Endereco_Atual_Da_Pagina_Local("Metodo_De_Pagamento_Escolhido");
    }
    console.log("Verificacao executada");
  }, [Metodo_De_Pagamento_Escolhido, Confirmacao_De_Valores_Cobrados]);

  return (
    <div
      className="Meios_De_Pagamento_Aceitos"
      data-aos="fade-down"
      data-aos-delay="10"
    >
      <div></div>
      <div className="Metodos_De_Pagamento">
        <div
          className={
            Metodo_De_Pagamento_Escolhido == "Cartao_De_Credito_Ou_Debito"
              ? "Pagamento_Por_Cartao_De_Credito_Ou_Debito Metodo_De_Pagamento_Escolhido"
              : "Pagamento_Por_Cartao_De_Credito_Ou_Debito"
          }
          onClick={() => {
            setMetodo_De_Pagamento_Escolhido("Cartao_De_Credito_Ou_Debito");
          }}
        >
          <i className="fa-regular fa-credit-card"></i>
          <p>Cartão</p>
        </div>
        <div
          className={
            Metodo_De_Pagamento_Escolhido == "Pix"
              ? "Pagamento_Por_Pix Metodo_De_Pagamento_Escolhido"
              : "Pagamento_Por_Pix"
          }
          onClick={() => {
            setMetodo_De_Pagamento_Escolhido("Pix");
          }}
        >
          <i className="fa-brands fa-pix"></i>
          <p>Pix</p>
        </div>
        <div
          className={
            Metodo_De_Pagamento_Escolhido == "Boleto"
              ? "Pagamento_Por_Boleto Metodo_De_Pagamento_Escolhido"
              : "Pagamento_Por_Boleto"
          }
          onClick={() => {
            setMetodo_De_Pagamento_Escolhido("Boleto");
          }}
        >
          <i className="fa-solid fa-barcode"></i>
          <p>Boleto</p>
        </div>
      </div>
      <div className="Preco_Total_De_Itens_Resumo">
        <div className="Itens_Conjunto_De_Informacoes">
          <div className="Valores_Que_Seram_Checados">
            <p>
              Quantia de itens no carrinho:{" "}
              {Estilo_De_Compra_Carrinho_Ou_Unica == "Unica"
                ? 1
                : Quantidade_De_Itens_Adicionados_No_Carrinho}{" "}
              unidades
            </p>
            <p>
              Valor total de produtos: R${" "}
              {Valor_Total_Guardado_Dentro_Do_Carrinho &&
              Valor_Total_Guardado_Dentro_Do_Carrinho.toString().includes(".")
                ? Valor_Total_Guardado_Dentro_Do_Carrinho.toString().replace(
                    ".",
                    ","
                  )
                : Valor_Total_Guardado_Dentro_Do_Carrinho + ",00"}
            </p>
          </div>
          <div className="Botao_De_Checagem_De_Valores">
            <button
              onClick={() => {
                if (!Metodo_De_Pagamento_Escolhido) {
                  alert("Escolha um método de pagamento antes");
                } else {
                  setConfirmacao_De_Valores_Cobrados(true);
                }
              }}
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
