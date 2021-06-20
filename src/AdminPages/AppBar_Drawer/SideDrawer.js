import React, { useEffect } from 'react';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SideBarMenu from './SideBarMenu';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { useLocation } from 'react-router-dom';
import { Link, Tooltip, Box, Avatar, Badge, Collapse } from '@material-ui/core';
const drawerWidth = 240;
const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: '$ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}))(Badge);
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
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  companyName: {
    fontSize: '16px',
    alignItems: 'center',
    fontWeight: '500',
    justifyContent: 'center',
    textDecoration: 'none',
    background: 'transparent',
  },
  userImage: {
    width: '70px',
    height: '70px',
  },
  userInfoBox: {
    background: 'transparent',
    textAlign: 'center',
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  menuLink: {
    color: 'rgba(0, 0, 0, 0.87)',
  },
  textLimit: {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
  menuStyle: {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
  userName: {
    fontSize: '18px',
    alignItems: 'center',
    fontWeight: '600',
    justifyContent: 'center',
    textDecoration: 'none',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
}));

function SideDrawer(props) {
  const classes = useStyles();
  const theme = useTheme();

  const [values, setMenuStatus] = React.useState({});
  const location = useLocation();

  useEffect(() => {
    let menuStatus = values;

    SideBarMenu.menu.map((data) => {
      if (data.display !== undefined && data.display !== null) {
        data.subMenu.map((subData) => {
          if (subData.link === location.pathname) {
            props.callback(subData.display);
          }
          return (menuStatus[subData.eventKey] =
            menuStatus[subData.eventKey] !== undefined &&
            menuStatus[subData.eventKey] !== null
              ? menuStatus[subData.eventKey]
              : false);
        });

        if (data.link === location.pathname) {
          props.callback(data.display);
        }

        if (location.pathname.includes('/profile')) {
          props.callback('Profile');
        }

        return (menuStatus[data.eventKey] =
          menuStatus[data.eventKey] !== undefined &&
          menuStatus[data.eventKey] !== null
            ? menuStatus[data.eventKey]
            : false);
      }
      return null;
    });
    setMenuStatus(menuStatus);
  }, [location]);

  const MainMenu = (menu) =>
    menu.subMenu.length === 0 ? (
      <Link href={menu.link} underline="none" className={classes.menuLink}>
        <ListItem
          button
          key={menu.eventKey}
          selected={location.pathname === menu.link ? true : false}
        >
          <ListItemIcon>{menu.icon}</ListItemIcon>
          <Tooltip title={menu.display}>
            <ListItemText
              className={classes.menuStyle}
              primary={menu.display}
            />
          </Tooltip>
        </ListItem>
      </Link>
    ) : menu.subMenu.length > 0 ? (
      <div>
        <ListItem button onClick={() => handleMenu(menu.eventKey)}>
          <ListItemIcon>{menu.icon}</ListItemIcon>
          <Tooltip title={menu.display}>
            <ListItemText
              primaryTypographyProps={{
                className: classes.menuStyle,
              }}
              primary={menu.display}
            />
          </Tooltip>
          {values !== undefined && values !== null ? (
            values[menu.eventKey] !== undefined &&
            values[menu.eventKey] !== null ? (
              values[menu.eventKey] ? (
                <ExpandLess />
              ) : (
                <ExpandMore />
              )
            ) : (
              <ExpandMore />
            )
          ) : <ExpandMore /> ? (
            <ExpandMore />
          ) : (
            <ExpandMore />
          )}
        </ListItem>
        <SubMenu {...menu} />
      </div>
    ) : null;
  const SubMenu = (menu) => {
    return menu.subMenu.map((subMenu, subMenuIndex) => (
      <Collapse
        in={
          values !== undefined && values !== null
            ? values[menu.eventKey] !== undefined &&
              values[menu.eventKey] !== null
              ? values[menu.eventKey]
              : false
            : false
        }
        timeout="auto"
        unmountOnExit
        key={subMenuIndex}
      >
        <List component="div" disablePadding>
          <Link
            href={subMenu.link}
            underline="none"
            className={classes.menuLink}
          >
            <ListItem
              button
              selected={location.pathname === subMenu.link ? true : false}
              className={classes.nested}
            >
              <ListItemIcon>{subMenu.icon}</ListItemIcon>
              <Tooltip title={subMenu.display}>
                <ListItemText
                  className={classes.menuStyle}
                  primary={subMenu.display}
                />
              </Tooltip>
            </ListItem>
          </Link>
        </List>
      </Collapse>
    ));
  };
  const DrawerMenu = () => {
    return (
      <div>
        <CompanyUserInfo />
        <Divider />
        <List>
          {SideBarMenu.menu.map((menu, menuIndex) =>
            menu.display !== undefined && menu.display !== null ? (
              <MainMenu key={menuIndex} {...menu} />
            ) : (
              <Divider key={menuIndex} />
            )
          )}
        </List>
      </div>
    );
  };

  const handleMenu = (eventKey) => {
    if (eventKey !== undefined && eventKey !== null) {
      setMenuStatus({
        ...values,
        [eventKey]:
          values !== undefined && values !== null
            ? values[eventKey] !== undefined && values[eventKey] !== null
              ? !values[eventKey]
              : false
            : false,
      });
    }
  };

  const CompanyUserInfo = () => {
    return (
      <div className={classes.toolbar}>
        {/* User Name & Icon */}
        <Box bgcolor="background.paper" p={1} className={classes.userInfoBox}>
          <StyledBadge
            overlap="circle"
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            variant="dot"
          >
            <Avatar
              className={classes.userImage}
              alt="User Logo"
              src={
                'https://res.cloudinary.com/itstab24/image/upload/v1624177528/R_Logo_bqnlfd.jpg'
              }
            />
          </StyledBadge>
        </Box>
        <Box bgcolor="background.paper" p={1} className={classes.userInfoBox}>
          <Box
            component="span"
            color="text.primary"
            ml={1}
            className={classes.userName}
          >
            <Link href={'/admin/profile'}>{'THABARES'}</Link>
          </Box>
        </Box>
      </div>
    );
  };

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
          <Box
            m={1}
            bgcolor="background.paper"
            p={1}
            style={{ display: 'flex' }}
            className={classes.companyName}
          >
            <Avatar
              alt="TruckMatic"
              src="https://res.cloudinary.com/itstab24/image/upload/v1624177528/R_Logo_bqnlfd.jpg"
              m={3}
              className={classes.small}
            />
            <Box
              component="span"
              color="text.primary"
              ml={1}
              className={classes.companyName}
            >
              REACT ADMIN
            </Box>
          </Box>
          <IconButton onClick={props.handleDrawerToggle}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <DrawerMenu />
      </Drawer>
    </div>
  );
}

export default SideDrawer;
