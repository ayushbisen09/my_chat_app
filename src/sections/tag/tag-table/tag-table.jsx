import 'react-modal-video/css/modal-video.min.css';

import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { useTheme } from '@mui/material/styles';
import { Table, Alert, Button, Tooltip, Divider, Snackbar, TableBody, IconButton, CardHeader } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useSetState } from 'src/hooks/use-set-state';

// import { fIsAfter, fIsBetween } from 'src/utils/format-time';

import { _tags } from 'src/_mock/_tags';

import { Label } from 'src/components/label';
import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import {
  useTable,
  emptyRows,
  rowInPage,
  TableNoData,
  getComparator,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from 'src/components/table';

import { TagTableRow } from './tag-table-row';
import { TagTableFilter } from './tag-table-filter';
import { TagTableToolbar } from './tag-table-toolbar';

const TABLE_HEAD = [
  { id: 'name', label: 'Name', width: 700, tooltip: 'Tag Names' },
  { id: 'fristmessage', label: 'First Message', width: 700, tooltip: 'This is the first message' },
  {
    id: 'sharedon',
    label: 'Shared On',
    width: 200,
    tooltip: 'This is the time when tag is shared with the user',
  },
  { id: '', label: '', width: 100 },
];

export default function TagTable({ sx, icon, title, total, color = 'warning' }) {
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State for Snackbar

  const theme = useTheme();

  const table = useTable({ defaultOrderBy: 'tags' });

  const router = useRouter();

  // const confirm = useBoolean();

  const [tableData, setTableData] = useState(_tags);

  const filters = useSetState({
    name: '',
    status: 'all',
    startDate: null,
    endDate: null,
  });

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters: filters.state,
  });

  const dataInPage = rowInPage(dataFiltered, table.page, table.rowsPerPage);

  const canReset =
    !!filters.state.name ||
    filters.state.status !== 'all' ||
    (!!filters.state.startDate && !!filters.state.endDate);

  const handleDeleteRow = useCallback(
    (id) => {
      const deleteRow = tableData.filter((row) => row.id !== id);

      toast.success('Contact Removed Successfully!');

      setTableData(deleteRow);

      table.onUpdatePageDeleteRow(dataInPage.length);
    },
    [dataInPage.length, table, tableData]
  );

  const handleViewRow = useCallback(
    (id) => {
      router.push(paths.dashboard.order.details(id));
    },
    [router]
  );
  const [confirm, setConfirm] = useState({ value: false });

  const handleDelete = () => {
    // Handle delete logic here
    setSnackbarOpen(true); // Set Snackbar to open on delete
    console.log('Tag deleted');
    setConfirm({ value: false });
  };

  

  const handleSnackbarClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <>
      {/* Table */}
      <Card
        sx={{
          boxShadow: '0px 12px 24px -4px rgba(145, 158, 171, 0.2)',

          mt: '24px',
        }}
      >
        <CardHeader
          title={
            <Box sx={{ typography: 'subtitle2', fontSize: '18px', fontWeight: 600 }}>Tags</Box>
          }
          action={total && <Label color={color}>{total}</Label>}
          sx={{
            p: 3,
          }}
        />
        <Divider />

        <TagTableToolbar filters={filters} onResetPage={table.onResetPage} />

        {canReset && (
          <TagTableFilter
            filters={filters}
            totalResults={dataFiltered.length}
            onResetPage={table.onResetPage}
            sx={{ p: 2.5, pt: 0 }}
          />
        )}

        <Box sx={{ position: 'relative' }}>
          <TableSelectedAction
            dense={table.dense}
            numSelected={table.selected.length}
            rowCount={dataFiltered.length}
            onSelectAllRows={(checked) =>
              table.onSelectAllRows(
                checked,
                dataFiltered.map((row) => row.id)
              )
            }
            action={
              <Tooltip title="Delete">
                <IconButton color="primary" onClick={() => setConfirm({ value: true })}>
                  <Iconify icon="solar:trash-bin-trash-bold" />
                </IconButton>
              </Tooltip>
            }
          />
          <ConfirmDialog
            open={confirm.value}
            onClose={() => setConfirm({ value: false })} // Closes the ConfirmDialog
            title="Delete"
            content="Are you sure you want to delete the all the tags? "
            action={
              <Button variant="contained" color="error" onClick={handleDelete}>
                Delete
              </Button>
            }
          />

<Snackbar
        open={snackbarOpen}
        autoHideDuration={10000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        sx={{
          boxShadow: '0px 8px 16px 0px rgba(145, 158, 171, 0.16)',
        }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{
            width: '100%',
            fontSize: '14px',
            fontWeight: 'bold',
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
          }}
        >
          All tags Deleted Successfully!
        </Alert>
      </Snackbar>


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
                .map((row, index) => (
                  <TagTableRow
                    key={row.id}
                    row={row}
                    selected={table.selected.includes(row.id)}
                    onSelectRow={() => table.onSelectRow(row.id)}
                    onDeleteRow={() => handleDeleteRow(row.id)}
                    onViewRow={() => handleViewRow(row.id)}
                    tagIndex={table.page * table.rowsPerPage + index}
                  />
                ))}

              <TableEmptyRows
                height={table.dense ? 56 : 56 + 20}
                emptyRows={emptyRows(table.page, table.rowsPerPage, dataFiltered.length)}
              />

              <TableNoData />
            </TableBody>
          </Table>
        </Box>

        <TablePaginationCustom
          page={table.page}
          dense={table.dense}
          count={dataFiltered.length}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          onChangeDense={table.onChangeDense}
          onRowsPerPageChange={table.onChangeRowsPerPage}
        />
      </Card>
    </>
  );
}
function applyFilter({ inputData, comparator, filters }) {
  const { status, name } = filters;
  console.log(inputData);
  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (name) {
    inputData = inputData.filter(
      (order) => order.tags.toLowerCase().indexOf(name.toLowerCase()) !== -1
    );
  }

  if (status !== 'all') {
    inputData = inputData.filter((order) => order.status === status);
  }

  return inputData;
}
