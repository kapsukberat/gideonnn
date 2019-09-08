const Discord = require('discord.js')
exports.run = (client, message, args) => {

  message.channel.send(
    new Discord.RichEmbed()
      .setColor('DARK_BLUE')
      .setAuthor('              EĞLENCE') 
    .setTitle('Gideon | !yardım | Discord Linki İçin Tıkla')
      .setURL('https://discord.gg/fBChbgc')
        .addField('!çeviri.','-------------------------')
        .setTimestamp()
        .setFooter('Gideonn | !yardım')
  )
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
}

exports.help = {
  name: 'eğlence-2'
}