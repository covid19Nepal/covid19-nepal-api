const { task } = require("./lib");
const c = require("./lib/constants");


(async function main() {
  console.log("Running task on start...");
  await task({
    sheet: c.SHEET,
    tabs: {
      raw_data: c.SHEET_RAW_DATA
    },
    file: c.FILE_RAW_DATA
  });

  await task({
    sheet: c.SHEET,
    tabs: {
      factoids: c.SHEET_NAME_FACTOIDS, faq: c.SHEET_FAQ
    },
    file: c.FILE_WEBSITE_DATA
  });

  // await task({
  //   sheet: c.SHEET,
  //   tabs: {
  //     tested_data: c.SHEET_DATE_WISE_DELTA
  //   },
  //   file: c.FILE_STATEWISE_TESTED_DATA
  // });
  // await task({
  //   sheet: c.SHEET,
  //   tabs: {
  //     travel_history: c.SHEET_TRAVEL_HISTORY
  //   },
  //   file: c.FILE_TRAVEL_HISTORY
  // });
 
  // await task({
  //   sheet: c.SHEET,
  //   tabs: {
  //     states_tested_data: c.SHEET_StateWise_Tested_Numbers_Data
  //   },
  //   file: c.FILE_STATEWISE_TESTED_DATA
  // });
  // await task({
  //   sheet: c.SHEET,
  //   tabs: { states_daily: c.SHEET_DATE_WISE_DELTA },
  //   file: c.FILE_DATE_WISE_DELTA
  // });
  // await task({
  //   sheet: c.SHEET,
  //   tabs: {
  //     statewise: c.SHEET_STATEWISE_TAB,
  //     cases_time_series: c.SHEET_CASES_TIME_SERIES_TAB,
  //     tested: c.SHEET_Tested_Numbers_ICMR_Data,
  //   },
  //   file: c.FILE_DATA
  // });
  // await task({
  //   sheet: c.SHEET_RESOURCES,
  //   tabs: { resources: c.SHEET_RESOURCES_SHEET},
  //   file: c.FILE_RESOURCES_ESSENTIALS
  // });
  console.log("End of sheet-to-json_generic");
})();

