import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
    alert: {
        backgroundColor: '#14161A',
        color: 'gray',
        border: '2px solid #004DFD',
    },
    closeIcon: {
        color: 'white',
    },
}));

const ApiErrorAlert = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(true);

    return (
        <div className={classes.root}>
            <Collapse in={open}>
                <Alert
                    action={
                        <IconButton
                            aria-label="close"
                            size="small"
                            onClick={() => {
                                setOpen(false);
                            }}
                        >
                            <CloseIcon fontSize="inherit" className={classes.closeIcon} />
                        </IconButton>
                    }
                    className={classes.alert} 
                    variant="outlined"
                    severity="info"
                >
                    If you are not seeing any crypto below: There seems to be a network error from the API end causing temporary unavailability of coin data. We're aware and working on it! Apologies for any inconvenience caused. Please check back shortly. Thank you for your patience!
                </Alert>
            </Collapse>
        </div>
    );
};

export default ApiErrorAlert;
