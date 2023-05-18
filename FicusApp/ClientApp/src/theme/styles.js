import { mode } from "@chakra-ui/theme-tools";
export const globalStyles = {
  colors: {
    // Colores Ficus
    blue: {
      50: "#EBEAFB",
      100: "#C6C3F4",
      200: "#A29CEC",
      300: "#7D76E5",
      400: "#594FDE",
      500: "#3428D7",
      600: "#2A20AC",
      700: "#1F1881",
      800: "#151056",
      900: "#0A082B"
    },
    red: {
      50: "#FFE5E5",
      100: "#FFB8B8",
      200: "#FF8A8A",
      300: "#FF5C5C",
      400: "#FF2E2E",
      500: "#FF0000",
      600: "#CC0000",
      700: "#990000",
      800: "#660000",
      900: "#330000"
    },
    green: {
      50: "#F2F2F2",
      100: "#DBDBDB",
      200: "#C4C4C4",
      300: "#ADADAD",
      400: "#969696",
      500: "#808080",
      600: "#666666",
      700: "#4D4D4D",
      800: "#333333",
      900: "#1A1A1A"
    },
    secundaryGray: {
      50: "#FBF3E9",
      100: "#F5DFC2",
      200: "#EECA9B",
      300: "#E7B574",
      400: "#E1A04C",
      500: "#DA8B25",
      600: "#AE6F1E",
      700: "#835316",
      800: "#57380F",
      900: "#2C1C07"
    }
  },
  
  styles: {
    global: (props) => ({
    // Fonts de Ficus
    '@font-face': [
      {
        fontFamily: 'Overpass Light',
        fontWeight: 300,
        fontStyle: 'normal',
        src: `
          url('/path/to/overpass-light.woff2') format('woff2'),
          url('/path/to/overpass-light.woff') format('woff')
        `,
      },
      {
        fontFamily: 'Chivo',
        fontWeight: 'bold',
        fontStyle: 'normal',
        src: `
          url('/path/to/chivo-bold.woff2') format('woff2'),
          url('/path/to/chivo-bold.woff') format('woff')
        `,
      },
      {
        fontFamily: 'Chivo',
        fontWeight: '900',
        fontStyle: 'normal',
        src: `
          url('/path/to/chivo-black.woff2') format('woff2'),
          url('/path/to/chivo-black.woff') format('woff')
        `,
      },
    ],
    body: {
      fontFamily: 'Overpass Light, sans-serif',
      bg: mode('gray.100', 'navy.900')(props),
      letterSpacing: '-0.5px',
    },
      body: {
        overflowX: "hidden",
        bg: mode("secundaryGray.100", "gray.400")(props),
        fontFamily: "DM Sans",
        letterSpacing: "-0.5px",
      },
      input: {
        color: "secundaryGray.700",
      },
      html: {
        fontFamily: "DM Sans",
      },
    }),
  },
};
