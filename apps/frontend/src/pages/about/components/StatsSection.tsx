import React from 'react';
import { Box, Container, SimpleGrid, Text, useMantineTheme } from '@mantine/core';
import classes from './About.module.css';

const stats = [
  { label: 'Events Hosted', value: '500+' },
  { label: 'Years Experience', value: '8+' },
  { label: 'Happy Clients', value: '100%' },
  { label: 'Team Members', value: '25+' },
];

const StatsSection = () => {
  const theme = useMantineTheme();

  return (
    <Box className={classes.statsSection}>
      <Container size="xl">
        <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="xl">
          {stats.map((stat, index) => (
            <Box key={index} className={classes.statCard}>
              <Text
                className={classes.statNumber}
                style={
                  {
                    '--gold-color': theme.colors.gold[6],
                  } as React.CSSProperties
                }
              >
                {stat.value}
              </Text>
              <Text className={classes.statLabel}>{stat.label}</Text>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default StatsSection;
