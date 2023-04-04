const moment = require('moment');

//print all the details
module.exports = function printDetails(startDate, type, topUp, price) {
    if (!startDate) {
        console.log('SUBSCRIPTIONS_NOT_FOUND');
        return;
    }

    let currentPrice = {
        "FREE": 0,
        "MUSIC_PERSONAL": 100,
        "MUSIC_PREMIUM": 250,
        "VIDEO_PERSONAL": 200,
        "VIDEO_PREMIUM": 500,
        "PODCAST_PERSONAL": 100,
        "PODCAST_PREMIUM": 300,
        "FOUR_DEVICE": 50,
        "TEN_DEVICE": 100
    }

    let planName, endDate, dateString, ansString = '';

    for (let plan of Object.keys(type)) {
        planName = type[plan];

        if (planName != 'PREMIUM') {
            endDate = moment(startDate, 'DD-MM-YYYY').add(21, 'd');
        } else {
            endDate = moment(startDate, 'DD-MM-YYYY').add(81, 'd');
        }

        if (startDate.format('MM') == '02' && planName == 'PREMIUM') {
            endDate = moment(endDate, 'DD-MM-YYYY').subtract(2, 'days');
        } else if (startDate.format('MM') == '02') {
            endDate = moment(endDate, 'DD-MM-YYYY').subtract(3, 'days');
        }

        if (startDate.format('MM') == '07' && planName == 'PREMIUM') {
            endDate = moment(endDate, 'DD-MM-YYYY').add(1, 'days');
        }

        console.log(`RENEWAL_REMINDER ${plan} ${endDate.format('DD-MM-YYYY')}`);
        ansString += `RENEWAL_REMINDER ${plan} ${endDate.format('DD-MM-YYYY')}\n`;

        //price calculation
        if (planName != 'FREE') {
            price += currentPrice[`${plan}_${planName}`];
        }
    }

    let topup = Object.keys(topUp);
    let months = topUp[topup];

    if (topup.length > 0) {
        price += currentPrice[topup] * months;
    }

    console.log(`RENEWAL_AMOUNT ${price}`);
    ansString += `RENEWAL_AMOUNT ${price}`;

    return ansString;
}
