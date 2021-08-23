import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    
  },
  image_part: {
    width: "100%"
  },
  link_group: {
    width: '100%',
    margin: '30px 0',
    borderBottom: '2px solid ' + theme.palette.primary.main
  },
  image_group: {
    width: '100%',
    margin: '30px 0',
  },
  link_btn: {
    width: "100%",
    marginBottom: 10
  },
  social_link: {
    margin: '0 5px'
  },
  btn_link: {
    marginBottom: 10,

    '& a' : {
      width: '100%'
    },
    
    '& button': {
      width: '100%'
    }
  },
  special_text: {
    fontWeight: 'bold',
    fontStyle: 'italic',
    textAlign: 'center'
  },
  totalcompanies: {
    textTransform: 'none'
  },
  title: {
    fontWeight: 'bold'
  }
}));

const links = [
  { text: 'For Startups and Scaleups', link: '#' },
  { text: 'For Investors', link: '#' },
  { text: 'For Researchers and Press', link: '#' },
];

function Home() {
  const classes = useStyles();
  const [totalCompanies, setTotalCompanies] = useState();
  const [totalSought, setTotalSought] = useState();

  useEffect(() => {
    axios.get(`https://sone-api.azure-api.net/fi-api/companies/totals`)
      .then(res => {
        console.log('res', res);
        setTotalCompanies(res.data.totalcompanies);
        setTotalSought(res.data.totalsought);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <Typography variant="h4" gutterBottom color={'primary'}>
            Welcome to Funding Index
          </Typography>
          <Box mb={3} pb={3}>
            <Typography variant="body1">
              For too long no-one in the UK has known the national picture of investment demand from our greatest companies. No longer.
            </Typography>
          </Box>
          <Box mb={3} pb={3} style={{ textAlign: 'center' }}>
            {/* <Typography variant="body1" mb={2} className={classes.special_text}>
              "Finally, you can access up-to-date information on unquoted UK-wided company funding needs in one place..."
            </Typography> */}
            <Button variant="outlined" color="primary" href={'/claim-your-startup'}>
              Claim your business
            </Button>
          </Box>
          <Box mb={3} pb={3}>
            <Typography variant="body1" mb={2}>
              To fill that critical need, Funding Index offers a definitive and easy-to-search one-stop portal of UK funding needs.
            </Typography>
          </Box>                    
        </Grid>
        {/* <Grid item xs={12} md={3}>
          {
            links.map((item, index) => (
              <div key={index} className={classes.btn_link}>
                <Button variant="outlined" color="primary" href={item.link}>
                  {item.text}
                </Button>
              </div>
            ))
          }
        </Grid> */}
        <Grid item xs={12} md={2}>
          <Typography variant="body1" gutterBottom color={'primary'} className={classes.title}>
            Funding Sought Today
          </Typography>
          <div className={classes.btn_link}>
            <Button variant="contained" color="primary">
              £{totalSought}
            </Button>
          </div>
          <div className={classes.btn_link}>
            <Button variant="contained" color="primary" className={classes.totalcompanies}>
              {totalCompanies} Companies
            </Button>
          </div>
        </Grid>
      </Grid>
      <Grid item>
        <Box mt={3} >
          <Typography variant="body1" mb={2}>
            To fill that critical need, Funding Index offers a definitive and easy-to-search one-stop portal of UK funding needs.
          </Typography>
        </Box>        
      </Grid>
      {/* <div>
        <Typography variant="h6" gutterBottom color={'primary'}>
          Sponsors
        </Typography>
      </div>      */}
    </div>
  )
}

export default Home
