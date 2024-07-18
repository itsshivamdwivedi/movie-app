import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";


const config = {
  initialColorMode: "dark", // Ensure dark mode is initially set
  useSystemColorMode: true, // Disable system color mode to enforce dark mode
};

const styles = {
    global: (props) => ({
      body: {
        bg: mode(
          props.theme.semanticTokens.colors["chakra-body-bg"]._light,
          // "blackAlpha.900"
        )(props),
      },
    }),
  };

const theme = extendTheme({ config, styles });


export default theme;
