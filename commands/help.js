const Discord = require('discord.js');
const helpjson = require('./jsonhelpers/help.json');

module.exports.run = async (client, message, args, botconfig) =>{
  let bIcon = client.user.displayAvatarURL
  let helpembed = new Discord.RichEmbed()
    .setTitle("**__HELP__**")
    .setDescription("This is a custom-built bot for the [CodeTode Discord Server](https://discord.gg/tVzW6JE/).\nYou can track the bot\'s progress over at our [GitHub](https://github.com/codetode-organisation/discord-bot)!")
    .setColor("#E88049")
    .setThumbnail(bIcon)
  for (var index = 0; index < helpjson.length; index++) {
    helpembed.addField(
      `**__Command__**: ${helpjson[index].command}`,
      `**__Description__**: ${helpjson[index].description}\n**__Usage__**: \`${botconfig.prefix + helpjson[index].command} ${helpjson[index].usage}\``)
  }
  message.channel.send(helpembed);
}

module.exports.help = {
  name: "help"
}
