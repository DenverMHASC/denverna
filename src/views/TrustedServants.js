import React from 'react'
import {
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core'
import FolderIcon from '@material-ui/icons/Folder';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import LinkIcon from '@material-ui/icons/LinkSharp';
import GetSheetDone from 'get-sheet-done'

const DOCUMENT_ID = "1BLFmqqeuhRJpSagt2NWks8kTYfJ-sMCjYJtzyC8krh0"


class TrustedServants extends React.Component {
  constructor() {
    super()
    this.state = {
      links: []
    }
  }

  componentDidMount() {
    GetSheetDone.labeledCols(DOCUMENT_ID).then(sheet => {
      this.setState({ links: sheet.data })
    })
  }

  render() {
    return (
      <div>
        <Typography style={{ color: '#225c83' }} variant="h4">Trust Servant Resources</Typography>
        <div>
          <List dense={true}>
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
      </div >
    )
  }
}

export default TrustedServants
