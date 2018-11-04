const Discord = require('discord.js');

module.exports.run = async (client, message, args, botconfig) =>{
  let command = message.content.split(" ")[0].split(botconfig.prefix).slice(1).join('');
  if (command == "ping"){
    message.channel.send("pong");
    message.channel.send(`**Ping**: ${client.ping}ms`);
  }
}

module.exports.help = {
  name:"ping"
}
