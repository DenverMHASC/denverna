import moment from 'moment'
import momentDurationFormatSetup from "moment-duration-format"
momentDurationFormatSetup(moment);

const buildNotesString = (text, info) => {
    if (text && info) {
        return `${text}, ${info}`
    }
    if (text && !info) {
        return text
    }
    if (!text && info) {
        return info
    }
    return ''
}

export const meetingConv = (bmltMeeting) => {
    const duration = bmltMeeting.duration_time !== "01:00:00"
        ? moment.duration(bmltMeeting.duration_time, 'HH:mm:ss').format('mm [min]')
        : null

    const format = duration
        ? bmltMeeting.formats.split(',').concat(duration)
        : bmltMeeting.formats.split(',')

    return {
        time: moment(bmltMeeting.start_time, 'HH:mm:ss').format('h:mm a'),
        name: bmltMeeting.meeting_name,
        format,
        sortStartTime: bmltMeeting.start_time,
        address: {
            city: bmltMeeting.location_municipality,
            notes: buildNotesString(bmltMeeting.location_text, bmltMeeting.location_info),
            street: bmltMeeting.location_street,
            unit: '',
            zip: bmltMeeting.location_postal_code_1,
        }
    }
}

const numberDayToHumanReadable = {
    1: 'sunday',
    2: 'monday',
    3: 'tuesday',
    4: 'wednesday',
    5: 'thursday',
    6: 'friday',
    7: 'saturday',
}

export const bmltResponseToMeetingData = (body) => {
    return body.reduce((acc, bmltMeeting) => {
        acc[numberDayToHumanReadable[bmltMeeting.weekday_tinyint]].push(meetingConv(bmltMeeting))
        return acc
    }, { sunday: [], monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [] })
}
