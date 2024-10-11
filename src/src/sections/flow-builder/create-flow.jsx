import 'react-modal-video/css/modal-video.min.css';

import { useNavigate } from 'react-router';

import Box from '@mui/material/Box';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { useBoolean } from 'src/hooks/use-boolean';

import PageHeader from 'src/components/page-header/page-header';
import AddTagNode from 'src/components/flow-nodes/action-nodes/add-tag-node';
import ListNode from 'src/components/flow-nodes/message-type-nodes/list-node';
import AskMediaNode from 'src/components/flow-nodes/action-nodes/ask-media-node';
import ConditionNode from 'src/components/flow-nodes/action-nodes/condition-node';
import AskAddressNode from 'src/components/flow-nodes/action-nodes/ask-address-node';
import APIRequestNode from 'src/components/flow-nodes/action-nodes/api-request-node';
import TemplateNode from 'src/components/flow-nodes/message-type-nodes/template-node';
import AskLocationNode from 'src/components/flow-nodes/action-nodes/ask-location-node';
import ConnectFlowNode from 'src/components/flow-nodes/action-nodes/connect-flow-node';
import AskQuestionNode from 'src/components/flow-nodes/action-nodes/ask-question-node';
import SingleProduct from 'src/components/flow-nodes/message-type-nodes/single-product';
import FlowStartNode from 'src/components/flow-nodes/message-type-nodes/flow-start-node';
import AskAttributeNode from 'src/components/flow-nodes/action-nodes/set-attribute-node';
import TextButtonNode from 'src/components/flow-nodes/message-type-nodes/text-button-node';
import MediaButtonNode from 'src/components/flow-nodes/message-type-nodes/media-button-node';
import MultiProductNode from 'src/components/flow-nodes/message-type-nodes/multi-product-node';
import CatalougeMessageNode from 'src/components/flow-nodes/message-type-nodes/catalogue-message-node';

import Sidebar from './component/flow-actions/sidebar';

// ----------------------------------------------------------------------

export default function Page({ sx, icon, title, total, color = 'warning', ...other }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const dialog = useBoolean();
  const navigate = useNavigate();

  const handleAddFlow = () => {
    navigate('/app/flows/createflow');
  };

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',  // Full width on extra small screens
          // sm: '360px 1fr',  // Sidebar and main content on larger screens
        },
        justifyContent: 'start',  // Align content to the start (left)
        alignItems: 'stretch',  // Stretch items to fill the container height
        minHeight: '100vh',  // Ensure full viewport height
        maxWidth: '100%',  // Prevent horizontal overflow
        overflow: 'hidden',  // Hide overflow
      }}
    >
      {/* Sidebar */}
      <Box
        sx={{
          position: 'fixed',  // Fix the sidebar to the viewport
          left: 88,  // Stick to the left
          top: 70,  // Stick to the top
          height: '100vh',  // Full viewport height
          width: { sm: '360px' },  // Width of the sidebar
          overflowY: 'auto',
          borderRight: '1px solid',
          bgcolor: '#F4F6F8',
          borderColor: 'divider',
          // zIndex: 1100,  // Ensure it's above other content
        }}
      >
        <Sidebar />
      </Box>

      {/* Main content area */}
      <Box
        sx={{
          marginLeft: { sm: '360px' },  // Offset content to account for fixed sidebar
          p: 3,
          overflowY: 'auto',
        }}
      >
        {/* First row */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'flex-start', sm: 'center' },
            justifyContent: 'space-between',
            mb: 2,
          }}
        >
          <PageHeader
            title="Flow Builder"
            Subheading="You can connect with Facebook to fetch catalog and manage it from our platform."
            link_added="#"
          />
        </Box>

        {/* Second row */}
        <Box
          sx={{
            mt: '40px',
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
              lg: 'repeat(4, 1fr)',
            },
            gap: 3,
          }}
        >
          <FlowStartNode />
          <ConditionNode />
          <TextButtonNode />
          <ListNode />
          <SingleProduct />
          <AskLocationNode />
          <ConnectFlowNode />
          <AskAttributeNode />
          <TemplateNode />
          <AskAddressNode />
          <AskQuestionNode />
          <AddTagNode />
          <CatalougeMessageNode />
          <MultiProductNode />
          <AskMediaNode />
          <APIRequestNode />
          <MediaButtonNode />
        </Box>
      </Box>
    </Box>
  );
}
