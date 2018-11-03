const botconfig = require("./botconfig.json");
const auth = require("./auth.json");
const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client();

const delay = (msec) => new Promise((resolve) => setTimeout(resolve, msec));

client.on("ready", () => {

  console.log(`${client.user.username} is online on ${client.guilds.size} servers!`);
  client.user.setActivity(`the sweet sound of bugs and exceptions... 🎶`, {type:"LISTENING"});
});
// client.on("guildMemberAdd", (member) => {
//   console.log(New User "${member.user.username}" has joined "${member.guild.name}");
//   member.guild.channels.get("lounge").send("${member.user.username}" has joined this server);
// });
//
//    this is already done with dyno
//    also if you do a git pull you can start the server if you put the auth.json in.
//
// client.on("message", async () => {
//   if(message.member.roles.has(role.id)) {
//   console.log(Yay, the author of the message has the role!);
// } else {
//   message.reply('Sorry, I`m not allowed to respond to people without a role.');
// };
// });

client.on("message", message => {
  let full_command = message.content.split(" ");

  if(message.author.bot) return;
  //if(message.channel.type === "dm") return;
  if (!full_command[0].startsWith(botconfig.prefix)) return;

  let command = full_command[0].split(botconfig.prefix).slice(1).join('');
  let args = full_command.slice(1);

  if (command == "hi"){
    message.channel.send("Hi, how are you doing?");
  }

  else if(command == "ping" || command == "pong"){
    if (command == "ping"){
      message.channel.send("pong");
      message.channel.send(`**Ping**: ${client.ping}ms`);
    } else if (command == "pong"){
      message.channel.send("Ping");
    }
  }

  else if (command == "uptime") {
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
  }else if(command == `botinfo`){

    let bicon = client.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setDescription("Bot Information")
    .setColor("#E88049")
    .setThumbnail(bicon)
    .addField("Bot Name", client.user.username)
    .addField("Created On", client.user.createdAt);

    return message.channel.send(botembed);
  }
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  else if(command == "ban"){

    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send("Can't find user! Usage: $ban (user) (reason)");
    let bReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("No can do pal! You dont have Admin");
    if(bUser.hasPermission("ADMINISTRATOR")) return message.channel.send("That person can't be kicked!");
    if(bReason == "") return message.channel.send(`You must give a reason to ban this person. Usage: $ban [user] [reason]`)
    let bicon = bUser.user.displayAvatarURL;

    let banEmbed = new Discord.RichEmbed()
    .setThumbnail(bicon)
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
  } else if(command == `kick`){

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
});

client.login(auth.token);
