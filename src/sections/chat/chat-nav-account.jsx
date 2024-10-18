import { useState, useCallback } from 'react';

import Badge from '@mui/material/Badge';
import { Tooltip } from '@mui/material';
import Avatar from '@mui/material/Avatar';

import { usePopover } from 'src/components/custom-popover';

import { useMockedUser } from 'src/auth/hooks';

// ----------------------------------------------------------------------
// const CustomAvatar = () => (
//   <Avatar
//     alt="Custom Avatar"
//     src="/assets/images/chatavatar/Neerajsir.png" // Replace with your custom avatar image path
//     sx={{ cursor: 'pointer', width: 48, height: 48 }}
//   />
// );

export function ChatNavAccount() {
  const { user } = useMockedUser();

  const popover = usePopover();

  const [status, setStatus] = useState('online');

  const handleChangeStatus = useCallback((event) => {
    setStatus(event.target.value);
  }, []);
  const customName = 'Neeraj Agarwal';
  const email = 'neeraj.agrawal@gmail.com';

  return (
    <>
    <Tooltip title="This is the info of loged in user" arrow placement='top'>
      <Badge variant={status} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Avatar
          src="/assets/images/chatavatar/NeerajSir.jpeg" // Replace with your custom avatar image path
          onClick={popover.onOpen}
          sx={{  width: 48, height: 48 }}
        >
          {user?.displayName?.charAt(0).toUpperCase()}
        </Avatar>
      </Badge>
      </Tooltip>
      {/* <CustomAvatar  /> */}

     
    </>
  );
}
