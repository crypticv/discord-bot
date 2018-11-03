const botconfig = require("./botconfig.json");
const auth = require("./auth.json");
const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client();

client.on("ready", async () => {

  console.log(`${client.user.username} is online on ${client.guilds.size} servers!`);
  client.user.setActivity(`the sweet sound of bugs and exceptions... 🎶`, {type:"LISTENING"});
});

client.on("message", async message => {
  let full_command = message.content.split(" ");

  if(message.author.bot) return;
  if(message.channel.type === "dm") return;
  if (!full_command[0].startsWith(botconfig.prefix)) return;

  let command = full_command[0].split(botconfig.prefix).slice(1).join('');
  let args = full_command.slice(1);

  if (command == "hi"){
    message.channel.send("Hi, how are you doing?");
  } else if(command == "ping" || command == "pong"){
    if (command == "ping"){
      message.channel.send("pong");
      message.channel.send(`**Ping**: ${client.ping}ms`);
    } else if (command == "pong"){
      message.channel.send("Ping");
    }
  }
});

client.login(auth.token);
