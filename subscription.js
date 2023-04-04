let Print = require('./printDetails');
const moment = require('moment');

module.exports = class Subscription {
    constructor() {
        this.startDate;
        this.type = {}; //Music, Video, Podcast (key), free, personal, premium (value)
        this.topUp = {}; //store the topups
        this.price = 0;     //final price
    }

    start() {
        for (let lines of data) {
            let line = lines.trim().split(' ');

            //check the command validity
            switch (line[0]) {
                case 'START_SUBSCRIPTION':
                    this.startSub(line);
                    break;

                case 'ADD_SUBSCRIPTION':
                    this.addSub(line);
                    break;

                case 'ADD_TOPUP':
                    this.haveTopup(line);
                    break;

                case 'PRINT_RENEWAL_DETAILS':
                    return Print(this.startDate, this.type, this.topUp, this.price);
            }
        }
    }

    haveTopup(line) {
        try {
            if (!this.type) {
                console.log('SUBSCRIPTIONS_NOT_FOUND');
                return;
            }

            if (!this.startDate) {
                console.log('ADD_TOPUP_FAILED INVALID_DATE');
                return;
            }

            if (!this.topUp[line[1]]) {
                this.topUp[line[1]] = line[2];
            } else {
                console.log('ADD_TOPUP_FAILED DUPLICATE_TOPUP');
            }

        } catch (err) {
            console.log('ADD_TOPUP_FAILED ', err);
        }
    }

    addSub(line) {
        try {
            if (!this.startDate) {
                console.log('ADD_SUBSCRIPTION_FAILED INVALID_DATE');
                return;
            }

            if (!this.type[line[1]]) {
                this.type[line[1]] = line[2];
            } else {
                console.log('ADD_SUBSCRIPTION_FAILED DUPLICATE_CATEGORY');
            }

        } catch (err) {
            console.log('ADD_SUBSCRIPTION_FAILED ', err);
        }
    }

    startSub(line) {
        //set the date of the sub
        this.startDate = moment(line[1], 'DD-MM-YYYY');

        if (!this.startDate.isValid()) {
            this.startDate = null;
            console.log('INVALID_DATE');
        }
    }
}