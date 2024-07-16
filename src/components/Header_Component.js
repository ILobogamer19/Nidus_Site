import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Busca_De_Pacote_JSON, {
  Busca_De_Configuracoes_JSON,
} from "./Ferramentas/Busca_De_Pacote_JSON";

export default function Header_Component({
  Quantidade_De_Itens_Adicionados_No_Carrinho,
  Definir_Endereco_Atual_Da_Pagina_Local,
}) {
  const [Estado_De_Visualizacao, setEstado_De_Visualizacao] = useState(true);
  const [Tamanho_Largura_Pagina, setTamanho_Largura_Pagina] = useState(
    window.innerWidth
  );
  const [Vizualizacao_De_Menu, setVizualizacao_De_Menu] = useState(false);
  const [Opcoes_Do_Menu, setOpcoes_Do_Menu] = useState(false);

  const Navigate = useNavigate();

  const [
    Temporalizador_Ativacao_De_Clicks,
    setTemporalizador_Ativacao_De_Clicks,
  ] = useState(0);

  useEffect(() => {
    if (Temporalizador_Ativacao_De_Clicks >= 3) {
      Navigate("/Admin/Atendimento");
    } else {
      const timer = setTimeout(() => {
        setTemporalizador_Ativacao_De_Clicks(0);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [Temporalizador_Ativacao_De_Clicks]);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setTamanho_Largura_Pagina(window.innerWidth);
      window.innerWidth >= 500 && setVizualizacao_De_Menu(false);
    });

    const Criador_De_Pacote = async () => {
      const Pacote_De_Configuracao = await Busca_De_Configuracoes_JSON();

      setOpcoes_Do_Menu(Pacote_De_Configuracao.Opcoes_Do_Menu);
    };

    Criador_De_Pacote();
  }, []);

  const Retorno_De_Icon_Carrinho = (item, index, Tela_Pequena) => (
    <div
      key={"Conjunto_De_Ferramentas_Opacity " + index + item.Icon_Name}
      className="Conjunto_Carrinho_E_Numeracao"
      onClick={() => {
        if (Quantidade_De_Itens_Adicionados_No_Carrinho <= 0) {
          alert("Não existe nenhum item no carrinho");
        } else if (
          Definir_Endereco_Atual_Da_Pagina_Local !== "Carrinho_De_Compras"
        ) {
          Definir_Endereco_Atual_Da_Pagina_Local("Carrinho_De_Compras");
        }
      }}
    >
      <i className={item.Icon_Name}></i>
      <p
        className={item.Class}
        style={
          Quantidade_De_Itens_Adicionados_No_Carrinho == 0
            ? Tela_Pequena
              ? { opacity: 1 }
              : { opacity: 0 }
            : {
                opacity: 1,
              }
        }
      >
        {Quantidade_De_Itens_Adicionados_No_Carrinho}
      </p>
    </div>
  );

  return (
    <header className="Header_Geral_De_Cima">
      <div className="Linha_De_Inicio">
        <i>
          Pague no pix e ganhe desconto de 5% | Frete Grátis para toda São Paulo
        </i>
      </div>
      <div className="Conjunto_Segunda_Linha">
        {Tamanho_Largura_Pagina >= 500 && (
          <div style={{ opacity: 0 }}>
            <div className="Conjunto_De_Ferramentas">
              {Opcoes_Do_Menu &&
                Opcoes_Do_Menu.map((item, index) => {
                  if (item.Type && item.Type == "Cart") {
                    return Retorno_De_Icon_Carrinho(item, index, false);
                  }
                  return (
                    <React.Fragment
                      key={
                        "Conjunto_De_Ferramentas_Retorno_Opacity " +
                        index +
                        item.Icon_Name
                      }
                    >
                      <i
                        className={item.Icon_Name}
                        onClick={() => {
                          item.Link && window.open(item.Link, "_blank");
                        }}
                      ></i>
                      <p className="Separador_De_Ferramentas">
                        <span>.</span>
                      </p>
                      <p className="Separador_De_Ferramentas_Right">
                        <span>.</span>
                      </p>
                    </React.Fragment>
                  );
                })}
            </div>
          </div>
        )}
        <div
          className="Logo_Trocar_De_Cor"
          onMouseLeave={() => {
            setEstado_De_Visualizacao(true);
          }}
          onMouseEnter={() => {
            setEstado_De_Visualizacao(false);
          }}
          onClick={() => {
            Definir_Endereco_Atual_Da_Pagina_Local("Inicio");
            setTemporalizador_Ativacao_De_Clicks((current) => {
              return current + 1;
            });
          }}
        >
          <div
            style={{
              display: Estado_De_Visualizacao ? "block" : "none",
              zIndex: Estado_De_Visualizacao ? 2 : 0,
            }}
          >
            <img
              src="./img/Logo_Nidus_Branca.png"
              className="Logo_Nidus_Header Logo_Branca"
            />
          </div>
          <div
            style={{
              display: Estado_De_Visualizacao ? "none" : "block",
              zIndex: Estado_De_Visualizacao ? 0 : 2,
            }}
          >
            <img
              src="./img/Logo_Nidus_Vermelha.png"
              className="Logo_Nidus_Header Logo_Vermelha"
            />
          </div>
        </div>

        {Vizualizacao_De_Menu ? (
          <div className="Menu_De_Opcoes_Tela_Pequena Barra_De_Navegacao_De_Encolhida">
            <i
              className="fa-solid fa-xmark"
              onClick={() => {
                setVizualizacao_De_Menu(false);
              }}
              style={{
                color: "red",
              }}
            ></i>
            {Opcoes_Do_Menu.map((item, index) => {
              if (item.Type == "Cart") {
                return Retorno_De_Icon_Carrinho(item, index, true);
              }

              return (
                <i
                  key={"Ferramenta_Icone_separado " + item.Icon_Name}
                  className={item.Icon_Name}
                ></i>
              );
            })}
          </div>
        ) : Tamanho_Largura_Pagina >= 500 ? (
          <div className="Conjunto_De_Ferramentas">
            {Opcoes_Do_Menu &&
              Opcoes_Do_Menu.map((item, index) => {
                if (item.Type && item.Type == "Cart") {
                  return Retorno_De_Icon_Carrinho(item, index, false);
                }
                return (
                  <React.Fragment
                    key={
                      "Conjunto_De_Ferramentas_Retorno_Padrao " +
                      index +
                      item.Icon_Name
                    }
                  >
                    <i
                      className={item.Icon_Name}
                      onClick={() => {
                        item.Link && window.open(item.Link, "_blank");
                      }}
                    ></i>
                    <p className="Separador_De_Ferramentas">
                      <span>.</span>
                    </p>
                    <p className="Separador_De_Ferramentas_Right">
                      <span>.</span>
                    </p>
                  </React.Fragment>
                );
              })}
          </div>
        ) : (
          <div
            className="Barra_De_Navegacao_De_Encolhida"
            onClick={() => {
              setVizualizacao_De_Menu(true);
            }}
          >
            <i class="fa-solid fa-bars"></i>
          </div>
        )}
      </div>
    </header>
  );
}
