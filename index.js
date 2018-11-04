const botconfig = require("./botconfig.json");
const auth = require("./auth.json");
const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client();
const schedule = require('node-schedule');
const xp = require('./commands/jsonhelpers/xp.json');

const spamchannels = ["bot-commands"];

client.commands = new Discord.Collection();

fs.readdir('./commands/',(err,files)=>{

  console.log("\n\n\n[*] Starting Bot...")

  if (err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if (jsfile.length <= 0){
    console.log("\x1b[31m[!] Could not find any commands\x1b[37m");
    return;
  }

  jsfile.forEach((f,i) => {
    let props = require(`./commands/${f}`);
    console.log(`\x1b[32m[*] ${f} loaded.\x1b[37m`);
    client.commands.set(props.help.name,props);
  });
});

const delay = (msec) => new Promise((resolve) => setTimeout(resolve, msec));

client.on("ready", () => {

  var rule = new schedule.RecurrenceRule();
  rule.minute = 30;

  var j = schedule.scheduleJob(rule, function(){

  });

  console.log(`[*] ${client.user.username} bot is online on ${client.guilds.size} servers!`);
  client.user.setActivity(`the sweet sound of bugs and exceptions... 🎶`, {type:"LISTENING"});
});

client.on("message", async message => {
  if(message.author.bot) return;

  console.log(message.content);

  if (!message.content.startsWith(botconfig.prefix)){
    let xpAdd = (Math.floor(Math.random() * 7) + 8);

    if(!xp[message.author.id]){
      xp[message.author.id] = {
        xp: 0,
        level: 1,
        next: 50
      };
    }

    let curxp = xp[message.author.id].xp;
    let curlvl = xp[message.author.id].level;
    var nxtLvl = xp[message.author.id].next;

    if(nxtLvl <= curxp){
      curlvl++;
      nxtLvl = curlvl * 50;
      message.channel.send(`Congratulations to ${message.author.tag} for leveling up to ${curlvl}! :tada::tada::tada: Your next XP goal is ${nxtLvl}.`);
    }

    xp[message.author.id].level = curlvl;
    xp[message.author.id].xp = curxp + xpAdd;
    xp[message.author.id].next = nxtLvl;

    fs.writeFile("./commands/jsonhelpers/xp.json", JSON.stringify(xp), (err) => {
      if(err) console.log(err)
    });

    console.log(xp[message.author.id])
    console.log(`User: ${message.author.username} level is ${xp[message.author.id].level} and their xp is ${xp[message.author.id].xp}.`);
  }
  let full_command = message.content.split(" ");

  // if(message.channel.type === "dm") return;
  if (!full_command[0].startsWith(botconfig.prefix)) return;

  let command = full_command[0].split(botconfig.prefix).slice(1).join('');
  let args = full_command.slice(1);

  let commandFile = client.commands.get(command);
  if (commandFile) commandFile.run(client, message, args, botconfig);
});

client.login(auth.token);
