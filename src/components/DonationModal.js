import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import venmoQr from '../../assets/venmo-qr.png'
import Typography from '@material-ui/core/Typography'
import A from '../components/A'



class ResponsiveDialog extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    const { fullScreen, handleClose, open } = this.props;

    return (
      <div>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle style={{ color: '#0f5d88' }} align="center" id="responsive-dialog-title">{"Make a Venmo Donation to the Mile High Area."}</DialogTitle>
          <DialogContent>
            <div>
              <Typography variant='subtitle1' align="center" color="primary">
                @MileHighAreaNA
              </Typography>
              <img
                style={{
                  width: '150px',
                  height: 'auto',
                  margin: '0 auto 10px',
                  display: 'block',
                  padding: '3px',
                  border: '1px solid rgb(34, 92, 131)'
                }}
                src={venmoQr}
              />
              <Typography align="center">
                Make a 7th tradition donation to @MileHighAreaNA on the venmo mobile app. You may also scan the QR above. Our 7th tradition states that "Every NA group ought to be fully self-supporting, declining outside contributions.
                <br /> <A target="_blank" href="https://docs.google.com/document/d/12Y9wmMis4Rce8oGe1hCRFdxtnAU9nriIpVnXgUo1CNQ/edit?ts=5e824d55">Click here for more detailed instructions</A>
              </Typography>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary" autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div >
    );
  }
}

export default withMobileDialog()(ResponsiveDialog);
