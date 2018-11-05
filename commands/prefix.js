const Discord = require('discord.js');
const fs = require('fs');

module.exports.run = (client, message, args, botconfig) =>{
  //if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("No can do pal! You dont have Admin");
  if(!message.member.hasPermission("ADMINISTRATOR")) {
    return message.reply('You don\'t have permission for this command.\nPlease ask staff if it\'s important.')
  }
  var prefixsel = args[0]
  botconfig.prefix = prefixsel;
  prefixnow = prefixsel

  fs.writeFile("../botconfig.json", JSON.stringify(botconfig.prefix), (err) => {
    if(err) console.log(err)
  });

  message.reply(`The prefix is now ${prefixsel}`)
}
module.exports.help = {
  name:"prefix"
}
