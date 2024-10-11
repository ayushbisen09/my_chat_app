import { useState, useCallback } from 'react';

import {
  Box,
  Card,
  Chip,
  Table,
  Button,
  Divider,
  Tooltip,
  TableRow,
  MenuList,
  MenuItem,
  TableBody,
  TableCell,
  CardHeader,
  IconButton,
  Typography,
  TableContainer,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { usePopover, CustomPopover } from 'src/components/custom-popover';
import {
  useTable,
  emptyRows,
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
} from 'src/components/table';

import { WebhookDialog } from '../../hook/add-webhook';

const TABLE_HEAD = [
  {
    id: 'webhoon_name',
    label: 'Webhook Name & Event',
    width: 358,
    tooltip: 'Webhook Name & Event',
  },
  { id: 'text', label: 'Webhook URL', width: 742, tooltip: 'Webhook URL' },
  { id: 'type', label: '', width: 200 },
  { id: 'actions', label: '', width: 50 },
];

const SAMPLE_DATA = [
  {
    id: 1,
    webhook_name: 'Webhook Name',
    event: 'New Workflow Error',
    webhook_url:
      'http://54.186.67.24/workflow/sendwebhookdata/Ijsfsrgdtgmsg;msrgmsedm:ESAm:AEfmdffdfd',
    type: 'Image',
    status: 'Active',
  },
  {
    id: 2,
    webhook_name: 'Webhook Name fgfgffgfg ghghghgh hhghdhrt tydr dr',
    event: 'New Workflow Error sdsdsdsd sdsdsdsdsds sdsdsdsds',
    webhook_url: 'http://54.186.67.24/workflow/sendwebhookdata/Ijsfsrgdtgmsg;msrgmsedm:ESAm:AEfm',
    type: 'Image',
    status: 'Inactive',
  },
  {
    id: 3,
    webhook_name: 'Webhook Name',
    event: 'New Workflow Error',
    webhook_url: 'http://54.186.67.24/workflow/sendwebhookdata/Ijsfsrgdtgmsg;msrgmsedm:ESAm:AEfm',
    type: 'Image',
    status: 'Active',
  },
  {
    id: 4,
    webhook_name: 'Webhook Name',
    event: 'New Workflow Error',
    webhook_url: 'http://54.186.67.24/workflow/sendwebhookdata/Ijsfsrgdtgmsg;msrgmsedm:ESAm:AEfm',
    type: 'Image',
    status: 'Inactive',
  },
  {
    id: 5,
    webhook_name: 'Webhook Name',
    event: 'New Workflow Error',
    webhook_url: 'http://54.186.67.24/workflow/sendwebhookdata/Ijsfsrgdtgmsg;msrgmsedm:ESAm:AEfm',
    type: 'Image',
    status: 'Inactive',
  },
  {
    id: 6,
    webhook_name: 'Webhook Name',
    event: 'New Workflow Error',
    webhook_url: 'http://54.186.67.24/workflow/sendwebhookdata/Ijsfsrgdtgmsg;msrgmsedm:ESAm:AEfm',
    type: 'Image',
    status: 'Inactive',
  },
];

const truncateText = (text, maxLength = 37) =>
  text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;

const truncateUrl = (url, maxLength = 78) =>
  url.length > maxLength ? `${url.substring(0, maxLength)}...` : url;

export function ApiWebhookTable() {
  const [filters, setFilters] = useState({
    name: '',
  });

  const [selectedRow, setSelectedRow] = useState(null);
  const [tableData, setTableData] = useState(SAMPLE_DATA);
  const dialog = useBoolean();
  const confirmDelete = useBoolean();
  const confirmStatus = useBoolean();
  const [statusToToggle, setStatusToToggle] = useState('');

  const table = useTable();
  const popover = usePopover();

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

  const dataFiltered = tableData.filter((item) =>
    item.webhook_name.toLowerCase().includes(filters.name.toLowerCase())
  );

  const handleEdit = () => {
    console.log('Edit', selectedRow);
    popover.onClose();
  };

  const handleDelete = () => {
    setTableData((prevData) => prevData.filter((item) => item.id !== selectedRow.id));
    confirmDelete.onFalse();
  };

  const handleStatusToggle = (newStatus) => {
    setStatusToToggle(newStatus);
    confirmStatus.onTrue();
  };

  const handleConfirmStatusChange = () => {
    setTableData((prevData) =>
      prevData.map((item) =>
        item.id === selectedRow.id ? { ...item, status: statusToToggle } : item
      )
    );
    confirmStatus.onFalse();
    popover.onClose();
  };

  return (
    <Card sx={{ mt: 3 }}>
      <CardHeader title="Webhooks" sx={{ mb: 2 }} />

      <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
        <Scrollbar>
          <Table size={table.dense ? 'small' : 'medium'}>
            <TableHeadCustom
            showCheckbox={false}
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
                  <TableRow
                    key={row.id}
                    hover
                    sx={{
                      '&:hover': {
                        backgroundColor: 'action.hover',
                        cursor: 'pointer',
                      },
                    }}
                  >
                    
                    <TableCell>
                      <Box>
                        <Tooltip arrow placement="top" title={row.status} disableInteractive>
                          <Chip
                            variant="soft"
                            label={row.status}
                            color={row.status === 'Active' ? 'success' : 'error'}
                            size="small"
                            sx={{ mb: 1 }}
                          />
                        </Tooltip>
                        <Typography variant="body2">
                          <Tooltip
                            arrow
                            placement="top"
                            title={row.webhook_name}
                            disableInteractive
                          >
                            <span>{truncateText(`${row.webhook_name}`)}</span>
                          </Tooltip>
                        </Typography>

                        <Tooltip arrow placement="top" title={row.event} disableInteractive>
                          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                            {truncateText(`${row.event}`)}
                          </Typography>
                        </Tooltip>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Tooltip title={row.webhook_url} arrow placement="top" disableInteractive>
                        <span>{truncateUrl(row.webhook_url)}</span>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <Tooltip title=" Test Webhook" arrow placement="top" disableInteractive>
                        <Button variant="outlined" color="primary">
                          Test Webhook
                        </Button>
                      </Tooltip>
                    </TableCell>
                    <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
                      <IconButton
                        color={popover.open ? 'inherit' : 'default'}
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
      <Box sx={{ mb: '24px' }} />
      <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        slotProps={{ arrow: { placement: 'right-top' } }}
      >
        <MenuList>
          <Tooltip title="Edit this Webhook." arrow placement="left">
            <MenuItem onClick={dialog.onTrue}>
              <Iconify icon="solar:pen-bold" />
              Edit Webhook
            </MenuItem>
          </Tooltip>

          {selectedRow && selectedRow.status === 'Active' ? (
            <Tooltip title="Click to set status to Inactive" arrow placement="left">
              <MenuItem
                onClick={() => {
                  handleStatusToggle('Inactive');
                }}
              >
                <Iconify icon="line-md:switch-off-filled-to-switch-filled-transition" />
                Inactive
              </MenuItem>
            </Tooltip>
          ) : (
            <Tooltip title="Click to set status to Active" arrow placement="left">
              <MenuItem
                onClick={() => {
                  handleStatusToggle('Active');
                }}
              >
                <Iconify icon="line-md:switch-filled-to-switch-off-filled-transition" />
                Active
              </MenuItem>
            </Tooltip>
          )}

          <Divider sx={{ borderStyle: 'dashed' }} />
          <Tooltip title="Remove this Webhook." arrow placement="left">
            <MenuItem
              onClick={() => {
                confirmDelete.onTrue();
                popover.onClose();
              }}
              sx={{ color: 'error.main' }}
            >
              <Iconify icon="solar:trash-bin-trash-bold" />
              Remove
            </MenuItem>
          </Tooltip>
        </MenuList>
      </CustomPopover>
      <WebhookDialog open={dialog.value} onClose={dialog.onFalse} />
      <ConfirmDialog
        open={confirmDelete.value}
        onClose={confirmDelete.onFalse}
        title="Delete"
        content="Are you sure you want to remove this Webhook?"
        action={
          <Button variant="contained" color="error" onClick={handleDelete}>
            Delete
          </Button>
        }
      />
      <ConfirmDialog
        open={confirmStatus.value}
        onClose={confirmStatus.onFalse}
        title="Change Status"
        content={`Are you sure you want to mark this Webhook as ${statusToToggle}?`}
        action={
          <Button variant="contained" color="inherit" onClick={handleConfirmStatusChange}>
            Yes
          </Button>
        }
      />
    </Card>
  );
}
