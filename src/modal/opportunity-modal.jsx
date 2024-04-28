import React, { useState } from 'react';
import { Modal, Box, Typography, Button, TextField, Stack, FormControlLabel, Switch, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import { fadeIn } from './animations'; // Ensure you import the animations from the correct path

const StyledModal = styled(Modal)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '1rem',
  animation: `${fadeIn} 0.3s ease-out`
}));

const ModalBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(4),
  maxWidth: '500px',
  maxHeight: '90vh',
  width: '100%',
  margin: '0 auto',
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[5],
  overflowY: 'auto',
  '&:focus-visible': {
    outline: 'none',
  },
  animation: `${fadeIn} 0.5s ease`
}));

export default function OpportunityModal({ open, handleClose, onSave }) {
  const theme = useTheme();
  const [opportunity, setOpportunity] = useState({
    title: '',
    company: '',
    location: '',
    type: 'Full-time',
    description: '',
    postedDate: '',
    startTime: '',
    endTime: '',
  });
  const [excelFile, setExcelFile] = useState(null);

  const handleChange = (event) => {
    setOpportunity({ ...opportunity, [event.target.name]: event.target.value });
  };

  const handleTypeChange = (event) => {
    setOpportunity({ ...opportunity, type: event.target.checked ? 'Full-time' : 'Part-time' });
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setExcelFile(file);
    // Reset form fields
    setOpportunity({
      title: '',
      company: '',
      location: '',
      type: 'Full-time',
      description: '',
      postedDate: '',
      startTime: '',
      endTime: '',
    });
  };

  const handleSubmit = () => {
    if (!validateForm() && !excelFile) {
      alert('Please fill all required fields.');
      return;
    }
    console.log(opportunity);
    handleClose();
    if (onSave) onSave(opportunity);
  };

  const validateForm = () => {
    return (
      opportunity.title !== '' &&
      opportunity.company !== '' &&
      opportunity.location !== '' &&
      opportunity.description !== '' &&
      opportunity.postedDate !== '' &&
      opportunity.startTime !== '' &&
      opportunity.endTime !== ''
    );
  };

  return (
    <StyledModal
      open={open}
      onClose={() => {
        handleClose();
      }}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      closeAfterTransition
    >
      <ModalBox>
        <Typography id="modal-title" variant="h6" component="h2" mb={3} color={theme.palette.primary.main}>
          Add New Opportunity
        </Typography>
        
        {/* Show either form or file upload section based on the state */}
        {!excelFile ? (
          <Stack spacing={2}>
            <TextField
              fullWidth
              name="title"
              label="Title"
              value={opportunity.title}
              onChange={handleChange}
              placeholder="Enter the opportunity title"
            />
            <TextField
              fullWidth
              name="company"
              label="Company"
              value={opportunity.company}
              onChange={handleChange}
              placeholder="Enter the company name"
            />
            <TextField
              fullWidth
              name="location"
              label="Location"
              value={opportunity.location}
              onChange={handleChange}
              placeholder="Enter the location"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={opportunity.type === 'Full-time'}
                  onChange={handleTypeChange}
                  name="type"
                />
              }
              label={opportunity.type}
            />
            <TextField
              fullWidth
              name="description"
              label="Description"
              value={opportunity.description}
              onChange={handleChange}
              placeholder="Enter the job description"
              multiline
              rows={4}
            />
            <TextField
              fullWidth
              name="postedDate"
              label="Posted Date"
              type="date"
              value={opportunity.postedDate}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
            <Stack direction="row" spacing={2}>
              <TextField
                fullWidth
                name="startTime"
                label="Start Time"
                type="date"
                value={opportunity.startTime}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                fullWidth
                name="endTime"
                label="End Time"
                type="date"
                value={opportunity.endTime}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Stack>
          </Stack>
        ) : (
          <Stack spacing={2}>
            <Typography variant="body1">Uploaded file: {excelFile.name}</Typography>
            <Button variant="contained" color="primary" onClick={() => setExcelFile(null)}>
              Remove File
            </Button>
          </Stack>
        )}

        {/* Buttons section */}
        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2} mt={3}>
          <Button variant="outlined" color="inherit" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={!validateForm() && !excelFile}
          >
            Submit
          </Button>
        </Stack>
        
        {/* Instructions */}
        <Typography variant="subtitle1" align="center" sx={{ my: 2 }}>
          {excelFile ? 'File uploaded. Please submit to proceed.' : 'Upload an Excel file or fill in all the fields to submit.'}
        </Typography>
        
        {/* File upload button */}
        {!excelFile && (
          <Button variant="contained" component="label" fullWidth>
            Upload Excel
            <input
              type="file"
              hidden
              accept=".xlsx, .xls"
              onChange={handleFileUpload}
            />
          </Button>
        )}
      </ModalBox>
    </StyledModal>
  );
}
