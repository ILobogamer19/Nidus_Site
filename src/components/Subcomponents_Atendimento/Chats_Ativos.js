//#region Importacoes
//#region __ Hooks
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//#endregion __
//#endregion

var Teste_De_Ativacao_Do_Primeiro_Chat = true;

export default function Chats_Ativos(Atributos) {
  //#region Importacoes do elemento pai
  var Socket_Conexao = Atributos.Socket_Servidor;
  //#endregion

  //#region useRef
  const Primeiro_Chat_Ativar = useRef();
  const Outros_Chat_Ativar = useRef();
  //#endregion

  //#region Hooks const
  const Navigate = useNavigate();
  //#endregion

  //#region useState
  const [Listas_De_Mensagens, setListas_De_Mensagens] = useState([{}]);
  const [Ids_De_Chats, setIds_De_Chats] = useState([]);
  const [Configuraoes_De_Chat_Ao_Lado, setConfiguraoes_De_Chat_Ao_Lado] =
    useState([{}]);
  const [Usuario_Id, setUsuario_Id] = useState();
  //#endregion

  //#region useEffect
  useEffect(() => {
    Listas_De_Mensagens.map((item) => {
      var Chats_Configurados = [];

      Atributos.Definir_Mensagens_Do_Chat_Aberto(
        item[Atributos.Chat_Aberto_Atual]
      );

      for (var i = 0; i < Ids_De_Chats.length; i++) {
        var Contagem_De_Repeticoes = 1;
        item[Ids_De_Chats[i]].map((sub_item) => {
          if (item[Ids_De_Chats[i]].length == Contagem_De_Repeticoes) {
            Chats_Configurados = [...Chats_Configurados, { ...sub_item }];
          } else {
            Contagem_De_Repeticoes++;
          }
        });

        setConfiguraoes_De_Chat_Ao_Lado(Chats_Configurados);
      }

      if (Teste_De_Ativacao_Do_Primeiro_Chat && Chats_Configurados != "") {
        setTimeout(() => {
          Primeiro_Chat_Ativar.current.click();

          Teste_De_Ativacao_Do_Primeiro_Chat = false;
        }, 1);
      }
    });
  }, [Listas_De_Mensagens]);

  useEffect(() => {
    Socket = Socket_Conexao;

    if (Socket) {
      Socket.emit("Suporte_Iniciando");

      Socket.on("Resgate_De_Id", (data) => {
        console.log("Id de acesso: " + data.Resgate_Do_Id);
        setUsuario_Id(data.Resgate_Do_Id);
      });

      Socket.on("Bloqueio_De_Resgate", (data) => {
        if (data.Bloqueio_De_Resgate) {
          alert("Ja a um atendente conectado");
          Navigate("/");
        }
      });

      Socket.on("receive_message", (data) => {
        setListas_De_Mensagens((current) => {
          return current.map((item) => {
            var Objeto_Temporario_Para_Armazenar = {};

            //#region __ Obtencao de horario atual
            const dataAtual = new Date();
            var horas = dataAtual.getHours();
            var minutos = dataAtual.getMinutes();
            horas = horas < 10 ? "0" + horas : horas;
            minutos = minutos < 10 ? "0" + minutos : minutos;
            var Horario = horas + ":" + minutos;
            data.Horario = Horario;
            //#endregion __

            if (item[data.authorId]) {
              Objeto_Temporario_Para_Armazenar[data.authorId] = [
                ...item[data.authorId],
                data,
              ];
            } else {
              Objeto_Temporario_Para_Armazenar[data.authorId] = [data];
            }

            return {
              ...item,
              ...Objeto_Temporario_Para_Armazenar,
            };
          });
        });
        setIds_De_Chats((current) => {
          var Teste_De_Duplicidade_De_Id_Salvo = true;
          current.map((item) => {
            if (item == data.authorId) {
              Teste_De_Duplicidade_De_Id_Salvo = false;
            }
          });
          if (Teste_De_Duplicidade_De_Id_Salvo) {
            return [...current, data.authorId];
          } else {
            return [...current];
          }
        });
      });
    }
  }, [Socket_Conexao]);

  //#endregion

  //#region Variaveis
  var Socket;
  //#endregion

  return (
    <div className="Chats_Ativos">
      <div className="Topo_Dos_Chats">
        <h1
          style={{
            cursor: "pointer",
          }}
          onClick={() => {
            Navigate("/");
          }}
        >
          Chats ativos
        </h1>
      </div>
      <div className="Chats_Ativos_Conjunto">
        {Configuraoes_De_Chat_Ao_Lado.map((item, index) => {
          return (
            <div
              className="Chat_Ativo_Individual"
              id={item.authorId}
              key={item.authorId + item.Horario + item.text}
              style={
                item.authorId == Atributos.Chat_Aberto_Atual
                  ? {
                      backgroundColor: "var(--Fundo_Chat_Ativo)",
                    }
                  : {}
              }
              ref={
                Teste_De_Ativacao_Do_Primeiro_Chat
                  ? Primeiro_Chat_Ativar
                  : Outros_Chat_Ativar
              }
              onClick={(e) => {
                Atributos.Definir_Chat_Aberto_Atual(e.target.id);
                Listas_De_Mensagens.map((sub_item) => {
                  Atributos.Definir_Mensagens_Do_Chat_Aberto(
                    sub_item[item.authorId]
                  );
                });
              }}
            >
              <div className="Cabeca_Do_Chat_Individual" id={item.authorId}>
                <h3 className="Chat_Individual_Id" id={item.authorId}>
                  {item.authorId}
                </h3>
                <span className="Chat_Individual_Horario" id={item.authorId}>
                  {item.Horario}
                </span>
              </div>
              <div className="Corpo_Do_Chat_Individual" id={item.authorId}>
                <span
                  className="Chat_Individual_Mensagem_Previa"
                  id={item.authorId}
                >
                  {item.text}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
