import React from 'react'
import {
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Grid,
  withStyles,
  Card,
  CardHeader,
  CardContent,
} from '@material-ui/core'
import FolderIcon from '@material-ui/icons/Folder';
import EmailIcon from '@material-ui/icons/Email';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import LinkIcon from '@material-ui/icons/LinkSharp';
import GetSheetDone from 'get-sheet-done'
import OuterContainer from '../components/OuterContainer'


const TRUSTED_SERVANT_RESOURCES_DATA_ID = "1BLFmqqeuhRJpSagt2NWks8kTYfJ-sMCjYJtzyC8krh0"
const TRUST_SERVANT_CONTACT_INFO_ID = "1P7PVwFR2FLD4p-IG2jTWUIqe78uezegywdIfAxBBors"

const styles = theme => ({
});


class TrustedServants extends React.Component {
  constructor() {
    super()
    this.state = {
      links: [],
      contactInfo: [],
    }
  }

  componentDidMount() {
    GetSheetDone.labeledCols(TRUSTED_SERVANT_RESOURCES_DATA_ID).then(sheet => {
      this.setState({ links: sheet.data })
    })

    GetSheetDone.labeledCols(TRUST_SERVANT_CONTACT_INFO_ID).then(sheet => {
      this.setState({ contactInfo: sheet.data })
    })
  }

  render() {
    const { classes } = this.props
    return (
      <OuterContainer>
        <Grid style={{ maxWidth: '445px', minWidth: '445px', margin: "20px" }} item md={4} sm={12} >
          <Card>
            <CardHeader
              title="Mile High Area Service Meetings"
              subheader="Attend a subcommittee meeting and get involved!"
            />
            <CardContent>
              <iframe
                src="https://calendar.google.com/calendar/embed?showTitle=0&amp;showNav=0&amp;showDate=0&amp;showPrint=0&amp;showTabs=0&amp;showCalendars=0&amp;mode=AGENDA&amp;height=600&amp;wkst=1&amp;bgcolor=%23FFFFFF&amp;src=9ip36bqq8qgdusokmkb96n486k%40group.calendar.google.com&amp;color=%2329527A&amp;ctz=America%2FDenver"
                style={{ border: '0', margin: '0 auto', width: '100%', height: '400px' }} frameBorder="0" scrolling="no"></iframe>
            </CardContent>
          </Card>
        </Grid>
        <Grid style={{ maxWidth: '445px', minWidth: '445px', margin: "20px" }} item md={4} sm={12} >
          <Card>
            <CardHeader
              title="Contact Information"
            // subheader="Helpful resources from those involved in service."
            />
            <CardContent>
              <div style={{ width: '100%' }}>
                <List dense={true}>
                  {this.state.contactInfo.map(({ emaillabel, emailaddr }, ix) => {
                    console.log(arguments)
                    return (
                      <ListItem key={ix}>
                        <ListItemIcon><EmailIcon /></ListItemIcon>
                        <ListItemText
                          primary={emailaddr}
                          secondary={emaillabel}
                        />
                      </ListItem>
                    )
                  })}
                </List>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid style={{ maxWidth: '445px', minWidth: '445px', margin: "20px" }} item md={4} sm={12} >
          <Card>
            <CardHeader
              title="Trusted Servant Resources"
              subheader="Helpful resources from those involved in service"
            />
            <CardContent>
              <div style={{ width: '100%' }}>
                <List dense={false}>
                  <a target="_new" style={{ textDecoration: 'none' }} href="https://drive.google.com/drive/folders/19EQDeMd0vpdiZDd9Bai_OOOXsQTVTN6F?usp=sharing">
                    <ListItem>
                      <ListItemIcon><FolderIcon /></ListItemIcon>
                      <ListItemText primary="Area Minutes Archive" />
                    </ListItem>
                  </a>
                  <a target="_new" style={{ textDecoration: 'none' }} href="https://drive.google.com/drive/folders/1CbOPzwhE5LVG0-ZX1NlwvoEgwCoGkfmt">
                    <ListItem>
                      <ListItemIcon><FileCopyIcon /></ListItemIcon>
                      <ListItemText primary="Literature Order Forms" />
                    </ListItem>
                  </a>
                </List>
                <List dense={true}>
                  {this.state.links.map(({ linktext, linkurl }, ix) => {
                    return (
                      <a key={ix} target="_new" style={{ textDecoration: 'none' }} href={linkurl}>
                        <ListItem>
                          <ListItemIcon><LinkIcon /></ListItemIcon>
                          <ListItemText primary={linktext} />
                        </ListItem>
                      </a>
                    )
                  })}
                </List>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid style={{ maxWidth: '445px', minWidth: '445px', margin: "20px" }} item md={4} sm={12} ></Grid>
      </OuterContainer>
    )
  }
}

export default withStyles(styles)(TrustedServants)
