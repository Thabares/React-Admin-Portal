import React from 'react';
import PeopleIcon from '@material-ui/icons/People';
import DashboardIcon from '@material-ui/icons/Dashboard';

class SideBarMenu {
  static menu = [
    {
      display: 'Dashboard',
      link: '/admin/dashboard',
      linkPage: false,
      onclick: null,
      urlEndWith: 'dashboard',
      className: '',
      permissionLevel: 'Dashboard',
      icon: <DashboardIcon />,
      eventKey: 'dashboard',
      subMenu: [],
    },
    {
      display: 'User',
      link: '/admin/users',
      linkPage: false,
      onclick: null,
      urlEndWith: 'users',
      className: '',
      permissionLevel: 'Users',
      icon: <PeopleIcon />,
      eventKey: 'users',
      subMenu: [],
    },
    {
      // Divider Area
    },
    // {
    //   display: 'sideNavMenu.security',
    //   link: '/admin/security',
    //   linkPage: false,
    //   onclick: null,
    //   urlEndWith: 'security',
    //   className: '',
    //   permissionLevel: '',
    //   icon: <SecurityIcon />,
    //   eventKey: 'security',
    //   subMenu: [
    //     {
    //       display: 'sideNavMenu.role_function',
    //       link: '/admin/security/role',
    //       linkPage: false,
    //       onclick: null,
    //       urlEndWith: 'role',
    //       className: '',
    //       permissionLevel: 'Role',
    //       icon: <FilterListIcon />,
    //       eventKey: 'role',
    //     },
    //   ],
    // },
    {
      // Divider Area
    },
    // {
    //   display: 'sideNavMenu.setting',
    //   link: '/admin/setting',
    //   linkPage: false,
    //   onclick: null,
    //   urlEndWith: 'setting',
    //   className: '',
    //   permissionLevel: '',
    //   icon: <SettingsIcon />,
    //   eventKey: 'setting',
    //   subMenu: [],
    // },
  ];
}
export default SideBarMenu;
