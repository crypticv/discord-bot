const Discord = require('discord.js');

module.exports.run = async (client, message, args, botconfig) =>{
  if (args[0] == "ms"){
    message.channel.send(`**Client Uptime**  :  ${client.uptime}ms`);
    console.log(`Client uptime  :  ${client.uptime}ms`);
    return;
  }

  let totalSeconds = (client.uptime / 1000);
  let hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = Math.floor(totalSeconds % 60);
  let ms = client.uptime % 1000;
  message.channel.send(`**Client Uptime**  :  ${hours} hours, ${minutes} minutes, ${seconds} seconds, ${ms} milliseconds`);
  console.log(`Client uptime  :  ${hours} hours, ${minutes} minutes, ${seconds} seconds, ${ms} milliseconds`);
}

module.exports.help = {
  name:"uptime"
}
