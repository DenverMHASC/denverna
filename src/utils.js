export const generateGoogleMapsLinkFromAddress = ({ street, city, zip }) => {
  return `https://www.google.com/maps/place/${street.replace(/\W/g, '+')},+${city},+CO+${zip}`
}
