import { useState, useCallback } from 'react';

import { Typography } from '@mui/material';

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
    
      {/* <Badge variant={status} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Avatar
          src="/assets/images/chatavatar/NeerajSi.jpeg" // Replace with your custom avatar image path
          onClick={popover.onOpen}
          sx={{  width: 48, height: 48 }}
        >
          {user?.displayName?.charAt(0).toUpperCase()}
        </Avatar>
      </Badge> */}
      <Typography variant='h5'>
        Inbox
      </Typography>
   
      {/* <CustomAvatar  /> */}

     
    </>
  );
}
