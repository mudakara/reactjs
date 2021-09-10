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
  const[components,setComponents] = useState([]);

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

  const checkComponentPermission = (componentId,from) =>
  {
    debugger;
    var appRoles = JSON.parse( localStorage.getItem('appComponentPermission')) ?? [];
    var componetRole = appRoles.filter((e)=>e.componentId == componentId);
    if(componetRole.length > 0){
        return componetRole[0].roles.filter((ele)=>{return ele === from}).length > 0 ? true : false;
    }
     return false;
  }

  const getComponentList =()=>{
        debugger;
    const component = [
        {
            id:1,
            name:"Weekly earnings",
            retailerPermission: checkComponentPermission("1","retailer"),
            distributorPermission : checkComponentPermission("1","distributor"),
            supplierPermission:checkComponentPermission("1","supplier"),
        },
        {
            id:2,
            name:"Your private wallet",
            retailerPermission: checkComponentPermission("2","retailer"),
            distributorPermission : checkComponentPermission("2","distributor"),
            supplierPermission:checkComponentPermission("2","supplier"),
        },
        {
            id:3,
            name:"Component 3",
            retailerPermission: checkComponentPermission("3","retailer"),
            distributorPermission : checkComponentPermission("3","distributor"),
            supplierPermission:checkComponentPermission("3","supplier"),
        }
    ]
        setComponents(component)
    }

  const getUsers =  () => {
    const users = [
        {
          id: '1',
          avatar: '/static/mock-images/avatars/avatar-jane_rotanson.png',
          email: 'retailer@demo.com',
          name: 'Retailer',
          password: 'password',
          plan: 'Premium',
          retailerPermission: checkPermission("1",'retailer'),
          distributorPermission : checkPermission("1",'distributor'),
          supplierPermission:checkPermission("1",'supplier')
        },
        {
          id: '2',
          avatar: '/static/mock-images/avatars/avatar-jane_rotanson.png',
          email: 'distributor@demo.com',
          name: 'Distributor',
          password: 'password',
          plan: 'Premium',
          retailerPermission: checkPermission("2",'retailer'),
          distributorPermission : checkPermission("2",'distributor'),
          supplierPermission:checkPermission("2",'supplier')
        },
        {
          id: '3',
          avatar: '/static/mock-images/avatars/avatar-jane_rotanson.png',
          email: 'supplier@demo.com',
          name: 'Supplier',
          password: 'password',
          plan: 'Premium',
          retailerPermission: checkPermission("3",'retailer'),
          distributorPermission : checkPermission("3",'distributor'),
          supplierPermission:checkPermission("3",'supplier')
        }
      ];
      setUsers(users);
    }
  useEffect(() => {
    getUsers();
    getComponentList();
  }, [refresh]);


  const onComponentPermissionChange =(event,componentId,from)=>{
    let hasChecked = event.target.checked;
    var compRoles = (localStorage.getItem('appComponentPermission') !== undefined && localStorage.getItem('appComponentPermission') !== null) ? JSON.parse(localStorage.getItem('appComponentPermission')) : [];
    if(compRoles!== undefined && Object.keys(compRoles).length > 0)
    {
        let exist = compRoles.filter((e)=>{ return e.componentId === componentId });

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
            compRoles.push({ componentId:componentId,roles:[from] });
        }
    }
    else
    {
        compRoles = [{ componentId:componentId,roles:[from]}]
    }
    localStorage.setItem('appComponentPermission', JSON.stringify(compRoles));

    setRefresh(!refresh);
    console.log('Permission changed')
  }


  const onPermissionChange =(event,userId,from)=>{
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
    

    <Box sx={{ mt: 3 }}> </Box>

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
                    Component 
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
                {components.map((cmp) => {
                  return (
                    <TableRow
                      hover
                      key={cmp.id}
                      selected={false}
                    >
                       <TableCell>
                          {cmp.name}
                      </TableCell>
                      
                      <TableCell>
                      <Checkbox
                          checked={cmp.retailerPermission}
                          color="primary"
                          onChange={(event) => onComponentPermissionChange(event, cmp.id,'retailer')}
                          value={cmp.retailerPermission}
                        />
                      </TableCell>
                      <TableCell>
                      <Checkbox
                          checked={cmp.distributorPermission}
                          color="primary"
                          onChange={(event) => onComponentPermissionChange(event, cmp.id,'distributor')}
                          value={cmp.distributorPermission}
                        />
                      </TableCell>
                      <TableCell>
                      <Checkbox
                          checked={cmp.supplierPermission}
                          color="primary"
                          onChange={(event) => onComponentPermissionChange(event, cmp.id,'supplier')}
                          value={cmp.supplierPermission}
                        />
                      </TableCell>
                      <TableCell>&nbsp;</TableCell>
                      <TableCell>&nbsp;</TableCell>
                      <TableCell>&nbsp;</TableCell>
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
