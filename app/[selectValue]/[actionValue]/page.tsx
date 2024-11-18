import { Box, Typography, Button, Paper } from "@mui/material";

interface PageProps {
  params: {
    selectValue: string;
    actionValue: string;
  };
}

export default function RoleSelectionPage({ params }: PageProps) {
  const { selectValue, actionValue } = params;

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
        <Typography variant="h5" align="center" gutterBottom>
          Vous avez sélectionné l&apos;enquête &quot;{selectValue}&quot; pour
          &quot;
          {actionValue}&quot;
        </Typography>
        <Typography variant="h6" align="center" gutterBottom>
          Sélectionnez votre rôle
        </Typography>
        <form
          action={`/${selectValue}/${actionValue}/handle-role`}
          method="post"
        >
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Button
              type="submit"
              name="role"
              value="codeur"
              variant="contained"
              color="primary"
              sx={{ mr: 2 }}
            >
              Codeur
            </Button>
            <Button
              type="submit"
              name="role"
              value="expert"
              variant="contained"
              color="secondary"
            >
              Expert
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}
