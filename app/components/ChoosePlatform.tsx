import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Paper,
  Grid,
} from "@mui/material";

export default function ChoosePlatform() {
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
          Choix de la plateforme de codification
        </Typography>
        <form action="/handle-form" method="post">
          <FormControl fullWidth margin="normal">
            <InputLabel id="select-label">Sélectionnez une enquête</InputLabel>
            <Select
              labelId="select-label"
              id="select"
              name="select"
              label="Sélectionnez une enquête"
              defaultValue=""
              required
            >
              <MenuItem value="Melopee">Melopee</MenuItem>
              <MenuItem value="EEC">EEC</MenuItem>
              <MenuItem value="IPC">IPC</MenuItem>
            </Select>
          </FormControl>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12} sm={6}>
              <Button
                type="submit"
                name="action"
                value="Emploi"
                variant="contained"
                color="primary"
                fullWidth
              >
                Emploi
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                type="submit"
                name="action"
                value="Formation"
                variant="contained"
                color="secondary"
                fullWidth
              >
                Formation
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
}
