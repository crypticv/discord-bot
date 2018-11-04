const Discord = require('discord.js');
const xp = require('./jsonhelpers/xp.json');

module.exports.run = (client, message, args, botconfig) => {
  var uxp = xp[message.author.id].xp;
  var ulvl = xp[message.author.id].level;
  var unext = xp[message.author.id].next;
  var icon = message.author.displayAvatarURL;

  var uInfo = new Discord.RichEmbed()
    .setTitle(message.author.username)
    .addField("Level:",`${ulvl}`)
    .addField("XP:",`${uxp} / ${unext}`)
    .setThumbnail(icon)
    .setColor("#AEAF1F")
  message.channel.send(uInfo)
}

module.exports.help = {
  name: "level"
}
