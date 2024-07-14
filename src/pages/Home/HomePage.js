import "./style.css";
import "./Estilo_Header.css";
import "./Estilo_Banner_De_Slides.css";
import "./Estilo_Sessao_Produtos.css";
import "./Estilo_Chat_Suporte_Cliente.css";

import Header_Component from "../../components/Header_Component";
import Banner_Apresentacoes from "../../components/Banner_Apresentacoes";
import Sessao_Produtos from "../../components/Sessao_Produtos";
import Chat_Suporte_Cliente from "../../components/Chat_Suporte_Cliente";

export default function HomePage() {
  return (
    <div className="Corpo_Site">
      <Header_Component />
      {/* <Banner_Apresentacoes Banco_De_Banners="Nidus" /> */}
      <Sessao_Produtos />
      <Chat_Suporte_Cliente />
    </div>
  );
}
