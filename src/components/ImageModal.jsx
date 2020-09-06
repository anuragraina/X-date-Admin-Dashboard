import React, { useState } from 'react';
import { Modal, Fade, Backdrop } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    minWidth: '430px',
    maxWidth: '700px',
    maxHeight: '700px',
    width: '50%',
  },
  thumbnail: {
    width: '100px',
    height: '50px',
    cursor: 'pointer',
  },
});

export default function ImageModal(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <img
        src={props.url}
        className={classes.thumbnail}
        alt="thumbnail"
        onClick={handleOpen}
      />
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 1000,
        }}
      >
        <Fade in={open}>
          <img src={props.url} className={classes.image} alt={props.name} />
        </Fade>
      </Modal>
    </>
  );
}
