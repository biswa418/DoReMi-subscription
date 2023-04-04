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
        endDate = new Date(startDate);

        if (planName != 'PREMIUM') {
            endDate.setDate(endDate.getDate() + 21);
        } else {
            endDate.setDate(endDate.getDate() + 81);
        }

        dateString = endDate.toISOString();

        console.log(`RENEWAL_REMINDER ${plan} ${dateString.slice(8, 10)}-${dateString.slice(5, 7)}-${dateString.slice(0, 4)}`);
        ansString += `RENEWAL_REMINDER ${plan} ${dateString.slice(8, 10)}-${dateString.slice(5, 7)}-${dateString.slice(0, 4)}\n`;

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
