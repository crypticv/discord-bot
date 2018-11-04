const Discord = require('discord.js');

module.exports.run = async (client, message,args, botconfig) =>{
  let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!kUser) return message.channel.send("Can't find user! usage: $kick (user) (reason)");
  let kReason = args.join(" ").slice(22);3
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("No can do, pal!");
  if(kUser.roles.find("name","Admin")) return message.channel.send("That person can't be kicked!");
  if (kReason == "") return message.channel.send(`You must give a reason to kick this person. Usage: $kick [user] [reason]`)
  let bicon = kUser.user.displayAvatarURL;

  let kickEmbed = new Discord.RichEmbed()
  .setThumbnail(bicon)
  .setDescription("~Kick~")
  .setColor("#E88049")
  .addField("Kicked User", `${kUser} with ID ${kUser.id}`)
  .addField("Kicked By", `<@${message.author.username}> with ID ${message.author.id}`)
  .addField("Kicked In", message.channel)
  .addField("Time", message.createdAt)
  .addField("Reason", kReason);

  let kickChannel = message.guild.channels.find(`name`, "incidents");
  if(!kickChannel) return message.channel.send("Can't find incidents channel.");

  message.guild.member(kUser).kick(kReason);
  mention = message.mentions.users.first();

  if (mention == null) {return;}
  message.delete();
  mentionMessage = kReason;
  // await delay(100);
  mention.sendMessage(`You have been kicked for ${kReason} by ${message.author}`);
  // channel.startTyping(5);
  kickChannel.send(kickEmbed);
}

module.exports.help = {
  name:"kick"
}
