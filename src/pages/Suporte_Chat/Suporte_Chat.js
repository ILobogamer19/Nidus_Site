//#region Importação de Estilo
import "./style.css";
import "./Estilo_Chat_Atual.css";
import "./Estilo_Chats_Ativos.css";
//#endregion

//#region Importação de Componentes
import Atendimento from "../../components/Atendimento";
//#endregion

export default function Suporte_Chat() {
  return (
    <div className="Corpo_Site">
      <Atendimento />
    </div>
  );
}
