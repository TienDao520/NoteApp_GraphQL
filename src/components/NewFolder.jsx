import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Tooltip,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { CreateNewFolderOutlined } from '@mui/icons-material';
import { addNewFolder } from '../utils/folderUtils';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function NewFolder() {
  const [newFolderName, setNewFolderName] = useState('');

  const [open, setOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  const popupName = searchParams.get('popup');

  const handleOpenPopup = () => {
    // setOpen(true);
    //set URL in search bar adding a param named popup=add-folder
    setSearchParams({ popup: 'add-folder' });
  };

  const handleClose = () => {
    // setOpen(false);

    setNewFolderName('');
    //when navigate back the url changed and the page will be updated.
    navigate(-1);
  };

  const handleNewFolderNameChange = (e) => {
    setNewFolderName(e.target.value);
  };

  const handleAddNewFolder = async () => {
    const { addFolder } = await addNewFolder({ name: newFolderName });
    console.log({ addFolder });
    handleClose();
  };

  useEffect(() => {
    if (popupName === 'add-folder') {
      setOpen(true);
      return;
    }
    setOpen(false);
  }, [popupName]);

  /**Tooltip: show explaination when hovering */
  return (
    <div>
      <Tooltip title='Add Group' onClick={handleOpenPopup}>
        <IconButton size='small'>
          <CreateNewFolderOutlined sx={{ color: 'white' }} />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Group</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Group Name'
            fullWidth
            size='small'
            variant='standard'
            sx={{ width: '400px' }}
            autoComplete='off'
            value={newFolderName}
            onChange={handleNewFolderNameChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddNewFolder}>OK</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
