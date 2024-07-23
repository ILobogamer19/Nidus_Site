import React, { useState } from "react";

import Filtros_De_Produtos from "./Subcomponents_Sessao_Produtos/Filtros_De_Produtos";
import Produtos_Principais from "./Subcomponents_Sessao_Produtos/Produtos_Principais";
import Modal_De_Produto from "./Subcomponents_Sessao_Produtos/Modal_De_Produto";

export default function Sessao_Produtos({
  Definir_Quantidade_De_Itens_Adicionados_No_Carrinho,
  Definir_Itens_Adicionados_No_Carrinho,
  Definir_Endereco_Atual_Da_Pagina_Local,
  Definir_Valor_Total_Guardado_Dentro_Do_Carrinho,
  Definir_Estilo_De_Compra_Carrinho_Ou_Unica,
}) {
  const [Filtro_Ativo, setfiltro_Ativo] = useState("");
  const [Produto_Com_Modal_Ativo, setProduto_Com_Modal_Ativo] = useState("");

  return (
    <section
      className="Sessao_Produtos_Conjunto"
      data-aos="fade-up"
      data-aos-delay="10"
    >
      <Filtros_De_Produtos
        Filtro_Ativo={Filtro_Ativo}
        Definir_Valor_Do_filtro={setfiltro_Ativo}
      />
      <Produtos_Principais
        Filtro_Ativo={Filtro_Ativo}
        Definir_Produto_Com_Modal_Ativo={setProduto_Com_Modal_Ativo}
      />
      <Modal_De_Produto
        Produto_Com_Modal_Ativo={Produto_Com_Modal_Ativo}
        Definir_Produto_Com_Modal_Ativo={setProduto_Com_Modal_Ativo}
        Definir_Quantidade_De_Itens_Adicionados_No_Carrinho={
          Definir_Quantidade_De_Itens_Adicionados_No_Carrinho
        }
        Definir_Itens_Adicionados_No_Carrinho={
          Definir_Itens_Adicionados_No_Carrinho
        }
        Definir_Endereco_Atual_Da_Pagina_Local={
          Definir_Endereco_Atual_Da_Pagina_Local
        }
        Definir_Valor_Total_Guardado_Dentro_Do_Carrinho={
          Definir_Valor_Total_Guardado_Dentro_Do_Carrinho
        }
        Definir_Estilo_De_Compra_Carrinho_Ou_Unica={
          Definir_Estilo_De_Compra_Carrinho_Ou_Unica
        }
      />
    </section>
  );
}
