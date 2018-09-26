import moment from 'moment'

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
    formats: "O,D,WC",
    id_bigint: "164",
    lang_enum: "en",
    latitude: "39.6241751",
    location_city_subsection: "",
    location_info: "",
    location_municipality: "Englewood",
    location_nation: "USA",
    location_neighborhood: "",
    location_postal_code_1: "80111",
    location_province: "CO",
    location_street: "5400 S. Yosemite",
    location_sub_province: "Arapahoe",
    location_text: "",
    longitude: "-104.8853408",
    meeting_name: "Bring Your Own Lunch",
    published: "1",
    service_body_bigint: "2",
    shared_group_id_bigint: "",
    start_time: "12:00:00",
    train_lines: "",
    weekday_tinyint: "3",
    worldid_mixed: "G00106832",
}

export const meetingConv = (bmltMeeting) => ({
    time: moment(bmltMeeting.start_time, 'HH:mm:ss').format('h:mm a'),
    name: bmltMeeting.meeting_name,
    format: bmltMeeting.format.split(','),
    address: {
        street: bmltMeeting.location_street,
        unit: '',
        city: bmltMeeting.location_municipality,
        zip: bmltMeeting.location_postal_code_1,
        notes: bmltMeeting.location_text
    }
})

const numberDayToHumanReadable = {
    1: 'sunday',
    2: 'tuesday',
    3: 'wednesday',
    4: 'thursday',
    5: 'friday',
    6: 'saturday',
}

export const bmltResponseToMeetingData = (body) => {
    return body.reduce((acc, bmltMeeting) => {
        acc[numberDayToHumanReadable[bmltMeeting.weekday_tinyint]].concat(meetingConv(bmltMeeting))
        return acc
    }, { sunday: [], monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [] })
}
