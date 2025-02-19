import { useState } from "react";

export default function Modal_De_Produto({
  Produto_Com_Modal_Ativo,
  Definir_Produto_Com_Modal_Ativo,
  Definir_Quantidade_De_Itens_Adicionados_No_Carrinho,
  Definir_Itens_Adicionados_No_Carrinho,
  Definir_Endereco_Atual_Da_Pagina_Local,
  Definir_Valor_Total_Guardado_Dentro_Do_Carrinho,
  Definir_Estilo_De_Compra_Carrinho_Ou_Unica,
  Definir_Descricao_De_Produtos_Sendo_Comprados,
}) {
  const [
    Tamanho_De_Roupa_Escolhido_Vizualizar_Botao,
    setTamanho_De_Roupa_Escolhido_Vizualizar_Botao,
  ] = useState(null);
  const [Imagem_Em_Vizualizacao_Do_Modal, setImagem_Em_Vizualizacao_Do_Modal] =
    useState(0);
  const [Zoom_Dentro_Da_Imagem, setZoom_Dentro_Da_Imagem] = useState({});
  const [Validacao_De_Zoom_Na_Imagem, setValidacao_De_Zoom_Na_Imagem] =
    useState(true);

  const Mudando_Zoom_Conforme_O_Mouse_Se_Movimenta = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoom_Dentro_Da_Imagem({
      transformOrigin: `${x}% ${y}%`,
      transform: "scale(2)",
    });
  };

  const Retirando_Zoom_De_Imagem_Ao_Sair = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoom_Dentro_Da_Imagem({
      transformOrigin: `${x}% ${y}%`,
      transform: "scale(1)",
    });
  };

  return (
    <div
      className={
        Produto_Com_Modal_Ativo == ""
          ? "Modal_De_Produto_Nao_Visualizar"
          : "Modal_De_Produto_Com_Vizualizacao"
      }
    >
      <i
        className="fa-solid fa-xmark Fechamento_De_Modal_De_Produto"
        onClick={() => {
          Definir_Produto_Com_Modal_Ativo("");
          setImagem_Em_Vizualizacao_Do_Modal(0);
          setTamanho_De_Roupa_Escolhido_Vizualizar_Botao(null);
        }}
      ></i>
      <div className="Corpo_Do_Modal">
        <div className="Conjunto_imagens_E_Miniaturas_Do_Modal">
          <div className="Imagens_Do_Produto_Dentro_Do_Modal">
            <img
              className=" Imagem_Do_Produto_Modal"
              src={`./img/${Produto_Com_Modal_Ativo.Tipo}/${Produto_Com_Modal_Ativo.Nome}/1.png`}
              style={
                Imagem_Em_Vizualizacao_Do_Modal == 0
                  ? Zoom_Dentro_Da_Imagem
                  : {
                      marginLeft: Imagem_Em_Vizualizacao_Do_Modal + "%",
                    }
              }
              onMouseMove={(e) => {
                if (Validacao_De_Zoom_Na_Imagem) {
                  Mudando_Zoom_Conforme_O_Mouse_Se_Movimenta(e);
                }
              }}
              onMouseLeave={Retirando_Zoom_De_Imagem_Ao_Sair}
            />
            <img
              style={
                Imagem_Em_Vizualizacao_Do_Modal == -100
                  ? Zoom_Dentro_Da_Imagem
                  : {}
              }
              className=" Imagem_Do_Produto_Modal"
              src={`./img/${Produto_Com_Modal_Ativo.Tipo}/${Produto_Com_Modal_Ativo.Nome}/2.png`}
              onMouseMove={(e) => {
                if (Validacao_De_Zoom_Na_Imagem) {
                  Mudando_Zoom_Conforme_O_Mouse_Se_Movimenta(e);
                }
              }}
              onMouseLeave={Retirando_Zoom_De_Imagem_Ao_Sair}
            />
          </div>
          <div className="Miniaturas_Das_Imagens_Dos_Produtos">
            <img
              className={
                Imagem_Em_Vizualizacao_Do_Modal == 0
                  ? "Miniaturas_Imagem_Do_Produto_Modal Miniatura_Escolhida"
                  : "Miniaturas_Imagem_Do_Produto_Modal"
              }
              onClick={() => {
                if (Validacao_De_Zoom_Na_Imagem) {
                  setValidacao_De_Zoom_Na_Imagem(false);
                  setTimeout(() => {
                    setValidacao_De_Zoom_Na_Imagem(true);
                  }, 1200);
                }

                setImagem_Em_Vizualizacao_Do_Modal(0);
              }}
              src={`./img/${Produto_Com_Modal_Ativo.Tipo}/${Produto_Com_Modal_Ativo.Nome}/1.png`}
            />
            <img
              className={
                Imagem_Em_Vizualizacao_Do_Modal == -100
                  ? "Miniaturas_Imagem_Do_Produto_Modal Miniatura_Escolhida"
                  : "Miniaturas_Imagem_Do_Produto_Modal"
              }
              onClick={() => {
                if (Validacao_De_Zoom_Na_Imagem) {
                  setValidacao_De_Zoom_Na_Imagem(false);
                  setTimeout(() => {
                    setValidacao_De_Zoom_Na_Imagem(true);
                  }, 1200);
                }

                setImagem_Em_Vizualizacao_Do_Modal(-100);
              }}
              src={`./img/${Produto_Com_Modal_Ativo.Tipo}/${Produto_Com_Modal_Ativo.Nome}/2.png`}
            />
          </div>
        </div>
        <div className="Informacoes_Do_Produto_No_Modal">
          <p className="Nome_Do_Produto_Modal">
            {Produto_Com_Modal_Ativo.Nome}
          </p>
          <p className="Colecao_Do_Produto_Modal">
            Coleção: {Produto_Com_Modal_Ativo.Colecao}
          </p>
          <p className="Preco_Do_Produto_Modal">
            R${" "}
            {Produto_Com_Modal_Ativo.Preco &&
            Produto_Com_Modal_Ativo.Preco.toString().includes(".")
              ? Produto_Com_Modal_Ativo.Preco.toString().replace(".", ",")
              : Produto_Com_Modal_Ativo.Preco + ",00"}
          </p>
          <p className="Descricao_De_Materiais_Do_Produto_Modal">
            {Produto_Com_Modal_Ativo.Descricao_De_Materiais}
          </p>

          <div className="Pontos_Positivos_Produto_Modal">
            {Produto_Com_Modal_Ativo.Pontos_Positivos
              ? Produto_Com_Modal_Ativo.Pontos_Positivos.map((item) => {
                  return (
                    <p key={"Pontos_Positivos " + item}>
                      <i className="fa-solid fa-star"></i> {item}
                    </p>
                  );
                })
              : ""}
          </div>

          <div className="Tamanho_De_Roupa_Do_Produto_Modal">
            {Produto_Com_Modal_Ativo.Tamanhos &&
              Produto_Com_Modal_Ativo.Tamanhos.map((item, index) => {
                return (
                  <button
                    key={"Buttons_De_Tamanho " + item}
                    className={
                      Tamanho_De_Roupa_Escolhido_Vizualizar_Botao == index
                        ? "Opcoes_De_Tamanho_Individual Opcao_Selecionada_De_Tamanho"
                        : "Opcoes_De_Tamanho_Individual"
                    }
                    onClick={() => {
                      setTamanho_De_Roupa_Escolhido_Vizualizar_Botao(index);
                    }}
                  >
                    {item}
                  </button>
                );
              })}
          </div>

          <div className="Conjunto_Botoes_De_Compra_E_Carrinho">
            <button
              className="Botao_De_Compra_Produto_Modal"
              style={
                Tamanho_De_Roupa_Escolhido_Vizualizar_Botao !== null
                  ? { opacity: 1 }
                  : { opacity: 0 }
              }
              onClick={() => {
                Definir_Estilo_De_Compra_Carrinho_Ou_Unica("Unica");
                Definir_Valor_Total_Guardado_Dentro_Do_Carrinho(
                  Produto_Com_Modal_Ativo.Preco
                );
                Definir_Endereco_Atual_Da_Pagina_Local(
                  "Escolher_Metodo_De_Pagamento"
                );
                Definir_Descricao_De_Produtos_Sendo_Comprados([
                  {
                    ...Produto_Com_Modal_Ativo,
                    Tamanhos:
                      Produto_Com_Modal_Ativo.Tamanhos[
                        Tamanho_De_Roupa_Escolhido_Vizualizar_Botao
                      ],
                  },
                ]);
              }}
            >
              Comprar
            </button>
            <button
              onClick={() => {
                Definir_Estilo_De_Compra_Carrinho_Ou_Unica("Carrinho");

                Definir_Quantidade_De_Itens_Adicionados_No_Carrinho((prev) => {
                  return prev + 1;
                });
                Definir_Itens_Adicionados_No_Carrinho((prev) => {
                  var Definicao_De_Tamanho_De_Roupa =
                    Produto_Com_Modal_Ativo.Tamanhos;

                  var Teste_De_Validacao_De_Duplicidade = true;

                  prev.map((sub_item) => {
                    if (
                      Produto_Com_Modal_Ativo.Id == sub_item.Id &&
                      Definicao_De_Tamanho_De_Roupa[
                        Tamanho_De_Roupa_Escolhido_Vizualizar_Botao
                      ] == sub_item.Tamanhos
                    ) {
                      Teste_De_Validacao_De_Duplicidade = false;

                      if (sub_item.Removido) {
                        sub_item.Removido = false;
                        sub_item.Quantidade_Do_Produto = 1;
                      } else {
                        sub_item.Quantidade_Do_Produto =
                          sub_item.Quantidade_Do_Produto + 1;
                      }

                      return sub_item;
                    }
                  });

                  var Adicao_De_Produto_No_Carrinho = {
                    ...Produto_Com_Modal_Ativo,
                    Tamanhos:
                      Definicao_De_Tamanho_De_Roupa[
                        Tamanho_De_Roupa_Escolhido_Vizualizar_Botao
                      ],
                    Quantidade_Do_Produto: 1,
                  };

                  if (Teste_De_Validacao_De_Duplicidade) {
                    return [...prev, Adicao_De_Produto_No_Carrinho];
                  } else {
                    return [...prev];
                  }
                });
              }}
              style={
                Tamanho_De_Roupa_Escolhido_Vizualizar_Botao !== null
                  ? { opacity: 1 }
                  : { opacity: 0 }
              }
            >
              <i className="fa-solid fa-cart-plus"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
