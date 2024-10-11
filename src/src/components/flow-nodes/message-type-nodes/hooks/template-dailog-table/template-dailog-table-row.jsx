import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';

import { useBoolean } from 'src/hooks/use-boolean';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { usePopover } from 'src/components/custom-popover';

import { PreviewTempalteDailog } from './template-preview-dailog/template-preview-dailog';
import { TextTemplateTypeDialog } from '../template-type-dialogs/text-template-type-dialog';
import { FileTemplateTypeDialog } from '../template-type-dialogs/file-template-type-dialog';
import { AudioTemplateTypeDialog } from '../template-type-dialogs/audio-template-type-dialog';
import { VideoTemplateTypeDialog } from '../template-type-dialogs/video-template-type-dialog';
import { ImageTemplateTypeDialog } from '../template-type-dialogs/image-template-type-dialog';

const templatename = [
  'Classic Layout',
  'Creative Portfolio',
  'Elegant Presentation',
  'Professional Report',
  'Educational Content',
];

const templatetype = ['Text', 'File', 'Audio', 'Video', 'Image'];

export function ChooseTemplateDialogTableRow({ row, selected, onDeleteRow, TemplateIndex }) {
  const confirm = useBoolean();
  const collapse = useBoolean();
  const popover = usePopover();

  const [openPreviewDialog, setOpenPreviewDialog] = useState(false);
  const [openTextTemplateDialog, setOpenTextTemplateDialog] = useState(false);
  const [openFileTemplateDialog, setOpenFileTemplateDialog] = useState(false);
  const [openAudioTemplateDialog, setOpenAudioTemplateDialog] = useState(false);
  const [openVideoTemplateDialog, setOpenVideoTemplateDialog] = useState(false);
  const [openImageTemplateDialog, setOpenImageTemplateDialog] = useState(false);

  const handleOpenPreviewDialog = (event) => {
    event.stopPropagation(); // Prevents the TableRow click handler from firing
    setOpenPreviewDialog(true);
  };

  const handleClosePreviewDialog = () => {
    setOpenPreviewDialog(false);
  };

  const handleOpenTextTemplateDialog = () => {
    if (templatetype[TemplateIndex % templatetype.length] === 'Text') {
      setOpenTextTemplateDialog(true);
    } else if (templatetype[TemplateIndex % templatetype.length] === 'File') {
      setOpenFileTemplateDialog(true);
    } else if (templatetype[TemplateIndex % templatetype.length] === 'Audio') {
      setOpenAudioTemplateDialog(true);
    } else if (templatetype[TemplateIndex % templatetype.length] === 'Video') {
      setOpenVideoTemplateDialog(true);
    } else if (templatetype[TemplateIndex % templatetype.length] === 'Image') {
      setOpenImageTemplateDialog(true);
    }
  };

  const handleCloseTextTemplateDialog = () => {
    setOpenTextTemplateDialog(false);
  };

  const handleCloseFileTemplateDialog = () => {
    setOpenFileTemplateDialog(false);
  };

  const handleCloseAudioTemplateDialog = () => {
    setOpenAudioTemplateDialog(false);
  };

  const handleCloseVideoTemplateDialog = () => {
    setOpenVideoTemplateDialog(false); // Correct state update for closing Video dialog
  };

  const handleCloseImageTemplateDialog = () => {
    setOpenImageTemplateDialog(false);
  };

  const handleTableRowClick = () => {
    handleOpenTextTemplateDialog();
  };

  const renderPrimary = (
    <TableRow
      hover
      selected={selected}
      onClick={handleTableRowClick} // Opens TextTemplateTypeDialog or FileTemplateTypeDialog
      style={{ cursor: 'pointer' }}
    >
      <TableCell width={200}>
        <Stack spacing={2} direction="row" alignItems="center">
          <Stack
            sx={{
              typography: 'body2',
              flex: '1 1 auto',
              alignItems: 'flex-start',
            }}
          >
            <Box
              component="span"
              sx={{
                display: 'inline-block',
                maxWidth: '300px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {templatename[TemplateIndex % templatename.length]}
            </Box>
          </Stack>
        </Stack>
      </TableCell>
      <TableCell width={110}>
        <Label
          variant="soft"
          color={
            (row.status === 'approved' && 'success') ||
            (row.status === 'rejected' && 'error') ||
            'success'
          }
        >
          {row.status}
        </Label>
      </TableCell>
      <TableCell width={288}>
        <Stack spacing={2} direction="row" alignItems="center">
          <Stack
            sx={{
              typography: 'body2',
              flex: '1 1 auto',
              alignItems: 'flex-start',
            }}
          >
            <Box
              component="span"
              sx={{
                display: 'inline-block',
                maxWidth: '200px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {templatetype[TemplateIndex % templatetype.length]}
            </Box>
          </Stack>
        </Stack>
      </TableCell>
      <TableCell width={288}>
        <Stack spacing={2} direction="row" alignItems="center">
          <Stack
            sx={{
              typography: 'body2',
              flex: '1 1 auto',
              alignItems: 'flex-start',
            }}
          >
            <Box component="span">09 Aug 2024</Box>
            <Box component="span" sx={{ color: 'text.disabled' }}>
              11:01 am
            </Box>
          </Stack>
        </Stack>
      </TableCell>

      <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
        <IconButton onClick={handleOpenPreviewDialog}>
          {' '}
          {/* Opens PreviewTempalteDailog */}
          <Iconify icon="solar:eye-bold" />
        </IconButton>
      </TableCell>
    </TableRow>
  );

  return (
    <>
      {renderPrimary}

      <PreviewTempalteDailog
        open={openPreviewDialog}
        onClose={handleClosePreviewDialog}
        row={row}
      />

      <TextTemplateTypeDialog
        open={openTextTemplateDialog}
        onClose={handleCloseTextTemplateDialog}
      />

      <FileTemplateTypeDialog
        open={openFileTemplateDialog}
        onClose={handleCloseFileTemplateDialog}
      />

      <AudioTemplateTypeDialog
        open={openAudioTemplateDialog}
        onClose={handleCloseAudioTemplateDialog}
      />

      <VideoTemplateTypeDialog
        open={openVideoTemplateDialog}
        onClose={handleCloseVideoTemplateDialog} // Correct closing behavior
      />

      <ImageTemplateTypeDialog
        open={openImageTemplateDialog}
        onClose={handleCloseImageTemplateDialog} // Correct closing behavior
      />
    </>
  );
}
