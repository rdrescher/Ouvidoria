import { Fab, Tooltip, Typography } from "@material-ui/core";
import { RemoveRedEye } from "@material-ui/icons";
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
import DetalhesManifestacoes from "./DetalhesManifestacoes";

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
              <DetalhesManifestacoes
                titulo={manifestation.titulo}
                descricao={manifestation.descricao}
                dataCriacao={manifestation.dataCriacao}
                departamento={manifestation.departamento}
                numeroInteracoes={manifestation.numeroInteracoes}
                tipoManifestacao={manifestation.tipoManifestacao}
                usuario={manifestation.usuario}
                usuarioUltimaInteracao={manifestation.usuarioUltimaInteracao}
              />
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
