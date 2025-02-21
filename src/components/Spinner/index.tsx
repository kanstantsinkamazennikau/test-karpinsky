import { CircularProgress } from "@mui/material";
import "./style.scss";

export const Spinner = () => {
  return (
    <div className="spinner-background">
      <CircularProgress />
    </div>
  );
};
