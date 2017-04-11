/**
 * @file jp postal code library.
 * @author Koichi Nagaoka
 */

const jsonp = require('jsonp');

// The base url of address master.
const MASTER_BASE_URL = 'https://yubinbango.github.io/yubinbango-data/data';

// Target master data name.
const MASTER_TARGET_NAME = '$yubin';

// Regex postal code format.
const REGEX_POSTAL_CODE = /(?:^|\s)*([0-9]{3})\-?([0-9]{4})(?:\s|$)*/g;

// prefecture names
const PREFECTURE_NAMES = [
  null,
  '北海道',
  '青森県',
  '岩手県',
  '宮城県',
  '秋田県',
  '山形県',
  '福島県',
  '茨城県',
  '栃木県',
  '群馬県',
  '埼玉県',
  '千葉県',
  '東京都',
  '神奈川県',
  '新潟県',
  '富山県',
  '石川県',
  '福井県',
  '山梨県',
  '長野県',
  '岐阜県',
  '静岡県',
  '愛知県',
  '三重県',
  '滋賀県',
  '京都府',
  '大阪府',
  '兵庫県',
  '奈良県',
  '和歌山県',
  '鳥取県',
  '島根県',
  '岡山県',
  '広島県',
  '山口県',
  '徳島県',
  '香川県',
  '愛媛県',
  '高知県',
  '福岡県',
  '佐賀県',
  '長崎県',
  '熊本県',
  '大分県',
  '宮崎県',
  '鹿児島県',
  '沖縄県'
];

// fetched cached address data.
const ADDRESS_DATA_CACHES = {};


/**
 * Parsing master address data.
 *
 * @param {string}    postalCode  specified postal code.
 * @param {object}    masterData  get master address data.
 * @param {function}  callback    callback function.
 */
const parseAddress = function (postalCode, masterData, callback) {

  const addressData = masterData[postalCode];

  // empty address data?
  if (!addressData) {

    // no-op
    return;

  }

  // get prefecture id
  const prefectureId = addressData[0];

  // empty prefecture id?
  if (!prefectureId) {

    // no-op
    return;

  }

  // get prefecture name
  const prefectureName = PREFECTURE_NAMES[prefectureId];

  // empty prefecture name?
  if (!prefectureName) {

    // no-op
    return;

  }

  // get city name
  var cityName = addressData[1];

  // empty city name?
  if (!cityName) {

    // set empty name
    cityName = '';

  }

  // get area name
  var areaName = addressData[2];

  // empty area name?
  if (!areaName) {

    // set empty name
    areaName = '';

  }

  // get street name
  var streetName = addressData[3];

  // empty street name?
  if (!streetName) {

    // set empty name
    streetName = '';

  }

  // response parsing data
  callback({
    'prefecture_id': prefectureId,
    'prefecture': prefectureName,
    'city': cityName,
    'area': areaName,
    'street': streetName
  });

};

global.$yubin = function (json) {

  console.log(json);

};


/**
 * Get remote address master data.
 *
 * @param {string}    areaCode  the area code of specified postal code.
 * @param {string}    townCode  the town code of specified postal code.
 * @param {function}  callback  callback function.
 */
const getAddress = function (areaCode, townCode, callback) {

  // get master data in cache.
  const addressData = ADDRESS_DATA_CACHES[areaCode];

  // exist cache?
  if (addressData) {

    // Parsing and response address data.
    parseAddress(areaCode + townCode, addressData, callback);

  }

  // get remote target master address data.
  jsonp(
    MASTER_BASE_URL + '/' + areaCode + '.js',
    { name: MASTER_TARGET_NAME },
    function (error, data) {

      // Occurred error.
      if (error) {

        // no-op
        return;

      }

      // caching master address data.
      ADDRESS_DATA_CACHES[areaCode] = data;

      // Parsing and response address data.
      parseAddress(areaCode + townCode, data, callback);

  });

};


/**
 * Get postal code.
 *
 * @param {string}    postalCode search address of the japanese postal code.
 * @param {function}  callback function.
 */
module.exports = function (postalCode, completeFunc) {

  // Empty postal code?
  if (!postalCode) {

    // no-op
    return;

  }

  // matching postal code format.
  const result = REGEX_POSTAL_CODE.exec(postalCode);

  // Illegal postal code format?
  if (!result) {

    // no-op
    return;

  }

  // extract areaCode and townCode.
  const areaCode = result[1];
  const townCode = result[2];

  // get address data and response it.
  getAddress(areaCode, townCode, completeFunc);

};
