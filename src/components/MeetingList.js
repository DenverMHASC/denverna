import React from "react"
import { capitalize, map } from 'lodash'
import {Tabs, Tab, AppBar } from '@material-ui/core'
import bmltInject from '../bmltInject'
import MeetingListTable from './MeetingListTable'

const MeetingList = (props) => {
	const { meetings } = props
	if (!Object.keys(meetings).length) {
		return <h4>Loading...</h4>
	}
	return (
		<div className="container">
			<DayAnchors days={Object.keys(meetings)} />
			{map(meetings, (meetings, day) => <MeetingListTable key={day} day={day} meetings={meetings} />)}
			<RequestChangeFormLink />
		</div>
	)
}

const DayAnchors = ({ days }) => {
	return (
		<AppBar position='static' >
			<Tabs
				indicatorColor="primary"
			>
				{
					days.map((day, idx) => (<Tab key={idx} href={`#${day}`} label={capitalize(day)} />))
				}
			</Tabs>
		</AppBar>

	)
}

const RequestChangeFormLink = () => (
	<div className="pull-right">
		<a target="_blank" href="https://goo.gl/forms/l39LqMIAczxXDXWj1">Request Meeting List Updates</a>
	</div>
)


export default bmltInject(MeetingList)