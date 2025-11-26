'use client';

import { useState, useEffect } from 'react';
import { Title, Box, Container, Text, Divider, Flex, LoadingOverlay } from '@mantine/core';
import Masonry from 'react-masonry-css';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { useLightbox } from '../hooks/useLightbox';
import { breakpointColumnsObj } from '../constants/portfolioImages';
import { portfolioService, type PortfolioItem } from 'src/services/api';
import classes from '../portfolio.module.css';

const PortfolioGallery = () => {
  const { open } = useLightbox();
  const [activeIndex, setActiveIndex] = useState(-1);
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolioItems = async () => {
      try {
        const items = await portfolioService.getPortfolioItems();
        setPortfolioItems(items);
      } catch (error) {
        console.error('Failed to fetch portfolio items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolioItems();
  }, []);

  const handleOpen = (idx: number) => {
    setActiveIndex(idx);
    open(idx);
  };

  // Convert portfolio items to slides format for lightbox
  const slides = portfolioItems.map((item) => ({
    src: item.imageUrl,
    alt: item.title,
    title: item.title,
    description: item.description,
  }));

  return (
    <Box component="section" bg="#fafafa" py={{ base: 60, md: 80 }} pos="relative">
      <LoadingOverlay visible={loading} />

      {/* Luxury Header Section */}
      <Container size="lg" mb={{ base: 50, md: 70 }}>
        <Flex direction="column" align="center" gap={16}>
          <Divider
            my={0}
            w={60}
            size={2}
            color="#ffd700"
            label={
              <Box
                component="span"
                px="xs"
                style={{
                  fontSize: '0.75rem',
                  letterSpacing: '3px',
                  fontWeight: 700,
                  color: '#ffd700',
                }}
              >
                GALLERY
              </Box>
            }
            labelPosition="center"
          />

          <Title
            order={1}
            ta="center"
            fw={300}
            size="h1"
            style={{
              fontFamily: "'Playfair Display', serif",
              letterSpacing: '2px',
              marginTop: '1rem',
              color: '#1a1a1a',
              lineHeight: 1.2,
            }}
          >
            Our Portfolio
          </Title>

          <Text
            ta="center"
            size="lg"
            c="dimmed"
            maw={500}
            fw={300}
            style={{
              fontFamily: "'Inter', sans-serif",
              letterSpacing: '0.5px',
              marginTop: '0.5rem',
            }}
          >
            Curated moments of elegance and creativity. Every image tells a story of refined events
            and unforgettable experiences.
          </Text>
        </Flex>
      </Container>

      {/* Image Grid with Masonry */}
      <Container size="lg">
        {portfolioItems.length === 0 && !loading ? (
          <Text ta="center" c="dimmed" py="xl">
            No portfolio items available yet.
          </Text>
        ) : (
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className={classes.myMasonryGrid}
            columnClassName={classes.myMasonryGridColumn}
          >
            {portfolioItems.map((item, idx) => (
              <div key={item.id} className={classes.imageCard} onClick={() => handleOpen(idx)}>
                <div className={classes.imageWrapper}>
                  <img
                    src={item.imageUrl || '/placeholder.svg'}
                    alt={item.title}
                    className={classes.image}
                    loading={idx > 5 ? 'lazy' : 'eager'}
                  />
                  <div className={classes.imageOverlay} />
                </div>
              </div>
            ))}
          </Masonry>
        )}
      </Container>

      {/* Lightbox Component */}
      <Lightbox
        open={activeIndex >= 0}
        close={() => setActiveIndex(-1)}
        slides={slides}
        index={activeIndex}
        className={classes.portfolioLightbox}
        controller={{
          closeOnBackdropClick: true,
          closeOnPullDown: false,
          disableSwipeNavigation: true,
        }}
        render={{
          buttonClose: () => (
            <button
              onClick={() => setActiveIndex(-1)}
              className={classes.customCloseButton}
              aria-label="Close lightbox"
            >
              ✕
            </button>
          ),
        }}
      />
    </Box>
  );
};

export default PortfolioGallery;
