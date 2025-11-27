import React, { useEffect, useRef, useState } from 'react';
import { Container, Title, Text, Box, Button, Image } from '@mantine/core';
import { useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { SERVICE_CATEGORIES } from '../constants/servicesection';
import classes from './ServicesSection.module.css';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'src/constants/routes';

const ServicesSection = () => {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [visibleCards, setVisibleCards] = useState<Set<string>>(new Set());
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    if (!isMobile) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const cardId = entry.target.getAttribute('data-id');
          if (cardId) {
            setVisibleCards((prev) => {
              const newSet = new Set(prev);
              if (entry.isIntersecting) {
                newSet.add(cardId);
              } else {
                newSet.delete(cardId);
              }
              return newSet;
            });
          }
        });
      },
      {
        threshold: 0.6,
        rootMargin: '-10% 0px -10% 0px',
      }
    );

    Object.values(cardRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isMobile]);

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
                ref={(el) => (cardRefs.current[service.id] = el)}
                data-id={service.id}
                className={`${classes.serviceCard} ${
                  isMobile && visibleCards.has(service.id) ? classes.visible : ''
                }`}
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
        <Button
          size="lg"
          className={classes.ctaButton}
          color="gold"
          variant="filled"
          onClick={() => navigate(ROUTES.SERVICES)}
        >
          View All Services
        </Button>
      </Box>
    </Box>
  );
};

export default ServicesSection;
