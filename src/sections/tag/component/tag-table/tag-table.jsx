import { useState, useCallback } from 'react';

import {
  Box,
  Card,
  Table,
  Button,
  Divider,
  TableRow,
  Checkbox,
  MenuItem,
  MenuList,
  TableBody,
  TableCell,
  TextField,
  CardHeader,
  IconButton,
  Typography,
  TableContainer,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { usePopover, CustomPopover } from 'src/components/custom-popover';
import {
  useTable,
  emptyRows,
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TablePaginationCustom,
} from 'src/components/table';

const TABLE_HEAD = [
  { id: 'name', label: 'Name', width: 440 },
  { id: 'tagAssignWhen', label: 'Tag assign when', width: 440 },
  { id: 'sharedOn', label: 'Shared on', width: 440 },
  { id: 'actions', label: '', width: 30 },
];

// Sample data
const SAMPLE_DATA = [
  {
    id: 1,
    name: 'Purchase',
    tagAssignWhen: 'Want to purchase',
    sharedOn: 'Jan 19, 2024\n08:23:31',
  },
  {
    id: 2,
    name: 'Pabbly Connect',
    tagAssignWhen: 'Want to purchase Pabbly Connect',
    sharedOn: 'Jan 19, 2024\n08:23:31',
  },
  {
    id: 3,
    name: 'Employee',
    tagAssignWhen: 'Do you want to join as an employee',
    sharedOn: 'Jan 19, 2024\n08:23:31',
  },
  {
    id: 4,
    name: 'Pabbly Subscription Billing',
    tagAssignWhen: 'Want to purchase Pabbly Subscription Billing',
    sharedOn: 'Jan 19, 2024\n08:23:31',
  },
  {
    id: 5,
    name: 'Pabbly Form Builder',
    tagAssignWhen: 'Want to purchase Pabbly Form Builder',
    sharedOn: 'Jan 19, 2024\n08:23:31',
  },
  { id: 6, name: 'Support', tagAssignWhen: 'I need support', sharedOn: 'Jan 19, 2024\n08:23:31' },
  { id: 7, name: 'Sales', tagAssignWhen: 'Manage sales data', sharedOn: 'Jan 19, 2024\n08:23:31' },
];

export function Tagtable() {
  const [filters, setFilters] = useState({
    name: '',
  });

  const table = useTable();
  
  const popover = usePopover();
  
  const [selectedRow, setSelectedRow] = useState(null);  // Added this state to manage selected row

  const handleFilterName = useCallback(
    (event) => {
      table.onResetPage();
      setFilters((prevState) => ({
        ...prevState,
        name: event.target.value,
      }));
    },
    [table]
  );

  const dataFiltered = SAMPLE_DATA.filter((item) =>
    item.name.toLowerCase().includes(filters.name.toLowerCase())
  );

  return (
    <Card>
      <CardHeader
        title="Tags"
        sx={{
          mb: 2,
        }}
      />
      <Divider />

      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <TextField
          value={filters.name}
          onChange={handleFilterName}
          placeholder="Search by name..."
          sx={{ width: '100%' }}
          InputProps={{
            startAdornment: (
              <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', mr: 1 }} />
            ),
          }}
        />
        <Button
          variant="outlined"
          sx={{
            border: 'none',
            color: 'inherit',
          }}
          startIcon={<Iconify icon="solar:filter-bold" />}
        >
          Filters
        </Button>
      </Box>

      <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
        <Scrollbar>
          <Table size={table.dense ? 'small' : 'medium'}>
            <TableHeadCustom
              order={table.order}
              orderBy={table.orderBy}
              headLabel={TABLE_HEAD}
              rowCount={dataFiltered.length}
              numSelected={table.selected.length}
              onSort={table.onSort}
              onSelectAllRows={(checked) =>
                table.onSelectAllRows(
                  checked,
                  dataFiltered.map((row) => row.id)
                )
              }
            />

            <TableBody>
              {dataFiltered
                .slice(
                  table.page * table.rowsPerPage,
                  table.page * table.rowsPerPage + table.rowsPerPage
                )
                .map((row) => (
                  <TableRow key={row.id}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={table.selected.includes(row.id)}
                        onChange={() => table.onSelectRow(row.id)}
                      />
                    </TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.tagAssignWhen}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="body2">{row.sharedOn.split('\n')[0]}</Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                          {row.sharedOn.split('\n')[1]}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        onClick={(event) => {
                          setSelectedRow(row);
                          popover.onOpen(event);
                        }}
                      >
                        <Iconify icon="eva:more-vertical-fill" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              <TableEmptyRows
                height={table.dense ? 52 : 72}
                emptyRows={emptyRows(table.page, table.rowsPerPage, dataFiltered.length)}
              />

              <TableNoData notFound={!dataFiltered.length} />
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>

      <TablePaginationCustom
        count={dataFiltered.length}
        page={table.page}
        rowsPerPage={table.rowsPerPage}
        onPageChange={table.onChangePage}
        onRowsPerPageChange={table.onChangeRowsPerPage}
        dense={table.dense}
        onChangeDense={table.onChangeDense}
      />
      <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        slotProps={{ arrow: { placement: 'right-top' } }}
      >
 <MenuList>
          <MenuItem
            onClick={() => {
              // Add your confirm logic here
              popover.onClose();
            }}
            sx={{ color: 'error.main' }}
          >
            <Iconify icon="solar:trash-bin-trash-bold" />
            Remove
          </MenuItem>
        </MenuList>
      </CustomPopover>
    </Card>
  );
}
