//#region Importacoes
//#region __ Hooks
import { useState, useEffect } from "react";
//#endregion __

//#region __ Bibliotecas
import io from "socket.io-client";
//#endregion __

//#endregion

import Chats_Ativos from "./Subcomponents_Atendimento/Chats_Ativos";
import Chat_Atual from "./Subcomponents_Atendimento/Chat_Atual";

export default function Atendimento() {
  //#region useState
  const [Chat_Aberto, setChat_Aberto] = useState("");
  const [Socket, setSocket] = useState();
  const [Mensagens_Do_Chat_Aberto, setMensagens_Do_Chat_Aberto] = useState("");
  //#endregion

  //#region useEffect
  useEffect(() => {
    Ativar_Conexao_Com_Servidor();
  }, []);

  //#endregion

  //#region Servidor
  //#region __ Conexão
  const Ativar_Conexao_Com_Servidor = async () => {
    socket_conexao = await io.connect(
      // "https://zvfmwc2c-3001.brs.devtunnels.ms/"
      "https://biankamodas-server.onrender.com/",
      {
        transports: ["websocket", "polling", "flashsocket"],
        forceBase64: true,
      }
    );

    socket_conexao.on("connect_error", (error) => {
      console.log(error);
    });

    setSocket(socket_conexao);
  };
  //#endregion __
  //#endregion

  //#region Variaveis
  var socket_conexao;
  //#endregion

  return (
    <div className="Interface_De_Atendimento">
      <Chats_Ativos
        Definir_Chat_Aberto_Atual={setChat_Aberto}
        Chat_Aberto_Atual={Chat_Aberto}
        Definir_Mensagens_Do_Chat_Aberto={setMensagens_Do_Chat_Aberto}
        Socket_Servidor={Socket}
      />
      <Chat_Atual
        Chat_Aberto_Atual={Chat_Aberto}
        Mensagens_Do_Chat_Aberto={Mensagens_Do_Chat_Aberto}
        Socket_Servidor={Socket}
      />
    </div>
  );
}
