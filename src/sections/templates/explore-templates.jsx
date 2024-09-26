import { useState } from 'react';

import { Box } from '@mui/material';

import TemplateList from './template-list';
import FoodTemplatesRender from './food-templates';
import TravelTemplatesRender from './travel-templates';
import EcommTemplatesRender from './ecommerce-templates';
import FestiveTemplatesRender from './festive-templates';
import ServiceTemplatesRender from './service-templates';
import EductionTemplatesRender from './education-templates';
import HealthCareTemplatesRender from './health-care-template';
import SpecialOccasionsTemplatesRender from './special-occasions-templates';

export default function ExploreTemplate() {
  const [selectedListItem, setSelectedListItem] = useState(0);

  const handleListItemSelect = (index) => {
    setSelectedListItem(index);
  };

  const renderSelectedTemplate = () => {
    switch (selectedListItem) {
      case 0:
        return <EcommTemplatesRender />;
      case 1:
        return <FoodTemplatesRender />;
      case 2:
        return <FestiveTemplatesRender/>;
      case 3:
        return <HealthCareTemplatesRender />;
      case 4:
        return <SpecialOccasionsTemplatesRender />;
      case 5:
        return <TravelTemplatesRender />;
      case 6:
        return <ServiceTemplatesRender />;
      case 7:
        return <EductionTemplatesRender />;
      default:
        return <EcommTemplatesRender />;
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        gap: '40px',
        mt: '24px',
        flexDirection: {
          xs: 'column', // mobile
          sm: 'column', // tablet
          md: 'row', // desktop
        },
      }}
    >
      <TemplateList onItemSelect={handleListItemSelect} />
      {renderSelectedTemplate()}
    </Box>
  );
}
