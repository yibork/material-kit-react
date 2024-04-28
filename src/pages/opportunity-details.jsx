import React from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Container, Typography, Grid, Paper, Divider, IconButton, Card, CardContent, Avatar
} from '@mui/material';
import { ArrowBack, Business, LocationOn, Schedule, Description } from '@mui/icons-material';
import { opportunities } from 'src/_mock/opportunity';

export default function OpportunityDetailsPage() {
  const { id } = useParams();
  const selectedOpportunity = opportunities.find(opportunity => opportunity.id === parseInt(id, 10));

  if (!selectedOpportunity) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" gutterBottom>Opportunity Not Found</Typography>
        <Typography variant="subtitle1">We couldn't find the opportunity with ID {id}. Please check other opportunities.</Typography>
        <Link to="/opportunities">Back to Opportunities</Link>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Grid container spacing={3} alignItems="start">
        <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <IconButton component={Link} to="/opportunities" color="primary" aria-label="return">
            <ArrowBack />
          </IconButton>
          <Typography variant="h4" sx={{ ml: 1 }}>{selectedOpportunity.title}</Typography>
        </Grid>
        <Grid item md={8} xs={12}>
          <Card elevation={3} sx={{ p: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom><Business color="primary" /> Company</Typography>
              <Typography variant="body1">{selectedOpportunity.company}</Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" gutterBottom><LocationOn color="primary" /> Location</Typography>
              <Typography variant="body1">{selectedOpportunity.location}</Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" gutterBottom><Description color="primary" /> Description</Typography>
              <Typography variant="body2">{selectedOpportunity.description}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={4} xs={12}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56, mb: 2 }}>
              <Schedule />
            </Avatar>
            <Typography variant="subtitle1" gutterBottom>Details</Typography>
            <Typography variant="body1"><strong>Posted:</strong> {selectedOpportunity.postedDate}</Typography>
            <Typography variant="body1"><strong>Start:</strong> {selectedOpportunity.startTime}</Typography>
            <Typography variant="body1"><strong>End:</strong> {selectedOpportunity.endTime}</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
