import React from "react"
import { capitalize, map } from 'lodash'
import { Paper, Tabs, Tab, AppBar } from '@material-ui/core'
import MeetingListKey from '../components/MeetingListKey'
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
			<MeetingListKey />
			<div>
				<p>
					"NA has no opinion on outside issues; hence the NA name ought never be drawn into public controversy."
            <br />
					Tradition 10
            <br />
					<br />
					Narcotics Anonymous is NOT affiliated with any outside organizations or
					enterprises, and has no connection whatsoever to the locations where
					N.A. meetings are held including but not limited to: religious or
					political organizations, hospitals, institutions, treatment programs,
					correctional facilities,private clubs and/or individual enterprises.
         	</p>
			</div>
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