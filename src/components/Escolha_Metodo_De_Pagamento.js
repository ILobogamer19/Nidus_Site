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
  Descricao_De_Produtos_Sendo_Comprados,
}) {
  const [Metodo_De_Pagamento_Escolhido, setMetodo_De_Pagamento_Escolhido] =
    useState();
  const [Confirmacao_De_Valores_Cobrados, setConfirmacao_De_Valores_Cobrados] =
    useState(false);

  useEffect(() => {
    setConfirmacao_De_Valores_Cobrados(false);
    // Calculo_De_Frete();
  }, []);

  const Calculo_De_Frete = () => {
    console.log("Calculo iniciado");

    const options = {
      method: "POST",
      url: "https://app.melhorenvio.com.br/api/v2/me/shipment/calculate",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZjNhNjgxNmFjZWMyYzA2OTI1MWQ0MDkyZTMzZDI3NjAxNTNjOGQyYzE5OTRiMGQ1N2Y1ZWU4YTQ0NGE5MmQ4Mjg3YmM1NGFmYjA3MTM1MTAiLCJpYXQiOjE3MjE3NjYyODkuMTA4MjI3LCJuYmYiOjE3MjE3NjYyODkuMTA4MjI5LCJleHAiOjE3NTMzMDIyODkuMDg5MTAxLCJzdWIiOiI5YzhmZTY2Ni1iZjMwLTRjNjktOTNlMC0xNTA4YWEyMTZiZjMiLCJzY29wZXMiOlsic2hpcHBpbmctY2FsY3VsYXRlIl19.RW9plKDafmaN-_qd1dQ1-qWas8wT0FUe8cY3jNJkYj2euVFmHSRblkbyE4Fz4gocmxfNJQMvqx1nIaoiXf2tCGUWuNnRjIkBFFL0zQsKZOdQFNsyjK1PDqv9mK2f6W6im4mM3pT32tpf1uwbDRY7aHftpbX3TNDFAqJyN3dKhJnLYW-vA9WFJ_zJutNIvlQFLe1ghgR46BNtoP4bHYX08mtX5rKSaz9wnwIYFKq5r6cEy7aeldOoKtZpypvDcOqw0IAAhsDtN1T2Oh7jfFsyfz2c8JosxbDwsxBNHX42jzW0acmLwdixa6w879jhBU5MDsv8JBnhTmMx6Ok4ksDc0DlrcFHJfwNoOgvFUR8MQQBI6jHenX0RGBM9Awnk5n8_1QJmRDp7ROVDVNB9MO4IOgPJqEjV_dgU30H03FwIbnzJ4gbgWS6u7ZYknMFXI43AEphBMSGIRkdmg4Jvh7vLMepg-D5yJ-qCcBBHM3d_A1wJgah_Ax5oXS1IF0e52RXliiI3hpy5hwfSu8qaXfJcVcxDnC5fkyiSTvrecX1iydn0_-j7-gj12t88GDzh__jlaMM_isco2bj7M8g8EisOMZzqUWfOaAvXsT2GPf1Hmeyj4Ymm6K2iydLwcOESUdA3U96TLodpnjAIw89MgfRbLBQ5TGiPKk6JRnwMQTQ9lHo",
        "User-Agent": "Nidus manuelgornelasn@gmail.com",
        "Access-Control-Allow-Origin": true,
      },
      data: {
        from: { postal_code: "96020360" },
        to: { postal_code: "01018020" },
        products: [
          {
            id: "x",
            width: 11,
            height: 17,
            length: 11,
            weight: 0.3,
            insurance_value: 10.1,
            quantity: 1,
          },
          {
            id: "y",
            width: 16,
            height: 25,
            length: 11,
            weight: 0.3,
            insurance_value: 55.05,
            quantity: 2,
          },
          {
            id: "z",
            width: 22,
            height: 30,
            length: 11,
            weight: 1,
            insurance_value: 30,
            quantity: 1,
          },
        ],
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
  }, [Confirmacao_De_Valores_Cobrados, Metodo_De_Pagamento_Escolhido]);

  useEffect(() => {
    if (
      Confirmacao_De_Valores_Cobrados &&
      Forma_De_Pagamento_Escolhida_Atual &&
      Metodo_De_Pagamento_Escolhido
    ) {
      Definir_Endereco_Atual_Da_Pagina_Local("Metodo_De_Pagamento_Escolhido");
    }
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
            <div className="Itens_Com_Descricao_Dentro_Da_Confirmacao">
              <p>Itens: </p>
              {Descricao_De_Produtos_Sendo_Comprados &&
                Descricao_De_Produtos_Sendo_Comprados.map((item, index) => {
                  return (
                    <div
                      className="Itens_Individual_Descricoes"
                      key={"Itens_Individual_Descricoes " + item + index}
                    >
                      <p>{`${
                        item.Quantidade_Do_Produto
                          ? item.Quantidade_Do_Produto
                          : 1
                      } ${item.Nome} ${item.Tamanhos}`}</p>
                    </div>
                  );
                })}
            </div>
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
