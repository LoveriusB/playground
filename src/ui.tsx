import React from "react";
import { Box, Card, CardContent, Chip, Paper, Stack, Typography } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import WifiRoundedIcon from "@mui/icons-material/WifiRounded";

export const Root = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  color: theme.palette.text.primary,
}));

export const HeroHeader = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

export const SectionPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: 24,
  background: theme.palette.surface.base,
}));

export const SoftCard = styled(Card)(({ theme }) => ({
  background: theme.palette.surface.soft,
  alignItems: "center",
  display: "flex",
  height: "100%",
}));

export const SoftPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: 16,
  background: theme.palette.surface.soft,
}));

export const KpiIconBox = styled(Box)(({ theme }) => ({
  width: 48,
  height: 48,
  borderRadius: 12,
  display: "grid",
  placeItems: "center",
  backgroundColor: alpha(theme.palette.primary.main, 0.12),
  color: theme.palette.primary.main,
}));

export const PreviewFrame = styled(Paper)<{ ownerState: { portrait: boolean } }>(({ theme, ownerState }) => ({
  width: ownerState.portrait ? 76 : 110,
  height: ownerState.portrait ? 122 : 76,
  borderRadius: 12,
  padding: 6,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.18)}`,
  backgroundColor: alpha(theme.palette.primary.main, 0.05),
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const PreviewInner = styled(Paper)<{ ownerState: { kind: string } }>(({ theme, ownerState }) => {
  const backgrounds: Record<string, string> = {
    Retail: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.65)} 0%, ${alpha(
      theme.palette.secondary.main,
      0.55,
    )} 100%)`,
    Hospitality: `linear-gradient(135deg, ${alpha(theme.palette.warning.main, 0.65)} 0%, ${alpha(
      theme.palette.error.main,
      0.45,
    )} 100%)`,
    Corporate: `linear-gradient(135deg, ${alpha(theme.palette.info.main, 0.55)} 0%, ${alpha(
      theme.palette.primary.dark,
      0.55,
    )} 100%)`,
    Event: `linear-gradient(135deg, ${alpha(theme.palette.success.main, 0.55)} 0%, ${alpha(
      theme.palette.primary.main,
      0.45,
    )} 100%)`,
  };

  return {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    background: backgrounds[ownerState.kind] ?? backgrounds.Event,
  };
});

export const DenseStack = styled(Stack)(({ theme }) => ({
  gap: theme.spacing(2),
}));

export function getStatusColor(status: string) {
  if (status === "Online" || status === "Published" || status === "Active") return "success" as const;
  if (status === "Warning" || status === "Pending") return "warning" as const;
  return "error" as const;
}

export function getStatusIcon(status: string) {
  if (status === "Online" || status === "Published" || status === "Active") {
    return <CheckCircleRoundedIcon fontSize="small" />;
  }
  if (status === "Warning" || status === "Pending") {
    return <WarningAmberRoundedIcon fontSize="small" />;
  }
  return <WifiRoundedIcon fontSize="small" />;
}

export function SectionCard({
  title,
  action,
  children,
}: {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <SectionPaper elevation={0}>
      <Stack spacing={2.5}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">{title}</Typography>
          {action}
        </Stack>
        {children}
      </Stack>
    </SectionPaper>
  );
}

export function KPI({
  title,
  value,
  caption,
  icon,
}: {
  title: string;
  value: string;
  caption: string;
  icon: React.ReactNode;
}) {
  return (
    <Card>
      <CardContent>
        <Stack spacing={1.6}>
          <KpiIconBox>{icon}</KpiIconBox>
          <Box>
            <Typography variant="body2" color="text.secondary">
              {title}
            </Typography>
            <Typography variant="h4">{value}</Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            {caption}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}

export function ScreenPreviewCard({ type, orientation }: { type: string; orientation: string }) {
  const portrait = orientation === "Portrait";
  return (
    <PreviewFrame elevation={0} ownerState={{ portrait }}>
      <PreviewInner elevation={0} ownerState={{ kind: type }} />
    </PreviewFrame>
  );
}

export function StatusChip({ status }: { status: string }) {
  return <Chip size="small" icon={getStatusIcon(status)} color={getStatusColor(status)} label={status} />;
}
