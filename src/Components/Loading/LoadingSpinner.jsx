/**
 * The LoadingSpinner component renders a circular loading spinner with a specified size and color.
 * @returns A LoadingSpinner component is being returned, which displays a CircularProgress component
 * from the Material-UI library inside a div with the class name "loading-overlay". The
 * CircularProgress component has a size of 60 and a primary color.
 */
import "./LoadingSpinner.css"; 
import { CircularProgress } from "@mui/material";

export const LoadingSpinner = () => {
    return (<div className="loading-overlay"><CircularProgress size={60} color="primary" /></div>)
}