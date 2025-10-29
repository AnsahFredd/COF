import { createTheme, type MantineColorsTuple } from '@mantine/core';

// Purple/Pink primary color matching your hero section
const gold: MantineColorsTuple = [
  '#f9f6e7', // for bg
  '#f0e7c2',
  '#e6d89b',
  '#d9c96e',
  '#cbb941',
  'ffd700',
  '#b5a425',
  '#a38e13', // 6 - your brand gold (primary shade)
  '#8c7a11', // 7 - darker for hover
  '#74650e', // 8 - even darker
  '#5c500a', // 9 - near black-gold
];

// Black scale from dark gray → pure black
const black: MantineColorsTuple = [
  '#f5f5f5', // 0 - almost white
  '#e5e5e5',
  '#cccccc',
  '#999999',
  '#666666',
  '#333333',
  '#1f1f1f',
  '#141414',
  '#0a0a0a',
  '#000000', // 9 - pure black
];

const white: MantineColorsTuple = [
  '#ffffff', // 0 - pure white
  '#fafafa',
  '#f5f5f5',
  '#f0f0f0',
  '#e5e5e5',
  '#d9d9d9',
  '#bfbfbf',
  '#a6a6a6',
  '#8c8c8c',
  '#737373', // 9 - darkest “white” (light gray)
];

export const theme = createTheme({
  colors: {
    black,
    gold,
    white,
  },
  primaryColor: 'gold',
  defaultRadius: 'md',

  // Base font for body text - using Poppins/Inter
  fontFamily: 'Poppins, Inter, system-ui, -apple-system, sans-serif',

  // Headings configuration - using Cormorant Garamond
  headings: {
    fontFamily: "'Cormorant Garamond', 'Libre Bodoni', Georgia, serif",
    fontWeight: '600',
    sizes: {
      h1: { fontSize: '3rem', lineHeight: '1.2' },
      h2: { fontSize: '2.5rem', lineHeight: '1.3' },
      h3: { fontSize: '2rem', lineHeight: '1.4' },
      h4: { fontSize: '1.5rem', lineHeight: '1.5' },
      h5: { fontSize: '1.25rem', lineHeight: '1.5' },
      h6: { fontSize: '1rem', lineHeight: '1.5' },
    },
  },

  components: {
    // Title component styling (replaces h1-h6)
    Title: {
      styles: {
        root: {
          fontFamily: "'Cormorant Garamond', 'Libre Bodoni', Georgia, serif",
        },
      },
    },

    // Text component styling (replaces p, span, etc.)
    Text: {
      styles: {
        root: {
          fontFamily: "'Poppins', 'Inter', system-ui, sans-serif",
        },
      },
    },

    Button: {
      defaultProps: {
        radius: 'md',
      },
      styles: {
        root: {
          fontFamily: "'Poppins', 'Inter', system-ui, sans-serif",
          fontWeight: 500,
          transition: 'all 0.3s ease',
        },
      },
    },

    Paper: {
      defaultProps: {
        radius: 'lg',
        shadow: 'sm',
      },
    },

    TextInput: {
      styles: {
        label: {
          fontFamily: "'Poppins', 'Inter', system-ui, sans-serif",
          fontWeight: 500,
          marginBottom: '0.5rem',
        },
        input: {
          fontFamily: "'Poppins', 'Inter', system-ui, sans-serif",
        },
      },
    },

    PasswordInput: {
      styles: {
        label: {
          fontFamily: "'Poppins', 'Inter', system-ui, sans-serif",
          fontWeight: 500,
          marginBottom: '0.5rem',
        },
        input: {
          fontFamily: "'Poppins', 'Inter', system-ui, sans-serif",
        },
      },
    },

    Select: {
      styles: {
        label: {
          fontFamily: "'Poppins', 'Inter', system-ui, sans-serif",
        },
        input: {
          fontFamily: "'Poppins', 'Inter', system-ui, sans-serif",
        },
      },
    },

    Textarea: {
      styles: {
        label: {
          fontFamily: "'Poppins', 'Inter', system-ui, sans-serif",
        },
        input: {
          fontFamily: "'Poppins', 'Inter', system-ui, sans-serif",
        },
      },
    },

    Modal: {
      styles: {
        title: {
          fontFamily: "'Cormorant Garamond', 'Libre Bodoni', Georgia, serif",
        },
        body: {
          fontFamily: "'Poppins', 'Inter', system-ui, sans-serif",
        },
      },
    },

    Card: {
      styles: {
        root: {
          fontFamily: "'Poppins', 'Inter', system-ui, sans-serif",
        },
      },
    },
  },

  other: {
    goldText: '#a38e13',
    scriptFont: "'Luxurious Script', cursive",
  },
});
