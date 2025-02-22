import CloseIcon from "@mui/icons-material/Close";
import { Button, Typography, useMediaQuery } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { styled, useTheme } from "@mui/material/styles";
import * as React from "react";
import { Spinner } from "../components/Spinner";
import { CLOSE } from "../constants";
import "./style.scss";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  errorText?: string | null;
  formAction: any;
  isActionPending: boolean;
};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  body,
  footer,
  errorText,
  formAction,
  isActionPending,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const isError = !!errorText;

  return (
    <React.Fragment>
      <BootstrapDialog
        fullWidth
        maxWidth={"sm"}
        fullScreen={fullScreen}
        onClose={onClose}
        aria-labelledby="customized-dialog-title"
        open={isOpen}
      >
        {isActionPending && <Spinner />}
        <form action={formAction}>
          <DialogTitle id="customized-dialog-title">{title}</DialogTitle>
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={(theme) => ({
              position: "absolute",
              right: 8,
              top: 8,
              color: theme.palette.grey[500],
            })}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent dividers>
            {isError ? <Typography>{errorText}</Typography> : body}
          </DialogContent>
          <DialogActions className="modal-actions">
            {isError ? (
              <Button
                variant="outlined"
                onClick={onClose}
                className="close-button"
              >
                {CLOSE}
              </Button>
            ) : (
              footer
            )}
          </DialogActions>
        </form>
      </BootstrapDialog>
    </React.Fragment>
  );
};
