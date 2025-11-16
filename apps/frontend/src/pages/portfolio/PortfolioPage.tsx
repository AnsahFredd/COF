// src/pages/Portfolio/index.tsx
import { Box } from '@mantine/core';
import PortfolioHeader from './components/PortfolioHeader';
import PortfolioGallery from './components/PortfolioGallery';

const Portfolio = () => {
  return (
    <Box w="100%" h="100%">
      <PortfolioHeader />
      <PortfolioGallery />
    </Box>
  );
};

export default Portfolio;
