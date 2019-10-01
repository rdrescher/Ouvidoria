import { Fab, Grid, Tooltip, Typography } from "@material-ui/core";
import { RemoveRedEye } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TipoManifestacao from "../../application/enums/TipoManifestacao";
import ManifestacaoPeview from "../../models/Manifestacao/ManifestacaoPreview";
import Resultado from "../../models/Resultado";
import ManifestacaoApi from "../../services/ManifestacaoApi";

interface IProps {
  manifestationType?: TipoManifestacao;
  adminVision?: boolean;
}

interface IState {
  manifestations: ManifestacaoPeview[];
}

const initialState: IState = {
  manifestations: []
};

type Props = IProps;

export default function ListarManifestacoes(props: Props) {
  const { manifestationType, adminVision } = props;
  const [state, setState] = useState(initialState);
  const classes = useStyles();

  useEffect(() => {
    async function GetManifestations() {
      let result: Resultado<ManifestacaoPeview[]>;
      if (manifestationType === undefined) {
        result = adminVision
          ? await ManifestacaoApi.Get()
          : await ManifestacaoApi.GetPersonalManifestations();
      } else {
        result = adminVision
          ? await ManifestacaoApi.GetByType(manifestationType!)
          : await ManifestacaoApi.GetPersonalManifestationsByType(
              manifestationType!
            );
      }
      if (result.success) {
        setState(prevState => ({
          ...prevState,
          manifestations: result.data!
        }));
      }
    }
    GetManifestations();
  }, [manifestationType, adminVision]);

  return (
    <div>
      {state.manifestations.length === 0 ? (
        <Typography variant="body1" align="center">
          Você ainda não enviou nenhuma manifestação desse tipo.
        </Typography>
      ) : (
        state.manifestations.map(manifestation => (
          <div key={manifestation.id} className={classes.item}>
            <div className={classes.description}>
              <Typography variant="h6" gutterBottom>
                {manifestation.titulo.length > 50
                  ? `${manifestation.titulo.substring(0, 50)}...`
                  : manifestation.titulo}
              </Typography>
              <Typography variant="body1" paragraph>
                {manifestation.descricao.length > 80
                  ? `${manifestation.descricao.substring(0, 80)}...`
                  : manifestation.descricao}
              </Typography>
              <Grid container>
                <Grid item xs={12} sm={12} md={6}>
                  <b>{`Registrado em: `}</b>
                  {manifestation.dataCriacao}
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <b>{`Departamento: `}</b>
                  {manifestation.departamento}
                </Grid>
                {adminVision && (
                  <Grid item xs={12} sm={12} md={6}>
                    <b>{`Manifestante: `}</b>
                    {manifestation.usuario}
                  </Grid>
                )}
                {manifestationType === undefined && (
                  <Grid item xs={12} sm={12} md={6}>
                    <b>{`Tipo da Manifestação: `}</b>
                    {manifestation.tipoManifestacao}
                  </Grid>
                )}
                <Grid item xs={12} sm={12} md={6}>
                  <b>{`Número de Interações: `}</b>
                  {manifestation.numeroInteracoes}
                </Grid>
                {!!manifestation.usuarioUltimaInteracao && (
                  <Grid item xs={12} sm={12} md={6}>
                    <b>{`Última interação: `}</b>
                    {manifestation.usuarioUltimaInteracao}
                  </Grid>
                )}
              </Grid>
              <Typography variant="body2">
                <br />
              </Typography>
            </div>
            <Tooltip title="Visualizar">
              <Link to={`/manifestacao/${manifestation.id}`}>
                <Fab size="medium" color="secondary">
                  <RemoveRedEye />
                </Fab>
              </Link>
            </Tooltip>
          </div>
        ))
      )}
    </div>
  );
}

const useStyles = makeStyles(() => ({
  item: {
    width: "100%",
    display: "flex",
    padding: 20,
    alignItems: "center",
    marginTop: 20,
    border: "1px solid #ddd",
    borderRadius: 5
  },
  description: {
    flexGrow: 1
  }
}));
