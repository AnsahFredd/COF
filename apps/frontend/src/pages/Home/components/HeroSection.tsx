import React from 'react';
import { Stack, Text, Image, Box, Center, useMantineTheme } from '@mantine/core';
import { useImageSlider } from '../hooks/useImageSlider';
import { HERO_IMAGES, SLIDE_INTERVAL } from '../constants/herosection';
import classes from './HeroSection.module.css';

const HeroSection = () => {
  const theme = useMantineTheme();
  const { currentIndex, goToSlide } = useImageSlider({
    images: HERO_IMAGES,
    interval: SLIDE_INTERVAL,
  });

  return (
    <Box className={classes.heroContainer}>
      {/* Background Images with Overlay */}
      <Box className={classes.imageContainer}>
        {HERO_IMAGES.map((image, index) => (
          <Box
            key={index}
            className={classes.imageWrapper}
            style={{
              opacity: currentIndex === index ? 1 : 0,
              zIndex: currentIndex === index ? 1 : 0,
            }}
          >
            <Image
              src={image}
              alt={`background_image_${index + 1}`}
              fit="cover"
              w="100%"
              h="100%"
              className={classes.image}
            />
          </Box>
        ))}

        <Box className={classes.overlay} />
      </Box>

      <Center className={classes.contentOverlay}>
        <Stack align="center" gap={8}>
          <Text
            size="clamp(4rem, 8vw, 7rem)"
            fw={600}
            c="gold.6"
            className={classes.titleText}
            style={{
              fontFamily: theme.headings.fontFamily,
            }}
          >
            COFUEL
          </Text>

          <Text
            size="clamp(2.5rem, 5vw, 4rem)"
            fw={400}
            c="gold.6"
            className={classes.subtitleText}
            style={{
              fontFamily: theme.other.scriptFont,
            }}
          >
            Home Of Events
          </Text>
        </Stack>
      </Center>

      {/* Slide Indicators */}
      <Box className={classes.indicatorsContainer}>
        {HERO_IMAGES.map((_, index) => (
          <Box
            key={index}
            onClick={() => goToSlide(index)}
            className={`${classes.indicator} ${
              currentIndex === index ? classes.indicatorActive : classes.indicatorInactive
            }`}
            style={
              {
                '--gold-color': theme.colors.gold[3],
              } as React.CSSProperties
            }
          />
        ))}
      </Box>
    </Box>
  );
};

export default HeroSection;
