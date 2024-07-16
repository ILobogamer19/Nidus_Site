import { useState, useEffect } from "react";

import "./style.css";
import "./Estilo_Header.css";
import "./Estilo_Banner_De_Slides.css";
import "./Estilo_Sessao_Produtos.css";
import "./Estilo_Carrinho_De_Compras_Informacoes.css";
import "./Estilo_Chat_Suporte_Cliente.css";

import Header_Component from "../../components/Header_Component";
// import Banner_Apresentacoes from "../../components/Banner_Apresentacoes";
import Sessao_Produtos from "../../components/Sessao_Produtos";
import Carrinho_De_Compras_Informacoes from "../../components/Carrinho_De_Compras_Infomacoes";
import Chat_Suporte_Cliente from "../../components/Chat_Suporte_Cliente";

export default function HomePage() {
  const [
    Quantidade_De_Itens_Adicionados_No_Carrinho,
    setQuantidade_De_Itens_Adicionados_No_Carrinho,
  ] = useState(0);
  const [Itens_Adicionados_No_Carrinho, setItens_Adicionados_No_Carrinho] =
    useState([]);
  const [Endereco_Atual_Da_Pagina_Local, setEndereco_Atual_Da_Pagina_Local] =
    useState("Inicio");

  useEffect(() => {
    setItens_Adicionados_No_Carrinho([...Itens_Adicionados_No_Carrinho]);
  }, [Endereco_Atual_Da_Pagina_Local]);

  var Endereco_Atual_Da_Pagina_Local_Developer_Config = "Carrinho_De_Compras";

  return (
    <div className="Corpo_Site">
      <Header_Component
        Quantidade_De_Itens_Adicionados_No_Carrinho={
          Quantidade_De_Itens_Adicionados_No_Carrinho
        }
        Itens_Adicionados_No_Carrinho={Itens_Adicionados_No_Carrinho}
        Definir_Endereco_Atual_Da_Pagina_Local={
          setEndereco_Atual_Da_Pagina_Local
        }
      />
      {Endereco_Atual_Da_Pagina_Local == "Inicio" && (
        <>
          <Sessao_Produtos
            Definir_Quantidade_De_Itens_Adicionados_No_Carrinho={
              setQuantidade_De_Itens_Adicionados_No_Carrinho
            }
            Definir_Itens_Adicionados_No_Carrinho={
              setItens_Adicionados_No_Carrinho
            }
          />
        </>
      )}

      {Endereco_Atual_Da_Pagina_Local == "Carrinho_De_Compras" && (
        <Carrinho_De_Compras_Informacoes
          Itens_Adicionados_No_Carrinho={Itens_Adicionados_No_Carrinho}
          Definir_Quantidade_De_Itens_Adicionados_No_Carrinho={
            setQuantidade_De_Itens_Adicionados_No_Carrinho
          }
          Definir_Itens_Adicionados_No_Carrinho={
            setItens_Adicionados_No_Carrinho
          }
        />
      )}

      <Chat_Suporte_Cliente />
    </div>
  );
}
