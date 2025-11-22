import { Box, Paper, Image } from '@mantine/core';
import { getAvatarGradient } from '../helpers';
import { TestimonialAvatarProps } from '../interface';

export const TestimonialAvatar: React.FC<TestimonialAvatarProps> = ({ image, name }) => {
  return (
    <Box pos="relative">
      <Paper
        radius="50%"
        w={200}
        h={200}
        style={{
          ...getAvatarGradient(),
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Image
          src={image}
          alt={name}
          width={200}
          height={200}
          fit="cover"
          style={{ objectPosition: 'center' }}
        />
      </Paper>
    </Box>
  );
};
