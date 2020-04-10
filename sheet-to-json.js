const moment = require("moment");
const rawData = require('./raw_data');
const { fetchData, writeData } = require("./lib");
const { SHEET, SHEET_STATEWISE_TAB, SHEET_CASES_TIME_SERIES_TAB, SHEET_KEY_VALUES_TAB, SHEET_Tested_Numbers_ICMR_Data, FILE_DATA } = require("./lib/constants");

const tabs = {
  statewise: SHEET_STATEWISE_TAB,
  cases_time_series: SHEET_CASES_TIME_SERIES_TAB,
  key_values: SHEET_KEY_VALUES_TAB,
  tested:SHEET_Tested_Numbers_ICMR_Data,
};

function getDelta(state) {
  return  rawData.raw_data.reduce((stat, row) => {
    let stateName = row.detectedstate;
    let isToday = moment().utcOffset(330).isSame(moment(row.dateannounced, "DD-MM-YYYY"), "day");
    if (stateName && (stateName === state || state === "Total") && isToday) {
      let currentStatus = row.currentstatus;
      if (currentStatus) {
        stat.confirmed += 1;
        switch (currentStatus) {
          case "Hospitalized":
            stat.active += 1;
            break;
          case "Recovered":
            stat.recovered += 1;
            break;
          case "Deceased":
            stat.deaths += 1;
            break;
        }
      } else {
        console.error("Current status is empty in sheet for patient:", row.patientnumber);
      }
    }
    return stat;
  }, {active: 0, confirmed: 0, deaths: 0, recovered: 0});
}

async function task() {
  console.log(`Fetching data from sheets: ${SHEET}...`);
  let data = await fetchData({ sheet: SHEET, tabs });
  data.statewise = data.statewise.map(data => Object.assign(data, {delta: getDelta(data.state)}));
  console.log(`Writing data to json file: ${FILE_DATA}...`);
  await writeData({file: FILE_DATA, data});
  console.log("Operation completed!");
}

(async function main() {
  console.log("Running task on start...");
  await task();
  console.log("Created Json File With Updated Contents");
})();