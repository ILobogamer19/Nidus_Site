import { useEffect, useState } from "react";

import { loadMercadoPago } from "@mercadopago/sdk-js";

//#region

const Corretor_De_Mercado_Pago_Nao_Definido = async () => {
  await loadMercadoPago();

  const mercadopago = new MercadoPago(
    "TEST-17e75b61-5d92-47e6-9766-9502a537da0f"
  );
};

await Corretor_De_Mercado_Pago_Nao_Definido();

//#endregion

export default function Metodo_De_Pagamento_Cartao_De_Credito() {
  useEffect(() => {
    function loadCardForm() {
      const productCost = document.getElementById("amount").value;
      const productDescription = document.getElementById(
        "product-description"
      ).innerText;
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
          placeholder: "Card number",
          style: {
            fontSize: "1rem",
          },
        },
        expirationDate: {
          id: "form-checkout__expirationDate",
          placeholder: "MM/YYYY",
          style: {
            fontSize: "1rem",
          },
        },
        securityCode: {
          id: "form-checkout__securityCode",
          placeholder: "Security code",
          style: {
            fontSize: "1rem",
          },
        },
        installments: {
          id: "form-checkout__installments",
          placeholder: "Installments",
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
          placeholder: "Issuer",
        },
      };

      const cardForm = mercadopago.cardForm({
        amount: productCost,
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
            document.getElementById("loading-message").style.display = "block";

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
                description: productDescription,
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

    function enableOrDisablePayButton(validationErrorMessages, payButton) {
      if (validationErrorMessages.children.length > 0) {
        payButton.setAttribute("disabled", true);
      } else {
        payButton.removeAttribute("disabled");
      }
    }

    // Handle price update
    function updatePrice() {
      let quantity = document.getElementById("quantity").value;
      let unitPrice = document.getElementById("unit-price").innerText;
      let amount = parseInt(unitPrice) * parseInt(quantity);

      document.getElementById("cart-total").innerText = "$ " + amount;
      document.getElementById("summary-price").innerText = "$ " + unitPrice;
      document.getElementById("summary-quantity").innerText = quantity;
      document.getElementById("summary-total").innerText = "$ " + amount;
      document.getElementById("amount").value = amount;
    }

    document.getElementById("quantity").addEventListener("change", updatePrice);
    updatePrice();
  }, []);

  return (
    <>
      <main>
        <section
          className="shopping-cart dark"
          style={{ backgroundColor: "red" }}
        >
          <div className="container container__cart">
            <div className="block-heading">
              <h2>Shopping Cart</h2>
              <p>This is an example of a Mercado Pago integration</p>
            </div>
            <div className="content">
              <div className="row">
                <div className="col-md-12 col-lg-8">
                  <div className="items">
                    <div className="product">
                      <div className="info">
                        <div className="product-details">
                          <div className="row justify-content-md-center">
                            <div className="col-md-3">
                              <img
                                className="img-fluid mx-auto d-block image"
                                src="img/product.png"
                              />
                            </div>
                            <div className="col-md-4 product-detail">
                              <h5>Product</h5>
                              <div className="product-info">
                                <p>
                                  <b>Description: </b>
                                  <span id="product-description">
                                    Some book
                                  </span>
                                  <br />
                                  <b>Author: </b>Dale Carnegie
                                  <br />
                                  <b>Number of pages: </b>336
                                  <br />
                                  <b>Price:</b> ${" "}
                                  <span id="unit-price">10</span>
                                </p>
                              </div>
                            </div>
                            <div className="col-md-3 product-detail">
                              <label htmlFor="quantity">
                                <h5>Quantity</h5>
                              </label>
                              <input
                                type="number"
                                id="quantity"
                                value="1"
                                min="1"
                                className="form-control"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 col-lg-4">
                  <div className="summary">
                    <h3>Cart</h3>
                    <div className="summary-item">
                      <span className="text">Subtotal</span>
                      <span className="price" id="cart-total"></span>
                    </div>
                    <button
                      className="btn btn-primary btn-lg btn-block"
                      id="checkout-btn"
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className="payment-form dark"
          style={{ backgroundColor: "green" }}
        >
          <div className="container__payment">
            <div className="block-heading">
              <h2>Card Payment</h2>
              <p>This is an example of a Mercado Pago integration</p>
            </div>
            <div className="form-payment">
              <div className="products">
                <h2 className="title">Summary</h2>
                <div className="item">
                  <span className="price" id="summary-price"></span>
                  <p className="item-name">
                    Book x <span id="summary-quantity"></span>
                  </p>
                </div>
                <div className="total">
                  Total<span className="price" id="summary-total"></span>
                </div>
              </div>
              <div className="payment-details">
                <form
                  id="form-checkout"
                  className="ERnviaodapskpojpjdsjsoakljdklhjadlkasjhdhasjkdhjkashdjkhsajkdhjkashdjkhsajkdhjskahdajkhdjkshadkjhkdjhsdkjhahdshdhashdkshadjkhasjkdhjkah"
                >
                  <h3 className="title">Buyer Details</h3>
                  <div className="row">
                    <div className="form-group col">
                      <input
                        id="form-checkout__cardholderEmail"
                        name="cardholderEmail"
                        type="email"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-sm-5">
                      <select
                        id="form-checkout__identificationType"
                        name="identificationType"
                        className="form-control"
                      ></select>
                    </div>
                    <div className="form-group col-sm-7">
                      <input
                        id="form-checkout__identificationNumber"
                        name="docNumber"
                        type="text"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <br />
                  <h3 className="title">Card Details</h3>
                  <div className="row">
                    <div className="form-group col-sm-8">
                      <input
                        id="form-checkout__cardholderName"
                        name="cardholderName"
                        type="text"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group col-sm-4">
                      <div className="input-group expiration-date">
                        <div
                          id="form-checkout__expirationDate"
                          className="form-control h-40"
                        ></div>
                      </div>
                    </div>
                    <div className="form-group col-sm-8">
                      <div
                        id="form-checkout__cardNumber"
                        className="form-control h-40"
                      ></div>
                    </div>
                    <div className="form-group col-sm-4">
                      <div
                        id="form-checkout__securityCode"
                        className="form-control h-40"
                      ></div>
                    </div>
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
                    <div className="form-group col-sm-12">
                      <input type="hidden" id="amount" />
                      <input type="hidden" id="description" />
                      <div id="validation-error-messages"></div>
                      <br />
                      <button
                        id="form-checkout__submit"
                        type="submit"
                        className="btn btn-primary btn-block"
                      >
                        Pay
                      </button>
                      <br />
                      <p id="loading-message">Loading, please wait...</p>
                      <br />
                      <a id="go-back">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 10 10"
                          className="chevron-left"
                        >
                          <path
                            fill="#009EE3"
                            fill-rule="nonzero"
                            id="chevron_left"
                            d="M7.05 1.4L6.2.552 1.756 4.997l4.449 4.448.849-.848-3.6-3.6z"
                          ></path>
                        </svg>
                        Go back to Shopping Cart
                      </a>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        <section
          className="shopping-cart dark"
          style={{ backgroundColor: "blue" }}
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
      </main>
    </>
  );
}
