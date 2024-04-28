import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Typography, Button, Card, Stack, Table, TableBody, TableContainer, TablePagination, TableRow, IconButton, Checkbox, TableCell, TextField, MenuItem } from '@mui/material';
import { opportunities } from 'src/_mock/opportunity';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import UserTableToolbar from '../opportunity-table-toolbar'; // Importing the modified toolbar component
import OpportunityTableRow from '../opportunity-table-row'; // Importing the renamed row component
import OpportunityTableHead from '../opportunity-table-head'; // Importing the renamed head component
import TableEmptyRows from '../table-empty-rows';
import TableNoData from '../table-no-data';
import OpportunityModal from '../../../modal/opportunity-modal';

export default function OpportunityPage() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('title');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filters, setFilters] = useState({});

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };
  

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = opportunities.map((n) => n.title);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, title) => {
    const selectedIndex = selected.indexOf(title);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, title);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const dataFiltered = opportunities.filter((opportunity) =>
    opportunity.title.toLowerCase().includes(filterName)
  );

  const filteredOpportunities = opportunities.filter((opportunity) =>
  Object.entries(filters).every(([key, value]) =>
    value ? opportunity[key].toLowerCase().includes(value.toLowerCase()) : true
  )
);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, filteredOpportunities.length - page * rowsPerPage);

  const notFound = !dataFiltered.length && !!filterName;

  const handleSort = (property) => (event) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Opportunities</Typography>
        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
          New Opportunity
        </Button>
      </Stack>

      <Card>
        <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
          filters={filters}
          setFilters={setFilters}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <OpportunityTableHead
                order={order}
                orderBy={orderBy}
                rowCount={opportunities.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'title', label: 'Title' },
                  { id: 'profile', label: 'Profile' },
                  { id: 'company', label: 'Company' },
                  { id: 'location', label: 'Location' },
                  { id: 'startTime', label: 'Start Time' },
                  { id: 'endTime', label: 'End Time' },
                  { id: 'type', label: 'Type' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {filteredOpportunities
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <OpportunityTableRow
                      id={row.id}
                      key={row.id}
                      title={row.title}
                      companyLogoUrl={row.companyLogoUrl}
                      companyName={row.company}
                      location={row.location}
                      type={row.type}
                      status={row.status}
                      startTime={row.startTime}
                      endTime={row.endTime}
                      selected={selected.includes(row.title)}
                      profile={row.profile}
                      handleClick={(event) => handleClick(event, row.title)}
                    />
                  ))}

                {emptyRows > 0 && <TableEmptyRows colSpan={8} emptyRows={emptyRows} />}

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredOpportunities.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
      <OpportunityModal />
    </Container>
  );
}
