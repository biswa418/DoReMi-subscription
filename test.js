const subscription = require('./subscription');
const Print = require('./printDetails');
const Subscription = new subscription();

const assert = require('assert');
global.startDate;
global.type = {};
global.topUp = {};
global.price = 0;
global.data = [
    'START_SUBSCRIPTION 05-02-2022',
    'ADD_SUBSCRIPTION MUSIC PERSONAL',
    'ADD_SUBSCRIPTION VIDEO PREMIUM',
    'ADD_SUBSCRIPTION PODCAST FREE',
    'ADD_TOPUP FOUR_DEVICE 2',
    'PRINT_RENEWAL_DETAILS'
]

describe("Test case -", () => {
    beforeEach(() => {
        console.log("executes before every test");
    });

    it("show output the amount", () => {

        const temp = Subscription.start(data);

        assert.equal(temp, "RENEWAL_REMINDER MUSIC 23-02-2022\nRENEWAL_REMINDER VIDEO 25-04-2022\nRENEWAL_REMINDER PODCAST 23-02-2022\nRENEWAL_AMOUNT 700");
    });

});