import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { useRouter } from 'next/router';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import Image from 'next/image';

const useStyles = makeStyles((theme) => ({
  formControl: {
    // margin: theme.spacing(1),
    minWidth: 120,
  },
  title: {
    fontWeight:600,
  },
  officerList: {
    paddingLeft: 20,
    margin: 0
  },
  warningContainer:{
    backgroundColor: '#fcdad4',
    padding:'8px 8px',
    margin: '0 -8px',
    '& p':{
      fontSize: '.875rem',
      fontWeight: 400,
      marginBottom: '1.5rem',
      '&:first-child':{
        fontWeight: 600,
      },
      '&:last-child':{
        marginBottom: '0.5rem'
      }
    }
    
  }
}));

const arrSectors = [
  { id: 1, label: 'Smart cities & Mobility'},
  { id: 2, label: 'AI & Data Science'},
  { id: 3, label: 'Internet of Things'},
  { id: 4, label: 'Energy, Climate & Cleantech'},
  { id: 5, label: 'Creative Design & Media Tech'},
  { id: 6, label: 'Robotics and Autonomy'},
  { id: 7, label: 'Digital Health & Medtech'},
  { id: 8, label: 'Satellites & Spacetech'},
  { id: 9, label: 'Fintech and Cybersecurity'},
  { id: 10, label: 'Robotics and Autonomy'},
  { id: 11, label: 'Medical (devices)'},
  { id: 12, label: 'Medical (drugs and treatments)'},
  { id: 13, label: 'Technology'},
  { id: 14, label: 'Engineering'},
  { id: 15, label: 'Life Sciences'},
  { id: 16, label: 'Manufacturing'},
  { id: 17, label: 'Agriculture'},
  { id: 18, label: 'Engineering'},
  { id: 19, label: 'Consumer and retail'},
  { id: 20, label: 'Food and Drink'},
  { id: 21, label: 'Lifestyle'},
  { id: 22, label: 'Property and Construction'},
  { id: 23, label: 'Apps, Games, VR'},
  { id: 24, label: 'Software'},
  { id: 25, label: 'Charitable and Not for Profit'},
  { id: 26, label: 'Education'},
  { id: 27, label: 'Financial Services'},
  { id: 100, label: 'Other'},
];

const arrFundingPurpose = [
  { id: 1, label: 'Product Development'},
  { id: 2, label: 'Staffing'},
  { id: 3, label: 'Expansion'},
  { id: 4, label: 'Operating Costs'},
  { id: 5, label: 'Research'},
  { id: 6, label: 'Premises'},
  { id: 7, label: 'Launch'},
  { id: 100, label: 'Other'},
];

const CompanyDetail = () => {
  const classes = useStyles();
  const router = useRouter()
  const {id} = router.query;
  const [step, setStep] = useState(-1);
  const [company, setCompany] = useState();
  const [formState, setFormState] = useState({});

  useEffect(() => {
    axios.get(`https://api.company-information.service.gov.uk/company/` + id, {headers: { Authorization: `Basic MjFiZWQ0YzctY2Y1MC00NjZjLTlhMTQtYjEzMGRmNTNjZmNhOg==`}})
      .then(res => {        
        setCompany(res.data);
        console.log('companyData', res.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleChange = (event) => {
    setFormState(formState => ({
      ...formState,
      [event.target.name]: event.target.value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if(step === 1){
      router.replace('/profile');
    }else{
      setStep(step+1);
    }
  }

  const handleStep = () => {
    if(step === 1){
      router.replace('/profile');
    }else{
      setStep(step+1);
    }
  }

  return (
    <div>
      <Typography variant="h5" gutterBottom color={'primary'} className={classes.title}>
        {
          step === 0 && 'Claim your business'
        }
        {
          step === 1 && 'Company Branding'
        }
        {
          step === -1 && 'Company Office Mismatch'
        }
      </Typography>
      <Typography variant="body2" gutterBottom>
        {
          step === -1 && 'We were unable to match your Google Account to one of the company officers.'
        }
        {
          (step === 0 || step === 1) && 'Please provide details of your funding needs.'
        }
      </Typography>

      {
        company && 
          <Grid container spacing={3}>
            
              <Grid item md={8}>
              <form onSubmit={handleSubmit}>
                <Box mt={2} >
                  <Grid container spacing={2}>
                    <Grid item md={12}>
                      <Typography variant="h6" >
                        Company
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        Trade Classics Limited - {company.company_number}
                      </Typography>  
                    </Grid>
                  </Grid>
                  {
                    step === 0 && (
                      <Grid container spacing={2}>
                        <Grid item md={12}>
                          <Typography variant="h6" >
                            Officer
                          </Typography>
                          <Typography variant="body1" gutterBottom>
                            Adam Purrier - adam@tradeclassics.com
                          </Typography>  
                        </Grid>
                      
                        <Grid item xs={12}>
                          <Typography variant="h6">
                            Sector
                          </Typography>
                          <FormControl variant="outlined" className={classes.formControl} fullWidth>
                            <Select
                              name='sector'
                              value={formState.sector}
                              onChange={handleChange}
                              required
                            >
                              <MenuItem value="">
                                <em>None</em>
                              </MenuItem>
                              {
                                arrSectors.map(sector => <MenuItem value={sector.id} key={sector.id}>{sector.label}</MenuItem>)
                              }
                            </Select>
                          </FormControl> 
                        </Grid>
                      
                        <Grid item xs={12}>
                          <Typography variant="h6" gutterBottom>
                            Funding Sought
                          </Typography>
                          <FormControl  className={classes.formControl} variant="outlined">
                            <OutlinedInput
                              name="amount"
                              value={formState.amount}
                              required
                              onChange={handleChange}
                              type="number"
                              startAdornment={<InputAdornment position="start">£</InputAdornment>}
                            />
                          </FormControl>
                        </Grid>
                      
                        <Grid item xs={12}>
                          <Typography variant="h6" gutterBottom>
                            Funding Purpose
                          </Typography>
                          <FormControl variant="outlined" className={classes.formControl} fullWidth>
                            {/* <InputLabel >Sector</InputLabel> */}
                            <Select
                              name="purpose"
                              value={formState.purpose}
                              required
                              onChange={handleChange}
                            >
                              <MenuItem value="">
                                <em>None</em>
                              </MenuItem>
                              {
                                arrFundingPurpose.map((purpose) => 
                                  <MenuItem  value={purpose.id} key={purpose.id}>{purpose.label}</MenuItem>
                                )
                              }
                            </Select>
                          </FormControl>
                        </Grid>
                      </Grid>
                    )
                  }

                  {
                    step === 1 && (
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Typography variant="h6" gutterBottom>
                            Trading Name
                          </Typography>
                          <TextField
                            name='tradingName'
                            defaultValue={formState.tradingName}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                            required
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <Typography variant="h6" gutterBottom>
                            Website
                          </Typography>
                          <TextField
                            name='website'
                            defaultValue={formState.website}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                            required
                          />
                        </Grid>
                      
                        <Grid item xs={12}>
                          <Typography variant="h6" gutterBottom>
                            Logo
                          </Typography>
                          <FormControl variant="outlined" className={classes.formControl} fullWidth>
                            <Image src="/images/trade.png" alt="" width="100" height="100" /> 
                          </FormControl> 
                        </Grid>
                      
                        <Grid item xs={12}>
                        <Box display="flex" justifyContent="space-between">
                          <Button variant="outlined" color="primary" >
                            Delete
                          </Button>
                          <Button variant="outlined" color="primary" >
                            Upload
                          </Button>
                        </Box>
                        </Grid>
                      </Grid>
                    )
                  }

                  {
                    step === -1 && (
                      <Grid container spacing={2}>
                        <Grid item md={12}>
                          <Typography variant="h6" gutterBottom >
                            Officers
                          </Typography>
                          <ul className={classes.officerList}>
                            <li>
                              Adam Purrier
                            </li>
                            <li>
                              Kulraj Singh Salh
                            </li>
                          </ul>
                        </Grid>
                      
                        <Grid item xs={12}>
                          <Typography variant="h6" gutterBottom>
                            Sign-in As
                          </Typography>
                          <Typography variant="body1" gutterBottom>
                            Jonathan Greensted
                          </Typography>
                        </Grid>
                      
                        <Grid item xs={12}>
                        <Box className={classes.warningContainer}>
                          <Typography variant="body2" color="primary" gutterBottom>
                            Warning
                          </Typography>
                          <Typography variant="body2" gutterBottom>
                            There is no match between your profile and the officers of the company.
                          </Typography>
                          <Typography variant="body2" gutterBottom>
                            Only official offers of the business can register the company onto Funding Index.
                          </Typography>
                          <Typography variant="body2" gutterBottom>
                            Please ask one of the above officers to register the business.
                          </Typography>
                        </Box>
                        </Grid>
                      </Grid>
                    )
                  }
                  
                </Box>
                <Box display="flex" justifyContent="space-between" marginTop="24px">
                  {
                    step !== -1 && (
                      <Button variant="outlined" color="secondary" href={'/'} size="large" style={{fontWeight:400}}>
                        Cancel
                      </Button>
                    )
                  }
                  {
                    step === -1 && <Typography>&nbsp;</Typography>
                  }
                  
                  <Button variant="contained" color="primary" type="submit" size="large">
                    {
                      step === -1 && 'Back to Search'
                    }
                    {
                      step === 0 && 'Next Step >>'
                    }
                    {
                      step === 1 && 'Save Company'
                    }
                    
                  </Button>
                </Box>
              {/* </Grid>
              <Grid item xs={12} md={8}> */}
                </form>
              </Grid>
            
          </Grid>
      }      
    </div>
  );
};

export default CompanyDetail;

