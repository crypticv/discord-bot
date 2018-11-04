const Discord = require('discord.js');

module.exports.run = async (client, message, args, botconfig) =>{
  message.channel.send("Hi, how are you doing?");
}

module.exports.help = {
  name:"hi"
}
