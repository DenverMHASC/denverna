
import React from "react"
import ReactDOM from "react-dom"
import meetings from './meetings/meetings'
import { capitalize, map } from 'lodash'

const MeetingList = () => {
    return (
        <div>
            <DayAnchors days={Object.keys(meetings)} />
            {map(meetings, (meetings, day) => <MeetingListTable key={day} day={day} meetings={meetings} />)}
        </div>
    )
};


const Address = ({ street, unit, city, zip, notes }) => {
    notes = notes && `(${notes})`
    street = unit ? street : `${street},`
    unit = unit && `${unit},`
    return (
        <strong>{street} {unit} {city} {zip} {notes}</strong>
    )
}
const MeetingRow = ({ time, name, format, address }) => {
    return (
        <tr>
            <td><strong>{time}</strong></td>
            <td>&nbsp;</td>
            <td className="testo11az">
                <strong>{name} &#8212; {format.join(', ')} <Address {...address} /></strong>
            </td>
        </tr>
    )
}

const DayRow = ({ day }) => {
    return (
        <tr>
            <td><a name={day} /><strong style={{ fontSize: '16px', color: '#575758' }}>{capitalize(day)}</strong></td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
        </tr>
    )
}
const DayAnchors = ({ days }) => {
    return (
        <span style={{ fontSize: '20px', marginTop: '10px' }}>{days.map((d, ix) => <span> {ix ? "|" : ''} <a href={`#${d}`}> {capitalize(d)}</a></span>)}</span>
    )
}

const MeetingListTable = ({ day, meetings }) => {
    return (
        <table style={{ borderTop: '#575758 2px solid', marginTop: '10px' }}>
            <tbody>
                <DayRow day={day} />
                {meetings.map((m, ix) => <MeetingRow key={ix} {...m} />)}
            </tbody>
        </table >

    )
}

ReactDOM.render(<MeetingList />, document.getElementById("newMeetingList"));
