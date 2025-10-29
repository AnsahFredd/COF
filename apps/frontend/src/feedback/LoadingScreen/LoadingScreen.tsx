import { Box } from '@mantine/core';
import logo from 'src/assets/images/brand/logo.jpg'; // Replace with your logo path

const LoadingScreen = () => {
  return (
    <Box
      pos="fixed"
      inset={0}
      bg="black"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
      }}
    >
      <Box
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}
      >
        {/* Glowing rotating ring */}
        <Box pos="relative" w={80} h={80}>
          <Box
            pos="absolute"
            inset={0}
            style={{
              borderRadius: '9999px',
              borderTop: '4px solid rgb(250, 204, 21)',
              borderRight: '4px solid transparent',
              borderBottom: '4px solid transparent',
              borderLeft: '4px solid transparent',
              opacity: 0.6,
              animation: 'spin 1s linear infinite',
              boxShadow: '0 0 40px #FFD700',
            }}
          />
          <Box
            pos="absolute"
            inset={12}
            style={{
              borderRadius: '9999px',
              backgroundColor: 'black',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img
              src={logo}
              alt="Loading..."
              style={{
                width: '2.5rem',
                height: '2.5rem',
                objectFit: 'contain',
                borderRadius: '9999px',
              }}
            />
          </Box>
        </Box>
      </Box>

      <style>
        {`
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </Box>
  );
};

export default LoadingScreen;
