var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('../../client_secret.json');
var env = require('../../config.json');
var Table = require('easy-table')

// Create a document object using the ID of the spreadsheet - obtained from its URL.
var doc = new GoogleSpreadsheet(env.SPREADSHEET_ID);

module.exports = {
  name: 'schedule',
  description: 'Displays the D&D schedule.',
  aliases: [''],
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
          months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
          days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
          bmin = brent.getMinutes()
          amin = anil.getMinutes()
          if (bmin == 0){
            bmin = "00"
          }
          if (amin == 0){
            amin = "00"
          }
          b = days[brent.getDay()] + " " + months[brent.getMonth()] + " " + brent.getDate() + " " + brent.getHours() + ":" + bmin
          a = days[anil.getDay()] + " " + months[anil.getMonth()] + " " + anil.getDate() + " " + anil.getHours() + ":" + amin

          data.cell("Brents D&D Campaign", b)
          data.cell("Anils D&D Campaign", a)
          data.newRow()
          if (brent > Date.now() || anil > Date.now()){
            upcoming.cell("Brents D&D Campaign", b)
            upcoming.cell("Anils D&D Campaign", a)
            upcoming.newRow()
            //console.log("test")
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



