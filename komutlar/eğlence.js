const Discord = require('discord.js')
exports.run = (client, message, args) => {

  message.channel.send(
    new Discord.RichEmbed()
      .setColor('DARK_BLUE')
      .setAuthor('              EĞLENCE') 
    .setTitle('Gideon | !yardım | Discord Linki İçin Tıkla')
      .setURL('https://discord.gg/fBChbgc')
        .addField('!zıt-renk.','-------------------------')
      .addField('!gta.', '-------------------------')
        .addField('!15-temmuz çal.', '-------------------------', true)
        .addField('!csgokasa', '-------------------------', true)
        .addField('!google', '-------------------------', true)
        .addField('!mcsunucu', '-------------------------', true)
        .addField('!rip', '-------------------------', true)
        .addField('!saat', '-------------------------', true)
        .addField('!wtcn', '-------------------------', true)
        .addField('!intihar-et', '-------------------------', true)
        .addField('>>>>>>>>!eğlence-2<<<<<<<<', '-------------------------', true)
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
  name: 'eğlence'
}