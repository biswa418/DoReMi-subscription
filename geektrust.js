const fs = require("fs");
let subscription = require('./subscription');
let Subscription = new subscription();

const filename = process.argv[2];
// const filename = './sample_input/input2.txt';

data = fs.readFileSync(filename).toString().trim().split('\n');

Subscription.start(data);