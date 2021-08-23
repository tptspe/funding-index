import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSession, getSession } from 'next-auth/client';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Image from 'next/image';

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(9),
    height: theme.spacing(9),
  },
  flex_item: {
    display: 'flex',
    marginTop: '1rem',

    '& .nameArea': {
      marginLeft: theme.spacing(3),
      marginTop: theme.spacing(1),
    }
  },
  custom_box: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(2),
    '& button': {
      width: '100%'
    }
  },
  title: {
    fontWeight:700,
  },
  buttonOutline:{
    minWidth: '100px'
  },
  divider:{
    margin: `0 -${theme.spacing(2)}px`,
    borderColor: '#E6E6E6'
  },
  companies:{
    height:150,
    overflow: 'scroll',
    '& .logo div': {
      marginLeft: `${theme.spacing(2)}px !important`
    }
  }
}));

const ProfilePage = () => {
  const classes = useStyles();
  // const [ session ] = useSession();
  // const user = session && session.user;

  return (
    <div>
      <div>
        {/* <Avatar alt="Remy Sharp" src={user && user.image} />
        <div>          
          <p>{user.name}</p>
          <p>{user.email}</p>
        </div> */}
        <Typography variant="h5" gutterBottom color={'primary'} className={classes.title}>
          Profile
        </Typography>
        <div className={classes.flex_item}>
          <Avatar alt="" src={'/images/user.png'} className={classes.large}/>
          <div className="nameArea">
            <Typography variant="h6"  >
              Jonathan Greensted
            </Typography>
            <Typography variant="body1" gutterBottom >
              jonathan@greensted.com
            </Typography>
          </div>
        </div>
        <Box my={3}>
          <Typography variant="body1">
            Lorem ipsum dolor sit amet, consectetur adipsicing elit. IN et prottitor diam.
          </Typography>
        </Box>
        <Box my={1} className={classes.custom_box}>
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <Button variant="outlined" color="primary" className={classes.buttonOutline}>
                Edit Profile
              </Button>    
            </Grid>
            <Grid item xs={4}>
              <Button variant="outlined" color="primary" className={classes.buttonOutline}>
                Preferences
              </Button>        
            </Grid>
            <Grid item xs={4}>
              <Button variant="contained" color="primary">
                Add Business
              </Button>
            </Grid>
          </Grid>
        </Box>
        <hr className={classes.divider} />

        <Box my={2}>
          <Typography variant="h5" gutterBottom color={'primary'} className={classes.title}>
            Companies
          </Typography>
        </Box>
        <Box>
          <Grid container spacing={2} className={classes.companies}>
            <Grid item xs={7} className="logo">
              <Image src="/images/trade.png" alt="" width="155" height="40" /> 
            </Grid>
            <Grid item xs={5}>
              <Button variant="outlined" color="primary" className={classes.buttonOutline}>
                Edit Company
              </Button> 
            </Grid>
            <Grid item xs={7} className="logo">
              <Image src="/images/trade.png" alt="" width="155" quality="100" height="40" /> 
            </Grid>
            <Grid item xs={5}>
              <Button variant="outlined" color="primary" className={classes.buttonOutline}>
                Edit Company
              </Button> 
            </Grid>
            
          </Grid>
        </Box>
        

        <Box marginTop="16px">
          <Typography variant="body2" color="primary" className={classes.title}>
            Sponsors
          </Typography>
          <Grid container spacing={1} >
            <Grid item xs={5} style={{marginLeft:16}}>
              <Image src="/images/gannons.png" alt="" width="160" height="80" layout="responsive" quality="100" /> 
            </Grid>
            <Grid item xs={6} >
              <Image src="/images/research.png" alt="" width="110" height="40" layout="responsive" quality="100"/> 
            </Grid>
          </Grid>
        </Box>
      </div> 
     
        

     
    </div>
  );
};

export default ProfilePage;

// export async function getServerSideProps(context) {
//   const session = await getSession(context)
//   return {
//     props: { session }
//   }
// }
