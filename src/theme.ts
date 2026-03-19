import { alpha, createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    surface: {
      base: string;
      soft: string;
      softer: string;
      strong: string;
      border: string;
    };
  }

  interface PaletteOptions {
    surface?: {
      base: string;
      soft: string;
      softer: string;
      strong: string;
      border: string;
    };
  }
}

export const appTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#5b8cff",
      dark: "#2957d4",
      light: "#8cabff",
    },
    secondary: {
      main: "#9b7bff",
    },
    success: {
      main: "#4cd17c",
    },
    warning: {
      main: "#ffb547",
    },
    error: {
      main: "#ff6b6b",
    },
    info: {
      main: "#4db7ff",
    },
    background: {
      default: "#0b1020",
      paper: "#12182a",
    },
    text: {
      primary: "#eef2ff",
      secondary: "#98a3c7",
    },
    divider: "rgba(255,255,255,0.08)",
    surface: {
      base: "rgba(18,24,42,0.72)",
      soft: "rgba(255,255,255,0.04)",
      softer: "rgba(255,255,255,0.02)",
      strong: "rgba(91,140,255,0.12)",
      border: "rgba(255,255,255,0.08)",
    },
  },
  shape: {
    borderRadius: 18,
  },
  typography: {
    fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    h3: {
      fontWeight: 900,
      lineHeight: 1.05,
    },
    h4: {
      fontWeight: 900,
    },
    h5: {
      fontWeight: 850,
    },
    h6: {
      fontWeight: 850,
    },
    button: {
      textTransform: "none",
      fontWeight: 700,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: (theme) => ({
        body: {
          background: `radial-gradient(circle at top left, ${alpha(
            theme.palette.primary.main,
            0.14,
          )} 0%, transparent 28%), radial-gradient(circle at top right, ${alpha(
            theme.palette.secondary.main,
            0.12,
          )} 0%, transparent 25%), linear-gradient(180deg, #070b14 0%, #0b1020 100%)`,
          minHeight: "100vh",
        },
      }),
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backdropFilter: "blur(14px)",
          backgroundColor: "rgba(11,16,32,0.7)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "none",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundImage: "none",
          border: `1px solid ${theme.palette.surface.border}`,
        }),
      },
    },
    MuiCard: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 20,
          border: `1px solid ${theme.palette.surface.border}`,
          background: theme.palette.surface.base,
          backgroundImage: "none",
          boxShadow: "none",
        }),
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: () => ({
          minWidth: "100%",
        }),
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 14,
          paddingInline: 16,
          minHeight: 40,
        },
        contained: ({ theme }) => ({
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
        }),
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          fontWeight: 700,
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 14,
          marginBottom: theme.spacing(1),
          paddingBlock: theme.spacing(1.2),
          transition: "all 160ms ease",
          "&.Mui-selected": {
            backgroundColor: alpha(theme.palette.primary.main, 0.12),
            border: `1px solid ${alpha(theme.palette.primary.main, 0.22)}`,
          },
        }),
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          minHeight: 42,
        },
        indicator: {
          height: 3,
          borderRadius: 999,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          minHeight: 42,
          textTransform: "none",
          fontWeight: 700,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
        size: "small",
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: alpha(theme.palette.common.white, 0.03),
          borderRadius: 14,
          "& fieldset": {
            borderColor: theme.palette.surface.border,
          },
        }),
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          height: 9,
          borderRadius: 999,
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          fontWeight: 800,
        },
      },
    },
  },
});
