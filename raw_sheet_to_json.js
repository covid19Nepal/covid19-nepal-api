const fs = require('fs');
const fetch = require('node-fetch');

sheet_id="1";
let url = "https://spreadsheets.google.com/feeds/cells/1phoem9oHmMKSa3uUMwCrSkLqAp2ucVuqm2B_OwwhfqI/"+sheet_id+"/public/values?alt=json";

let settings = { method: "Get" };
fetch(url, settings)
    .then(res => res.json())
    .then((json) => {

      console.log(json.feed.updated.$t);

//validating json file
      function IsValidJSONString(str) {
        try {
          JSON.parse(str);
        } catch (e) {

          return false;
        }
        return true;
      }

      latest =JSON.stringify(json,null,"\t");
      fs.writeFileSync('state_wise_raw.json', latest);
      console.log("completed the op!");
    });