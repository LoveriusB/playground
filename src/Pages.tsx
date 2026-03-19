import React from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  IconButton,
  LinearProgress,
  MenuItem,
  Paper,
  Select,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import SyncRoundedIcon from "@mui/icons-material/SyncRounded";
import FolderRoundedIcon from "@mui/icons-material/FolderRounded";
import ViewCarouselRoundedIcon from "@mui/icons-material/ViewCarouselRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import PlayCircleOutlineRoundedIcon from "@mui/icons-material/PlayCircleOutlineRounded";
import ImageRoundedIcon from "@mui/icons-material/ImageRounded";
import VideocamRoundedIcon from "@mui/icons-material/VideocamRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";
import AutoGraphRoundedIcon from "@mui/icons-material/AutoGraphRounded";
import StorageRoundedIcon from "@mui/icons-material/StorageRounded";
import SecurityRoundedIcon from "@mui/icons-material/SecurityRounded";
import PaletteRoundedIcon from "@mui/icons-material/PaletteRounded";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded";
import BoltRoundedIcon from "@mui/icons-material/BoltRounded";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import TvRoundedIcon from "@mui/icons-material/TvRounded";
import { screens, playlists, media, schedules, employees, roleCards } from "./db";
import {
  DenseStack,
  HeroHeader,
  KPI,
  ScreenPreviewCard,
  SectionCard,
  SoftCard,
  SoftPaper,
  KpiIconBox,
  StatusChip,
} from "./ui";
import { appTheme } from "./theme";

const WideTextField = (props: React.ComponentProps<typeof TextField>) => <TextField fullWidth {...props} />;

export function DashboardPage() {
  return (
    <DenseStack>
      <HeroHeader>
        <Typography variant="h3">Operations dashboard</Typography>
        <Typography color="text.secondary" marginTop={1}>
          A global view of fleet health, publishing activity, and scheduled content across all locations.
        </Typography>
      </HeroHeader>

      <SectionCard
        title="Getting started"
        action={<Chip label="New workspace guide" size="small" color="primary" variant="outlined" />}
      >
        <Grid container spacing={2}>
          {[
            {
              step: "01",
              title: "Add your first media",
              description: "Upload images or videos to your media library so you have content ready to publish.",
              cta: "Open Media Library",
            },
            {
              step: "02",
              title: "Create a playlist",
              description: "Group your assets into a loop and define the order in which they should play.",
              cta: "Create playlist",
            },
            {
              step: "03",
              title: "Create a screen",
              description: "Register a new screen, choose its orientation, and connect it to a location or group.",
              cta: "Add screen",
            },
            {
              step: "04",
              title: "Assign content",
              description: "Attach a playlist to a screen so the player knows what to display.",
              cta: "Assign playlist",
            },
            {
              step: "05",
              title: "Schedule playback",
              description: "Plan exactly when content should run during the day, week, or campaign period.",
              cta: "Create schedule",
            },
            {
              step: "06",
              title: "Invite your team",
              description: "Give colleagues access to manage content, screens, or reporting.",
              cta: "Invite employee",
            },
          ].map((item) => (
            <Grid key={item.step} size={{ xs: 12, md: 6, xl: 2 }}>
              <SoftCard sx={{ height: "100%" }}>
                <CardContent>
                  <Stack spacing={2}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Chip label={item.step} size="small" color="primary" />
                      <Chip label="To do" size="small" variant="outlined" />
                    </Stack>
                    <Box>
                      <Typography variant="h6">{item.title}</Typography>
                      <Typography variant="body2" color="text.secondary" marginTop={0.75}>
                        {item.description}
                      </Typography>
                    </Box>
                    <Button variant="outlined" size="small">
                      {item.cta}
                    </Button>
                  </Stack>
                </CardContent>
              </SoftCard>
            </Grid>
          ))}
        </Grid>
      </SectionCard>

      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, sm: 6, xl: 3 }}>
          <KPI
            title="Online screens"
            value="58"
            caption="Healthy and synced devices"
            icon={<CheckCircleRoundedIcon />}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, xl: 3 }}>
          <KPI title="Warnings" value="9" caption="Requires attention soon" icon={<WarningAmberRoundedIcon />} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, xl: 3 }}>
          <KPI title="Active playlists" value="24" caption="Published right now" icon={<ViewCarouselRoundedIcon />} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, xl: 3 }}>
          <KPI title="Media assets" value="386" caption="Across all libraries" icon={<FolderRoundedIcon />} />
        </Grid>
      </Grid>

      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, xl: 8 }}>
          <SectionCard title="Fleet activity" action={<Button size="small">View details</Button>}>
            <Grid container spacing={2}>
              {screens.map((screen) => (
                <Grid key={screen.name} size={{ xs: 12, md: 6 }}>
                  <SoftCard>
                    <CardContent>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <ScreenPreviewCard type={screen.type} orientation={screen.orientation} />
                        <Stack spacing={0.75} minWidth={0}>
                          <Typography fontWeight={800}>{screen.name}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {screen.location}
                          </Typography>
                          <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" useFlexGap>
                            <StatusChip status={screen.status} />
                            <Typography variant="caption" color="text.secondary">
                              Last sync {screen.sync}
                            </Typography>
                          </Stack>
                        </Stack>
                      </Stack>
                    </CardContent>
                  </SoftCard>
                </Grid>
              ))}
            </Grid>
          </SectionCard>
        </Grid>

        <Grid size={{ xs: 12, xl: 4 }}>
          <SectionCard title="Recent activity">
            <Stack spacing={1.5}>
              {[
                "Menu Board A synced a new playlist version",
                "Promo Kiosk 03 reported a stale player state",
                "Spring Campaign Loop published to 12 screens",
                "2 screens joined the Retail network group",
              ].map((item, i) => (
                <React.Fragment key={item}>
                  {i > 0 && <Divider />}
                  <Typography variant="body2" color="text.secondary">
                    {item}
                  </Typography>
                </React.Fragment>
              ))}
            </Stack>
          </SectionCard>
        </Grid>
      </Grid>
    </DenseStack>
  );
}

export function ScreensPage() {
  return (
    <DenseStack>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        justifyContent="space-between"
        alignItems={{ xs: "stretch", md: "center" }}
      >
        <HeroHeader>
          <Typography variant="h3">Screen fleet overview</Typography>
          <Typography color="text.secondary" marginTop={1}>
            Monitor every deployed screen and spot issues before they become visible on site.
          </Typography>
        </HeroHeader>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
          <Button variant="outlined" startIcon={<SyncRoundedIcon />}>
            Refresh status
          </Button>
          <Button variant="contained" startIcon={<AddRoundedIcon />}>
            Add screen
          </Button>
        </Stack>
      </Stack>

      <SectionCard
        title="Fleet list"
        action={
          <Stack direction="row" spacing={1}>
            <Chip label="72 total" size="small" />
            <Button size="small" startIcon={<FilterListRoundedIcon />}>
              Filters
            </Button>
          </Stack>
        }
      >
        <Grid container spacing={2}>
          {screens.map((screen) => (
            <Grid key={screen.name} size={{ xs: 12 }}>
              <SoftCard>
                <CardContent>
                  <Grid container spacing={2.5} alignItems="center">
                    <Grid size={{ xs: 12, md: 2 }}>
                      <ScreenPreviewCard type={screen.type} orientation={screen.orientation} />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                      <Stack spacing={1}>
                        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap alignItems="center">
                          <Typography variant="h6">{screen.name}</Typography>
                          <Chip size="small" label={screen.type} variant="outlined" />
                          <Chip size="small" label={screen.orientation} variant="outlined" />
                        </Stack>
                        <Typography variant="body2" color="text.secondary">
                          {screen.location}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Playlist: {screen.playlist}
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid size={{ xs: 12, md: 3 }}>
                      <Typography variant="body2" color="text.secondary">
                        Health score
                      </Typography>
                      <Stack direction="row" spacing={1.2} alignItems="center" marginTop={1}>
                        <Box flexGrow={1}>
                          <LinearProgress
                            variant="determinate"
                            value={screen.health}
                            color={screen.health >= 80 ? "success" : screen.health >= 40 ? "warning" : "error"}
                          />
                        </Box>
                        <Typography fontWeight={800}>{screen.health}%</Typography>
                      </Stack>
                    </Grid>
                    <Grid size={{ xs: 12, md: 3 }}>
                      <Stack spacing={1.2} alignItems={{ xs: "flex-start", md: "flex-end" }}>
                        <StatusChip status={screen.status} />
                        <Typography variant="body2" color="text.secondary">
                          Last sync: {screen.sync}
                        </Typography>
                        <Stack direction="row" spacing={1}>
                          <Button variant="outlined" size="small">
                            Details
                          </Button>
                          <IconButton size="small">
                            <MoreHorizRoundedIcon />
                          </IconButton>
                        </Stack>
                      </Stack>
                    </Grid>
                  </Grid>
                </CardContent>
              </SoftCard>
            </Grid>
          ))}
        </Grid>
      </SectionCard>
    </DenseStack>
  );
}

export function PlaylistsPage() {
  return (
    <DenseStack>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        justifyContent="space-between"
        alignItems={{ xs: "stretch", md: "center" }}
      >
        <HeroHeader>
          <Typography variant="h3">Playlists</Typography>
          <Typography color="text.secondary" marginTop={1}>
            Group assets into loops, manage durations, and publish the right sequence to the right screens.
          </Typography>
        </HeroHeader>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
          <Button variant="outlined">Import structure</Button>
          <Button variant="contained" startIcon={<AddRoundedIcon />}>
            Create playlist
          </Button>
        </Stack>
      </Stack>

      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, xl: 8 }}>
          <SectionCard
            title="Playlist library"
            action={
              <Tabs value={0}>
                <Tab label="All" />
                <Tab label="Published" />
                <Tab label="Drafts" />
              </Tabs>
            }
          >
            <Grid container spacing={2}>
              {playlists.map((playlist) => (
                <Grid key={playlist.name} size={{ xs: 12, md: 6 }}>
                  <Card>
                    <CardContent>
                      <Stack spacing={2}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Chip size="small" label={playlist.category} variant="outlined" />
                          <StatusChip status={playlist.status} />
                        </Stack>
                        <Box>
                          <Typography variant="h6">{playlist.name}</Typography>
                          <Typography variant="body2" color="text.secondary" marginTop={0.5}>
                            {playlist.assets} assets · {playlist.duration} total loop · {playlist.screens} screens
                          </Typography>
                        </Box>
                        <SoftPaper elevation={0}>
                          <Stack spacing={1}>
                            <Typography variant="body2" fontWeight={700}>
                              Sequence preview
                            </Typography>
                            {["Intro card", "Main promo video", "Offer card", "Brand closing frame"].map((x) => (
                              <Stack key={x} direction="row" justifyContent="space-between">
                                <Typography variant="caption" color="text.secondary">
                                  {x}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  8–20 sec
                                </Typography>
                              </Stack>
                            ))}
                          </Stack>
                        </SoftPaper>
                        <Stack direction="row" spacing={1}>
                          <Button variant="outlined" size="small">
                            Edit
                          </Button>
                          <Button variant="contained" size="small" startIcon={<PlayCircleOutlineRoundedIcon />}>
                            Preview
                          </Button>
                        </Stack>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </SectionCard>
        </Grid>

        <Grid size={{ xs: 12, xl: 4 }}>
          <SectionCard title="Publishing shortcuts">
            <Stack spacing={1.5}>
              {[
                "Assign a playlist to a screen group",
                "Duplicate an existing campaign loop",
                "Save a seasonal playlist template",
                "Preview playback before publishing",
              ].map((item, i) => (
                <React.Fragment key={item}>
                  {i > 0 && <Divider />}
                  <Typography variant="body2" color="text.secondary">
                    {item}
                  </Typography>
                </React.Fragment>
              ))}
            </Stack>
          </SectionCard>
        </Grid>
      </Grid>
    </DenseStack>
  );
}

export function SchedulingPage() {
  return (
    <DenseStack>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        justifyContent="space-between"
        alignItems={{ xs: "stretch", md: "center" }}
      >
        <HeroHeader>
          <Typography variant="h3">Scheduling</Typography>
          <Typography color="text.secondary" marginTop={1}>
            Plan playlists by day, time slot, location, or campaign window without touching the screens manually.
          </Typography>
        </HeroHeader>
        <Button variant="contained" startIcon={<AddRoundedIcon />}>
          New schedule
        </Button>
      </Stack>

      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, xl: 7 }}>
          <SectionCard
            title="Scheduled rules"
            action={
              <Select value="week" size="small">
                <MenuItem value="week">This week</MenuItem>
              </Select>
            }
          >
            <Stack spacing={2}>
              {schedules.map((rule) => (
                <SoftCard key={rule.title}>
                  <CardContent>
                    <Grid container spacing={2} alignItems="center">
                      <Grid size={{ xs: 12, md: 5 }}>
                        <Stack spacing={0.9}>
                          <Typography variant="h6">{rule.title}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            Playlist: {rule.playlist}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Target: {rule.target}
                          </Typography>
                        </Stack>
                      </Grid>
                      <Grid size={{ xs: 6, md: 3.5 }}>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <AccessTimeRoundedIcon fontSize="small" color="action" />
                          <Typography variant="body2" color="text.secondary">
                            {rule.time}
                          </Typography>
                        </Stack>
                      </Grid>
                      <Grid size={{ xs: 6, md: 3.5 }}>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <CalendarMonthRoundedIcon fontSize="small" color="action" />
                          <Typography variant="body2" color="text.secondary">
                            {rule.days}
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </CardContent>
                </SoftCard>
              ))}
            </Stack>
          </SectionCard>
        </Grid>

        <Grid size={{ xs: 12, xl: 5 }}>
          <SectionCard title="Weekly timeline mock">
            <Grid container spacing={1.25}>
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => (
                <Grid key={day} size={{ xs: 12, sm: 6 }}>
                  <SoftPaper elevation={0}>
                    <Stack spacing={1.2}>
                      <Typography fontWeight={800}>{day}</Typography>
                      <Box height={10} borderRadius={999} bgcolor={i < 5 ? "warning.main" : "primary.main"} />
                      <Box height={10} borderRadius={999} bgcolor="primary.main" />
                      <Box height={10} borderRadius={999} bgcolor="success.main" />
                    </Stack>
                  </SoftPaper>
                </Grid>
              ))}
            </Grid>
          </SectionCard>
        </Grid>
      </Grid>
    </DenseStack>
  );
}

export function MediaLibraryPage() {
  return (
    <DenseStack>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        justifyContent="space-between"
        alignItems={{ xs: "stretch", md: "center" }}
      >
        <HeroHeader>
          <Typography variant="h3">Media library</Typography>
          <Typography color="text.secondary" marginTop={1}>
            Store, preview, tag, and organize visual assets before inserting them into playlists.
          </Typography>
        </HeroHeader>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
          <Button variant="outlined" startIcon={<BoltRoundedIcon />}>
            Bulk actions
          </Button>
          <Button variant="contained" startIcon={<CloudUploadRoundedIcon />}>
            Upload media
          </Button>
        </Stack>
      </Stack>

      <SectionCard
        title="Asset gallery"
        action={
          <Stack direction="row" spacing={1}>
            <Chip label="386 assets" size="small" />
            <Button size="small" startIcon={<FilterListRoundedIcon />}>
              Filters
            </Button>
          </Stack>
        }
      >
        <Grid container spacing={2}>
          {media.map((asset, idx) => (
            <Grid key={asset.name} size={{ xs: 12, sm: 6, xl: 4 }}>
              <Card>
                <CardContent>
                  <Stack spacing={2}>
                    <Paper
                      elevation={0}
                      style={{
                        height: 170,
                        borderRadius: 16,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background:
                          idx % 2 === 0
                            ? `linear-gradient(135deg, ${alpha(appTheme.palette.primary.main, 0.55)} 0%, ${alpha(
                                appTheme.palette.secondary.main,
                                0.4,
                              )} 100%)`
                            : `linear-gradient(135deg, ${alpha(appTheme.palette.warning.main, 0.45)} 0%, ${alpha(
                                appTheme.palette.error.main,
                                0.35,
                              )} 100%)`,
                        border: `1px solid ${appTheme.palette.surface.border}`,
                      }}
                    >
                      {asset.kind === "Video" ? (
                        <VideocamRoundedIcon style={{ fontSize: 42, color: "white" }} />
                      ) : (
                        <ImageRoundedIcon style={{ fontSize: 42, color: "white" }} />
                      )}
                    </Paper>
                    <Box>
                      <Typography fontWeight={800}>{asset.name}</Typography>
                      <Typography variant="body2" color="text.secondary" marginTop={0.5}>
                        {asset.kind} · {asset.size} · {asset.duration}
                      </Typography>
                    </Box>
                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                      <Chip size="small" label={asset.tag} />
                      <Chip size="small" variant="outlined" label={asset.kind} />
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </SectionCard>
    </DenseStack>
  );
}

export function AnalyticsPage() {
  return (
    <DenseStack>
      <HeroHeader>
        <Typography variant="h3">Analytics</Typography>
        <Typography color="text.secondary" marginTop={1}>
          High-level insights around playback, sync reliability, content usage, and screen performance.
        </Typography>
      </HeroHeader>

      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, sm: 6, xl: 3 }}>
          <KPI title="Avg uptime" value="98.4%" caption="Across active screens" icon={<BarChartRoundedIcon />} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, xl: 3 }}>
          <KPI
            title="Daily playbacks"
            value="12.8k"
            caption="Estimated loops rendered"
            icon={<PlayCircleOutlineRoundedIcon />}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, xl: 3 }}>
          <KPI title="Sync success" value="99.1%" caption="Successful pushes" icon={<AutoGraphRoundedIcon />} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, xl: 3 }}>
          <KPI title="Top category" value="Retail" caption="Most scheduled content family" icon={<TvRoundedIcon />} />
        </Grid>
      </Grid>

      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, xl: 8 }}>
          <SectionCard title="Playback trends">
            <Grid container spacing={1.5}>
              {[70, 82, 65, 88, 92, 78, 84, 96, 72, 86, 90, 76].map((h, i) => (
                <Grid key={i} size={{ xs: 1 }}>
                  <Stack spacing={1} alignItems="center" justifyContent="flex-end" height={220}>
                    <Box
                      width="100%"
                      height={`${h}%`}
                      borderRadius={999}
                      bgcolor={i % 3 === 0 ? "secondary.main" : "primary.main"}
                    />
                    <Typography variant="caption" color="text.secondary">
                      {i + 1}
                    </Typography>
                  </Stack>
                </Grid>
              ))}
            </Grid>
          </SectionCard>
        </Grid>

        <Grid size={{ xs: 12, xl: 4 }}>
          <SectionCard title="Top performing playlists">
            <Stack spacing={1.5}>
              {playlists.slice(0, 4).map((playlist, idx) => (
                <SoftPaper key={playlist.name} elevation={0}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Box>
                      <Typography fontWeight={800}>{playlist.name}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {playlist.screens} screens · {playlist.duration}
                      </Typography>
                    </Box>
                    <Chip size="small" label={`${96 - idx * 4}%`} color="success" />
                  </Stack>
                </SoftPaper>
              ))}
            </Stack>
          </SectionCard>
        </Grid>
      </Grid>
    </DenseStack>
  );
}

export function EmployeesPage() {
  return (
    <DenseStack>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        justifyContent="space-between"
        alignItems={{ xs: "stretch", md: "center" }}
      >
        <HeroHeader>
          <Typography variant="h3">Employees</Typography>
          <Typography color="text.secondary" marginTop={1}>
            Invite employees, define what they can access, and control who manages screens, playlists, schedules, and
            settings.
          </Typography>
        </HeroHeader>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
          <Button variant="outlined">Export access list</Button>
          <Button variant="contained" startIcon={<AddRoundedIcon />}>
            Invite employee
          </Button>
        </Stack>
      </Stack>

      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, md: 6, xl: 3 }}>
          <KPI
            title="Total members"
            value="18"
            caption="Users with access to this workspace"
            icon={<SecurityRoundedIcon />}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6, xl: 3 }}>
          <KPI title="Pending invites" value="3" caption="Invitations awaiting acceptance" icon={<TuneRoundedIcon />} />
        </Grid>
        <Grid size={{ xs: 12, md: 6, xl: 3 }}>
          <KPI title="Admins" value="2" caption="Users with full control" icon={<CheckCircleRoundedIcon />} />
        </Grid>
        <Grid size={{ xs: 12, md: 6, xl: 3 }}>
          <KPI
            title="Scoped roles"
            value="11"
            caption="Users limited to locations or groups"
            icon={<TuneRoundedIcon />}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, xl: 8 }}>
          <SectionCard
            title="Team members"
            action={
              <Stack direction="row" spacing={1}>
                <Chip label="18 employees" size="small" />
                <Button size="small" startIcon={<FilterListRoundedIcon />}>
                  Filters
                </Button>
              </Stack>
            }
          >
            <Stack spacing={2}>
              {employees.map((employee) => (
                <SoftCard key={employee.email}>
                  <CardContent>
                    <Grid container spacing={2.5} alignItems="center">
                      <Grid size={{ xs: 12, md: 4 }}>
                        <Stack direction="row" spacing={1.5} alignItems="center">
                          <Avatar>
                            {employee.name
                              .split(" ")
                              .map((part) => part[0])
                              .slice(0, 2)
                              .join("")}
                          </Avatar>
                          <Box>
                            <Typography fontWeight={800}>{employee.name}</Typography>
                            <Typography variant="body2" color="text.secondary">
                              {employee.email}
                            </Typography>
                          </Box>
                        </Stack>
                      </Grid>
                      <Grid size={{ xs: 12, md: 2 }}>
                        <Stack spacing={0.7}>
                          <Typography variant="caption" color="text.secondary">
                            Role
                          </Typography>
                          <Chip size="small" label={employee.role} variant="outlined" />
                        </Stack>
                      </Grid>
                      <Grid size={{ xs: 12, md: 2.5 }}>
                        <Stack spacing={0.7}>
                          <Typography variant="caption" color="text.secondary">
                            Access scope
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {employee.scope}
                          </Typography>
                        </Stack>
                      </Grid>
                      <Grid size={{ xs: 12, md: 1.5 }}>
                        <Stack spacing={0.7}>
                          <Typography variant="caption" color="text.secondary">
                            Status
                          </Typography>
                          <StatusChip status={employee.status} />
                        </Stack>
                      </Grid>
                      <Grid size={{ xs: 12, md: 2 }}>
                        <Stack direction="row" spacing={1} justifyContent={{ xs: "flex-start", md: "flex-end" }}>
                          <Button variant="outlined" size="small">
                            Edit access
                          </Button>
                          <IconButton size="small">
                            <MoreHorizRoundedIcon />
                          </IconButton>
                        </Stack>
                      </Grid>
                      <Grid size={{ xs: 12 }}>
                        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                          {employee.permissions.map((permission) => (
                            <Chip key={permission} size="small" label={permission} />
                          ))}
                        </Stack>
                      </Grid>
                    </Grid>
                  </CardContent>
                </SoftCard>
              ))}
            </Stack>
          </SectionCard>
        </Grid>

        <Grid size={{ xs: 12, xl: 4 }}>
          <DenseStack>
            <SectionCard title="Invite employee">
              <DenseStack>
                <WideTextField label="Work email" placeholder="name@company.com" />
                <WideTextField label="Full name" placeholder="Jane Doe" />
                <Select value="content-manager" fullWidth size="small">
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="content-manager">Content Manager</MenuItem>
                  <MenuItem value="operator">Operator</MenuItem>
                  <MenuItem value="viewer">Viewer</MenuItem>
                </Select>
                <Select value="all-screens" fullWidth size="small">
                  <MenuItem value="all-screens">All screens</MenuItem>
                  <MenuItem value="retail-network">Retail network</MenuItem>
                  <MenuItem value="hospitality-screens">Hospitality screens</MenuItem>
                  <MenuItem value="hq-lobby">HQ lobby screens</MenuItem>
                </Select>
                <Button variant="contained" startIcon={<AddRoundedIcon />}>
                  Send invitation
                </Button>
              </DenseStack>
            </SectionCard>

            <SectionCard title="Role templates">
              <Stack spacing={1.5}>
                {roleCards.map((role, index) => (
                  <React.Fragment key={role.title}>
                    {index > 0 && <Divider />}
                    <Box>
                      <Typography fontWeight={800}>{role.title}</Typography>
                      <Typography variant="body2" color="text.secondary" marginTop={0.5}>
                        {role.desc}
                      </Typography>
                    </Box>
                  </React.Fragment>
                ))}
              </Stack>
            </SectionCard>
          </DenseStack>
        </Grid>
      </Grid>
    </DenseStack>
  );
}

export function SettingsPage() {
  const settingsBlocks = [
    {
      icon: <SecurityRoundedIcon />,
      title: "Permissions & roles",
      desc: "Define who can upload media, publish playlists, or manage screens and schedules.",
    },
    {
      icon: <StorageRoundedIcon />,
      title: "Storage & retention",
      desc: "Configure how assets are stored, archived, and kept available for historical reuse.",
    },
    {
      icon: <PaletteRoundedIcon />,
      title: "Branding",
      desc: "Adjust workspace-level branding and presentation presets for white-label or client views.",
    },
    {
      icon: <TuneRoundedIcon />,
      title: "Player preferences",
      desc: "Global defaults for transitions, fallback behavior, sync intervals, and recovery rules.",
    },
  ];

  return (
    <DenseStack>
      <HeroHeader>
        <Typography variant="h3">Settings</Typography>
        <Typography color="text.secondary" marginTop={1}>
          Workspace-level preferences for governance, storage, branding, and player defaults.
        </Typography>
      </HeroHeader>

      <Grid container spacing={2.5}>
        {settingsBlocks.map((block) => (
          <Grid key={block.title} size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent>
                <Stack spacing={2}>
                  <KpiIconBox>{block.icon}</KpiIconBox>
                  <Typography variant="h6">{block.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {block.desc}
                  </Typography>
                  <Stack spacing={1.2} paddingTop={1}>
                    <SoftPaper elevation={0}>
                      <Typography variant="caption" color="text.secondary">
                        Sample control
                      </Typography>
                    </SoftPaper>
                    <SoftPaper elevation={0}>
                      <Typography variant="caption" color="text.secondary">
                        Another configuration block
                      </Typography>
                    </SoftPaper>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </DenseStack>
  );
}
