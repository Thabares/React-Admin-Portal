import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import { useHistory } from "react-router-dom";
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  listRoot: {
    padding: 0,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
}));

function SideDrawer(props) {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  return (
    <div>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={props.open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={props.handleDrawerToggle}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List className={classes.listRoot}>
          <ListItem
            button
            key={0}
            onClick={() => {
              history.push("/admin/dashboard");
            }}
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary={"Dashboard"} />
          </ListItem>
          <ListItem
            button
            key={1}
            onClick={() => {
              history.push("/admin/users");
            }}
          >
            <ListItemIcon>
              <AccountBoxIcon />
            </ListItemIcon>
            <ListItemText primary={"Users"} />
          </ListItem>
        </List>
        <Divider />
      </Drawer>
    </div>
  );
}

export default SideDrawer;
