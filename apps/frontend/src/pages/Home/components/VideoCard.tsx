import React, { useEffect, useRef, useState } from 'react';
import { Box, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconPlayerPlay, IconPlayerPause, IconVolume, IconVolumeOff } from '@tabler/icons-react';
import { useVideoPlayer } from '../hooks/useVideoPlayer';
import { Video } from '../interface/index';
import { useMantineTheme } from '@mantine/core';
import classes from './VideoShowcase.module.css';

interface VideoCardProps {
  video: Video;
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  const theme = useMantineTheme();
  const { videoRef, isPlaying, isMuted, togglePlay, toggleMute } = useVideoPlayer();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isMobile) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.6,
        rootMargin: '-10% 0px -10% 0px',
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [isMobile]);

  return (
    <Box
      ref={cardRef}
      className={`${classes.videoCard} ${isMobile && isVisible ? classes.visible : ''}`}
      style={
        {
          '--gold-color': theme.colors.gold[6],
        } as React.CSSProperties
      }
      onClick={togglePlay}
    >
      <Box className={classes.videoWrapper}>
        <video
          ref={videoRef}
          className={classes.video}
          src={video.videoPath}
          loop
          muted
          playsInline
          autoPlay
          poster={video.thumbnail}
        />

        {/* Overlay with controls and info */}
        <Box className={classes.videoOverlay} onClick={(e) => e.stopPropagation()}>
          {/* Top controls */}
          <Box className={classes.videoControls}>
            <Box
              className={classes.controlButton}
              onClick={(e) => {
                e.stopPropagation();
                togglePlay();
              }}
            >
              {isPlaying ? (
                <IconPlayerPause className={classes.controlIcon} stroke={2} />
              ) : (
                <IconPlayerPlay className={classes.controlIcon} stroke={2} />
              )}
            </Box>
            <Box
              className={classes.controlButton}
              onClick={(e) => {
                e.stopPropagation();
                toggleMute();
              }}
            >
              {isMuted ? (
                <IconVolumeOff className={classes.controlIcon} stroke={2} />
              ) : (
                <IconVolume className={classes.controlIcon} stroke={2} />
              )}
            </Box>
          </Box>

          {/* Bottom info */}
          <Box className={classes.videoInfo}>
            <Text
              className={classes.videoTitle}
              style={{
                fontFamily: theme.other.scriptFont,
              }}
            >
              {video.title}
            </Text>
            {video.description && (
              <Text className={classes.videoDescription}>{video.description}</Text>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default VideoCard;
