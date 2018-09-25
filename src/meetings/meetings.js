
import React from "react"
import ReactDOM from "react-dom"
import meetings, { key } from './meetingListData'
import { capitalize, map } from 'lodash'
import { Table } from 'react-bootstrap'

const MeetingList = () => {
    return (
        <div style={{ width: '90%', margin: '0 auto' }}>
            <DayAnchors days={Object.keys(meetings)} />
            {map(meetings, (meetings, day) => <MeetingListTable key={day} day={day} meetings={meetings} />)}
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
};


const Address = ({ street, unit, city, zip, notes }) => {
    notes = notes && `(${notes})`
    street = unit ? street : `${street},`
    unit = unit && `${unit},`
    return (
        <span>{street} {unit} {city} {zip} {notes}</span>
    )
}

const generateGoogleMapsLinkFromAddress = ({ street, city, zip }) => {
    return `https://www.google.com/maps/place/${street.replace(/\W/g, '+')},+${city},+CO+${zip}`
}

const MeetingRow = ({ time, name, format, address }) => {
    return (
        <tr>
            <td>{time}</td>
            <td>{name}</td>
            <td>
                <a target="_new" href={generateGoogleMapsLinkFromAddress(address)}><Address {...address} /></a>
            </td>
            <td><span>{format.join(', ')}</span></td>
        </tr>
    )
}

const DayLabel = ({ day }) => {
    return <div style={{ marginTop: '10px' }}><a name={day} /> <strong style={{ fontSize: '16px', color: '#575758' }}>{capitalize(day)}</strong></div>
}
const DayAnchors = ({ days }) => {
    return (
        <span style={{ fontSize: '20px', marginTop: '10px' }}>{days.map((d, ix) => <span key={ix}> {ix ? "|" : ''} <a href={`#${d}`}> {capitalize(d)}</a></span>)}</span>
    )
}

const MeetingListTable = ({ day, meetings }) => {
    return (
        <div>
            <DayLabel day={day} />
            <Table bordered striped style={{ width: '100%', marginTop: '10px' }}>
                <thead>
                    <tr>
                        <th width="8%">Time</th>
                        <th width="20%">Name</th>
                        <th width="50%">Address</th>
                        <th width="22%">Type</th>
                    </tr>
                </thead>
                <tbody>
                    {meetings.map((m, ix) => <MeetingRow key={ix} {...m} />)}
                </tbody>
            </Table >
        </div>
    )
}

const MeetingListKey = () => {
    return (
        <Table style={{ width: '50%' }}>
            <thead>
                <tr>
                    <th>Key</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                {map(key, (v, k) => (
                    <tr key={k}>
                        <td>{k}</td>
                        <td>{v}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}

export const renderMeetingList = () => ReactDOM.render(<MeetingList />, document.getElementById("newMeetingList"));
