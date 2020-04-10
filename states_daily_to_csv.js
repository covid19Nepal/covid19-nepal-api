const daily = require("./states_daily.json");
const fs = require('fs');

var confirmed_csv = "date,TT,";
var recovered_csv;
var deceased_csv;

var headers = ["date","tt"];
for (var key in daily.states_daily[0]) {
    if (key != "date" && key != "status" && key != "tt") {
        headers.push(key);
        confirmed_csv += key.toUpperCase() + ",";
    }
}
recovered_csv = confirmed_csv;
deceased_csv = confirmed_csv;

console.log(headers);
console.log(confirmed_csv);

daily.states_daily.forEach(element => {
    switch (element.status) {
        case 'Confirmed':
            confirmed_csv += "\n";
            headers.forEach(header => {
                confirmed_csv += element[header] + ",";
                // console.log(element[header]);
            });
            break;
        case 'Recovered':
            recovered_csv += "\n";
            headers.forEach(header => {
                recovered_csv += element[header] + ",";
                // console.log(element[header]);
            });
            break;
        case 'Deceased':
            deceased_csv += "\n";
            headers.forEach(header => {
                deceased_csv += element[header] + ",";
                // console.log(element[header]);
            });
            break;
    }
});

fs.writeFileSync('states_daily_csv/confirmed.csv', confirmed_csv);
fs.writeFileSync('states_daily_csv/recovered.csv', recovered_csv);
fs.writeFileSync('states_daily_csv/deceased.csv', deceased_csv);
