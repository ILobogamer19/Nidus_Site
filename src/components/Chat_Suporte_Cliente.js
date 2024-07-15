//#region Importacoes
//#region __ Hooks
import { useRef, useState, useEffect } from "react";
//#endregion __

//#region __ Bibliotecas
import io from "socket.io-client";
//#endregion __

//#region __ Pacote de Configuração
const Pacote_De_Configuracao_JSON = await fetch(
  "./data/Pacote_De_Configuracao.json"
);

const Pacote_De_Configuracao = await Pacote_De_Configuracao_JSON.json();
//#endregion __
//#endregion

//#region Controle de Ativacao Unica
var Ativacao_Unica_De_Conexao_Com_Servidor = true;
//#endregion

//#region Pacotes de Configuracoes
const Configuracoes_Nav_Bar = Pacote_De_Configuracao.Navbar;
var Nome_Da_Loja, Local_Logo;

Configuracoes_Nav_Bar.forEach((item) => {
  Nome_Da_Loja = item.Nome_Loja;
  Local_Logo = item.Logo_Img;
});

//#endregion

export default function Chat_Suporte_Cliente() {
  //#region useRef
  const bottomRef = useRef();
  //#endregion

  //#region useState
  const [Chat_De_Suporte_Estado, setChat_De_Suporte_Estado] = useState(true);
  const [Suporte_Ativo, setSuporte_Ativo] = useState();
  const [socket, setSocket] = useState(null);
  const [Mensagem_Para_Enviar, setMensagem_Para_Enviar] = useState("");
  const [messageList, setMessageList] = useState([]);
  //#endregion

  //#region useEffect
  // useEffect(() => {
  //   if (socket) {
  //     socket.on("Suporte_Estado", (data) => {
  //       setSuporte_Ativo(data.Estado_Suporte);
  //     });
  //   }
  // }, []);

  useEffect(() => {
    if (socket) {
      socket.on("receive_message", (data) => {
        setMessageList((current) => [...current, data]);
      });
    }
  }, [socket]);

  const scrollDown = () => {
    bottomRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (messageList != "") {
      scrollDown();
    }
  }, [messageList]);
  //#endregion

  //#region Variaveis
  //#region __ Globais
  var socket_conexao;
  //#endregion __

  //#region __ Object
  var Usuario = {
    Id: "",
    Mensagem: "",
  };
  //#endregion __
  //#endregion

  //#region Servidor
  //#region __ Conexão
  const Ativar_Conexao_Com_Servidor = async () => {
    socket_conexao = await io.connect(
      // "https://zvfmwc2c-3001.brs.devtunnels.ms/"
      "https://biankamodas-server.onrender.com/",
      {
        transports: ["websocket", "polling", "flashsocket"],
      }
    );
  };
  //#endregion __

  //#region __ Verificacao de estado do suporte
  const Verificacao_De_Estado_Do_Suporte = async () => {
    if (Ativacao_Unica_De_Conexao_Com_Servidor) {
      Ativacao_Unica_De_Conexao_Com_Servidor = false;

      await Ativar_Conexao_Com_Servidor();

      socket_conexao.on("Suporte_Estado", (data) => {
        setSuporte_Ativo(data.Estado_Suporte);

        if (!data.Estado_Suporte) {
          console.log("False");
          setChat_De_Suporte_Estado(false);
        }
      });

      socket_conexao.emit("Validar_Estado_De_Servidor");

      setSocket(socket_conexao);
    }
  };
  //#endregion __
  //#endregion

  //#region Criação de Retornos

  //#region __ Retorno Maximizado
  const Chat_De_Suporte_Maximizado_Retorno = () => {
    return (
      <div className="Chat_De_Suporte_Maximizado">
        <div className="Parte_Superior_Chat">
          <div className="Parte_Superior_Chat_Esquerda">
            <img src={Local_Logo} />
            <p>{Nome_Da_Loja}</p>
          </div>
          <div className="Parte_Superior_Chat_Direita">
            <span
              className="material-symbols-outlined"
              onClick={() => {
                setChat_De_Suporte_Estado(false);
              }}
              style={{ cursor: "pointer" }}
            >
              remove
            </span>
            <span
              className="material-symbols-outlined"
              style={{ cursor: "pointer" }}
              onClick={() => {
                setChat_De_Suporte_Estado("");
              }}
            >
              close
            </span>
          </div>
        </div>
        <div className="Mensagens_Do_Chat">
          {messageList.map((message, index) => (
            <div
              className={
                message.authorId == socket.id
                  ? "Mensagens_Recebidas Minha_Mensagem"
                  : "Mensagens_Recebidas"
              }
              key={index}
            >
              {message.authorId == socket.id ? (
                <div className="message-author">
                  <p>Você</p>
                </div>
              ) : (
                <div className="message-author">
                  <p>{Nome_Da_Loja}</p>
                </div>
              )}
              <div
                className={
                  message.authorId == socket.id
                    ? "message-text Aumentar_Balao_Do_Usuario"
                    : "message-text Aumentar_Balao_Do_Suporte"
                }
              >
                {message.text}
              </div>
            </div>
          ))}
          <div ref={bottomRef}></div>
        </div>
        <div className="Envio_De_Mensagem">
          <input
            type="text"
            className="Input_De_Envio_De_Mensagens"
            value={Mensagem_Para_Enviar}
            placeholder="Sua mensagem aqui..."
            onChange={(e) => {
              setMensagem_Para_Enviar(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key == "Enter") {
                if (!Mensagem_Para_Enviar.trim()) return;

                socket.emit("message", Mensagem_Para_Enviar);

                setMensagem_Para_Enviar("");
              }
            }}
          />
          <span
            className="material-symbols-outlined"
            onClick={() => {
              if (!Mensagem_Para_Enviar.trim()) return;

              socket.emit("message", Mensagem_Para_Enviar);

              setMensagem_Para_Enviar("");
            }}
          >
            send
          </span>
        </div>
      </div>
    );
  };
  //#endregion __

  //#region __ Retorno Minimizado
  const Chat_De_Suporte_Minimizada_Retorno = () => {
    if (Suporte_Ativo !== undefined) {
      return (
        <div
          className="Chat_De_Suporte_Minimizada"
          onClick={() => {
            Suporte_Ativo
              ? setChat_De_Suporte_Estado(true)
              : alert("Nenhum atendente online");
          }}
        >
          <p>Suporte {Suporte_Ativo ? "Online" : "Offline"}</p>

          <span
            className="material-symbols-outlined"
            style={Suporte_Ativo ? { color: "green" } : { color: "red" }}
          >
            radio_button_checked
          </span>
        </div>
      );
    }
  };
  //#endregion __

  //#endregion

  //#region Retorno do componente
  Verificacao_De_Estado_Do_Suporte();

  return Chat_De_Suporte_Estado
    ? Chat_De_Suporte_Maximizado_Retorno()
    : Chat_De_Suporte_Minimizada_Retorno();
  //#endregion
}
