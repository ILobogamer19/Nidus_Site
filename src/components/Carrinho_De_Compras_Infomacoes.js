import { useState, useEffect } from "react";

export default function Carrinho_De_Compras_Informacoes({
  Itens_Adicionados_No_Carrinho,
  Definir_Quantidade_De_Itens_Adicionados_No_Carrinho,
  Definir_Itens_Adicionados_No_Carrinho,
}) {
  var Valor_Total_Geral_Dos_Produtos = 0;

  useEffect(() => {
    console.log(Itens_Adicionados_No_Carrinho);
  }, [Itens_Adicionados_No_Carrinho]);

  return (
    <>
      <div
        className="Conjunto_De_Produtos_Do_Carrinho"
        data-aos="fade-down"
        data-aos-delay="10"
      >
        <div className="Produtos_Com_Nome_Em_Cima_Formato_De_Tabela">
          <p
            className="Icon_Ajuste_Cart_Individual_Padronizacao"
            style={{ opacity: 0, width: "20px" }}
          ></p>
          <p
            className="Imagem_Ajuste_Cart_Individual_Padronizacao"
            style={{ opacity: 0, width: "233.39px" }}
          ></p>
          <p className="Nome_Ajuste_Cart_Individual_Padronizacao">Produto</p>
          <p className="Tamanho_Ajuste_Cart_Individual_Padronizacao">Tamanho</p>
          <p className="Preco_Ajuste_Cart_Individual_Padronizacao">Preço</p>
          <p className="Quantidade_Ajuste_Cart_Individual_Padronizacao">
            Quantidade
          </p>
          <p className="Subtotal_Ajuste_Cart_Individual_Padronizacao">
            Subtotal
          </p>
        </div>
        {Itens_Adicionados_No_Carrinho.map((item, index) => {
          var Total_Do_Valor_Do_Produto_Com_As_Quantidades =
            item.Preco * item.Quantidade_Do_Produto;

          Valor_Total_Geral_Dos_Produtos +=
            Total_Do_Valor_Do_Produto_Com_As_Quantidades;

          if (item.Removido) {
            Valor_Total_Geral_Dos_Produtos -=
              Total_Do_Valor_Do_Produto_Com_As_Quantidades;
          }

          return (
            <div
              className="Card_Deitado_Do_Produto_No_Carrinho"
              id={"Card_Deitado_Do_Produto_No_Carrinho_Index_" + index}
              key={"Card_Deitado_Do_Produto_No_Carrinho" + item.Nome}
              style={item.Removido ? { display: "none" } : { display: "flex" }}
            >
              <i
                className="fa-solid fa-xmark Remocao_De_Produto_Do_Carrinho Icon_Ajuste_Cart_Individual_Padronizacao"
                onClick={() => {
                  console.log(item);

                  Definir_Quantidade_De_Itens_Adicionados_No_Carrinho(
                    (prev) => {
                      return prev - item.Quantidade_Do_Produto;
                    }
                  );
                  Definir_Itens_Adicionados_No_Carrinho((prev) => {
                    var Itens_Que_Nao_Foram_Removidos = [];

                    prev.map((sub_item) => {
                      if (sub_item == item) {
                        Itens_Que_Nao_Foram_Removidos = [
                          ...Itens_Que_Nao_Foram_Removidos,
                          { ...sub_item, Removido: true },
                        ];
                      } else {
                        Itens_Que_Nao_Foram_Removidos = [
                          ...Itens_Que_Nao_Foram_Removidos,
                          sub_item,
                        ];
                      }
                    });
                    return [...Itens_Que_Nao_Foram_Removidos];
                  });
                }}
              ></i>
              <img
                src={`./img/${item.Tipo}/${item.Nome}/1.png`}
                className="Imagem_Ajuste_Cart_Individual_Padronizacao Imagem_De_Card_De_Carrinho_Individual"
              />
              <p className="Nome_Ajuste_Cart_Individual_Padronizacao">
                {item.Nome}
              </p>
              <p className="Tamanho_Ajuste_Cart_Individual_Padronizacao">
                {item.Tamanhos}
              </p>
              <p className="Preco_Ajuste_Cart_Individual_Padronizacao">
                R${" "}
                {item.Preco && item.Preco.toString().includes(".")
                  ? item.Preco.toString().replace(".", ",")
                  : item.Preco + ",00"}
              </p>
              <p className="Quantidade_Ajuste_Cart_Individual_Padronizacao">
                {item.Quantidade_Do_Produto}
              </p>
              <p className="Subtotal_Ajuste_Cart_Individual_Padronizacao">
                R${" "}
                {Total_Do_Valor_Do_Produto_Com_As_Quantidades &&
                Total_Do_Valor_Do_Produto_Com_As_Quantidades.toString().includes(
                  "."
                )
                  ? Total_Do_Valor_Do_Produto_Com_As_Quantidades.toString().replace(
                      ".",
                      ","
                    )
                  : Total_Do_Valor_Do_Produto_Com_As_Quantidades + ",00"}
              </p>
            </div>
          );
        })}
      </div>
      <div className="Botao_De_Compra_Do_Carrinho_Conjunto">
        <button className="Botao_De_Compra_Do_Carrinho_Individual">
          Comprar agora
        </button>
        <p className="Valor_Total_Soma_Dos_Itens">
          Total: R${" "}
          {Valor_Total_Geral_Dos_Produtos.toString().includes(".")
            ? Valor_Total_Geral_Dos_Produtos.toString().replace(".", ",")
            : Valor_Total_Geral_Dos_Produtos + ",00"}
        </p>
      </div>
    </>
  );
}
