import React from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { AppShell, AppPage } from "./Shell";
import { appTheme } from "./theme";
import {
  AnalyticsPage,
  DashboardPage,
  EmployeesPage,
  MediaLibraryPage,
  PlaylistsPage,
  SchedulingPage,
  ScreensPage,
  SettingsPage,
} from "./Pages";
import SignageLoginBackground from "./loginScreen";

export const App = () => {
  const [currentPage, setCurrentPage] = React.useState<AppPage>("Dashboard");

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "Dashboard":
        return <DashboardPage />;
      case "Screens":
        return <ScreensPage />;
      case "Playlists":
        return <PlaylistsPage />;
      case "Scheduling":
        return <SchedulingPage />;
      case "Media Library":
        return <MediaLibraryPage />;
      case "Analytics":
        return <AnalyticsPage />;
      case "Employees":
        return <EmployeesPage />;
      case "Settings":
        return <SettingsPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      {/* <AppShell page={currentPage} onNavigate={setCurrentPage}>
        {renderCurrentPage()}
      </AppShell> */}
      <SignageLoginBackground />
    </ThemeProvider>
  );
};

export default App;
