import React from 'react';
import { Container, Title, Text, Box, Button, Image } from '@mantine/core';
import { useMantineTheme } from '@mantine/core';
import { SERVICE_CATEGORIES } from '../constants/servicesection';
import classes from './ServicesSection.module.css';

const ServicesSection = () => {
  const theme = useMantineTheme();

  return (
    <Box className={classes.servicesContainer}>
      {SERVICE_CATEGORIES.map((category, categoryIndex) => (
        <Container key={category.id} size="xl" mb={80}>
          {/* Section Title */}
          <Box className={classes.sectionTitle}>
            <Title
              order={2}
              className={classes.mainTitle}
              style={{
                fontFamily: theme.headings.fontFamily,
                color: theme.colors.black[9],
              }}
            >
              {category.title}
            </Title>
            {category.subtitle && (
              <Text className={classes.subtitle} c="dimmed">
                {category.subtitle}
              </Text>
            )}
          </Box>

          {/* Services Grid */}
          <Box
            className={`${classes.servicesGrid} ${
              category.id === 'main-services' ? classes.mainServicesGrid : classes.luxuryRentalsGrid
            }`}
          >
            {category.services.map((service) => (
              <Box
                key={service.id}
                className={classes.serviceCard}
                style={
                  {
                    '--gold-color': theme.colors.gold[6],
                  } as React.CSSProperties
                }
              >
                <Image src={service.image} alt={service.title} className={classes.serviceImage} />
                <Box className={classes.serviceOverlay}>
                  <Text
                    className={classes.serviceTitle}
                    style={{
                      fontFamily: theme.other.scriptFont,
                    }}
                  >
                    {service.title}
                  </Text>
                  {service.description && (
                    <Text className={classes.serviceDescription}>{service.description}</Text>
                  )}
                </Box>
              </Box>
            ))}
          </Box>

          {/* Divider between sections */}
          {categoryIndex < SERVICE_CATEGORIES.length - 1 && (
            <Box
              className={classes.divider}
              style={
                {
                  '--gold-color': theme.colors.gold[6],
                } as React.CSSProperties
              }
            />
          )}
        </Container>
      ))}

      {/* Call to Action */}
      <Box className={classes.ctaSection}>
        <Button size="lg" className={classes.ctaButton} color="gold" variant="filled">
          View All Services
        </Button>
      </Box>
    </Box>
  );
};

export default ServicesSection;
