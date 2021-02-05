var _spacetime = _interopRequireDefault(require("spacetime"));
var _spacetimeInformal = require("spacetime-informal");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var i18n = {
  'Pacific/Midway': 'Midway Island, Samoa',
  'Pacific/Honolulu': 'Hawaii',
  'America/Juneau': 'Alaska',
  'America/Boise': 'Mountain Time',
  'America/Chihuahua': 'Chihuahua, La Paz, Mazatlan',
  'America/Phoenix': 'Arizona',
  'America/Chicago': 'Central Time',
  'America/Regina': 'Saskatchewan',
  'America/Mexico_City': 'Guadalajara, Mexico City, Monterrey',
  'America/Belize': 'Central America',
  'America/Detroit': 'Eastern Time',
  'America/Bogota': 'Bogota, Lima, Quito',
  'America/Caracas': 'Caracas, La Paz',
  'America/Santiago': 'Santiago',
  'America/St_Johns': 'Newfoundland and Labrador',
  'America/Sao_Paulo': 'Brasilia',
  'America/Tijuana': 'Tijuana, Pacific Time',
  'America/Argentina/Buenos_Aires': 'Buenos Aires, Georgetown',
  'America/Godthab': 'Greenland',
  'Atlantic/Azores': 'Azores',
  'Atlantic/Cape_Verde': 'Cape Verde Islands',
  GMT: 'Dublin, Edinburgh, Lisbon, London',
  'Africa/Casablanca': 'Casablanca, Monrovia',
  'Atlantic/Canary': 'Canary Islands',
  'Europe/Belgrade': 'Belgrade, Bratislava, Budapest, Ljubljana, Prague',
  'Europe/Sarajevo': 'Sarajevo, Skopje, Warsaw, Zagreb',
  'Europe/Brussels': 'Brussels, Copenhagen, Madrid, Paris',
  'Europe/Amsterdam': 'Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna',
  'Africa/Algiers': 'West Central Africa',
  'Europe/Bucharest': 'Bucharest',
  'Africa/Cairo': 'Cairo',
  'Europe/Helsinki': 'Helsinki, Kiev, Riga, Sofia, Tallinn, Vilnius',
  'Europe/Athens': 'Athens, Istanbul, Minsk',
  'Asia/Jerusalem': 'Jerusalem',
  'Africa/Harare': 'Harare, Pretoria',
  'Europe/Moscow': 'Moscow, St. Petersburg, Volgograd',
  'Asia/Kuwait': 'Kuwait, Riyadh',
  'Africa/Nairobi': 'Nairobi',
  'Asia/Baghdad': 'Baghdad',
  'Asia/Tehran': 'Tehran',
  'Asia/Dubai': 'Abu Dhabi, Muscat',
  'Asia/Baku': 'Baku, Tbilisi, Yerevan',
  'Asia/Kabul': 'Kabul',
  'Asia/Yekaterinburg': 'Ekaterinburg',
  'Asia/Karachi': 'Islamabad, Karachi, Tashkent',
  'Asia/Kolkata': 'Chennai, Kolkata, Mumbai, New Delhi',
  'Asia/Kathmandu': 'Kathmandu',
  'Asia/Dhaka': 'Astana, Dhaka',
  'Asia/Colombo': 'Sri Jayawardenepura',
  'Asia/Almaty': 'Almaty, Novosibirsk',
  'Asia/Rangoon': 'Yangon Rangoon',
  'Asia/Bangkok': 'Bangkok, Hanoi, Jakarta',
  'Asia/Krasnoyarsk': 'Krasnoyarsk',
  'Asia/Shanghai': 'Beijing, Chongqing, Hong Kong SAR, Urumqi',
  'Asia/Kuala_Lumpur': 'Kuala Lumpur, Singapore',
  'Asia/Taipei': 'Taipei',
  'Australia/Perth': 'Perth',
  'Asia/Irkutsk': 'Irkutsk, Ulaanbaatar',
  'Asia/Seoul': 'Seoul',
  'Asia/Tokyo': 'Osaka, Sapporo, Tokyo',
  'Asia/Yakutsk': 'Yakutsk',
  'Australia/Darwin': 'Darwin',
  'Australia/Adelaide': 'Adelaide',
  'Australia/Sydney': 'Canberra, Melbourne, Sydney',
  'Australia/Brisbane': 'Brisbane',
  'Australia/Hobart': 'Hobart',
  'Asia/Vladivostok': 'Vladivostok',
  'Pacific/Guam': 'Guam, Port Moresby',
  'Asia/Magadan': 'Magadan, Solomon Islands, New Caledonia',
  'Pacific/Fiji': 'Fiji Islands, Kamchatka, Marshall Islands',
  'Pacific/Auckland': 'Auckland, Wellington',
  'Pacific/Tongatapu': "Nuku'alofa"
};

module.exports = function objFusoHorario() {
  return Object.entries(i18n).reduce(function (obj, entry) {
    var capitais = _spacetime["default"].now()["goto"](entry[0]);
    var fusoHorario = capitais.timezone();
    var fusoHorarioDisplay = (0, _spacetimeInformal.display)(entry[0]);
    var abreviado = entry[0];
    var nomeAlternativo = entry[0];
    if (fusoHorarioDisplay && fusoHorarioDisplay.daylight && fusoHorarioDisplay.standard) {
      abreviado = capitais.isDST() ? fusoHorarioDisplay.daylight.abbrev : fusoHorarioDisplay.standard.abbrev;
      nomeAlternativo = capitais.isDST() ? fusoHorarioDisplay.daylight.name : fusoHorarioDisplay.standard.name;
    }
    obj.push({
      name: entry[0],
      label: entry[1],
      offset: fusoHorario.current.offset,
      abreviado: abreviado || '',
      nomeAlternativo: nomeAlternativo || ''
    });
    return obj;
  }).sort(function (a, b) { return a.offset - b.offset; })
    .filter(function (fusoHorario) { return !(fusoHorario.offset === undefined); })
    .map(function (fusoHorario) {
      var min = fusoHorario.offset * 60;
      var hora = "".concat(min / 60 ^ 0, ":") + (min % 60 === 0 ? '00' : Math.abs(min % 60));
      var horaLabel = "".concat(min / 60 ^ 0, ":") + (min % 60 === 0 ? '00' : Math.abs(min % 60));
      if (hora.split(":")[0].length === 1) { hora = 0 + hora.split(":")[0] + ":" + hora.split(":")[1] }
      if (hora.split(":")[0][0] === "-" && hora.split(":")[0].length === 2) { hora = hora.split(":")[0][0] + 0 + hora.split(":")[0][1] + ":" + hora.split(":")[1] }
      var prefix = "(GMT".concat(horaLabel.includes('-') ? horaLabel : "+".concat(horaLabel), ") ").concat(fusoHorario.label);
      var datehora = hora.includes('-') ? hora : "+".concat(hora)
      return {
        value: fusoHorario.name,
        label: prefix,
        abreviado: fusoHorario.abreviado,
        nomeAlternativo: fusoHorario.nomeAlternativo,
        horaPura: datehora
      };
    });
}
