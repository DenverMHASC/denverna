import moment from 'moment'
import momentDurationFormatSetup from "moment-duration-format"
momentDurationFormatSetup(moment);

const foo = {
    bus_lines: "",
    comments: "",
    contact_email_1: "",
    contact_email_2: "",
    contact_name_1: "",
    contact_name_2: "",
    contact_phone_1: "",
    contact_phone_2: "",
    distance_in_km: "",
    distance_in_miles: "",
    duration_time: "01:00:00",
    email_contact: "",
    format_shared_id_list: "17,8",
    formats: "O,D",
    id_bigint: "238",
    lang_enum: "en",
    latitude: "39.7409423",
    location_city_subsection: "",
    location_info: "",
    location_municipality: "Lakewood",
    location_nation: "USA",
    location_neighborhood: "",
    location_postal_code_1: "80215",
    location_province: "CO",
    location_street: "1510 Glen Ayr Dr. #12",
    location_sub_province: "Jefferson",
    location_text: "",
    longitude: "-105.0956871",
    meeting_name: "Earlybirds",
    published: "1",
    root_server_uri: "https://nacolorado.org/meetingList/main_server",
    service_body_bigint: "2",
    shared_group_id_bigint: "",
    start_time: "07:00:00",
    train_lines: "",
    weekday_tinyint: "7",
    worldid_mixed: "G00019897",
}

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
