import React, { useEffect, useState } from 'react';
import { useSession, getSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  custom_input: {
    width: '100%',
    '& .MuiOutlinedInput-input':{
      padding: 14
    }
  },
  search_btn: {
    // height: 56,
    width: '100%',
    '& .MuiButton-label':{
      padding: 3,
      fontSize: '1rem'
    }
  },
  company_item: {
    border: 'solid #808080 1px',
    borderRadius: 8,
    padding:'2px 5px',
    marginBottom:8,
    '& .title': {
      color: '#275ca0',
      fontSize: 16,
      fontWeight: 600
    },

    '& .description': {
      color: '#808080',
      fontSize: 14,
      fontWeight: 400
    },

    '& .address': {
      fontSize: 14,
      fontWeight: 600
    }
  },
  disable:{
    opacity:0.4
  },
  title:{
    fontWeight: 700
  }
}));

const ClaimStartUp = () => {
  const classes = useStyles();
  const router = useRouter()
  const [filteredCompanies, setFilteredCompanies] = useState();
  const [searchKey, setSearchKey] = useState('');
  const [inputError, setInputError] = useState(false);
  const [errorText, setErrorText] = useState('');

  const [session] = useSession();
  const user = session && session.user;

  const handleChange = (e) => {
    setSearchKey(e.target.value);
    setInputError(false);
    setErrorText('');
  }

  useEffect(() => {
    console.log('user', user);
    if (user === null) {
      window.location.href = '/login'
    }
  }, [user])

  const handleSearch = () => {
    if(!searchKey) {
      setInputError(true);
      setErrorText('Please input the company name or number');
      return;
    }

    axios.get(`https://api.company-information.service.gov.uk/search?q=` + searchKey, {headers: { Authorization: `Basic MjFiZWQ0YzctY2Y1MC00NjZjLTlhMTQtYjEzMGRmNTNjZmNhOg==`}})
      .then(res => {
        setFilteredCompanies(res.data.items);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleCompany = (company) =>{
    console.log('eeeee')
    if(!company.company_number){
      return;
    }
    router.replace("/companies/" + company.company_number);
  }

  return (
    <div>
      <Typography variant="h5" className={classes.title} gutterBottom color={'primary'}>
        Claim your StartUp
      </Typography>
      <Typography variant="body2" gutterBottom>
        Enter your company name or number and we'll look you up at Companies House.
      </Typography>
      <Box mt={2}>
        <Typography variant="h6" gutterBottom>
          Company Name / Number
        </Typography>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box mt={2}>
            <Grid container spacing={1}>
              <Grid item xs={8}>
                <TextField 
                  id="company-info" 
                  label="" 
                  variant="outlined" 
                  className={classes.custom_input} 
                  value={searchKey} 
                  onChange={handleChange}
                  error={inputError}
                  helperText={errorText}
                />
              </Grid>
              <Grid item xs={4}>
                <Button variant="contained" color="primary" className={classes.search_btn} onClick={handleSearch}>
                  Search
                </Button>
              </Grid>
            </Grid>
          </Box>
          <Box mt={2} pt={2}>
            {
              filteredCompanies && filteredCompanies.length > 0 ?
                filteredCompanies.map((company, index) => (
                  <Box key={index} className={!company.company_number ? clsx(classes.disable, classes.company_item) : classes.company_item} onClick={() => handleCompany(company)}>
                    
                      <Typography variant="h5" gutterBottom className="title">
                        {company.title}
                      </Typography>
                      <Typography variant="h5" gutterBottom className="description">
                        {company.description}
                      </Typography>
                      <Typography variant="h5" gutterBottom className="address">
                        {company.address_snippet}
                      </Typography>
                    
                      {/* <Button variant="outlined" color="primary" className={classes.search_btn} href={"/companies/" + company.company_number} disabled={!company.company_number}>
                        Claim
                      </Button> */}
                    
                  </Box>
                )) : 
                <Box >
                  <Typography variant="h5" gutterBottom color='primary'>
                    There is no matched company
                  </Typography>
                </Box>
            }            
          </Box>         
        </Grid>
        <Grid item md={4}>

        </Grid>
      </Grid>
      
    </div>
  );
};

export default ClaimStartUp;

export async function getServerSideProps(context) {
  const session = await getSession(context)
  return {
    props: { session }
  }
}
