const Discord = require('discord.js');

module.exports.run = async (client, message, args, botconfig) =>{
  var rpsArray = [
    `Rock :black_circle:`,
    `Paper :page_facing_up:`,
    `Scissors :scissors:`
  ]
  var rps = rpsArray[Math.floor(Math.random() * rpsArray.length)];
  if (rps.toString() = `Rock :black_circle:`){
    var rpsIcon = ('./images/rock.gif')
  } else if (rps.toString() = `Paper :page_facing_up:`) {
    var rpsIcon = ('./images/paper.gif')
  } else {
    var rpsIcon = ('./images/paper.gif')
  }
  //message.reply(`${rps}, ${embedColor}`)
  let rpsEmbed = new Discord.RichEmbed()
  .setThumbnail(rpsIcon)
  .setDescription(rps.toString())
  .setcolor("0xffffff")
  .setTitle(`I choose...`);
  message.channel.send(rpsEmbed);
}

module.exports.help = {
  name:"rps"
}
