const Discord = require('discord.js');
const ut = require('../functions/uptime.js');

module.exports.run = async (client, message, args, botconfig) =>{
  let bicon = client.user.displayAvatarURL;
  let botembed = new Discord.RichEmbed()
    .setTitle("Bot Information")
    .setDescription("This is a custom-built bot for the [CodeTode Discord Server](https://discord.gg/tVzW6JE/).\nYou can track the bot\'s progress over at our [GitHub](https://github.com/codetode-organisation/discord-bot)!")
    .setColor("#E88049")
    .setThumbnail(bicon)
    .addField("Bot Name", client.user.username)
    .addField("Created On", client.user.createdAt)
    .addField("Uptime", `${ut(client).hours}:${ut(client).minutes}:${ut(client).seconds}`);

  return message.channel.send(botembed);
}

module.exports.help = {
  name: "botinfo"
}
