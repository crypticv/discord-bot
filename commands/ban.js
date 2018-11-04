const Discord = require('discord.js');

module.exports.run = async (client, message, args, botconfig) =>{
  let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!bUser) return message.channel.send("Can't find user! Usage: $ban (user) (reason)");
  let bReason = args.join(" ").slice(22);
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("No can do pal! You dont have Admin");
  if(bUser.hasPermission("ADMINISTRATOR")) return message.channel.send("That person can't be kicked!");
  if(bReason == "") return message.channel.send(`You must give a reason to ban this person. Usage: $ban [user] [reason]`)
  let bIcon = bUser.user.displayAvatarURL;

  let banEmbed = new Discord.RichEmbed()
    .setThumbnail(bIcon)
    .setDescription("~Ban~")
    .setColor("#bc0000")
    .addField("Banned User", `${bUser} with ID ${bUser.id}`)
    .addField("Banned By", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Banned In", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", bReason);

  let incidentchannel = message.guild.channels.find(`name`, "incidents");
  if(!incidentchannel) return message.channel.send("Can't find incidents channel.");

  message.guild.member(bUser).ban(bReason);
  incidentchannel.send(banEmbed);
}

module.exports.help = {
  name:"ban"
}
