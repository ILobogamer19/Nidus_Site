import { useState, useEffect } from "react";

import "./style.css";
import "./Estilo_Header.css";
import "./Estilo_Banner_De_Slides.css";
import "./Estilo_Sessao_Produtos.css";
import "./Estilo_Carrinho_De_Compras_Informacoes.css";
import "./Estilo_Escolha_Metodo_De_Pagamento.css";
import "./Estilo_Chat_Suporte_Cliente.css";

import Header_Component from "../../components/Header_Component";
// import Banner_Apresentacoes from "../../components/Banner_Apresentacoes";
import Teste_De_Pagamento from "../../components/Subcomponents_Escolha_Metodo_De_Pagamento/Metodo_De_Pagamento_Cartao_De_Credito";
import Sessao_Produtos from "../../components/Sessao_Produtos";
import Carrinho_De_Compras_Informacoes from "../../components/Carrinho_De_Compras_Infomacoes";
import Escolha_De_Metodo_De_Pagamento from "../../components/Escolha_Metodo_De_Pagamento";
import Chat_Suporte_Cliente from "../../components/Chat_Suporte_Cliente";

export default function HomePage() {
  const [
    Quantidade_De_Itens_Adicionados_No_Carrinho,
    setQuantidade_De_Itens_Adicionados_No_Carrinho,
  ] = useState(0);
  const [Itens_Adicionados_No_Carrinho, setItens_Adicionados_No_Carrinho] =
    useState([]);
  const [
    Valor_Total_Guardado_Dentro_Do_Carrinho,
    setValor_Total_Guardado_Dentro_Do_Carrinho,
  ] = useState(0);
  const [Endereco_Atual_Da_Pagina_Local, setEndereco_Atual_Da_Pagina_Local] =
    useState("Inicio");
  const [
    Forma_De_Pagamento_Escolhida_Atual,
    setForma_De_Pagamento_Escolhida_Atual,
  ] = useState();
  const [
    Estilo_De_Compra_Carrinho_Ou_Unica,
    setEstilo_De_Compra_Carrinho_Ou_Unica,
  ] = useState("Unica");

  useEffect(() => {
    setItens_Adicionados_No_Carrinho([...Itens_Adicionados_No_Carrinho]);
    /****************************************************************************************/
    // setEndereco_Atual_Da_Pagina_Local("Metodo_De_Pagamento_Escolhido");
    /****************************************************************************************/
  }, [Endereco_Atual_Da_Pagina_Local]);

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
            Definir_Endereco_Atual_Da_Pagina_Local={
              setEndereco_Atual_Da_Pagina_Local
            }
            Definir_Valor_Total_Guardado_Dentro_Do_Carrinho={
              setValor_Total_Guardado_Dentro_Do_Carrinho
            }
            Definir_Estilo_De_Compra_Carrinho_Ou_Unica={
              setEstilo_De_Compra_Carrinho_Ou_Unica
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
          Definir_Endereco_Atual_Da_Pagina_Local={
            setEndereco_Atual_Da_Pagina_Local
          }
          Definir_Valor_Total_Guardado_Dentro_Do_Carrinho={
            setValor_Total_Guardado_Dentro_Do_Carrinho
          }
          Definir_Estilo_De_Compra_Carrinho_Ou_Unica={
            setEstilo_De_Compra_Carrinho_Ou_Unica
          }
        />
      )}

      {Endereco_Atual_Da_Pagina_Local == "Escolher_Metodo_De_Pagamento" && (
        <Escolha_De_Metodo_De_Pagamento
          Definir_Forma_De_Pagamento_Escolhida_Atual={
            setForma_De_Pagamento_Escolhida_Atual
          }
          Definir_Endereco_Atual_Da_Pagina_Local={
            setEndereco_Atual_Da_Pagina_Local
          }
          Valor_Total_Guardado_Dentro_Do_Carrinho={
            Valor_Total_Guardado_Dentro_Do_Carrinho
          }
          Quantidade_De_Itens_Adicionados_No_Carrinho={
            Quantidade_De_Itens_Adicionados_No_Carrinho
          }
          Estilo_De_Compra_Carrinho_Ou_Unica={
            Estilo_De_Compra_Carrinho_Ou_Unica
          }
          Forma_De_Pagamento_Escolhida_Atual={
            Forma_De_Pagamento_Escolhida_Atual
          }
        />
      )}

      {Endereco_Atual_Da_Pagina_Local == "Metodo_De_Pagamento_Escolhido" && (
        <Teste_De_Pagamento
          Valor_Total_Guardado_Dentro_Do_Carrinho={
            Valor_Total_Guardado_Dentro_Do_Carrinho
          }
        />
      )}

      {/* {Endereco_Atual_Da_Pagina_Local == "Metodo_De_Pagamento_Escolhido" &&
        Forma_De_Pagamento_Escolhida_Atual} */}

      <Chat_Suporte_Cliente />
    </div>
  );
}
