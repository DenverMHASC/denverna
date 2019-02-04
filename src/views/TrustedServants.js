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
const TRUSTED_SERVANT_FORMS_ID = "1YDoK845zn7ekr6sNpZT2Loi29dOvAbkLolovWDOMZaI"
const TRUSTED_SERVANT_CONTACT_INFO_ID = "1P7PVwFR2FLD4p-IG2jTWUIqe78uezegywdIfAxBBors"
const TRUSTED_SERVANT_GUIDELINES_ID = "1hoDrNQgIyTxSOQ-91cKFjDnJJbkKXU49kfSYWr6IBDY"

const styles = theme => ({
});


class TrustedServants extends React.Component {
  constructor() {
    super()
    this.state = {
      links: [],
      contactInfo: [],
      forms: [],
      guidelines: [],
    }
  }

  componentDidMount() {
    GetSheetDone.labeledCols(TRUSTED_SERVANT_RESOURCES_DATA_ID).then(sheet => {
      this.setState({ links: sheet.data })
    })

    GetSheetDone.labeledCols(TRUSTED_SERVANT_CONTACT_INFO_ID).then(sheet => {
      this.setState({ contactInfo: sheet.data })
    })

    GetSheetDone.labeledCols(TRUSTED_SERVANT_FORMS_ID).then(sheet => {
      this.setState({ forms: sheet.data })
    })

    GetSheetDone.labeledCols(TRUSTED_SERVANT_GUIDELINES_ID).then(sheet => {
      console.log(sheet.data)
      this.setState({ guidelines: sheet.data })
    })
  }

  render() {
    const { classes } = this.props
    return (
      <OuterContainer style={{ justifyContent: 'space-between' }}>
        <Grid style={{ maxWidth: '445px', minWidth: '445px', margin: "20px" }} item md={4} sm={12} >
          <Card>
            <CardHeader
              title={<Typography style={{ color: '#225c83' }} variant='h5'>Mile High Area Service Meetings</Typography>}
              subheader={<Typography style={{ color: '#225c83' }}>Attend a subcommittee meeting and get involved!</Typography>}
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
              title={<Typography style={{ color: '#225c83' }} variant='h5'>Contact Information</Typography>}
              subheader={<Typography style={{ color: '#225c83' }}>Email addresses to contact area trusted servants.</Typography>}
            />
            <CardContent>
              <div style={{ width: '100%' }}>
                <List dense={false}>
                  {this.state.contactInfo.map(({ emaillabel, emailaddr }, ix) => {
                    return (
                      <ListItem key={ix}>
                        <ListItemIcon><EmailIcon /></ListItemIcon>
                        <ListItemText
                          primary={<Typography style={{ color: '#225c83', fontSize: '16px' }}>{emailaddr}</Typography>}
                          secondary={<Typography style={{ color: '#225c83' }}>{emaillabel}</Typography>}
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
              title={<Typography style={{ color: '#225c83' }} variant='h5'>Trusted Servant Resources</Typography>}
              subheader={<Typography style={{ color: '#225c83' }}>Helpful resources from those involved in service.</Typography>}
            />
            <CardContent>
              <div style={{ width: '100%' }}>
                <List dense={false}>
                  <a target="_new" style={{ textDecoration: 'none' }} href="https://drive.google.com/drive/folders/19EQDeMd0vpdiZDd9Bai_OOOXsQTVTN6F?usp=sharing">
                    <ListItem>
                      <ListItemIcon><FolderIcon /></ListItemIcon>
                      <ListItemText
                        primary={<Typography style={{ color: '#225c83', fontSize: '16px' }}>Area Minutes Archive</Typography>}
                      />
                    </ListItem>
                  </a>
                  {this.state.links.map(({ linktext, linkurl }, ix) => {
                    return (
                      <a key={ix} target="_new" style={{ textDecoration: 'none' }} href={linkurl}>
                        <ListItem>
                          <ListItemIcon><LinkIcon /></ListItemIcon>
                          <ListItemText primary={<Typography style={{ color: '#225c83', fontSize: '16px' }}>{linktext}</Typography>} />
                        </ListItem>
                      </a>
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
              title={<Typography style={{ color: '#225c83' }} variant='h5'>Forms</Typography>}
              subheader={<Typography style={{ color: '#225c83' }}>Useful forms for area meetings.</Typography>}
            />
            <CardContent>
              <div style={{ width: '100%' }}>
                <List dense={false}>
                  {this.state.forms.map(({ linktext, linkurl }, ix) => {
                    return (
                      <a key={ix} target="_new" style={{ textDecoration: 'none' }} href={linkurl}>
                        <ListItem>
                          <ListItemIcon><FileCopyIcon /></ListItemIcon>
                          <ListItemText primary={<Typography style={{ color: '#225c83', fontSize: '16px' }}>{linktext}</Typography>} />
                        </ListItem>
                      </a>
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
              title={<Typography style={{ color: '#225c83' }} variant='h5'>Guidelines</Typography>}
              subheader={<Typography style={{ color: '#225c83' }}>Mile High Area subcommittee guidelines.</Typography>}
            />
            <CardContent>
              <div style={{ width: '100%' }}>
                <List dense={false}>
                  {this.state.guidelines.map(({ label, link }, ix) => {
                    return (
                      <a key={ix} target="_new" style={{ textDecoration: 'none' }} href={link}>
                        <ListItem>
                          <ListItemIcon><FileCopyIcon /></ListItemIcon>
                          <ListItemText primary={<Typography style={{ color: '#225c83', fontSize: '16px' }}>{label}</Typography>} />
                        </ListItem>
                      </a>
                    )
                  })}
                </List>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </OuterContainer>
    )
  }
}

export default withStyles(styles)(TrustedServants)
