import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Header from '../components/header';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TwitterIcon from '@material-ui/icons/Twitter';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
      minHeight: "100vh",
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      
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
    content: {
        maxWidth: 1440,
        margin: '0 auto',
        padding: theme.spacing(2),
        '& h5':{
          fontSize:'1.125rem'
        },
        '& h6':{
          fontSize:'1rem'
        },
        '& body2':{
          fontSize:'.875rem'
        }
    },
    footer: {
      backgroundColor: theme.palette.primary.main,
      width: '100%',
      padding: 30,

      [theme.breakpoints.down('sm')]: {
        padding: "8px 16px",
      },

      "& p": {
        color: 'white',
        fontSize:'.75rem'
      },

      "& h3": {
        color: 'white',
        margin: 0
      },

      '& h6':{
        fontSize:'.875rem',
        fontWeight: 600
      },
    },
    footer_inner: {
      width: '100%',
      margin: 0
    },
    footer_image: {
      width: '100%'
    },
    right_part: {
      width: '100%',
      margin: 0
    },
    footer_logo: {
      display: 'flex',
      alignItems: 'center',

      "& img": {
        width: 100,
        marginRight: 10
      }
    },
    link_group: {

      "& h6": {
        color: 'white'
      },

      "& ul": {
        padding: 0,
        listStyle: 'none',

        '& li': {
          marginBottom: 15,

          '& a': {
            color: 'white',
            fontSize: 16,
            textDecoration: 'none'
          }
        }
      }
    },
    foot_border: {
      width: 100,
      borderBottom: '2px solid white',
      margin: '30px 0 20px'
    },
    footer_socialLink: {
      margin: '0 3px',
      padding:0,
      color: theme.palette.background.default
    },
    footer_socialLinks: {
      display:'flex',
      alignItems:'flex-end'
    }
}));

const footerSocialLinks = [
  {icon: <FacebookIcon style={{ fontSize: 34 }}/>, link: 'https://www.facebook.com/'},
  {icon: <TwitterIcon style={{ fontSize: 34 }}/>, link: 'https://twitter.com/'},
  {icon: <LinkedInIcon style={{ fontSize: 34 }}/>, link: 'https://www.linkedin.com/'}  
];

function Layout({children}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div>
        <Header />
        <div className={classes.content}>
          {children}
        </div>
      </div>              
      <div className={classes.footer}>
        <Grid container spacing={3} className={classes.footer_inner}>            
          <Grid container spacing={0} className={classes.link_group}>
            <Grid item xs={8} md={8} >              
              <Typography variant="h6" gutterBottom>
                Funding Index
              </Typography>
              <Typography variant="body1">
                © Funding Index. All Rights Reserved
              </Typography>    
              <Typography variant="body1">
                UK Registered XXXXX
              </Typography>    
            </Grid>
            <Grid item xs={4} md={4} className={classes.footer_socialLinks}>
              {
                footerSocialLinks.map((item, index) => (
                  <IconButton edge="start" href={item.link} className={classes.footer_socialLink} key={index}>
                      {item.icon}
                  </IconButton>
                ))
              }
            </Grid>
          </Grid>            
        </Grid>
      </div>
    </div>
  );
}

export default Layout

