import React from 'react';
import { Container, Title, Text, Box, Button } from '@mantine/core';
import { useMantineTheme } from '@mantine/core';
import {
  SHOWCASE_VIDEOS,
  VIDEO_SECTION_TITLE,
  VIDEO_SECTION_DESCRIPTION,
} from '../constants/videosection';
import VideoCard from './VideoCard';
import classes from './VideoShowcase.module.css';

const VideoShowcase = () => {
  const theme = useMantineTheme();

  return (
    <Box
      className={classes.videoShowcaseContainer}
      style={
        {
          '--gold-color': theme.colors.gold[6],
        } as React.CSSProperties
      }
    >
      <Container size="xl">
        {/* Section Header */}
        <Box className={classes.sectionHeader}>
          <Title className={classes.sectionTitle} style={{ fontFamily: theme.headings.fontFamily }}>
            {VIDEO_SECTION_TITLE}
          </Title>
          <Text className={classes.sectionDescription}>{VIDEO_SECTION_DESCRIPTION}</Text>
        </Box>

        {/* Videos Grid */}
        <Box className={classes.videosGrid}>
          {SHOWCASE_VIDEOS.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </Box>

        {/* Call to Action */}
        <Box className={classes.ctaSection}>
          <Button size="lg" className={classes.ctaButton} color="gold" variant="filled">
            View More Events
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default VideoShowcase;
