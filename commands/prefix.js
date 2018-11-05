const Discord = require('discord.js');

module.exports.run = async (client, message, args, botconfig) =>{
  if(message.member.hasPermission("ADMINISTRATOR") {
    var prefixsel = args.[0];
    var prefixnow = botconfig.prefix;
    prefixnow = prefixsel;
    message.reply(`The prefix is now ${prefixsel}`);
  } else {message.reply('You don\'t have permission for this command.\nPlease ask staff if it\'s important.')}
}

module.exports.help = {
  name:"prefix"
}
