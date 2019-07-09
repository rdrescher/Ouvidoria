import {
    makeStyles,
    Collapse,
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Theme,
    Typography
} from "@material-ui/core";
import {
    Build,
    ExpandLess,
    ExpandMore,
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
import clsx from "clsx";
import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import AMFIcon from "../../assets/img/amf_white.png";
import Background from "../../assets/img/bg-clear.png";
import { IApplicationState } from "../../store";

const drawerWidth = 240;
type Menus =
    | "Home"
    | "Elogio"
    | "Sugestão"
    | "Solicitação"
    | "Reclamação"
    | "Denúncia"
    | "Questionários"
    | "Cursos"
    | "Departamentos"
    | "Usuários"
    | "AdmQuestionarios"
    | "Manifestações";

interface IStateProps {
    sidebarIsOpen: boolean;
}

function SidebarComponent(props: IStateProps) {
    const classes = useStyles();
    const sidebarIsOpen = props.sidebarIsOpen;
    const [activeMenu, setActiveMenu] = useState<Menus>();
    const [manifestationIsOpen, setManifestationIsOpen] = useState<boolean>(
        false
    );
    const [administrationIsOpen, setAdministrationIsOpen] = useState<boolean>(
        false
    );

    function onMenuChange(menu: Menus) {
        setActiveMenu(menu);
    }

    function onManifestationChange(): void {
        setManifestationIsOpen(!manifestationIsOpen);
    }

    function onAdministrationChange(): void {
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
            <Typography variant="h6" className={classes.titulo}>
                Antonio Meneghetti Faculdade
            </Typography>
            <List>
                <Divider />
                <Link to="/" className={classes.link}>
                    <ListItem
                        button
                        className={clsx({
                            [classes.selected]: activeMenu === "Home"
                        })}
                        onClick={() => onMenuChange("Home")}
                    >
                        <ListItemIcon>
                            <Home />
                        </ListItemIcon>
                        <ListItemText primary="Página Inicial" />
                    </ListItem>
                </Link>
                <Divider />
                <ListItem button onClick={onManifestationChange}>
                    <ListItemIcon>
                        <ThumbsUpDown />
                    </ListItemIcon>
                    <ListItemText primary="Manifestações" />
                    {manifestationIsOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={manifestationIsOpen} timeout="auto" unmountOnExit>
                    <Link to="/elogio" className={classes.link}>
                        <ListItem
                            button
                            className={clsx(classes.nested, {
                                [classes.selected]: activeMenu === "Elogio"
                            })}
                            onClick={() => onMenuChange("Elogio")}
                        >
                            <ListItemIcon>
                                <ThumbUp />
                            </ListItemIcon>
                            <ListItemText primary="Elogio" />
                        </ListItem>
                    </Link>
                    <Link to="/sugestao" className={classes.link}>
                        <ListItem
                            button
                            className={clsx(classes.nested, {
                                [classes.selected]: activeMenu === "Sugestão"
                            })}
                            onClick={() => onMenuChange("Sugestão")}
                        >
                            <ListItemIcon>
                                <Message />
                            </ListItemIcon>
                            <ListItemText primary="Sugestão" />
                        </ListItem>
                    </Link>
                    <Link to="/solicitacao" className={classes.link}>
                        <ListItem
                            button
                            className={clsx(classes.nested, {
                                [classes.selected]: activeMenu === "Solicitação"
                            })}
                            onClick={() => onMenuChange("Solicitação")}
                        >
                            <ListItemIcon>
                                <RecordVoiceOver />
                            </ListItemIcon>
                            <ListItemText primary="Solicitação" />
                        </ListItem>
                    </Link>
                    <Link to="/reclamacao" className={classes.link}>
                        <ListItem
                            button
                            className={clsx(classes.nested, {
                                [classes.selected]: activeMenu === "Reclamação"
                            })}
                            onClick={() => onMenuChange("Reclamação")}
                        >
                            <ListItemIcon>
                                <ThumbDown />
                            </ListItemIcon>
                            <ListItemText primary="Reclamação" />
                        </ListItem>
                    </Link>
                    <Link to="/denuncia" className={classes.link}>
                        <ListItem
                            button
                            className={clsx(classes.nested, {
                                [classes.selected]: activeMenu === "Denúncia"
                            })}
                            onClick={() => onMenuChange("Denúncia")}
                        >
                            <ListItemIcon>
                                <Report />
                            </ListItemIcon>
                            <ListItemText primary="Denúncia" />
                        </ListItem>
                    </Link>
                </Collapse>
                <Divider />
                <Link to="/questionario" className={classes.link}>
                    <ListItem
                        button
                        className={clsx({
                            [classes.selected]: activeMenu === "Questionários"
                        })}
                        onClick={() => onMenuChange("Questionários")}
                    >
                        <ListItemIcon>
                            <QuestionAnswer />
                        </ListItemIcon>
                        <ListItemText primary="Questionários" />
                    </ListItem>
                </Link>
                <Divider />
                <ListItem button onClick={onAdministrationChange}>
                    <ListItemIcon>
                        <Build />
                    </ListItemIcon>
                    <ListItemText primary="Administração" />
                    {administrationIsOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse
                    in={administrationIsOpen}
                    timeout="auto"
                    unmountOnExit
                >
                    <Link to="/cursos" className={classes.link}>
                        <ListItem
                            button
                            className={clsx(classes.nested, {
                                [classes.selected]: activeMenu === "Cursos"
                            })}
                            onClick={() => onMenuChange("Cursos")}
                        >
                            <ListItemIcon>
                                <School />
                            </ListItemIcon>
                            <ListItemText primary="Cursos" />
                        </ListItem>
                    </Link>
                    <Link to="/departamentos" className={classes.link}>
                        <ListItem
                            button
                            className={clsx(classes.nested, {
                                [classes.selected]:
                                    activeMenu === "Departamentos"
                            })}
                            onClick={() => onMenuChange("Departamentos")}
                        >
                            <ListItemIcon>
                                <Work />
                            </ListItemIcon>
                            <ListItemText primary="Departamentos" />
                        </ListItem>
                    </Link>
                    <Link to="/usuarios" className={classes.link}>
                        <ListItem
                            button
                            className={clsx(classes.nested, {
                                [classes.selected]: activeMenu === "Usuários"
                            })}
                            onClick={() => onMenuChange("Usuários")}
                        >
                            <ListItemIcon>
                                <People />
                            </ListItemIcon>
                            <ListItemText primary="Usuários" />
                        </ListItem>
                    </Link>
                </Collapse>
            </List>
        </Drawer>
    );
}

const mapStateToProps = (state: IApplicationState) => ({
    sidebarIsOpen: state.NavigationReducer.sidebarIsOpen
});

export default connect(
    mapStateToProps,
    null
)(SidebarComponent);

const useStyles = makeStyles((theme: Theme) => ({
    titulo: {
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
        bottom: 0,
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
    },
    selected: {
        background: "rgba(0, 0, 0, 0.09) !important"
    },
    link: {
        color: "white",
        textDecoration: "none"
    },
    nested: {
        paddingLeft: theme.spacing(4),
        background: "rgba(0, 0, 0, 0.04)"
    }
}));