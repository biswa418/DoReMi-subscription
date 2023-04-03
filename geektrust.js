const fs = require("fs");

// const filename = process.argv[2];
const filename = './sample_input/input1.txt';
data = fs.readFileSync(filename).toString().trim().split('\r\n');

console.log(data);

// for (let i of data) {
//     console.log(i.trim());
// }
