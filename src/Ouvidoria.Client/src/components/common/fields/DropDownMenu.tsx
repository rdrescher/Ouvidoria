import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export interface IItems {
  label: string;
  onClick: () => void;
}

interface IProps {
  open: boolean;
  handleClose: () => void;
  items: IItems[];
}

export default function DropDownMenu(props: IProps) {
  const classes = useStyles(0);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  function handleClose(event: React.MouseEvent<EventTarget>) {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }
    props.handleClose();
  }

  function handleItemClick(item: IItems): void {
    item.onClick();
    props.handleClose();
  }

  return (
    <div className={classes.root}>
      <Popper
        open={props.open}
        anchorEl={anchorRef.current}
        keepMounted
        transition
        disablePortal
        placement="bottom-start"
      >
        {({ TransitionProps }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: "bottom-start"
            }}
          >
            <Paper id="menu-list-grow">
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList>
                  {props.items.map(item => (
                    <MenuItem onClick={() => handleItemClick(item)}>
                      {item.label}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex"
    },
    paper: {
      marginRight: theme.spacing(2)
    }
  })
);
