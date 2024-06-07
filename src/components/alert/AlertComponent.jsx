import React from 'react';
import { Modal, Box, Typography, IconButton, Alert } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import './alertStyle.css';

const AlertsComponent = ({ alerts, removeAlert }) => {
  return (
    <div className="alerts-root">
      {alerts.map((alert, index) => (
        <Modal
          key={index}
          open={alert.open}
          onClose={() => removeAlert(index)}
          aria-labelledby="alert-modal-title"
          aria-describedby="alert-modal-description"
        >
          <Box className="modal-style">
            <Alert
              severity={alert.type}
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => removeAlert(index)}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              <Typography id="alert-modal-description">
                {alert.text}
              </Typography>
            </Alert>
          </Box>
        </Modal>
      ))}
    </div>
  );
};

export default AlertsComponent;
