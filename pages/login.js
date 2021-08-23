import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiButton-label':{
      fontSize: '1rem'
    }

  },
  title:{
    fontWeight: 700
  }
}));

function Login() {
  const classes = useStyles();
  
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={10}>
          <Typography variant="h5" className={classes.title} gutterBottom color={'primary'}>
            Sign In to claim your business
          </Typography>
          <Box my={2} >
            <Typography variant="body2">
              Please sign-in using your Google Accounts confirm who you are
            </Typography>
          </Box>
          <Box my={3} textAlign="center">
            <Button variant="outlined" color="primary" href={'/api/auth/signin'}>
              Sign in with Google
            </Button>
          </Box>
          <Box my={3} width="250px" textAlign="center" margin="0 auto">
            <Button variant="outlined" color="text" href={'/'}>
              Back to Company Search
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={2}></Grid>
      </Grid>
    </div>
  )
}

export default Login