import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

import TextField from '@material-ui/core/TextField'

const cardStyles = {
  root: {
    padding: '10px',
    margin: '10px 0',
    width: '100%'
  },
}

const PersonalInfoCard = withStyles(cardStyles)((props) => <Paper className={props.classes.root}>{props.children}</Paper>)
class PersonalInfo extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {

    const { name, groupName, email, phone, onChange } = this.props
    return (
      <PersonalInfoCard>
        <Grid container>
          <Typography variant="subtitle1">Please enter your information</Typography>
          <Grid item xs={12}>
            <TextField
              style={{ width: '100%' }}
              id="outlined-name"
              label="GSR Name"
              value={name}
              onChange={(e) => onChange(e.target.value, 'name')}
              margin="normal"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              style={{ width: '100%' }}
              id="outlined-groupname"
              label="Group Name"
              value={groupName}
              onChange={(e) => onChange(e.target.value, 'groupName')}
              margin="normal"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              style={{ width: '100%' }}
              id="outlined-phonenumber"
              label="Phone Number"
              value={phone}
              onChange={(e) => onChange(e.target.value, 'phone')}
              margin="normal"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              style={{ width: '100%' }}
              id="outlined-email"
              label="Email"
              value={email}
              onChange={(e) => onChange(e.target.value, 'email')}
              margin="normal"
              variant="outlined"
            />
          </Grid>
        </Grid>
      </PersonalInfoCard>
    )
  }
}

export default PersonalInfo
