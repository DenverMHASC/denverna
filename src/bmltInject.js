import React from 'react'
import { bmltResponseToMeetingData } from './bmltToMeetingListData'
import axios from 'axios-jsonp-pro'
import { sortBy, mapValues } from 'lodash'


const bmltInject = (Component) => {
  return class BmltInjector extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        meetings: {}
      }
    }

    componentWillMount() {
      // Waiting for the bmlt root server version to be updated.
      axios.jsonp('https://nacolorado.org/meetingList/main_server/client_interface/jsonp/?services[]=2&switcher=GetSearchResults')
        .then(r => bmltResponseToMeetingData(r))
        .then(meetingListData => mapValues(meetingListData, (meetingsByDay, k) => {
          return sortBy(meetingsByDay, ['sortStartTime', 'name'])
        }))
        .then(meetingListData => this.setState({ meetings: meetingListData }))
    }


    render() {
      return <Component meetings={this.state.meetings} />
    }
  }
}


export default bmltInject