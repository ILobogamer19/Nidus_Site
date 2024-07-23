import { useEffect, useState } from "react";

import { loadMercadoPago } from "@mercadopago/sdk-js";

await loadMercadoPago();

export default function Metodo_De_Pagamento_Cartao_De_Credito({
  Valor_Total_Guardado_Dentro_Do_Carrinho,
}) {
  const Valor_Que_Vai_Ser_Cobrado =
    Valor_Total_Guardado_Dentro_Do_Carrinho.toString();

  const Descricao_Da_Compra = "Camisetas Lindas da Nidus One";

  const Estilos_Dos_Inputs_De_Cartao = {
    fontSize: "1rem",
    color: getComputedStyle(document.documentElement)
      .getPropertyValue("--Input_Infomacao_Do_Cartao_Cor_Da_Letra")
      .trim(),
    marginLeft: "15px",
  };

  useEffect(() => {
    const Corretor_De_Mercado_Pago_Nao_Definido = async () => {
      //#region  Cria a conexão com o Mercado pago
      // eslint-disable-next-line
      const mercadopago = new MercadoPago(
        "TEST-17e75b61-5d92-47e6-9766-9502a537da0f"
      );
      //#endregion

      //#region  Criacao de Formulários de Cartão
      function loadCardForm() {
        const payButton = document.getElementById("form-checkout__submit");
        const validationErrorMessages = document.getElementById(
          "validation-error-messages"
        );

        const form = {
          id: "form-checkout",
          cardholderName: {
            id: "form-checkout__cardholderName",
            placeholder: "Holder name",
          },
          cardholderEmail: {
            id: "form-checkout__cardholderEmail",
            placeholder: "E-mail",
          },
          cardNumber: {
            id: "form-checkout__cardNumber",
            placeholder: "Numero do Cartão",
            style: Estilos_Dos_Inputs_De_Cartao,
          },
          expirationDate: {
            id: "form-checkout__expirationDate",
            placeholder: "MM/YYYY",
            class: "Teste",
            style: Estilos_Dos_Inputs_De_Cartao,
          },
          securityCode: {
            id: "form-checkout__securityCode",
            placeholder: "CVV",
            style: Estilos_Dos_Inputs_De_Cartao,
          },
          installments: {
            id: "form-checkout__installments",
            placeholder: "Parcelas",
          },
          identificationType: {
            id: "form-checkout__identificationType",
          },
          identificationNumber: {
            id: "form-checkout__identificationNumber",
            placeholder: "Identification number",
          },
          issuer: {
            id: "form-checkout__issuer",
            placeholder: "Bandeira do Cartão",
          },
        };

        const cardForm = mercadopago.cardForm({
          amount: Valor_Que_Vai_Ser_Cobrado,
          iframe: true,
          form,
          callbacks: {
            onFormMounted: (error) => {
              if (error)
                return console.warn("Form Mounted handling error: ", error);
              console.log("Form mounted");
            },
            onSubmit: (event) => {
              event.preventDefault();
              document.getElementById("loading-message").style.display =
                "block";

              const {
                paymentMethodId,
                issuerId,
                cardholderEmail: email,
                amount,
                token,
                installments,
                identificationNumber,
                identificationType,
              } = cardForm.getCardFormData();

              fetch("https://zvfmwc2c-3001.brs.devtunnels.ms/process_payment", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  token,
                  issuerId,
                  paymentMethodId,
                  transactionAmount: Number(amount),
                  installments: Number(installments),
                  description: Descricao_Da_Compra,
                  payer: {
                    email,
                    identification: {
                      type: identificationType,
                      number: identificationNumber,
                    },
                  },
                }),
              })
                .then((response) => {
                  return response.json();
                })
                .then((result) => {
                  if (!result.hasOwnProperty("error_message")) {
                    document.getElementById("success-response").style.display =
                      "block";
                    document.getElementById("payment-id").innerText = result.id;
                    document.getElementById("payment-status").innerText =
                      result.status;
                    document.getElementById("payment-detail").innerText =
                      result.detail;
                  } else {
                    document.getElementById("error-message").textContent =
                      result.error_message;
                    document.getElementById("fail-response").style.display =
                      "block";
                  }
                })
                .catch((error) => {
                  alert("Unexpected error\n" + JSON.stringify(error));
                });
            },
            onFetching: (resource) => {
              console.log("Fetching resource: ", resource);
              payButton.setAttribute("disabled", true);
              return () => {
                payButton.removeAttribute("disabled");
              };
            },
            onCardTokenReceived: (errorData, token) => {
              if (errorData && errorData.error.fieldErrors.length !== 0) {
                errorData.error.fieldErrors.forEach((errorMessage) => {
                  alert(errorMessage);
                });
              }

              return token;
            },
            onValidityChange: (error, field) => {
              const input = document.getElementById(form[field].id);
              removeFieldErrorMessages(input, validationErrorMessages);
              addFieldErrorMessages(input, validationErrorMessages, error);
              enableOrDisablePayButton(validationErrorMessages, payButton);
            },
          },
        });
      }
      //#endregion

      //#region Funcoes de retorno de erro
      function removeFieldErrorMessages(input, validationErrorMessages) {
        Array.from(validationErrorMessages.children).forEach((child) => {
          const shouldRemoveChild = child.id.includes(input.id);
          if (shouldRemoveChild) {
            validationErrorMessages.removeChild(child);
          }
        });
      }

      function addFieldErrorMessages(input, validationErrorMessages, error) {
        if (error) {
          input.classList.add("validation-error");
          error.forEach((e, index) => {
            const p = document.createElement("p");
            p.id = `${input.id}-${index}`;
            p.innerText = e.message;
            validationErrorMessages.appendChild(p);
          });
        } else {
          input.classList.remove("validation-error");
        }
      }
      //#endregion

      //#region Funcao de validacao de botao de envio de pagamento(Ativa ou desativa)
      function enableOrDisablePayButton(validationErrorMessages, payButton) {
        if (validationErrorMessages.children.length > 0) {
          payButton.setAttribute("disabled", true);
        } else {
          payButton.removeAttribute("disabled");
        }
      }
      //#endregion

      //#region Execucao de funcoes ao carregar
      //Carregamento de local de cartao
      loadCardForm();
      //#endregion
    };

    Corretor_De_Mercado_Pago_Nao_Definido();
  }, []);

  return (
    <div
      className="Sessao_De_Pagamento_Por_Cartao_De_Credito_Ou_Debito"
      data-aos="fade-down"
      data-aos-delay="10"
    >
      <section className="payment-form dark Sessao_De_Preenchimento_De_Dados_Do_Cartao">
        <div className="container__payment">
          <div className="block-heading">
            <h2>Pagamento com Cartão</h2>
            <p>Preencha corretamente os campos</p>
          </div>
          <div className="form-payment">
            <div className="payment-details">
              <form
                id="form-checkout"
                className="ERnviaodapskpojpjdsjsoakljdklhjadlkasjhdhasjkdhjkashdjkhsajkdhjkashdjkhsajkdhjskahdajkhdjkshadkjhkdjhsdkjhahdshdhashdkshadjkhasjkdhjkah"
              >
                <div className="Informacoes_Do_Pagador">
                  <label htmlFor="Nome_Do_Pagador_Input">Nome:</label>
                  <input type="text" id="Nome_Do_Pagador_Input" />
                  <label htmlFor="Sobrenome_Do_Pagador_Input">Sobrenome:</label>
                  <input type="text" id="Sobrenome_Do_Pagador_Input" />
                  <br />
                  <label htmlFor="Celular_Do_Pagador_Input">Celular:</label>
                  <input type="text" id="Celular_Do_Pagador_Input" />

                  <h3 className="title">Email para contato:</h3>
                  <div className="row">
                    <div className="form-group col">
                      <input
                        id="form-checkout__cardholderEmail"
                        name="cardholderEmail"
                        type="email"
                        className="form-control Input_De_Email_Para_Contato"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-sm-5">
                      <select
                        id="form-checkout__identificationType"
                        name="identificationType"
                        className="form-control Select_De_Tipo_De_Documento_Para_Informacao"
                      ></select>
                    </div>
                    <div className="form-group col-sm-7">
                      <input
                        id="form-checkout__identificationNumber"
                        name="docNumber"
                        type="text"
                        className="form-control Input_De_Numero_De_Documento"
                      />
                    </div>
                  </div>
                </div>
                <br />
                <h3 className="title" style={{ display: "none" }}>
                  Detalhes do cartão
                </h3>

                <div
                  className="row"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div className="Conjunto_Itens_De_Pagamento">
                    <div className="Conjunto_De_Nome_No_Cartao_E_Numero">
                      <div className="form-group col-sm-8 Alinhamento_De_Titulo_Com_Input">
                        <label htmlFor="form-checkout__cardholderName">
                          Nome no cartão:
                        </label>
                        <input
                          id="form-checkout__cardholderName"
                          name="cardholderName"
                          type="text"
                          className="form-control Nome_Que_Esta_No_Cartao"
                          style={Estilos_Dos_Inputs_De_Cartao}
                        />
                      </div>
                      <div className="form-group col-sm-8 Alinhamento_De_Titulo_Com_Input">
                        <label htmlFor="form-checkout__cardNumber">
                          Numero do cartão
                        </label>
                        <div
                          id="form-checkout__cardNumber"
                          className="form-control h-40 Controle_De_Elemento_Frame_Input"
                        ></div>
                      </div>
                    </div>
                    <div className="Conjunto_Codigo_De_Seguranca_E_Data_Expiracao">
                      <div className="form-group col-sm-4 Alinhamento_De_Titulo_Com_Input">
                        <label htmlFor="form-checkout__securityCode">
                          Código de Segurança do cartão
                        </label>
                        <div
                          id="form-checkout__securityCode"
                          className="form-control h-40 Controle_De_Elemento_Frame_Input"
                        ></div>
                      </div>
                      <div className="form-group col-sm-4 ">
                        <div className="input-group expiration-date Alinhamento_De_Titulo_Com_Input">
                          <label htmlFor="form-checkout__expirationDate">
                            Data de expiração do cartão
                          </label>
                          <div
                            id="form-checkout__expirationDate"
                            className="form-control h-40 Controle_De_Elemento_Frame_Input"
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="Itens_Restantes_Para_Concluir_Pagamento">
                    <div className="Selecao_De_Bandeira_E_Parcela">
                      <div
                        id="issuerInput"
                        className="form-group col-sm-12 hidden"
                      >
                        <select
                          id="form-checkout__issuer"
                          name="issuer"
                          className="form-control"
                        ></select>
                      </div>
                      <div className="form-group col-sm-12">
                        <select
                          id="form-checkout__installments"
                          name="installments"
                          type="text"
                          className="form-control"
                        ></select>
                      </div>
                    </div>
                    <div className="form-group col-sm-12 Botao_De_Pagamento_E_Confirmacao_Do_Cartao">
                      <input type="hidden" id="amount" />
                      <input type="hidden" id="description" />
                      <div id="validation-error-messages"></div>
                      <br />
                      <button
                        id="form-checkout__submit"
                        type="submit"
                        className="btn btn-primary btn-block"
                      >
                        Pagar
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <div id="loading-message">
        <p>Carregando</p>
      </div>

      <section
        className="shopping-cart dark"
        style={{ backgroundColor: "blue", display: "none" }}
      >
        <div className="container container__result">
          <div className="block-heading">
            <h2>Payment Result</h2>
            <p>This is an example of a Mercado Pago integration</p>
          </div>
          <div className="content">
            <div className="row">
              <div className="col-md-12 col-lg-12">
                <div className="items product info product-details">
                  <div className="row justify-content-md-center">
                    <div className="col-md-4 product-detail">
                      <div className="product-info">
                        <div id="fail-response">
                          <br />
                          <img src="img/fail.png" width="350px" />
                          <p className="text-center font-weight-bold">
                            Something went wrong
                          </p>
                          <p id="error-message" className="text-center"></p>
                          <br />
                        </div>

                        <div id="success-response">
                          <br />
                          <p>
                            <b>ID: </b>
                            <span id="payment-id"></span>
                          </p>
                          <p>
                            <b>Status: </b>
                            <span id="payment-status"></span>
                          </p>
                          <p>
                            <b>Detail: </b>
                            <span id="payment-detail"></span>
                          </p>
                          <br />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
