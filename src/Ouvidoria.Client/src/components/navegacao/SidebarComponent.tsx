import {
  makeStyles,
  withWidth,
  Collapse,
  Divider,
  List,
  SwipeableDrawer,
  Theme,
  Typography
} from "@material-ui/core";
import { Breakpoint } from "@material-ui/core/styles/createBreakpoints";
import { isWidthUp } from "@material-ui/core/withWidth";
import {
  Build,
  Home,
  Message,
  People,
  QuestionAnswer,
  RecordVoiceOver,
  Report,
  School,
  ThumbsUpDown,
  ThumbDown,
  ThumbUp,
  Work
} from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import AMFIcon from "../../assets/img/amf_white.png";
import Background from "../../assets/img/bg-clear.png";
import Claim from "../../models/Autenticacao/Claim";
import UserToken from "../../models/Autenticacao/UserToken";
import { IApplicationState } from "../../store";
import * as NavigationActions from "../../store/ducks/navigation/NavigationActions";
import SidebarExpandItem from "../common/fields/SidebarExpandItem";
import SidebarItem from "../common/fields/SidebarItem";

const drawerWidth = 240;

interface IDispatchState {
  openSidebar(): void;
  closeSidebar(): void;
}

interface IStateProps {
  sidebarIsOpen: boolean;
  user: UserToken | null;
  claims: Claim[];
}

interface IWidth {
  width: Breakpoint;
}

type Props = IStateProps & IWidth & IDispatchState;

function SidebarComponent(props: Props) {
  const classes = useStyles();
  const { sidebarIsOpen, width, openSidebar, closeSidebar } = props;
  const [manifestationIsOpen, setManifestationIsOpen] = useState<boolean>(
    false
  );
  const [administrationIsOpen, setAdministrationIsOpen] = useState<boolean>(
    false
  );
  const iOS =
    typeof window !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);

  useEffect(() => {
    if (!isWidthUp("sm", width)) closeSidebar();
  },        [width, closeSidebar]);

  function handleManifestationChange(): void {
    setManifestationIsOpen(!manifestationIsOpen);
  }

  function handleAdministrationChange(): void {
    setAdministrationIsOpen(!administrationIsOpen);
  }

  return (
    <SwipeableDrawer
      className={classes.drawer}
      variant={isWidthUp("sm", width) ? "persistent" : "temporary"}
      anchor="left"
      open={sidebarIsOpen}
      color="secondary"
      onOpen={openSidebar}
      onClose={closeSidebar}
      classes={{
        paper: classes.drawerPaper
      }}
      disableBackdropTransition={!iOS}
      disableDiscovery={iOS}
    >
      <div className={classes.drawerHeader} />
      <img src={AMFIcon} className={classes.AMFIcon} alt="AMF" />
      <Typography variant="h6" className={classes.title}>
        Antonio Meneghetti Faculdade
      </Typography>
      <List>
        <Divider />
        <SidebarItem path="/" label="Página Inicial" icon={<Home />} />
        <Divider />
        <SidebarExpandItem
          icon={<ThumbsUpDown />}
          onClick={handleManifestationChange}
          label="Manifestações"
          isOpen={manifestationIsOpen}
        />
        <Collapse in={manifestationIsOpen} timeout="auto" unmountOnExit>
          <SidebarItem
            path="/elogio"
            nested
            label="Elogio"
            icon={<ThumbUp />}
          />
          <SidebarItem
            path="/sugestao"
            nested
            label="Sugestão"
            icon={<Message />}
          />
          <SidebarItem
            path="/solicitacao"
            nested
            label="Solicitação"
            icon={<RecordVoiceOver />}
          />
          <SidebarItem
            path="/reclamacao"
            nested
            label="Reclamação"
            icon={<ThumbDown />}
          />
          <SidebarItem
            path="/denuncia"
            nested
            label="Denúncia"
            icon={<Report />}
          />
        </Collapse>
        <Divider />
        {!!props.user && (
          <>
            <SidebarItem
              path="/questionarios"
              label="Questionários"
              icon={<QuestionAnswer />}
            />
            <Divider />
            {!!props.claims.find(x => x.type === "Administrador") && (
              <>
                <SidebarExpandItem
                  icon={<Build />}
                  onClick={handleAdministrationChange}
                  label="Administração"
                  isOpen={administrationIsOpen}
                />
                <Collapse
                  in={administrationIsOpen}
                  timeout="auto"
                  unmountOnExit
                >
                  <SidebarItem
                    path="/cursos"
                    label="Cursos"
                    nested
                    icon={<School />}
                  />
                  <SidebarItem
                    path="/departamentos"
                    label="Departamentos"
                    nested
                    icon={<Work />}
                  />
                  <SidebarItem
                    path="/manifestacoes"
                    label="Manifestações"
                    nested
                    icon={<ThumbsUpDown />}
                  />
                  <SidebarItem
                    path="/questionarios/lista"
                    label="Questionários"
                    nested
                    icon={<QuestionAnswer />}
                  />
                  <SidebarItem
                    path="/usuarios"
                    label="Usuários"
                    nested
                    icon={<People />}
                  />
                </Collapse>
              </>
            )}
          </>
        )}
      </List>
    </SwipeableDrawer>
  );
}

const mapStateToProps = (state: IApplicationState) => ({
  sidebarIsOpen: state.NavigationReducer.sidebarIsOpen,
  user: state.SessionReducer.user,
  claims: state.SessionReducer.claims
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(NavigationActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withWidth()(SidebarComponent));

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    marginBottom: 10,
    textAlign: "center"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    border: 0
  },
  drawerPaper: {
    backgroundImage: `linear-gradient(to bottom, rgba(0, 180, 219, 1) 20%, rgba(0, 131, 176, 0.5)), url(${Background})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "240px 100%",
    background: "linear-gradient(-206deg, #00B4DB 35%, #0083B0)",
    width: drawerWidth,
    color: "white",
    bottom: 0
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  AMFIcon: {
    width: "125px",
    display: "block",
    marginTop: 20,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 10
  }
}));
