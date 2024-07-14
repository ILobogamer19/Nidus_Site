//#region Importacoes
//#region __ Hooks
import { useRef, useState, useEffect } from "react";
//#endregion __
//#endregion

export default function Chat_Atual(Atributos) {
  //#region Importacoes do elemento pai
  var Socket_Conexao = Atributos.Socket_Servidor;
  var Mensagen_Do_Chat_Selecionado = Atributos.Mensagens_Do_Chat_Aberto;
  //#endregion

  //#region useRef
  const bottomRef = useRef();
  //#endregion

  //#region useState
  const [Mensagem_Para_Enviar, setMensagem_Para_Enviar] = useState("");
  const [socket, setsocket] = useState(Socket_Conexao);
  //#endregion

  //#region useEffect
  useEffect(() => {
    setsocket(Socket_Conexao);
  }, [Socket_Conexao]);

  const scrollDown = () => {
    bottomRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (Mensagen_Do_Chat_Selecionado != "") {
      scrollDown();
    }
  }, [Mensagen_Do_Chat_Selecionado]);
  //#endregion

  return (
    <div className="Chat_Atual_Selecionado">
      <div className="Mensagens_Do_Chat">
        {Mensagen_Do_Chat_Selecionado &&
          Mensagen_Do_Chat_Selecionado.map((message, index) => {
            if (socket) {
              return (
                <div
                  className={
                    message.Mensagem_Atendente
                      ? "Mensagens_Recebidas Minha_Mensagem"
                      : "Mensagens_Recebidas"
                  }
                  key={index}
                >
                  {message.Mensagem_Atendente ? (
                    <div className="message-author">
                      <p>Você</p>
                    </div>
                  ) : (
                    <div className="message-author">
                      <p>{message.authorId}</p>
                    </div>
                  )}
                  <div
                    className={
                      message.Mensagem_Atendente
                        ? "message-text Aumentar_Balao_Do_Usuario"
                        : "message-text Aumentar_Balao_Do_Suporte"
                    }
                  >
                    {message.text}
                  </div>
                </div>
              );
            }
          })}
        <div ref={bottomRef}></div>
      </div>
      {Mensagen_Do_Chat_Selecionado && (
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

                socket.emit("Mensagem_Enviada_Pelo_Atendente", {
                  Mensagem: Mensagem_Para_Enviar,
                  Conversa_Ativa: Atributos.Chat_Aberto_Atual,
                });

                setMensagem_Para_Enviar("");
              }
            }}
          />
          <span
            className="material-symbols-outlined"
            onClick={() => {
              if (!Mensagem_Para_Enviar.trim()) return;

              socket.emit("Mensagem_Enviada_Pelo_Atendente", {
                Mensagem: Mensagem_Para_Enviar,
                Conversa_Ativa: Atributos.Chat_Aberto_Atual,
              });

              setMensagem_Para_Enviar("");
            }}
          >
            send
          </span>
        </div>
      )}
    </div>
  );
}
