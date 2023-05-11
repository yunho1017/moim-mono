export default function getPhoneNumberWithCountryCode(
  phone?: Moim.User.IUserPhone,
) {
  if (!phone) {
    return "";
  }

  return `+${phone.countryCode} ${phone.subscriberNumber}`;
}
