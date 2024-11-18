import { Box, Typography, Paper } from "@mui/material";

interface PageProps {
  params: {
    selectValue: string;
    actionValue: string;
    roleValue: string;
  };
}

export default function FinalPage({ params }: PageProps) {
  const { selectValue, actionValue, roleValue } = params;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Paper elevation={3} sx={{ p: 4, maxWidth: 500, width: "100%" }}>
        <Typography variant="h4" align="center" gutterBottom>
          Sélection Finale
        </Typography>
        <Typography variant="h6" align="center">
          Enquête : {selectValue}
        </Typography>
        <Typography variant="h6" align="center">
          Action : {actionValue}
        </Typography>
        <Typography variant="h6" align="center">
          Rôle : {roleValue}
        </Typography>
      </Paper>
    </Box>
  );
}
