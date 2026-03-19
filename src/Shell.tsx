import React from "react";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  TextField,
  Toolbar,
  Typography,
  Chip,
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import TvRoundedIcon from "@mui/icons-material/TvRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import ViewCarouselRoundedIcon from "@mui/icons-material/ViewCarouselRounded";
import ScheduleRoundedIcon from "@mui/icons-material/ScheduleRounded";
import InsightsRoundedIcon from "@mui/icons-material/InsightsRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import FolderRoundedIcon from "@mui/icons-material/FolderRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import SecurityRoundedIcon from "@mui/icons-material/SecurityRounded";
import { Root } from "./ui";

export type AppPage =
  | "Dashboard"
  | "Screens"
  | "Playlists"
  | "Scheduling"
  | "Media Library"
  | "Analytics"
  | "Employees"
  | "Settings";

const MainContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
  maxWidth: "100%",
  minWidth: "100%",
}));

const SidebarPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  height: "100%",
  borderRadius: 24,
  background: theme.palette.surface.base,
  backdropFilter: "blur(10px)",
}));

const BrandRow = styled(Stack)(({ theme }) => ({
  paddingInline: theme.spacing(1),
  paddingBlock: theme.spacing(1.5),
  marginBottom: theme.spacing(1),
}));

const BrandIconBox = styled(Box)(({ theme }) => ({
  width: 42,
  height: 42,
  borderRadius: 12,
  display: "grid",
  placeItems: "center",
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  color: theme.palette.common.white,
  boxShadow: `0 10px 30px ${alpha(theme.palette.primary.main, 0.35)}`,
}));

const TopBarSearch = styled(TextField)(({ theme }) => ({
  minWidth: 320,
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

const navItems: { label: AppPage; icon: React.ReactNode }[] = [
  { label: "Dashboard", icon: <DashboardRoundedIcon /> },
  { label: "Screens", icon: <TvRoundedIcon /> },
  { label: "Playlists", icon: <ViewCarouselRoundedIcon /> },
  { label: "Scheduling", icon: <ScheduleRoundedIcon /> },
  { label: "Media Library", icon: <FolderRoundedIcon /> },
  { label: "Analytics", icon: <InsightsRoundedIcon /> },
  { label: "Employees", icon: <SecurityRoundedIcon /> },
  { label: "Settings", icon: <SettingsRoundedIcon /> },
];

export const AppShell = ({
  page,
  onNavigate,
  children,
}: {
  page: AppPage;
  onNavigate: (page: AppPage) => void;
  children: React.ReactNode;
}) => {
  return (
    <Root>
      <AppBar position="sticky" color="transparent">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Stack direction="row" justifyContent="space-between" alignItems="center" width="100%" gap={2}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography fontWeight={900}>{page}</Typography>
                <Chip label="Mock view" size="small" color="primary" variant="outlined" />
              </Stack>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <TopBarSearch
                  placeholder="Search..."
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchRoundedIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />
                <IconButton>
                  <Badge color="error" variant="dot">
                    <NotificationsRoundedIcon />
                  </Badge>
                </IconButton>
                <Avatar>B</Avatar>
              </Stack>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      <MainContainer>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, lg: 2 }}>
            <SidebarPaper elevation={0}>
              <BrandRow direction="row" spacing={1.5} alignItems="center">
                <BrandIconBox>
                  <TvRoundedIcon />
                </BrandIconBox>
                <Box>
                  <Typography fontWeight={900} lineHeight={1}>
                    ScreenFlow
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Control center
                  </Typography>
                </Box>
              </BrandRow>

              <List>
                {navItems.map((item) => (
                  <ListItemButton
                    key={item.label}
                    selected={item.label === page}
                    onClick={() => onNavigate(item.label)}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.label} />
                  </ListItemButton>
                ))}
              </List>
            </SidebarPaper>
          </Grid>
          <Grid size={{ xs: 12, lg: 10 }}>{children}</Grid>
        </Grid>
      </MainContainer>
    </Root>
  );
};

export default AppShell;
