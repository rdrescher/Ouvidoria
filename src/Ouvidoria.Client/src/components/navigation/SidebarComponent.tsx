import {
  makeStyles,
  Collapse,
  Divider,
  Drawer,
  List,
  Theme,
  Typography
} from "@material-ui/core";
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
import React, { useState } from "react";
import { connect } from "react-redux";
import AMFIcon from "../../assets/img/amf_white.png";
import Background from "../../assets/img/bg-clear.png";
import Claim from "../../models/Autenticacao/Claim";
import UserToken from "../../models/Autenticacao/UserToken";
import { IApplicationState } from "../../store";
import SidebarExpandItem from "../common/fields/SidebarExpandItem";
import SidebarItem from "../common/fields/SidebarItem";

const drawerWidth = 240;
interface IStateProps {
  sidebarIsOpen: boolean;
  user: UserToken | null;
  claims: Claim[];
}

function SidebarComponent(props: IStateProps) {
  console.log(props.claims);
  const classes = useStyles();
  const sidebarIsOpen = props.sidebarIsOpen;
  const [manifestationIsOpen, setManifestationIsOpen] = useState<boolean>(
    false
  );
  const [administrationIsOpen, setAdministrationIsOpen] = useState<boolean>(
    false
  );

  function handleManifestationChange(): void {
    setManifestationIsOpen(!manifestationIsOpen);
  }

  function handleAdministrationChange(): void {
    setAdministrationIsOpen(!administrationIsOpen);
  }

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={sidebarIsOpen}
      color="secondary"
      classes={{
        paper: classes.drawerPaper
      }}
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
            nested={true}
            label="Elogio"
            icon={<ThumbUp />}
          />
          <SidebarItem
            path="/sugestao"
            nested={true}
            label="Sugestão"
            icon={<Message />}
          />
          <SidebarItem
            path="/solicitacao"
            nested={true}
            label="Solicitação"
            icon={<RecordVoiceOver />}
          />
          <SidebarItem
            path="/reclamacao"
            nested={true}
            label="Reclamação"
            icon={<ThumbDown />}
          />
          <SidebarItem
            path="/denuncia"
            nested={true}
            label="Denúncia"
            icon={<Report />}
          />
        </Collapse>
        <Divider />
        {!!props.user && (
          <>
            <SidebarItem
              path="/questionario"
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
                    nested={true}
                    icon={<School />}
                  />
                  <SidebarItem
                    path="/departamentos"
                    label="Departamentos"
                    nested={true}
                    icon={<Work />}
                  />
                  <SidebarItem
                    path="/usuarios"
                    label="Usuários"
                    nested={true}
                    icon={<People />}
                  />
                </Collapse>
              </>
            )}
          </>
        )}
      </List>
    </Drawer>
  );
}

const mapStateToProps = (state: IApplicationState) => ({
  sidebarIsOpen: state.NavigationReducer.sidebarIsOpen,
  user: state.SessionReducer.user,
  claims: state.SessionReducer.claims,
});

export default connect(
  mapStateToProps,
  null
)(SidebarComponent);

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
