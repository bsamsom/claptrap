var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('../client_secret.json');
var env = require('../config.json');
var Table = require('easy-table')

// Create a document object using the ID of the spreadsheet - obtained from its URL.
var doc = new GoogleSpreadsheet(env.SPREADSHEET_ID);

module.exports = {
  name: 'schedule',
  description: 'displayschedule',//channel
  args: true,
  usage: '<full|upcoming|next>',
  guildOnly: false,
  execute(message, args) {
    if(message.channel){
      channel = message.channel
    }
    else{
      channel = message
    }
    // Authenticate with the Google Spreadsheets API.
    doc.useServiceAccountAuth(creds, function (err) {
      // Get all of the rows from the spreadsheet.
      data = new Table
      upcoming = new Table
      doc.getRows(1, function (err, rows) {
        rows.forEach(row => {
          brent = new Date(row.brentscampaign + " " + row._cokwr)
          anil = new Date(row.anilscampaign + " " +  row. _cre1l)
          data.cell("Brents D&D Campaign", brent.toString().substr(0,24))
          data.cell("Anils D&D Campaign", anil.toString().substr(0,24))
          data.newRow()
          if (brent > Date.now() && anil > Date.now()){
            upcoming.cell("Brents D&D Campaign", brent.toString().substr(0,24))
            upcoming.cell("Anils D&D Campaign", anil.toString().substr(0,24))
            upcoming.newRow()
          }
        });
        if (args[0] == "full"){
          channel.send("```" + data.toString() + "```")
        }else if (args[0] == "upcoming"){
          channel.send("```" + upcoming.toString() + "```")
        }else if (args[0] == "next"){
          data = upcoming.toString().split("\n")
          channel.send("```" + data[0] + "\n" + data[1] + "\n" + data[2] + "```")
        }
      });
    });
  }
}



