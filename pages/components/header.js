import React, { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/client';
import Link from 'next/link'
import Image from 'next/image'
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import LockIcon from '@material-ui/icons/Lock';
import ApartmentIcon from '@material-ui/icons/Apartment';
import EmailIcon from '@material-ui/icons/Email';
import DescriptionIcon from '@material-ui/icons/Description';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    "& .contact-part": {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '15px 0',
        borderTop: '3px solid ' + theme.palette.primary.main,
        borderBottom: '3px solid ' + theme.palette.primary.main,
        maxWidth: 1440,
        margin: '0 auto 30px',
  
        "& .form-part": {
          display: 'flex',
          alignItems: 'center',
          paddingLeft: 15,
  
          "& .MuiFormControl-root": {
            margin: '0 20px',
            minWidth: 300
          }
        },
        [theme.breakpoints.down('sm')]: {
          flexDirection: 'column',
    
          "& .form-part": {
            "& h6": {
              display: 'none'
            },
    
            "& .MuiFormControl-root": {
              margin: '0 20px 0 0 !important',
              minWidth: "200px !important",
              width: "150px !important"
            }
          },
        },
    }, 
  },
  appbar: {
      backgroundColor: 'white',
      height: 66
  },
  button_link: {
      marginRight: 10,
      [theme.breakpoints.down('sm')]: {
          display: 'none'
      },
  },
  toolbar: {
      position: 'relative',
      [theme.breakpoints.down('sm')]: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
      }
  },
  left_menu: {
      position: 'absolute',
      top: 67,
      left: 0,
      backgroundColor: theme.palette.primary.main,
      padding: 15,
      zIndex: 2,
      minWidth: 280,

      "& p": {
          maxWidth: 235,
          margin: "0 auto",
          fontWeight: 700,
          textAlign: 'center',
          fontStyle: 'italic'
      }
  },
  menu_item: {
      marginTop: 15,
      position: 'relative',

      "& .MuiButton-label":{
        fontSize:'1rem'
      },

      "& a": {
          width: '100%',
          backgroundColor: 'white',
          color: theme.palette.primary.main,
      },

      "& svg": {
        fontSize:'1.75rem !important',
        position: 'absolute',
        top: 5,
        right: 7,
        color: theme.palette.primary.main
      }
  },
  right_menu: {
      position: 'absolute',
      top: 67,
      right: 0,
      backgroundColor: theme.palette.primary.main,
      padding: 15,
      zIndex: 2,
      minWidth: 280,

      "& p": {
          maxWidth: 220,
          margin: "0 auto",
          fontWeight: 700,
          textAlign: 'center',
          fontStyle: 'italic'
      }
  },
  content: {
      maxWidth: 1440,
      margin: '0 auto',
      padding: '50px 20px;'
  },
  logo: {
      flexGrow: 1,
      display: 'flex',
      alignItems: 'center',
      marginLeft: 20,
      cursor: 'pointer',

      [theme.breakpoints.down('sm')]: {
          flexGrow: 0,
      },
  },
  iconButton:{
    padding:'16px 12px'
  }
}));

const linkGroups = [
  {title: 'Business Resources', link: '/resources' },
  {title: 'Contact Us', link: '/contact-us' },
  {title: 'Claim your Startup', link: '/claim-your-startup' }
]

const leftMenus = [
  {title: 'Claim my business', link: '/claim-your-startup', icon: <SearchIcon />},
  {title: 'View my businesses', link: '/investors', icon: <AccountBalanceIcon />},
  {title: 'Contact Us', link: '/contact-us', icon: <EmailIcon />},
];

const unAuthedRightMenus = [
  {title: 'Register / Profile', link: '/profile', icon: <AccountCircle />},
  {title: 'Sign In / Sign Out', link: '/login', icon: <ExitToAppIcon />},
  {title: 'Privacy and Security', link: '/privacy-security', icon: <LockIcon />},
];

const authedRightMenus = [
  {title: 'Register / Profile', link: '/profile', icon: <AccountCircle />},
  {title: 'Privacy and Security', link: '/privacy-security', icon: <LockIcon />},
  {title: 'Sign Out', link: '/api/auth/signout', icon: <ExitToAppIcon />},
]

const useOnClickOutside = (ref, handler, exceptional) => {
  useEffect(
    () => {
      const listener = event => {
        if (!ref.current || ref.current.contains(event.target) || exceptional.current.contains(event.target) ) {
          return;
        }

        handler(event);
      };

      document.addEventListener('mousedown', listener);
      document.addEventListener('touchstart', listener);

      return () => {
        document.removeEventListener('mousedown', listener);
        document.removeEventListener('touchstart', listener);
      };
    },
    
    [ref, handler, exceptional]
  );
}

const Header = () => {
  const classes = useStyles();
  const [session, loading] = useSession();
  const user = session && session.user;

  const leftMenuRef = useRef();
  const leftMenuExceptional = useRef();
  const rightMenuRef = useRef();
  const rightMenuExceptional = useRef();
  // or a ref setter function
  const logoRef = React.createRef()
  
  const [showLeftMenu, setShowLeftMenu] = useState(false);
  const [showRightMenu, setShowRightMenu] = useState(false);

  useOnClickOutside(leftMenuRef, () => setShowLeftMenu(false), leftMenuExceptional);
  useOnClickOutside(rightMenuRef, () => setShowRightMenu(false), rightMenuExceptional);

  const toggleLeftMenu = () => {
    setShowLeftMenu(!showLeftMenu);
  }

  const toggleRightMenu = () => {
    setShowRightMenu(!showRightMenu);
  }

  return (
    <AppBar position="static"  className={classes.appbar}>
      <Toolbar  className={classes.toolbar}>
        <IconButton edge="start" aria-label="menu" onClick={() => toggleLeftMenu()} ref={leftMenuExceptional}>
          <MenuIcon fontSize={'large'} color={showLeftMenu ? 'primary' : 'secondary'}/>
        </IconButton>
        {
          showLeftMenu &&
            <div className={classes.left_menu} ref={leftMenuRef}>
              <p>Painting the National Picture of Company Funding Needs</p>
              {
                leftMenus.map(item => (
                  <div className={classes.menu_item} key={item.title}>
                    <Button
                      variant="contained"
                      endIcon={item.icon}
                      href={item.link}                                                               
                    >
                      {item.title}                                            
                    </Button>                                        
                  </div>                                
                ))   
              }
            </div>
        }
        <div className={classes.logo}>
          <Link href="/" >
            <Image src="/images/mobile-logo.png" alt="" width="50" height="50" />
          </Link>
        </div>            
        {
          linkGroups.map(item => (
            <Button                            
              color="primary"                          
              href={item.link}
              key={item.title}
              className={classes.button_link}
            >
              {item.title}
            </Button>
          ))
        }            
        <IconButton
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"                    
          color={showRightMenu ? 'primary' : 'secondary'}
          onClick={() => toggleRightMenu()}
          ref={rightMenuExceptional}
          className={classes.iconButton}
        >
          {
            session ? <Avatar alt="Remy Sharp" src={user.image} /> : <AccountCircle fontSize={'large'}/> 
          }          
        </IconButton>
        {
          showRightMenu &&
            <div className={classes.right_menu} ref={rightMenuRef}>
              <p>Painting the National Picture of Company Funding Needs</p>
              {!session && unAuthedRightMenus.map(item => (
                  <div className={classes.menu_item} key={item.title}>
                    <Button
                      variant="contained"
                      endIcon={item.icon}
                      href={item.link}                                                               
                    >
                      {item.title}
                    </Button>
                  </div>                                
                ))}
               {session && authedRightMenus.map(item => (
                  <div className={classes.menu_item} key={item.title}>
                    <Button
                      variant="contained"
                      endIcon={item.icon}
                      href={item.link}                                                               
                    >
                      {item.title}
                    </Button>
                  </div>                                
                ))}              
            </div>
        }
      </Toolbar>
    </AppBar>
  )
}

export default Header;
