const theme = {
  colors: {
    // Black / White
    black: '#161D24',
    white: '#fff',

    // Gray Scale
    'gray-01': '#28323C',
    'gray-02': '#374553',
    'gray-03': '#646F7C',
    'gray-04': '#C5C8CE',
    'gray-05': '#EBE9EE',
    'gray-06': '#F7F8F9',

    // Red Scale
    primary: '#D70011',
    'red-01': '#F1352B',
    'red-02': '#FFEEE8',

    // Green Scale
    'store-open': '#70DD56',

    // Brown Scale
    'brown-01': '#BF8B56',
    'brown-02': '#D3A16D',
    'brown-03': '#CBB793',
    'brown-04': '#D6C6A7',
  },

  shadows: {
    floatingButton: '0px 0px 9px 0px rgba(0, 0, 0, 0.15)',
  },

  fonts: {
    // Pretendard
    'display-24B': {
      fontFamily: 'Pretendard',
      fontWeight: 700,
      fontSize: '24px',
      lineHeight: '130%',
      letterSpacing: '0px',
    },
    'display-18SB': {
      fontFamily: 'Pretendard',
      fontWeight: 600,
      fontSize: '18px',
      lineHeight: '145%',
      letterSpacing: '0px',
    },
    'display-12M': {
      fontFamily: 'Pretendard',
      fontWeight: 500,
      fontSize: '12px',
      lineHeight: '100%',
      letterSpacing: '0px',
    },
    'heading-16B': {
      fontFamily: 'Pretendard',
      fontWeight: 700,
      fontSize: '16px',
      lineHeight: '145%',
      letterSpacing: '0px',
    },
    'heading-14B': {
      fontFamily: 'Pretendard',
      fontWeight: 700,
      fontSize: '14px',
      lineHeight: '145%',
      letterSpacing: '0px',
    },
    'body-14M': {
      fontFamily: 'Pretendard',
      fontWeight: 500,
      fontSize: '14px',
      lineHeight: '145%',
      letterSpacing: '0px',
    },
    'body-14R': {
      fontFamily: 'Pretendard',
      fontWeight: 400,
      fontSize: '14px',
      lineHeight: '145%',
      letterSpacing: '0px',
    },
    'body-14R-review': {
      fontFamily: 'Pretendard',
      fontWeight: 400,
      fontSize: '14px',
      lineHeight: '130%',
      letterSpacing: '0px',
    },
    'body-12R': {
      fontFamily: 'Pretendard',
      fontWeight: 400,
      fontSize: '12px',
      lineHeight: '145%',
      letterSpacing: '0px',
    },
    'button-14B': {
      fontFamily: 'Pretendard',
      fontWeight: 700,
      fontSize: '14px',
      lineHeight: '145%',
      letterSpacing: '0px',
    },
    'button-14R': {
      fontFamily: 'Pretendard',
      fontWeight: 400,
      fontSize: '14px',
      lineHeight: '145%',
      letterSpacing: '0px',
    },
    'button-12R': {
      fontFamily: 'Pretendard',
      fontWeight: 400,
      fontSize: '12px',
      lineHeight: '145%',
      letterSpacing: '0px',
    },
    'caption-12B': {
      fontFamily: 'Pretendard',
      fontWeight: 700,
      fontSize: '12px',
      lineHeight: '145%',
      letterSpacing: '0px',
    },
    'caption-12R': {
      fontFamily: 'Pretendard',
      fontWeight: 400,
      fontSize: '12px',
      lineHeight: '145%',
      letterSpacing: '0px',
    },
    'caption-10SB': {
      fontFamily: 'Pretendard',
      fontWeight: 600,
      fontSize: '10px',
      lineHeight: '145%',
      letterSpacing: '0px',
    },
    'caption-10R': {
      fontFamily: 'Pretendard',
      fontWeight: 400,
      fontSize: '10px',
      lineHeight: '145%',
      letterSpacing: '0px',
    },

    // DAISOA
    'number-40R': {
      fontFamily: 'Daiso',
      fontWeight: 400,
      fontSize: '40px',
      lineHeight: '100%',
      letterSpacing: '0px',
    },
    'number-24R': {
      fontFamily: 'Daiso',
      fontWeight: 400,
      fontSize: '24px',
      lineHeight: '100%',
      letterSpacing: '0px',
    },
    'number-18R': {
      fontFamily: 'Daiso',
      fontWeight: 400,
      fontSize: '18px',
      lineHeight: '100%',
      letterSpacing: '0px',
    },
    'number-16R': {
      fontFamily: 'Daiso',
      fontWeight: 400,
      fontSize: '16px',
      lineHeight: '100%',
      letterSpacing: '0px',
    },
    'number-12R': {
      fontFamily: 'Daiso',
      fontWeight: 400,
      fontSize: '12px',
      lineHeight: '100%',
      letterSpacing: '0px',
    },
  },
};

export type ColorType = typeof theme.colors;
export type FontType = typeof theme.fonts;
export type ShadowType = typeof theme.shadows;

export default theme;
