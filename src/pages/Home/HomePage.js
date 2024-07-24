//#region Importacoes
//#region __ Hooks
import { useState, useEffect } from "react";
//#endregion __

//#region __ Bibliotecas
import Cookies from "js-cookie";
//#endregion __

//#region __ Estilos
import "./style.css";
import "./Estilo_Header.css";
import "./Estilo_Banner_De_Slides.css";
import "./Estilo_Sessao_Produtos.css";
import "./Estilo_Carrinho_De_Compras_Informacoes.css";
import "./Estilo_Escolha_Metodo_De_Pagamento.css";
import "./Estilo_Chat_Suporte_Cliente.css";
//#endregion __

//#region __ Componentes
import Header_Component from "../../components/Header_Component";
// import Banner_Apresentacoes from "../../components/Banner_Apresentacoes";
import Teste_De_Pagamento from "../../components/Subcomponents_Escolha_Metodo_De_Pagamento/Metodo_De_Pagamento_Cartao_De_Credito";
import Sessao_Produtos from "../../components/Sessao_Produtos";
import Carrinho_De_Compras_Informacoes from "../../components/Carrinho_De_Compras_Infomacoes";
import Escolha_De_Metodo_De_Pagamento from "../../components/Escolha_Metodo_De_Pagamento";
import Chat_Suporte_Cliente from "../../components/Chat_Suporte_Cliente";
//#endregion __
//#endregion

export default function HomePage() {
  //#region useState
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
  const [
    Descricao_De_Produtos_Sendo_Comprados,
    setDescricao_De_Produtos_Sendo_Comprados,
  ] = useState();
  //#endregion

  //#region useEffect
  //#region __ Restaurando Cookies
  useEffect(() => {
    if (Cookies.get("Endereco_Atual_Da_Pagina_Local")) {
      setQuantidade_De_Itens_Adicionados_No_Carrinho(
        parseFloat(Cookies.get("Quantidade_De_Itens_Adicionados_No_Carrinho"))
      );
      setItens_Adicionados_No_Carrinho(
        JSON.parse(Cookies.get("Itens_Adicionados_No_Carrinho"))
      );
      setValor_Total_Guardado_Dentro_Do_Carrinho(
        parseFloat(Cookies.get("Valor_Total_Guardado_Dentro_Do_Carrinho"))
      );
      setEndereco_Atual_Da_Pagina_Local(
        Cookies.get("Endereco_Atual_Da_Pagina_Local")
      );
      setDescricao_De_Produtos_Sendo_Comprados(
        JSON.parse(Cookies.get("Descricao_De_Produtos_Sendo_Comprados"))
      );
      setEstilo_De_Compra_Carrinho_Ou_Unica(
        Cookies.get("Estilo_De_Compra_Carrinho_Ou_Unica")
      );
    }
  }, []);
  //#endregion __

  //#region __ Alteracao De Itens No Carrinho com base no endereco
  useEffect(() => {
    if (Itens_Adicionados_No_Carrinho != "") {
      setItens_Adicionados_No_Carrinho([...Itens_Adicionados_No_Carrinho]);
    }

    /****************************************************************************************/
    // setEndereco_Atual_Da_Pagina_Local("Metodo_De_Pagamento_Escolhido");
    /****************************************************************************************/
  }, [Endereco_Atual_Da_Pagina_Local]);
  //#endregion __

  //#region __ console.log
  useEffect(() => {
    console.log(Descricao_De_Produtos_Sendo_Comprados);
  }, [Descricao_De_Produtos_Sendo_Comprados]);
  //#endregion __

  //#region __ Salvando cookies
  useEffect(() => {
    Cookies.set(
      "Quantidade_De_Itens_Adicionados_No_Carrinho",
      Quantidade_De_Itens_Adicionados_No_Carrinho,
      { expires: 30 }
    );
  }, [Quantidade_De_Itens_Adicionados_No_Carrinho]);

  useEffect(() => {
    console.log("valor do objeto");
    console.log(Itens_Adicionados_No_Carrinho);
    Cookies.set(
      "Itens_Adicionados_No_Carrinho",
      JSON.stringify(Itens_Adicionados_No_Carrinho),
      { expires: 30 }
    );
    console.log("Teste 2");
  }, [Itens_Adicionados_No_Carrinho]);

  useEffect(() => {
    Cookies.set(
      "Valor_Total_Guardado_Dentro_Do_Carrinho",
      Valor_Total_Guardado_Dentro_Do_Carrinho,
      { expires: 30 }
    );
  }, [Valor_Total_Guardado_Dentro_Do_Carrinho]);

  useEffect(() => {
    Cookies.set(
      "Endereco_Atual_Da_Pagina_Local",
      Endereco_Atual_Da_Pagina_Local,
      { expires: 30 }
    );
  }, [Endereco_Atual_Da_Pagina_Local]);

  useEffect(() => {
    Cookies.set(
      "Descricao_De_Produtos_Sendo_Comprados",
      JSON.stringify(Descricao_De_Produtos_Sendo_Comprados),

      { expires: 30 }
    );
  }, [Descricao_De_Produtos_Sendo_Comprados]);

  useEffect(() => {
    Cookies.set(
      "Estilo_De_Compra_Carrinho_Ou_Unica",
      Estilo_De_Compra_Carrinho_Ou_Unica,
      { expires: 30 }
    );
  }, [Estilo_De_Compra_Carrinho_Ou_Unica]);
  //#endregion __
  //#endregion

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
            Definir_Descricao_De_Produtos_Sendo_Comprados={
              setDescricao_De_Produtos_Sendo_Comprados
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
          Definir_Descricao_De_Produtos_Sendo_Comprados={
            setDescricao_De_Produtos_Sendo_Comprados
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
          Descricao_De_Produtos_Sendo_Comprados={
            Descricao_De_Produtos_Sendo_Comprados
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
