import { Chip, Fab, Grid, Tooltip, Typography } from "@material-ui/core";
import {
  CalendarToday,
  RecordVoiceOver,
  ThumbsUpDown,
  Work
} from "@material-ui/icons";
import { HowToReg, Message, RemoveRedEye } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators, Dispatch } from "redux";
import TipoManifestacao from "../../application/enums/TipoManifestacao";
import ManifestacaoPeview from "../../models/Manifestacao/ManifestacaoPreview";
import Resultado from "../../models/Resultado";
import ManifestacaoApi from "../../services/ManifestacaoApi";
import * as LoadingActions from "../../store/ducks/loading/LoadingActions";

interface IProps {
  manifestationType?: TipoManifestacao;
  adminVision?: boolean;
}

interface IDispatchToProps {
  setLoading: () => void;
  setLoaded: () => void;
}

interface IState {
  manifestations: ManifestacaoPeview[];
  loaded: boolean;
}

const initialState: IState = {
  manifestations: [],
  loaded: false
};

type Props = IProps & IDispatchToProps;

function ListaManifestacoes(props: Props) {
  const { manifestationType, adminVision, setLoading, setLoaded } = props;
  const [state, setState] = useState(initialState);
  const classes = useStyles();

  useEffect(() => {
    async function GetManifestations() {
      setLoading();
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
          manifestations: result.data!,
          loaded: true
        }));
      }

      setLoaded();
    }
    GetManifestations();
  }, [manifestationType, adminVision, setLoading, setLoaded]);

  return (
    <div>
      {state.manifestations.length === 0 ? (
        state.loaded ? (
          <Typography variant="body1" align="center">
            Você ainda não enviou nenhuma manifestação desse tipo.
          </Typography>
        ) : (
          <></>
        )
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
              <Grid container spacing={1}>
                <Grid item>
                  <Tooltip title="Data da criação">
                    <Chip
                      color="secondary"
                      size="small"
                      label={manifestation.dataCriacao}
                      icon={<CalendarToday />}
                    />
                  </Tooltip>
                </Grid>
                <Grid item>
                  <Tooltip title="Departamento">
                    <Chip
                      color="secondary"
                      size="small"
                      label={manifestation.departamento}
                      icon={<Work />}
                    />
                  </Tooltip>
                </Grid>
                {adminVision && (
                  <Grid item>
                    <Tooltip title="Manifestante">
                      <Chip
                        color="secondary"
                        size="small"
                        label={manifestation.usuario}
                        icon={<RecordVoiceOver />}
                      />
                    </Tooltip>
                  </Grid>
                )}
                {manifestationType === undefined && (
                  <Grid item>
                    <Tooltip title="Tipo da manifestação">
                      <Chip
                        color="secondary"
                        size="small"
                        label={TipoManifestacao[manifestation.tipoManifestacao]}
                        icon={<ThumbsUpDown />}
                      />
                    </Tooltip>
                  </Grid>
                )}
                <Grid item>
                  <Tooltip title="Número de interações">
                    <Chip
                      color="secondary"
                      size="small"
                      label={manifestation.numeroInteracoes}
                      icon={<Message />}
                    />
                  </Tooltip>
                </Grid>
                {!!manifestation.usuarioUltimaInteracao && (
                  <Grid item>
                    <Tooltip title="Último usuário a interagir">
                      <Chip
                        color="secondary"
                        size="small"
                        label={manifestation.usuarioUltimaInteracao}
                        icon={<HowToReg />}
                      />
                    </Tooltip>
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

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(LoadingActions, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(ListaManifestacoes);

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
