import React from 'react'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import LinearProgress from '@material-ui/core/LinearProgress'
import withWidth from '@material-ui/core/withWidth'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'

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
      this.setState({ guidelines: sheet.data })
    })
  }

  render() {
    const { width } = this.props
    return (
      <OuterContainer width={width} style={{ justifyContent: 'space-between' }}>
        <CalendarCard />
        <GoogleSheetCard
          title='Contact Information'
          subtitle='Email addresses to contact area trusted servants.'
          data={this.state.contactInfo}
          hasSecondary={true}
          icon={<EmailIcon />}
        />
        <GoogleSheetCard
          title='Trusted Servant Resources'
          subtitle='Helpful resources from those involved in service.'
          data={this.state.links}
          icon={<LinkIcon />}
        >
        </GoogleSheetCard>
        <GoogleSheetCard
          title='Forms'
          subtitle='Useful forms for area meetings.'
          data={this.state.forms}
          icon={<FileCopyIcon />}
        />
        <GoogleSheetCard
          title='Guidelines'
          subtitle='Mile High Area subcommittee guidelines.'
          data={this.state.guidelines}
          icon={<FileCopyIcon />}
        />
      </OuterContainer>
    )
  }
}

export default withWidth()(TrustedServants)

const CalendarCard = () => (
  <Grid style={{ marginTop: '20px', marginBottom: '20px', width: '100%' }} item md={12} sm={12}  >
    <Card>
      <CardHeader
        title={<Typography style={{ color: '#225c83' }} variant='h5'>Mile High Area Service Meetings</Typography>}
        subheader={<Typography style={{ color: '#225c83' }}>Attend a subcommittee meeting and get involved! Select an event below for more information (address, time, details, etc). <br />Area Address: 2475 W 26th Ave, Denver, CO 80211</Typography>}
      />
      <CardContent>
        <iframe
          src="https://calendar.google.com/calendar/embed?showTitle=0&amp;showNav=0&amp;showDate=0&amp;showPrint=0&amp;showTabs=0&amp;showCalendars=0&amp;mode=AGENDA&amp;height=600&amp;wkst=1&amp;bgcolor=%23FFFFFF&amp;src=9ip36bqq8qgdusokmkb96n486k%40group.calendar.google.com&amp;color=%2329527A&amp;ctz=America%2FDenver"
          style={{ border: '0', margin: '0 auto', width: '1px', minWidth: '100%', height: '400px' }} frameBorder="0" scrolling="no"></iframe>
      </CardContent>
    </Card>
  </Grid>
)

const GoogleSheetCard = ({ title, subtitle, data, icon, children, hasSecondary }) => {
  if (!data[0]) return <LinearProgress />
  const keyNames = Object.keys(data[0])
  return (
    <Grid style={{ marginTop: '20px', marginBottom: '20px', width: '100%' }} item md={12} sm={12} >
      <Card>
        <CardHeader
          title={<Typography style={{ color: '#225c83' }} variant='h5'>{title}</Typography>}
          subheader={<Typography style={{ color: '#225c83' }}>{subtitle}</Typography>}
        />
        <CardContent>
          <div style={{ width: '100%' }}>
            <List dense={false}>
              {children}
              {data.map((d, ix) => {
                if (hasSecondary) {
                  return (
                    <ListItem key={ix}>
                      <ListItemIcon><EmailIcon /></ListItemIcon>
                      <ListItemText
                        primary={<Typography style={{ color: '#225c83', fontSize: '16px' }}>{d[keyNames[0]]}</Typography>}
                        secondary={<Typography style={{ wordBreak: 'break-all', color: '#225c83' }}>
                          <a href={'mailto:' + d[keyNames[1]]}> {d[keyNames[1]]}</a>
                        </Typography>}
                      />
                    </ListItem>
                  )
                }
                return (
                  <a key={ix} target="_new" style={{ textDecoration: 'none' }} href={d[keyNames[1]]}>
                    <ListItem>
                      <ListItemIcon>{icon}</ListItemIcon>
                      <ListItemText primary={<Typography style={{ color: '#225c83', fontSize: '16px' }}>{d[keyNames[0]]}</Typography>} />
                    </ListItem>
                  </a>
                )
              })}
            </List>
          </div>
        </CardContent>
      </Card>
    </Grid>
  )
}
