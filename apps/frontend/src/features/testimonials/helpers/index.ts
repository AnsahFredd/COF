export const getGradientBackground = () => ({
  background: 'linear-gradient(180deg, #fafafa 0%, #fff 100%)',
});

export const getCardGradient = () => ({
  background: 'linear-gradient(135deg, #ffffff 0%, #fafafa 100%)',
  border: '1px solid #f0f0f0',
});

export const getAvatarGradient = () => ({
  background: 'linear-gradient(135deg, var(--mantine-color-gold-4), var(--mantine-color-yellow-4))',
  boxShadow: '0 20px 60px rgba(212, 175, 55, 0.3)',
});

export const getTitleGradient = () => ({
  background: 'linear-gradient(135deg, #1a1a1a 0%, #4a4a4a 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
});
