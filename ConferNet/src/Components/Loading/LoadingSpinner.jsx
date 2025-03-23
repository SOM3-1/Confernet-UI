import "./LoadingSpinner.css"; 
import { CircularProgress } from "@mui/material";

export const LoadingSpinner = () => {
    return (<div className="loading-overlay"><CircularProgress size={32} color="inherit" /></div>)
}