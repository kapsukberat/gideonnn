const Discord = require('discord.js')
exports.run = (client, message, args) => {

  message.channel.send(
    new Discord.RichEmbed()
      .setColor('DARK_BLUE')
      .setAuthor('              YARDIM') 
    .setTitle('Gideon | !yardım | Discord Linki İçin Tıkla')
      .setURL('https://discord.gg/fBChbgc')
        .addField('!kurallar.','-------------------------')
      .addField('!dc.', '-------------------------')
        .addField('!mod - !mod2 - !mod3.', '-------------------------', true)
        .addField('!eğlence', '-------------------------', true)
        .addField('!coder', '-------------------------', true)
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
  name: 'yardım'
}