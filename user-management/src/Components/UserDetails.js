import React, { useEffect } from 'react';
import { Container, Grid, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles'; 
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; 
import { fetchUserDetails } from '../Redux/userSlice';


const StyledPaper = styled(Paper)({
  padding: '16px',
  marginBottom: '16px',
});

const UserDetails = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const { userDetails, loading, error } = useSelector((state) => state.user);
  console.log(userDetails)

  useEffect(() => {
    dispatch(fetchUserDetails(userId)); 
  }, [dispatch,userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!userDetails) return null;

  console.log("userDetails",userDetails)

  return (
    <Container maxWidth="md">
      <StyledPaper elevation={3}>
        <Typography variant="h4" gutterBottom align="center">
            User Details
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">
              First Name: {userDetails?.firstName}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">
              Last Name: {userDetails?.lastName}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">
              Age: {userDetails?.age}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">
              Gender: {userDetails?.gender}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">
              Phone Number: {userDetails?.phone}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">
              Address: {userDetails?.address.address}
            </Typography>
          </Grid>
        </Grid>
      </StyledPaper>
    </Container>
  );
};

export default UserDetails;
