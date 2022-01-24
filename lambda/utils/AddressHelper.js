"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.countryBounds = exports.fixNumber = exports.getAddressObject = exports.getLogbookAddress = exports.getStreetAddressNew = exports.getStreetAddress = void 0;
exports.getStreetAddress = (streetInfo) => {
    let street = '';
    let postcode = 0;
    let city = '';
    let country = '';
    let houseNumber = '';
    if (streetInfo.address.road)
        street = streetInfo.address.road;
    else if (streetInfo.address.pedestrian) {
        street = streetInfo.address.pedestrian;
    }
    if (streetInfo.address.postcode)
        postcode = streetInfo.address.postcode;
    if (streetInfo.address.city)
        city = streetInfo.address.city;
    if (streetInfo.address.country)
        country = streetInfo.address.country;
    if (streetInfo.address.house_number)
        houseNumber = streetInfo.address.house_number;
    if (streetInfo.address.housenumber)
        houseNumber = streetInfo.address.housenumber;
    return street + (houseNumber != '' ? ' ' + houseNumber : '') + ', ' + postcode + (city != '' ? ', ' + city : '') + (country != '' ? ', ' + country : '');
};
exports.getStreetAddressNew = (addressInfo) => {
    const objAddress = exports.getAddressObject(addressInfo);
    return {
        address: objAddress.street
            + (objAddress.houseNumber != '' ? ' ' + objAddress.houseNumber : '')
            + (objAddress.postcode != 0 ? ', ' + objAddress.postcode : '')
            + (objAddress.city != '' ? ' ' + objAddress.city : '')
            + (objAddress.country != '' ? ', ' + objAddress.country : ''),
        more: objAddress
    };
};
exports.getLogbookAddress = (addressInfo) => {
    const objAddress = exports.getAddressObject(addressInfo);
    return {
        address: (objAddress.street ? ' ' + objAddress.street : '')
            + (objAddress.houseNumber ? ' ' + objAddress.houseNumber : '')
            + (objAddress.countrycode ? ', ' + objAddress.countrycode : '')
            + (objAddress.postcode != 0 ? ' ' + objAddress.postcode : '')
            + (objAddress.city ? ' ' + objAddress.city : ''),
        //+ (objAddress.country!=''?', ' + objAddress.country:''),
        more: objAddress
    };
};
exports.getAddressObject = (addressInfo) => {
    let street = '';
    let postcode = 0;
    let city = '';
    let state = '';
    let district = '';
    let country = '';
    let houseNumber = '';
    let locality = '';
    let countrycode = '';
    if (addressInfo.type == 'house') {
        street = addressInfo.street;
        if (addressInfo.housenumber != undefined && addressInfo.housenumber != null)
            houseNumber = addressInfo.housenumber;
    }
    else
        street = addressInfo.name;
    if (addressInfo.postcode != undefined && addressInfo.postcode != null)
        postcode = addressInfo.postcode;
    if (addressInfo.city != undefined && addressInfo.city != null)
        city = addressInfo.city;
    if (addressInfo.country != undefined && addressInfo.country != null)
        country = addressInfo.country;
    if (addressInfo.state != undefined && addressInfo.state != null)
        state = addressInfo.state;
    if (addressInfo.district != undefined && addressInfo.district != null)
        district = addressInfo.district;
    if (addressInfo.locality != undefined && addressInfo.locality != null)
        locality = addressInfo.locality;
    if (addressInfo.countrycode != undefined && addressInfo.countrycode != null)
        countrycode = addressInfo.countrycode;
    return { street, houseNumber, postcode, city, state, district, country, locality, countrycode };
};
exports.fixNumber = (num, fix) => {
    return num;
    num = num.toString();
    num = num.slice(0, (num.indexOf(".")) + fix + 1);
    return Number(num);
};
exports.countryBounds = () => {
    return {
        'EN': [167.740111, 8.731796, 167.740111, 8.731796],
        'DE': [5.9, 47.266667, 15.033333, 55.05],
        'IT': [1.35, 35.483333, 20.433333, 48.533333],
        'FR': [-5.133333, 41.333333, 9.533333, 51.083333],
        'ES': [-18.166667, 27.633333, 4.333333, 43.916667],
        'PT': [-31.266667, 30.033333, -5, 42.15],
        'PL': [14, 45.5, 26.5, 54.833333]
    };
};
//# sourceMappingURL=AddressHelper.js.map