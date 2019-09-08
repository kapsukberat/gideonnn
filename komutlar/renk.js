const Discord = require('discord.js');
exports.run = (client, message, args) => {

  if (!message.guild) {
  const ozelmesajuyari = new Discord.RichEmbed()
  .setColor(0xFF0000)
  .setTimestamp()
  .setAuthor(message.author.username, message.author.avatarURL)
  .addField(':warning: **Uyarı** :warning:', '`renk-ver` **adlı komutu özel mesajlarda kullanamazsın.**')
  return message.author.sendEmbed(ozelmesajuyari); }
  if (!message.member.hasPermission("MANAGE_ROLES")) return message.reply('Bunun için gerekli iznin yok');
  let guild = message.guild
  let rol = message.mentions.roles.first()  
  let user = message.mentions.members.first() 

  if (!user) return message.reply('**Kime Renk Verceğimi Yazmadın!**').catch(console.error);
  if (rol.length < 1) return message.reply('**Renki belirtmedin**');
user.addRole(rol);
  
   const embed = new Discord.RichEmbed()
        .setDescription(`${user} kullanıcısına başarıyla ${rol} rolü verildi!`)
        .setFooter('Renk verme sistemi', client.user.avatarURL)
        .setColor("RANDOM")
        .setTimestamp()
    message.channel.send({embed})
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['renkver'],
  permLevel: 0
};

exports.help = {
  name: 'renk-ver',
  description: 'İstediğiniz kişiyi istediğiniz rolü verir.',
  usage: 'renk-ver [kullanıcı] [@rol]'
};