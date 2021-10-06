import { Dialog, DialogTitle } from "@mui/material";
import React from "react";

interface NewUserDialogProps {
  open: boolean;
  handleClose: (value: string) => void;
}

const NewUserDialog: React.FC<NewUserDialogProps> = ({ open, handleClose }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Welcome!</DialogTitle>
    </Dialog>
  );
};

export default NewUserDialog;
