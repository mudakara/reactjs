/* eslint-disable */
import React from 'react'
import { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';


import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Link,
  Typography,
} from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ReceiptIcon from '@material-ui/icons/Receipt';
import useAuth from '../../hooks/useAuth';
import BriefcaseIcon from '../../icons/Briefcase';
import CalendarIcon from '../../icons/Calendar';
import ChartPieIcon from '../../icons/ChartPie';
import ChartSquareBarIcon from '../../icons/ChartSquareBar';
import ChatAltIcon from '../../icons/ChatAlt';
import ClipboardListIcon from '../../icons/ClipboardList';
import FolderOpenIcon from '../../icons/FolderOpen';
import MailIcon from '../../icons/Mail';
import ShareIcon from '../../icons/Share';
import ShoppingBagIcon from '../../icons/ShoppingBag';
import ShoppingCartIcon from '../../icons/ShoppingCart';
import UserIcon from '../../icons/User';
import UsersIcon from '../../icons/Users';
import Logo from '../Logo';
import NavSection from '../NavSection';
import Scrollbar from '../Scrollbar';

const menuItems = [
  {
    title: 'Portal',
    path: '/dashboard',
    icon: 'ChartSquareBarIcon',
    parentName: 'General',
    children: null,
    usertype: ['retail'],
  },
  {
    title: 'Analytics',
    path: '/dashboard/analytics',
    icon: 'ChartPieIcon',
    parentName: 'General',
    children: null,
    usertype: ['retail', 'supplier'],
  },
  {
    title: 'Finance',
    path: '/dashboard/finance',
    icon: 'ShoppingBagIcon',
    parentName: 'General',
    children: null,
    usertype: ['distributor'],
  },
  {
    title: 'Products',
    path: '/dashboard/products',
    icon: 'ShoppingCartIcon',
    parentName: 'Management',
    children: null,
    usertype: ['retail'],
  },
  {
    title: 'Orders',
    path: '/dashboard/orders',
    icon: 'FolderOpenIcon',
    parentName: 'Management',
    children: null,
    usertype: ['retail', 'distributor'],
  },
  {
    title: 'Customers',
    path: '/dashboard/customers',
    icon: 'UsersIcon',
    parentName: 'Management',
    children: null,
    usertype: ['distributor'],
  },
  {
    title: 'Invoices',
    path: '/dashboard/invoices',
    icon: 'ReceiptIcon',
    parentName: 'Management',
    children: null,
    usertype: ['distributor'],
  },
  {
    title: 'Social',
    path: '/dashboard/social',
    icon: 'ShareIcon',
    parentName: 'Platforms',
    children: null,
    usertype: ['supplier'],
  },
  {
    title: 'Execute',
    path: '/dashboard/Execute',
    icon: 'ShoppingCartIcon',
    parentName: 'Management',
    children: null,
    usertype: ['supplier'],
  },
  {
    title: 'Recaps',
    path: '/dashboard/Recaps',
    icon: 'FolderOpenIcon',
    parentName: 'Management',
    children: null,
    usertype: ['supplier'],
  },
  {
    title: 'Export',
    path: '/dashboard/Export',
    icon: 'ShoppingCartIcon',
    parentName: 'Management',
    children: [],
    usertype: ['supplier'],
  },
  {
    title: 'Media',
    path: '/dashboard/Media',
    icon: 'FolderOpenIcon',
    parentName: 'Management',
    children: null,
    usertype: ['supplier'],
  },
  {
    title: 'Chat',
    path: '/dashboard/Chat',
    icon: 'FolderOpenIcon',
    parentName: 'Apps',
    children: null,
    usertype: ['supplier'],
  },
];

const DashboardSidebar = (props) => {
  const { onMobileClose, openMobile } = props;
  const location = useLocation();
  const { user } = useAuth();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));

  const [sections, setSections] = useState([]);

  const generateSection = () => {
    debugger;
    const userId = user.id;
    const section = [];
    let userRoles = [];

    if(user.email === 'admin@demo.com')
    {
      userRoles =  ['retail', 'supplier', 'distributor'];
    }
    else
    {
      const savedRoles = (localStorage.getItem('approles') !== undefined && localStorage.getItem('approles') !== null) ? JSON.parse(localStorage.getItem('approles')) : [];
      if(savedRoles.filter(e=>{return e.userId === userId}).length > 0)
      {
        userRoles = savedRoles.filter(e=>{return e.userId === userId})[0].roles ?? [];
      }
    }

    let menuGeneral = [];
    let menuManagement = [];
    let menuPlatform = [];

    userRoles.forEach((role) => {
      menuItems.filter((itm) => {return itm.usertype.indexOf(role)>-1})
        .forEach((ele) => {
          if (ele.parentName === 'General') {

            if(menuGeneral.filter((itm)=>{ return itm.title=== ele.title}).length==0)
            {
              menuGeneral.push({
                title: ele.title,
                path: ele.path,
                icon: React.createElement(ele.icon,{fontSize:"small"}) ,
              });
            }
           } else if (ele.parentName === 'Management') {
            if(menuManagement.filter((itm)=>{ return itm.title=== ele.title}).length==0)
            {
              menuManagement.push({
                title: ele.title,
                path: ele.path,
                icon: React.createElement(ele.icon,{fontSize:"small"}),
              });
            }            
          } else if (ele.parentName === 'Platforms') {
            if(menuPlatform.filter((itm)=>{return itm.title=== ele.title}).length==0)
            {
              menuPlatform.push({
                title: ele.title,
                path: ele.path,
                icon: React.createElement(ele.icon,{fontSize:"small"}),
              });
            }
           }
        });
    });

    if (menuGeneral.length > 0)
      section.push({ title: 'General', items: menuGeneral });
    if (menuManagement.length > 0)
      section.push({ title: 'Management', items: menuManagement });
    if (menuPlatform.length > 0)
      section.push({ title: 'Platforms', items: menuPlatform });

    if (user.email === 'admin@demo.com') {
      section.push({
        title: 'Settings',
        items: [
          {
            title: 'Settings',
            path: '/dashboard/admin',
            icon: React.createElement('ChartSquareBarIcon',{fontSize:"small"}),
          },
        ],
      });
    }

    setSections(section);
  };

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  useEffect(() => {
    generateSection();
  }, []);

  

  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <Scrollbar options={{ suppressScrollX: true }}>
        <Box
          sx={{
            display: {
              lg: 'none',
              xs: 'flex',
            },
            justifyContent: 'center',
            p: 2,
          }}
        >
          <RouterLink to="/">
            <Logo
              sx={{
                height: 40,
                width: 40,
              }}
            />
          </RouterLink>
        </Box>
        <Box sx={{ p: 2 }}>
          <Box
            sx={{
              alignItems: 'center',
              backgroundColor: 'background.default',
              borderRadius: 1,
              display: 'flex',
              overflow: 'hidden',
              p: 2,
            }}
          >
            <RouterLink to="/dashboard/account">
              <Avatar
                src={user.avatar}
                sx={{
                  cursor: 'pointer',
                  height: 48,
                  width: 48,
                }}
              />
            </RouterLink>
            <Box sx={{ ml: 2 }}>
              <Typography color="textPrimary" variant="subtitle2">
                {user.name}
              </Typography>
              <Typography color="textSecondary" variant="body2">
                Your plan:{' '}
                <Link color="primary" component={RouterLink} to="/pricing">
                  {user.plan}
                </Link>
              </Typography>
            </Box>
          </Box>
        </Box>
        <Divider />
        <Box sx={{ p: 2 }}>
          {sections.map((section) => (
            <NavSection
              key={section.title}
              pathname={location.pathname}
              sx={{
                '& + &': {
                  mt: 3,
                },
              }}
              {...section}
            />
          ))}
        </Box>
      </Scrollbar>
    </Box>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: 'background.paper',
            height: 'calc(100% - 64px) !important',
            top: '64px !Important',
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onMobileClose}
      open={openMobile}
      PaperProps={{
        sx: {
          backgroundColor: 'background.paper',
          width: 280,
        },
      }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

export default DashboardSidebar;
