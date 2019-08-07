const API = "http://localhost:1234/api";
const CONTACT = `${API}/contact`;
const GROUP = `${API}/groups`;

exports.GROUP = GROUP;
exports.CONTACT = CONTACT;
exports.GET_CONTACT = `${CONTACT}/get`;
exports.GETBY_GROUP = `${GROUP}/contact`;

exports.REGISTER = `${API}/signup`;
exports.LOGIN = `${API}/signin`;
