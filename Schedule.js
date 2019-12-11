var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('./client_secret.json');
var env = require('./.env');

// Create a document object using the ID of the spreadsheet - obtained from its URL.
var doc = new GoogleSpreadsheet(env.SPREADSHEET_ID);

module.exports = {
  displaySchedule: function (message, params){
    // Authenticate with the Google Spreadsheets API.
    doc.useServiceAccountAuth(creds, function (err) {
      // Get all of the rows from the spreadsheet.
      data = []
      upcoming = []
      printString = "\n"
      printString2= "\n"
      doc.getRows(1, function (err, rows) {
        rows.forEach(row => {
          brent = new Date(row.brentscampaign + " " + row._cokwr)
          anil = new Date(row.anilscampaign + " " +  row. _cre1l)
          temp = brent.toString().substr(0,24) + "|" + anil.toString().substr(0,24)
          printString += temp + "\n"
          data.push(temp)
          if (brent > Date.now() && anil > Date.now()){
            console.log(temp)
            upcoming.push(temp)
            printString2 += temp + "\n"
          }
        });
        if (params == "full"){
          message.channel.send(printString)
        }else{
          if (params == "next"){
            message.channel.send(upcoming[0])
          }else{
            message.channel.send(printString2)
          }
        }
      });
    });
  }
}



