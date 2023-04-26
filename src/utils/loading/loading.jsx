import './loading.css'
import CircularProgress from '@mui/material/CircularProgress'
import {
  createTheme,
  ThemeProvider,
} from "@mui/material";
const theme = createTheme({
  palette: {
    primary: {
      main:"#ee5c4d",
    },
    secondary: {
      main: "#11cb5f",
    },
    neutral: {
      main: "#ee5c4d",
      contrastText: "#092963",
    },
  },
});
const Loading = (props) => {
  return (
    <div className="Loading">
      {' '}
      <ThemeProvider theme={theme}>
          <CircularProgress color='neutral'/>
      </ThemeProvider>
      {/* <h3>{props && props.message && props.message}</h3> */}
    </div>
  )
}

export default Loading
