import React, { useState } from "react";

import Filtros_De_Produtos from "./Subcomponents_Sessao_Produtos/Filtros_De_Produtos";
import Produtos_Principais from "./Subcomponents_Sessao_Produtos/Produtos_Principais";

export default function Sessao_Produtos() {
  const [Filtro_Ativo, setfiltro_Ativo] = useState("");

  return (
    <section className="Sessao_Produtos_Conjunto">
      <Filtros_De_Produtos
        Filtro_Ativo={Filtro_Ativo}
        Definir_Valor_Do_filtro={setfiltro_Ativo}
      />
      <Produtos_Principais Filtro_Ativo={Filtro_Ativo} />
    </section>
  );
}
