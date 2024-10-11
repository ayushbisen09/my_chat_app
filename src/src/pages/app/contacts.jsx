import { useState } from 'react';
import { useTheme } from '@emotion/react';
import { useNavigate } from 'react-router';

import { Box, Button, Tooltip, useMediaQuery } from '@mui/material';

import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import StatsCards from 'src/components/stats-card/stats-card';
import PageHeader from 'src/components/page-header/page-header';

import ContactList from 'src/sections/contacts/contact-list';
import BigCard from 'src/sections/contacts/components/big-card/big-card';
import ContactsTable from 'src/sections/contacts/components/table/table';

// import { BlankView } from 'src/sections/blank/view';

// ----------------------------------------------------------------------

const metadata = { title: `Page three | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  const [selectedListItem, setSelectedListItem] = useState(0);
  const listItemsData = [
    {
      name: 'Pabbly Connect List',
      totalContacts: 54,
      optedInContacts: 30,
      optedOutContacts: 24,
    },
    {
      name: 'Pabbly Subscription Billing List',
      totalContacts: 23,
      optedInContacts: 15,
      optedOutContacts: 8,
    },
    {
      name: 'Pabbly Form Builder List',
      totalContacts: 54,
      optedInContacts: 40,
      optedOutContacts: 14,
    },
  ];
  const handleListItemSelect = (index) => {
    setSelectedListItem(index);
  };

  const currentData = listItemsData[selectedListItem];
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  const handleAddContact = () => {
    navigate('/app/contact/addcontact');
  };
  return (
    <DashboardContent maxWidth="xl">
      <Box
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'flex-start' : 'center',
          justifyContent: 'space-between',
          mb: 0,
        }}
      >
        <PageHeader
          title="Contacts"
          Subheading="Import contact, create audience & launch campaign, all from one place."
          link_added="#"
        />
        <Tooltip title="Click here to add contact." arrow placement="top">

        <Button
          onClick={handleAddContact}
          sx={{ mt: isMobile ? 2 : 0 }}
          startIcon={
            <Iconify icon="heroicons:plus-circle-16-solid" style={{ width: 18, height: 18 }} />
          }
          size="large"
          variant="contained"
          color="primary"
        >
          Add Contact
        </Button>
        </Tooltip>

      </Box>
      <Box
        sx={{
          gap: 3,
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'flex-start' : 'flex-start',
          // justifyContent: 'space-between',
          mt: '40px',
        }}
      >
        <ContactList onItemSelect={handleListItemSelect} />
        <Box sx={{ width: '100%' }}>
          <Box
            sx={{
              mt: 0,

              gap: 3,
              display: 'grid',
              gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' },
            }}
          >
            {/* WhatsApp Number Added */}
            <Tooltip title="Total Number of Contacts you have in this list." arrow placement="top" disableInteractive>
            <div>
            <StatsCards
              cardtitle="Total contacts"
              cardstats={currentData.totalContacts.toString()}
              icon_name="total-contacts.png"
              icon_color="#FFA92E"
              bg_gradient="#FFA92E"
            />
            </div>
            </Tooltip>
            {/* WhatsApp Message Quota (Outgoing) */}
            <Tooltip title="Total Number of Opted-In Contacts you have in this list." arrow placement="top">
            <div>
            <StatsCards
              cardtitle="Opted-In contacts"
              cardstats={currentData.optedInContacts.toString()}
              icon_name="Opted_in.png"
              icon_color="#12B66A"
              bg_gradient="#12B66A"
            />
             </div>
             </Tooltip>

            {/* Messaage Quota Used */}
            <Tooltip title="Total Number of Opted-Out Contacts you have in this list." arrow placement="top">
            <div>
            <StatsCards
              cardtitle="Opted-Out contacts"
              cardstats={currentData.optedOutContacts.toString()}
              icon_name="Opted_out.png"
              icon_color="#F86672"
              bg_gradient="#F86672"
            />
            </div>
            </Tooltip>
          </Box>
          <BigCard />
          <ContactsTable />
        </Box>
      </Box>
    </DashboardContent>
  );
}
