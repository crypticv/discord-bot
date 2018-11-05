const Discord = require('discord.js');

module.exports.run = async (client, message, args, botconfig) =>{
  var flip = Math.random() >= 0.5;
  console.log(flip);
  if (flip) return message.channel.send("Heads!")
  message.channel.send("Tales!")
}

module.exports.help = {
  name: "flipacoin"
}
