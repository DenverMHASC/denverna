import React from "react"
import { map } from 'lodash'
import bmltInject from '../bmltInject'
import MeetingListTable from './MeetingListTable'

const MeetingList = (props) => {
	const { meetings } = props
	return (
		<div className="container">
			{map(meetings, (meetings, day) => <MeetingListTable key={day} day={day} meetings={meetings} />)}
			<RequestChangeFormLink />
		</div>
	)
}



const RequestChangeFormLink = () => (
	<div className="pull-right">
		<a target="_blank" href="https://goo.gl/forms/l39LqMIAczxXDXWj1">Request Meeting List Updates</a>
	</div>
)


export default MeetingList