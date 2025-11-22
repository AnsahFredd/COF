import React from 'react';
import { Box, Container, Title, Text, Image, useMantineTheme } from '@mantine/core';
import classes from './About.module.css';

const team = [
  {
    name: 'Sarah Anderson',
    role: 'Founder & Creative Director',
    image:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=688&q=80',
  },
  {
    name: 'Michael Chen',
    role: 'Head of Operations',
    image:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
  },
  {
    name: 'Emma Wilson',
    role: 'Lead Event Planner',
    image:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=761&q=80',
  },
  {
    name: 'David Thompson',
    role: 'Production Manager',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80',
  },
];

const TeamSection = () => {
  const theme = useMantineTheme();

  return (
    <Box className={classes.teamSection}>
      <Container size="xl">
        <Title order={2} className={classes.sectionTitle}>
          Meet The Team
        </Title>
        <Text className={classes.sectionSubtitle}>
          The passionate individuals behind your unforgettable moments.
        </Text>

        <Box className={classes.teamGrid}>
          {team.map((member, index) => (
            <Box key={index} className={classes.teamCard}>
              <Box className={classes.memberImageWrapper}>
                <Image src={member.image} alt={member.name} className={classes.memberImage} />
              </Box>
              <Box className={classes.memberInfo}>
                <Text className={classes.memberName}>{member.name}</Text>
                <Text
                  className={classes.memberRole}
                  style={
                    {
                      '--gold-color': theme.colors.gold[6],
                    } as React.CSSProperties
                  }
                >
                  {member.role}
                </Text>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default TeamSection;
