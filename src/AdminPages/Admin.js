import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Hidden from '@material-ui/core/Hidden';
import Topbar from './AppBar_Drawer/Topbar';
import SideDrawer from './AppBar_Drawer/SideDrawer';
import AdminRouting from './AdminRouting';

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarSpacer: theme.mixins.toolbar,
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 250,
  },
}));

function Admin() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [pageName, setPageName] = React.useState('');
  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Topbar
        pageName={pageName}
        open={open}
        handleDrawerToggle={handleDrawerToggle}
      />
      <SideDrawer
        callback={setPageName}
        open={open}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Hidden only={['xl', 'lg', 'md']}>
        <main>
          <div className={classes.appBarSpacer} />
          <AdminRouting />
        </main>
      </Hidden>
      <Hidden only={['sm', 'xs']}>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.appBarSpacer} />
          <AdminRouting />
        </main>
      </Hidden>
    </div>
  );
}
export default Admin;
