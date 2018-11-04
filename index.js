const botconfig = require("./botconfig.json");
const auth = require("./auth.json");
const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client();

client.commands = new Discord.Collection();

fs.readdir('./commands/',(err,files)=>{

  if (err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if (jsfile.length <= 0){
    console.log("could not find any commands");
    return;
  }

  jsfile.forEach((f,i) => {
    let props = require(`./commands/${f}`);
    console.log(`[*] ${f} loaded.`);
    client.commands.set(props.help.name,props);
  });
});

const delay = (msec) => new Promise((resolve) => setTimeout(resolve, msec));

client.on("ready", () => {

  console.log(`${client.user.username} is online on ${client.guilds.size} servers!`);
  client.user.setActivity(`the sweet sound of bugs and exceptions... 🎶`, {type:"LISTENING"});
});

client.on("message", message => {
  let full_command = message.content.split(" ");

  if(message.author.bot) return;
  //if(message.channel.type === "dm") return;
  if (!full_command[0].startsWith(botconfig.prefix)) return;

  let command = full_command[0].split(botconfig.prefix).slice(1).join('');
  let args = full_command.slice(1);

  let commandFile = client.commands.get(command);
  if (commandFile) commandFile.run(client, message, args, botconfig);
});

client.login(auth.token);
