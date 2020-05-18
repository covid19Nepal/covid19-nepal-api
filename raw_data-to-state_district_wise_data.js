const fs = require('fs');
const moment = require("moment");
const rawData = require('./raw_data');

console.log('Starting district wise data processing');
try {
  const StateDistrictWiseData = rawData.raw_data.reduce((acc, row) => {
    const isToday = moment().utcOffset(330).isSame(moment(row.dateannounced, "DD-MM-YYYY"), "day");
    let stateName = row.detectedstate;
    console.log(stateName);
      if(!stateName) {
        stateName = 'Unknown';
      }
    if(!acc[stateName]) {
      acc[stateName] = {districtData: {}};
    }
    let districtName = row.detecteddistrict;
      if(!districtName) {
        districtName = 'Unknown';
      }
    if(!acc[stateName].districtData[districtName]) {
      
      acc[stateName].districtData[districtName] = {
        active: 0,
        confirmed: 0,
        deceased: 0,
        lastupdatedtime: "",
        recovered: 0,
        delta: {
          confirmed: 0,
          active: 0,
          recovered: 0,
          deceased: 0
        }
      };
    }
    const currentDistrict = acc[stateName].districtData[districtName];
  
    currentDistrict.confirmed++;
    if (isToday) {
      currentDistrict.delta.confirmed++;
    }
    if(row.currentstatus === 'Hospitalized') {
      currentDistrict.active++;
    } else if(row.currentstatus === 'Deceased') {
      currentDistrict.deceased++;
    } else if(row.currentstatus === 'Recovered') {
      currentDistrict.recovered++;
    }

    return acc;
  
  }, {});

  let stateDistrictWiseDataV2 = Object.keys(StateDistrictWiseData).map(state => {
    let districtData = StateDistrictWiseData[state].districtData;
    return {
      state,
      districtData: Object.keys(districtData).map(district => {
        return { district, ...districtData[district] };
      })
    }
  });

  fs.writeFileSync('state-district-wise.json', JSON.stringify(StateDistrictWiseData, null, 2));
  fs.writeFileSync('./v2/state-district-wise.json', JSON.stringify(stateDistrictWiseDataV2, null, 2));
  console.log('Starting district wise data processing ...done');
} catch(err) {
  console.log('Error processing district wise data', err);
}

