//#region Importacoes
//#region __ Ferramentas
import { Busca_De_Configuracoes_JSON } from "../Ferramentas/Busca_De_Pacote_JSON";
//#endregion __
//#endregion

//#region Configuracoes
var Pacote_De_Configuracao = await Busca_De_Configuracoes_JSON();

var Configuracoes_Filtros = Pacote_De_Configuracao.Produtos;

var Filtros = [];

Configuracoes_Filtros.forEach((item, index) => {
  item.Filtros.map((sub_item) => {
    if (Filtros == "") {
      Filtros = [sub_item];
    } else {
      var Teste_De_Duplicidade = true;

      Filtros.map((sub_sub_item) => {
        if (sub_sub_item == sub_item) {
          Teste_De_Duplicidade = false;
        }
      });

      if (Teste_De_Duplicidade) {
        Filtros = [...Filtros, sub_item];
      }
    }
  });
});
//#endregion

export default function Filtros_De_Produtos({
  Filtro_Ativo,
  Definir_Valor_Do_filtro,
}) {
  return (
    <div className="Filtros_De_Produtos_Conjunto">
      <p
        className={
          Filtro_Ativo == ""
            ? "Filtro_Individual Filtro_Individual_Ativo "
            : "Filtro_Individual"
        }
        onClick={() => {
          Definir_Valor_Do_filtro("");
        }}
        style={{
          paddingLeft: "5px",
        }}
      >
        Limpar Filtro
      </p>
      <div
        className="Filtros_Utilizaveis"
        style={{
          marginLeft: "33px",
          marginTop: "10px",
        }}
      >
        {Filtros.map((item) => {
          return (
            <p
              key={"Filtro_Individual" + item}
              className={
                Filtro_Ativo == item
                  ? "Filtro_Individual Filtro_Individual_Ativo"
                  : "Filtro_Individual"
              }
              onClick={() => {
                Definir_Valor_Do_filtro(item);
              }}
            >
              {item}
            </p>
          );
        })}
      </div>
    </div>
  );
}
