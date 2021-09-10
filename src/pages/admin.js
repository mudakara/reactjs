/* eslint-disable */
import { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {  Breadcrumbs, Button, Container, Grid } from '@material-ui/core';

import gtm from '../lib/gtm';
import useSettings from '../hooks/useSettings';


import { Link as RouterLink } from 'react-router-dom';
import { format } from 'date-fns';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  CardHeader,
  Checkbox,
  Divider,
  IconButton,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@material-ui/core';
import ArrowRightIcon from '../icons/ArrowRight';
import PencilAltIcon from '../icons/PencilAlt';
import { TrendingUpRounded } from '@material-ui/icons';


const admin = () => {

  const { settings } = useSettings();

  const[users,setUsers] = useState([]);
  const[refresh,setRefresh] = useState(false);

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const checkPermission =(userId,from)=>{
    debugger;
    var appRoles = JSON.parse( localStorage.getItem('approles')) ?? [];
    var userRole = appRoles.filter((e)=>e.userId == userId);
    if(userRole.length > 0){
        return userRole[0].roles.filter((ele)=>{return ele === from}).length > 0 ? true : false;
    }
     return false;
  }

  const getUsers =  () => {
    const users = [
        {
          id: '1',
          avatar: '/static/mock-images/avatars/avatar-jane_rotanson.png',
          email: 'user1@demo.com',
          name: 'User One',
          password: 'password',
          plan: 'Premium',
          retailerPermission: checkPermission("1",'retailer'),
          distributorPermission : checkPermission("1",'distributor'),
          supplierPermission:checkPermission("1",'supplier')
        },
        {
          id: '2',
          avatar: '/static/mock-images/avatars/avatar-jane_rotanson.png',
          email: 'user2@demo.com',
          name: 'User Two',
          password: 'password',
          plan: 'Premium',
          retailerPermission: checkPermission("2",'retailer'),
          distributorPermission : checkPermission("2",'distributor'),
          supplierPermission:checkPermission("2",'supplier')
        },
        {
          id: '3',
          avatar: '/static/mock-images/avatars/avatar-jane_rotanson.png',
          email: 'user3@demo.com',
          name: 'User Three',
          password: 'password',
          plan: 'Premium',
          retailerPermission: checkPermission("3",'retailer'),
          distributorPermission : checkPermission("3",'distributor'),
          supplierPermission:checkPermission("3",'supplier')
        },
        {
          id: '4',
          avatar: '/static/mock-images/avatars/avatar-jane_rotanson.png',
          email: 'user4@demo.com',
          name: 'User Four',
          password: 'password',
          plan: 'Premium',
          retailerPermission: checkPermission("4",'retailer'),
          distributorPermission : checkPermission("4",'distributor'),
          supplierPermission:checkPermission("4",'supplier')
        }
      ];
      setUsers(users);
    }
  useEffect(() => {
    getUsers();
  }, [refresh]);

  const onPermissionChange =(event,userId,from)=>{
     debugger;
    let hasChecked = event.target.checked;
    var appRoles = (localStorage.getItem('approles') !== undefined && localStorage.getItem('approles') !== null) ? JSON.parse(localStorage.getItem('approles')) : [];
    if(appRoles!== undefined && Object.keys(appRoles).length > 0)
    {
        let exist = appRoles.filter((e)=>{ return e.userId === userId });

        if(exist.length > 0)
        {
            var roles = exist[0].roles ?? [];
            if(hasChecked)
            {
                roles.push(from);
            }
            else
            {
                exist[0].roles = exist[0].roles.filter(ele=>{return ele !== from})
            }
        }
        else
        {
            appRoles.push({ userId:userId,roles:[from] });
        }
    }
    else
    {
        appRoles = [{ userId:userId,roles:[from] }]
    }
    localStorage.setItem('approles', JSON.stringify(appRoles));

    setRefresh(!refresh);
    console.log('Permission changed')
  }

  return (
    <>
      <Helmet>
        <title>Permission</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 8
        }}
      >
        <Container maxWidth={settings.compact ? 'xl' : false}>
          <Grid
            container
            justifyContent="space-between"
            spacing={3}
          >
          </Grid>
          <Box sx={{ mt: 3 }}>
          <Card>
        
        <Divider />
       
          <Box sx={{ minWidth: 1150 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    Email 
                  </TableCell>
                  <TableCell>
                    User Name
                  </TableCell>
                  <TableCell>
                    Retail
                  </TableCell>
                  <TableCell>
                    Distributor
                  </TableCell>
                  <TableCell>
                    Supplier
                  </TableCell>
                 </TableRow>
              </TableHead>
              <TableBody>
                {users.map((usr) => {
                  return (
                    <TableRow
                      hover
                      key={usr.id}
                      selected={false}
                    >
                       <TableCell>
                          {usr.email}
                      </TableCell>
                      <TableCell>
                          {usr.name}
                      </TableCell>
                      <TableCell>
                      <Checkbox
                          checked={usr.retailerPermission}
                          color="primary"
                          onChange={(event) => onPermissionChange(event, usr.id,'retailer')}
                          value={usr.retailerPermission}
                        />
                      </TableCell>
                      <TableCell>
                      <Checkbox
                          checked={usr.distributorPermission}
                          color="primary"
                          onChange={(event) => onPermissionChange(event, usr.id,'distributor')}
                          value={usr.distributorPermission}
                        />
                      </TableCell>
                      <TableCell>
                      <Checkbox
                          checked={usr.supplierPermission}
                          color="primary"
                          onChange={(event) => onPermissionChange(event, usr.id,'supplier')}
                          value={usr.supplierPermission}
                        />
                      </TableCell>
                      <TableCell>&nbsp;</TableCell>
                      <TableCell>&nbsp;</TableCell>
                      <TableCell>&nbsp;</TableCell>
                      <TableCell>&nbsp;</TableCell>
                      <TableCell>&nbsp;</TableCell>
                      <TableCell>&nbsp;</TableCell>
                     </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Box>
      </Card>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default admin;
