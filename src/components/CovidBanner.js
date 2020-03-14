
import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'
import { withRouter } from 'react-router-dom'
import classNames from 'classnames';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';


const red = '#df2a00'
const white = '#fff'

class CovidBanner extends Component {
  constructor(props) {
    super(props)

    this.state = {
      open: true
    }
    this.handleClose = this.handleClose.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClose() {
    this.setState({ open: false })
  }

  handleClick() {
    const { history } = this.props
    history.push('/covid')
  }

  render() {

    const message = (
      <Typography onClick={this.handleClick} style={{ color: white, textDecoration: 'underline', cursor: 'pointer' }} variant="h5" component="span">
        Coronavirus disease (COVID-19) Alert
      </Typography>
    )

    return (
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={this.state.open}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
      >
        <ContentWrapper
          onClose={this.handleClose}
          variant="error"
          message={message}
        />
      </Snackbar>
    )
  }
}

// <a
// style={{ color: white }}
// href="https://www.na.org/admin/include/spaw2/uploads/pdf/Coronavirus_web_message_12Mar.pdf"
// target="_blank"
// >
// View NAWS coronavirus statement
// </a>

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const styles1 = theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

const ContentWrapper = withStyles(styles1)(Content);

function Content(props) {
  const { classes, className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={classNames(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  );
}




const styles = {
  root: {
    backgroundColor: red,
  }
}

export default withStyles(styles)(withRouter(CovidBanner))