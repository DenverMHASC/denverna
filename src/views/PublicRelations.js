import React from 'react'
import LinearProgress from '@material-ui/core/LinearProgress'
import withWidth from '@material-ui/core/withWidth'
import CardContent from '@material-ui/core/CardContent'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'

import GetSheetDone from 'get-sheet-done'
import OuterContainer from '../components/OuterContainer'


const PUBLIC_RELATIONS_ID = "1O04SSyO3AIAPG-RBQbQ9ZVSlYG3EAcQl_31S26Le-0Q"

class TrustedServants extends React.Component {
  constructor() {
    super()
    this.state = {
      content: [],
    }
    this.renderContent = this.renderContent.bind(this)
  }

  componentDidMount() {
    GetSheetDone.labeledCols(PUBLIC_RELATIONS_ID).then(sheet => {
      this.setState({ content: sheet.data })
    })
  }

  renderContent() {
    if (this.state.content.length === 0) {
      return <LinearProgress />
    }
    return (
      <div>
        {this.state.content.map(({ header, body }, ix) => {
          return (
            <div style={{ marginBottom: '20px' }} key={ix}>
              <Typography style={{ color: '#225c83' }} variant='h5'>{header}</Typography>
              <Typography style={{ color: '#225c83' }}>{body}</Typography>
            </div>
          )
        })}
        <Typography><a href="http://www.na.org">More info on www.na.org</a></Typography>
      </div>
    )
  }

  render() {
    const { width } = this.props
    return (
      <OuterContainer width={width}>
        <Card style={{ width: '100%', marginTop: '20px' }}>
          <CardContent>
            {this.renderContent()}
          </CardContent>
        </Card>
      </OuterContainer>
    )
  }
}

export default withWidth()(TrustedServants)
