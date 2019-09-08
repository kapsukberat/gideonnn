const Discord = require('discord.js')
const db = require('quick.db');

exports.run = async (client, message, args) => {
  
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);
  
  let rol = message.mentions.roles.first()
  let rolk = message.mentions.channels.first() || message.channel
  let sıfırla = db.fetch(`otorol_${message.guild.id}`)

if(args[0] === "sıfırla") {
    if(!sıfırla) {
      message.channel.send(`Ayarlanmayan şeyi sıfırlayamazsın.`)
      return
    }
    
    db.delete(`otorol_${message.guild.id}`)
    db.delete(`rolK_${message.guild.id}`)
    message.channel.send(`Otorol başarıyla sıfırlandı.`)
    return
  }

  if (!rol) {
    return message.channel.send(`Otorol olarak ayarlamak istediğin rolü etiketlemelisin.`)
    }


  
  if (!rolk) {
    return message.channel.send(`Otorol kanalını etiketlemelisin.`)
  }
  
  
  
  
  db.set(`otorol_${message.guild.id}`, rol.id)
  db.set(`rolK_${message.guild.id}` ,rolk.id)
  
   // message.channel.send(`Otorol \`${rol.name}\`, otorol kanalı ${rolk} olarak ayarlandı.`)
  
  const embed = new Discord.RichEmbed()
		.setDescription(`:white_check_mark: Otorol başarıyla ${rol.name} olarak ayarlandı! \nOtorol Mesaj kanalı başarıyla ${rolk} olarak ayarlandı.\n\nOtorol'ü kapatabilmek için **.otorol sıfırla** yazabilirsiniz!`)
		.setColor("RANDOM")
		.setTimestamp()
	message.channel.send({embed})
  
  };
    
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['oto-rol', 'otorol', 'autorole', 'setautorole'],
    permLevel: 0,
  kategori: "yetkili"
}

exports.help = {
    name: 'otorol-ayarla',
    description: 'Otorolü ayarlar.',
    usage: 'otorol <@rol>'
}