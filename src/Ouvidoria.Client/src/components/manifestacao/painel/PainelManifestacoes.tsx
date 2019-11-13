import { Typography } from "@material-ui/core";
import { ThumbsUpDownOutlined } from "@material-ui/icons";
import React from "react";
import PainelItem from "../../common/PainelItem";

export default function PainelManifestacoes() {
  return (
    <PainelItem
      title="Manifestações"
      icon={<ThumbsUpDownOutlined />}
      content={
        <Typography>
          As manifestações são formas de o cidadão expressar para a ouvidoria
          seus anseios, angústias, dúvidas, opiniões e sua satisfação com um
          atendimento ou serviço recebido. Assim, pode auxiliar a faculdade a
          aprimorar a gestão de políticas e serviços, ou a combater a prática de
          atos ilícitos. <br /> <br />
          Para realizar qualquer manifestação, o usuário deverá possuir um
          cadastro e estar autenticado. <br /> <br />
          As manifestações realizadas são direcionadas aos ouvidores da
          faculdade e também ao usuário responsável pelo departamento ao qual a
          manifestação foi destinada. <br /> <br />
          Toda manifestação pode ser acompanhada após o seu cadastro, podendo
          haver interações entre o criador, ouvidores e responsáveis. Pessoas
          que não fazem partes desse grupo, não conseguirão acessar ou interagir
          com a mesma. <br /> <br />
          Após ser cadastrada, a manifestação não pode ser alterada.
          <br /> <br />
          Caso haja a necessidade de enviar várias manifestações do mesmo tipo,
          é recomendado que sejam feitas uma manifestação para cada ao invés de
          uma única, a fim de agilizar o tratamento das mesmas. <br /> <br />
          <strong>ATENÇÃO! </strong> Todos os dados cadastrados no sistema serão
          utilizados somente para uma pesquisa do trabalho de conclusão de curso
          do desenvolvedor deste software. As informações que aqui forem salvas,
          será de acesso somente do próprio desenvolvedor, onde os mesmos não
          serão divulgados à instituição ou qualquer pessoa.
        </Typography>
      }
    />
  );
}
