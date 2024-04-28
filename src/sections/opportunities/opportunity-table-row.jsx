import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import {Stack ,Avatar, Checkbox, TableRow,TableCell,IconButton, Typography } from '@mui/material';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function OpportunityTableRow({
  id, // assuming an id prop is passed
  selected,
  title,
  companyLogoUrl,
  companyName,
  location,
  type,
  status,
  profile,
  startTime,
  endTime,
  handleClick,
}) {
  return (
    <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox disableRipple checked={selected} onChange={handleClick} />
      </TableCell>

      <TableCell component="th" scope="row" padding="none">
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar alt={companyName} src={companyLogoUrl} />
          <Typography variant="subtitle2" noWrap>
            {title}
          </Typography>
        </Stack>
      </TableCell>
      <TableCell>{profile}</TableCell>

      <TableCell>{companyName}</TableCell>
      <TableCell>{location}</TableCell>
      <TableCell>{startTime}</TableCell>
      <TableCell>{endTime}</TableCell>
      <TableCell align="center">{type}</TableCell>



      <TableCell align="right">
        <Link to={`/opportunities/${id}`}> {/* Updated link to include opportunity ID */}
          <IconButton>
            <Iconify icon="eva:eye-fill" />
          </IconButton>
        </Link>
      </TableCell>
    </TableRow>
  );
}

OpportunityTableRow.propTypes = {
  id: PropTypes.number.isRequired, // make sure to define and include id in propTypes
  selected: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  companyLogoUrl: PropTypes.string, // Assuming this is a URL string
  companyName: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  startTime: PropTypes.string.isRequired,
  endTime: PropTypes.string.isRequired,
  profile: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};
