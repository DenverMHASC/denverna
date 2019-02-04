import React from 'react'
import {
  Typography,
  withStyles,
  Card,
  CardContent,
} from '@material-ui/core'
import FolderIcon from '@material-ui/icons/Folder';
import EmailIcon from '@material-ui/icons/Email';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import LinkIcon from '@material-ui/icons/LinkSharp';
import GetSheetDone from 'get-sheet-done'
import OuterContainer from '../components/OuterContainer'


const PUBLIC_RELATIONS_ID = "1O04SSyO3AIAPG-RBQbQ9ZVSlYG3EAcQl_31S26Le-0Q"


const styles = theme => ({
});


class TrustedServants extends React.Component {
  constructor() {
    super()
    this.state = {
      content: [],
    }
  }

  componentDidMount() {
    GetSheetDone.labeledCols(PUBLIC_RELATIONS_ID).then(sheet => {
      this.setState({ content: sheet.data })
    })
  }

  render() {
    const { classes } = this.props
    return (
      <OuterContainer>
        <Card style={{ width: '100%', marginTop: '20px' }}>
          <CardContent>
            {this.state.content.map(({ header, body }, ix) => {
              return (
                <div style={{ marginBottom: '20px' }} key={ix}>
                  <Typography style={{ color: '#225c83' }} variant='h5'>{header}</Typography>
                  <Typography style={{ color: '#225c83' }}>{body}</Typography>
                </div>
              )
            })}
            <Typography><a href="http://www.na.org">More info on www.na.org</a></Typography>
          </CardContent>
        </Card>
      </OuterContainer>
    )
  }
}

export default withStyles(styles)(TrustedServants)
