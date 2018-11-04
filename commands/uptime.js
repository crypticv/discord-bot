const Discord = require('discord.js');
const ut = require('../functions/uptime.js');

module.exports.run = async (client, message, args, botconfig) =>{
  if (args[0] == "ms"){
    message.channel.send(`**Client Uptime**  :  ${client.uptime}ms`);
    console.log(`Client uptime  :  ${client.uptime}ms`);
    return;
  }

  message.channel.send(`**Client Uptime**  :  ${ut(client).hours} hours, ${ut(client).minutes} minutes, ${ut(client).seconds} seconds, ${ut(client).ms} milliseconds`);
  console.log(`Client uptime  :  ${ut(client).hours} hours, ${ut(client).minutes} minutes, ${ut(client).seconds} seconds, ${ut(client).ms} milliseconds`);
}

module.exports.help = {
  name:"uptime"
}
