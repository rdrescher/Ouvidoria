import { Typography } from "@material-ui/core";
import {
  HelpOutline,
  NotificationImportantOutlined,
  RecordVoiceOverOutlined
} from "@material-ui/icons";
import React from "react";
import { Link } from "react-router-dom";
import PainelItem from "../common/PainelItem";

export default function SobreOuvidoria() {
  return (
    <div>
      <Typography paragraph align="center" variant="h5">
        Sobre a Ouvidoria
      </Typography>

      <PainelItem
        title="O que é"
        icon={<HelpOutline />}
        content={
          <Typography>
            A Ouvidoria da Antonio Meneghetti Faculdade é um canal de
            comunicação entre a instituição e as pessoas que a ela frequentam.
            Este espaço é reservado para você realizar suas manifestações à
            faculdade de maneira prática, rápida e segura.
          </Typography>
        }
      />
      <PainelItem
        title="O que atende"
        icon={<RecordVoiceOverOutlined />}
        content={
          <Typography>
            Atende manifestações como{" "}
            <strong>
              elogios, sugestões, denúncias, solicitações e reclamações.
            </strong>{" "}
            <br />
            Também conta com um sistema de <strong>questionários</strong>, que
            tem como objetivo aplicar perguntas específicas que sejam do
            interesse da instituição, auxiliando ainda mais no atendimento ao
            cliente.
          </Typography>
        }
      />
      <PainelItem
        title="Informações importantes"
        icon={<NotificationImportantOutlined />}
        content={
          <Typography>
            - O sistema encontra-se em fase de <strong>testes</strong>, não
            contendo todas suas funcionalidades finais. <br />- Suas informações
            e dados aqui cadastrados <strong>não</strong> serão divulgados em
            circunstância alguma, pois os mesmos serão tratados somente para
            coleta de dados no trabalho de conclusão de curso do desenvolvedor
            deste software, <strong>não</strong> havendo interação direta com a
            instituição. <br /> - Para realizar qualquer ação no sistema, você
            deverá estar <Link to="/Login">autenticado</Link>. <br />- Caso
            ocorra algum problema ou erro durante o uso do sistema, favor enviar
            um e-mail para{" "}
            <a href="mailto:rhuan.drescher@gmail.com">
              rhuan.drescher@gmail.com
            </a>{" "}
            ou então utilizar a área de reclamações do próprio sistema para
            relatá-lo.
          </Typography>
        }
      />
    </div>
  );
}
