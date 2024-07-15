import React, { useState } from "react";

import Filtros_De_Produtos from "./Subcomponents_Sessao_Produtos/Filtros_De_Produtos";
import Produtos_Principais from "./Subcomponents_Sessao_Produtos/Produtos_Principais";
import Modal_De_Produto from "./Subcomponents_Sessao_Produtos/Modal_De_Produto";

export default function Sessao_Produtos() {
  const [Filtro_Ativo, setfiltro_Ativo] = useState("");
  const [Produto_Com_Modal_Ativo, setProduto_Com_Modal_Ativo] = useState("");

  return (
    <section className="Sessao_Produtos_Conjunto">
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
      />
    </section>
  );
}
