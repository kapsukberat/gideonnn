const express = require('express');
const app = express();
const http = require('http');
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);
const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
const Jimp = require('jimp');
const db = require('quick.db');
let kufurEngelle = JSON.parse(fs.readFileSync("./jsonlar/kufurEngelle.json", "utf8"));
require('./util/eventLoader')(client);


var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};


client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(aliases => {
      client.aliases.set(aliases, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("KICK_MEMBERS")) permlvl = 1;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.on('guildMemberAdd', async (member, guild, message) => {
//CodAre
 let otorol = await db.fetch(`otorol_${member.guild.id}`)
let rol = member.guild.roles.get(otorol)
 let kanal = await db.fetch(`rolK_${member.guild.id}`)
 if (!otorol) return;
else {
 try {
  //CodAre

  if (!kanal) return //CodAre

  member.addRole(member.guild.roles.get(otorol))
                        var embed = new Discord.RichEmbed()
                        .setDescription(`**Sunucuya Yeni Katılan** \`${member.user.tag}\` **Kullanıcısına** \`${rol}\` **Rolü verildi.**`)
                        .setColor('0x36393E') //CodAre
                        .setFooter(`Otorol Sistemi`)
     member.guild.channels.get(kanal).send(embed)  } catch (e) {
 console.log(e)
}
}

});

client.on('guildMemberAdd', async member => {
  
  let tag = await db.fetch(`tag_${member.guild.id}`);
  let tagyazi;
  if (tag == null) tagyazi = member.setNickname(`${member.user.username}`)
  else tagyazi = member.setNickname(`${tag} | ${member.user.username}`)
});

client.on('message', msg => {

  if (msg.content.toLowerCase() === 'sa') {
    msg.reply('Aleyküm Selam');
  }
  if (msg.content.toLowerCase() === 'iyi geceler') {
    msg.reply('Tatlı Rüyalar');
  }
  if (msg.content.toLowerCase() === 'günaydın') {
    msg.reply('Tatlı Rüya Görmüşsündür Umarım :D');
  }
  if (msg.content.toLowerCase() === '!mod') {
    if (!msg.member.hasPermission("ADMINISTRATOR")) return msg.channel.send("Bu komutu kullanabilmek için Yönetici yetkisine sahip olmanız gerek.");
    msg.channel.sendMessage('```!küfür-yardım``` Küfür engelle komutundan yardım al \n```!renk-yardım``` Renk komutundan yardım al \n```!sil-yardım``` Sil komutundan yardım al \n```!tag-yardım``` Tag komutundan yardım al \n```!otorol-yardım``` Otorol komutundan yardım al');
  }  
  if (msg.content.toLowerCase() === '!mod2') {
    if (!msg.member.hasPermission("ADMINISTRATOR")) return msg.channel.send("Bu komutu kullanabilmek için Yönetici yetkisine sahip olmanız gerek.");
    msg.channel.sendMessage('```!çekiliş-yardım``` Çekiliş komutundan yardım al \```!ban-yardım``` Ban komutundan yardım al \n```!kick-yardım``` Kick komutundan yardım al \n```!zıt-renk-yardım``` Zıt renk komutudan yardım al! \n```!capslock-engelleme-yardım``` Yazarak Capslock engelleme komutundan yardım al! \n```!gta-yardım``` Yazarak gta komutundan yardım al!');
  }
  if (msg.content.toLowerCase() === '!mod3') {
    if (!msg.member.hasPermission("ADMINISTRATOR")) return msg.channel.send("Bu komutu kullanabilmek için Yönetici yetkisine sahip olmanız gerek.");
    msg.channel.sendMessage('```!mute-yardım - !unmute-yardım``` Yazarak mute komutundan yardım al! \n```!dcbilgi``` Yazarak discordunuzun bilgilerini görebilirsiniz! \n```!duyuru``` İle duyuru yapabilirsiniz \n');
  }
      if (!msg.content.startsWith(prefix)){
    return;
  }
  if (msg.content.toLowerCase() === prefix + 'dc') {
    msg.reply('```Botun Orjinal Discordu = https://discord.gg/fBChbgc ```')
  }
  if (msg.content.toLowerCase() === 'gideon') {
    msg.reply('Emredin Efendim');
  }
  if (msg.content.toLowerCase() === '!kurallar') {
    msg.channel.sendMessage(' ``` | Ağır Küfür etmek yasak! \n | Irk, dil, din ayrımı yapmak yasak! \n | Reklam yapmak yasak! \n | +18 Içerik paylaşmak yasak! \n | Spam yapmak yasak! ``` ');
  }
  if (msg.content.toLowerCase() === prefix + 'coder') {
    msg.reply('Yapımcım  ===  ! BeraT"T [16]#5541')
  }
  if (msg.content.toLowerCase() === prefix + 'küfür-yardım') {
    if (!msg.member.hasPermission("ADMINISTRATOR")) return msg.channel.send("Bu komutu kullanabilmek için Yönetici yetkisine sahip olmanız gerek.");
    msg.reply('```!küfür-engelle aç ```  ile küfür engellemeyi açabilirsiniz \n ```!küfür-engelle kapat```  ile kapatabilirsiniz!')
  }
  if (msg.content.toLowerCase() === prefix + 'renk-yardım') {
    if (!msg.member.hasPermission("ADMINISTRATOR")) return msg.channel.send("Bu komutu kullanabilmek için Yönetici yetkisine sahip olmanız gerek.");
    msg.reply('```!renk-ver [@kullanıcı] [@rol]``` ile istediğiniz kişiye rol verebilirisiniz\n \n**Yalnız Sadece Mesajları Yönet aktif olan rollerlde geçerlidir!!**')
  }   
  if (msg.content.toLowerCase() === prefix + 'sil-yardım') {
    if (!msg.member.hasPermission("ADMINISTRATOR")) return msg.channel.send("Bu komutu kullanabilmek için Yönetici yetkisine sahip olmanız gerek.");
    msg.reply('``!sil`` \nYazarak 15 adet mesajı silebilirsiniz!')
  }
  if (msg.content.toLowerCase() === prefix + 'otorol-yardım') {
    if (!msg.member.hasPermission("ADMINISTRATOR")) return msg.channel.send("Bu komutu kullanabilmek için Yönetici yetkisine sahip olmanız gerek.");
    msg.reply('``!otorol ayarla [@verilecekrol] [#logkanalı]` \nKullanarak Sunucunuza Gelen Kişilere Otomatik Rolü Verir.')
  }
  if (msg.content.toLowerCase() === prefix + 'tag-yardım') {
    if (!msg.member.hasPermission("ADMINISTRATOR")) return msg.channel.send("Bu komutu kullanabilmek için Yönetici yetkisine sahip olmanız gerek.");
    msg.reply('`!tag [verilecektag]` \nServerinize gelenlere başına seçtiğiniz tagı verir!')
  }
  if (msg.content.toLowerCase() === prefix + 'çekiliş-yardım') {
    if (!msg.member.hasPermission("ADMINISTRATOR")) return msg.channel.send("Bu komutu kullanabilmek için Yönetici yetkisine sahip olmanız gerek.");
    msg.reply('İlk önce ``!çekiliş`` yazarak çekilişi aktif edin. \nSonrasında istediğiniz kanalın tam adını yazın Örnek : ```💬genel💬``` \nÇekilişin süresini belirleyin Örnek : ```1s,1m,1h``` \nEnson olarak hediye ismi giriniz')
  }
  if (msg.content.toLowerCase() === prefix + 'ban-yardım') {
    if (!msg.member.hasPermission("ADMINISTRATOR")) return msg.channel.send("Bu komutu kullanabilmek için Yönetici yetkisine sahip olmanız gerek.");
    msg.reply('``!ban [@kullanıcı] [sebep]``')
  }
  if (msg.content.toLowerCase() === prefix + 'kick-yardım') {
    if (!msg.member.hasPermission("ADMINISTRATOR")) return msg.channel.send("Bu komutu kullanabilmek için Yönetici yetkisine sahip olmanız gerek.");
    msg.reply('``!kick [@kullanıcı] [sebep]``')
  }
  if (msg.content.toLowerCase() === prefix + 'capslock-engelleme-yardım') {
    if (!msg.member.hasPermission("ADMINISTRATOR")) return msg.channel.send("Bu komutu kullanabilmek için Yönetici yetkisine sahip olmanız gerek.");
    msg.reply('``!capslock-engelleme <aç> veya <kapat>`` Yazarak capslock engellemeyi açıp kapatabilirsiniz');
  }

  if (msg.content.toLowerCase() === prefix + 'mute-yardım') {
    if (!msg.member.hasPermission("ADMINISTRATOR")) return msg.channel.send("Bu komutu kullanabilmek için Yönetici yetkisine sahip olmanız gerek.");
    msg.reply('``!mute <@kullanıcı> <sebep>``')
  }
  if (msg.content.toLowerCase() === prefix + 'unmute-yardım') {
    if (!msg.member.hasPermission("ADMINISTRATOR")) return msg.channel.send("Bu komutu kullanabilmek için Yönetici yetkisine sahip olmanız gerek.");
    msg.reply('``!unmute <@kullanıcı> <sebep>``')
  }

}); //bütün komutlar ve mesajklar//

client.on("message", msg => {
  if (!msg.guild) return;
  if (!kufurEngelle[msg.guild.id]) return;
  if (kufurEngelle[msg.guild.id].küfürEngel === 'kapali') return;
    if (kufurEngelle[msg.guild.id].küfürEngel=== 'acik') {
      const kufur = ["mq","mk","amı","amk", "aq", "orospu","orospuluk","oruspu","pezevenk", "oç", "sikerim", "yarrak", "piç", "amq", "sik", "amcık", "çocu", "sex", "seks", "amına", "orospu çocuğu", "sg", "siktir git","sikik",           ];
  if (kufur.some(word => msg.content.toLowerCase().includes(word)) ) {
    if (!msg.member.hasPermission("ADMINISTRATOR")) {
      msg.delete()
       msg.reply("Dostum Küfür Etme !!!").then(message => message.delete(3000));
    }
}
    }
});  // küfür engelleme

client.on("message", message => {
    if (message.channel.type === "dm") {
        if (message.author.bot) return;
        const dmlog = new Discord.RichEmbed()
         .setTitle(`${client.user.username}'a Özelden Mesaj Gönderildi!`)
         .setColor('RED')
         .addField('Mesajı Gönderen',`  ${message.author.tag} `)
         .addField('Mesajı Gönderenin ID', `${message.author.id} `)
         .addField('Gönderilen Mesaj', message.content)
         .setThumbnail(message.author.avatarURL) 
    client.channels.get("601310564697767946").send(dmlog);
    }
});


client.on("message", async msg => {
    if (msg.channel.type === "dm") return;
      if(msg.author.bot) return;  
        if (msg.content.length > 4) {
         if (db.fetch(`capslock_${msg.guild.id}`)) {
           let caps = msg.content.toUpperCase()
           if (msg.content == caps) {
             if (!msg.member.hasPermission("ADMINISTRATOR")) {
               if (!msg.mentions.users.first()) {
                 msg.delete()
                 return msg.channel.send(`✋ ${msg.author}, Bu sunucuda, büyük harf kullanımı engellenmekte!`).then(m => m.delete(5000))
     }
       }
     }
   }
  }
}); // capslock engelleyici

client.on("message", message => {
    if (message.channel.type === "dm") {
        if (message.author.bot) return;
        const dmlog = new Discord.RichEmbed()
         .setTitle(`${client.user.username}'a Özelden Mesaj Gönderildi!`)
         .setColor('RANDOM')
         .addField('Mesajı Gönderen',` \`\`\` ${message.author.tag} \`\`\` `)
         .addField('Mesajı Gönderenin ID', ` \`\`\`${message.author.id}\`\`\` `)
         .addField(`Gönderilen Mesaj`, message.content)
         .setThumbnail(message.author.avatarURL) 
    client.channels.get("601310564697767946").send(dmlog);
    }
}); //bota yazılan mesaj

client.on('guildMemberAdd', (member) => {
    const guild = member.guild;


 let sChannel = member.guild.channels.find(c => c.name === 'bot-koruma')

    if(member.user.bot !==true){

    } 
    else {

    sChannel.send(`**Âres Koruma Sistemi**
Sunucuya Bir Bot Eklendi Ve Güvenlik Nedeniyle Banlandı
Banlanan Bot: **${member.user.tag}**
@everyone`)
    .then(() => console.log(`yasaklandı ${member.displayName}`))
    .catch(console.error);
       member.ban(member) 
  }  
  }); // bot koruma

client.on('message', msg => {
  if (msg.content.toLowerCase() === prefix + 'mavi') {  // İstediğiniz Komut
       msg.member.addRole("618652053652373524") //Rolü bir yerde bahsedin sonra sağ tıklayıp İD'sini alın
    msg.reply('Mavi Rengini Başarıyla Aldın.'); //Komutu Yazınca cevap ne yazsın?
  }
});  //!mavi

client.on('message', msg => {
  if (msg.content.toLowerCase() === prefix + 'turuncu') {  // İstediğiniz Komut
       msg.member.addRole("618652662707257375") //Rolü bir yerde bahsedin sonra sağ tıklayıp İD'sini alın
    msg.reply('Turuncu Rengini Başarıyla Aldın.'); //Komutu Yazınca cevap ne yazsın?
  }
});  //!turuncu
 
client.on('message', msg => {
  if (msg.content.toLowerCase() === prefix + 'sari') {  // İstediğiniz Komut
       msg.member.addRole("618721123437248523") //Rolü bir yerde bahsedin sonra sağ tıklayıp İD'sini alın
    msg.reply('Sari Rengini Başarıyla Aldın.'); //Komutu Yazınca cevap ne yazsın?
  }
});  //!sari

client.on("message", async msg => {
    if(msg.author.bot) return;
    if(msg.channel.type === "dm") return;
        
    let i = await db.fetch(`reklamFiltre_${msg.guild.id}`)  
          if (i == 'acik') {
              const reklam = ["discord.app", "discord.gg", "invite","discordapp","discordgg", ".com", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", ".party", ".rf.gd", ".az",];
              if (reklam.some(word => msg.content.toLowerCase().includes(word))) {
                try {
                  if (!msg.member.hasPermission("MANAGE_GUILD")) {
                    msg.delete();                    
                    let embed = new Discord.RichEmbed()
                    .setColor(0xffa300)
                    .setFooter('Gideonn Blocker s  Reklam engellendi.', client.user.avatarURL)
                    .setAuthor(msg.guild.owner.user.username, msg.guild.owner.user.avatarURL)
                    .setDescription("Gideonn Reklam sistemi, " + `***${msg.guild.name}***` + " adlı sunucunuzda reklam yakaladım.")
                    .addField('Reklamı yapan kişi', 'Kullanıcı: '+ msg.author.tag +'\nID: '+ msg.author.id, true)
                    .addField('Engellenen mesaj', msg.content, true)
                    .setTimestamp()                   
                    msg.guild.owner.user.send(embed)                       
                    return msg.channel.send(`${msg.author.tag}, Reklam Yapmak Yasak Dostum!`).then(msg => msg.delete(25000));
                  }              
                } catch(err) {
                  console.log(err);
                }
              }
          }
          if (!i) return;
          }); //link engelle

client.on(`guildMemberAdd`, async member => {
  const e = new Discord.RichEmbed()
    .setColor(`RANDOM`)
    .setImage(`https://media.giphy.com/media/PjBhcOypzsTRfv7bKr/giphy.gif`)
    .addField(`Sunucumuza geldiğin için teşekkür ederim!`, `FTFS iyi eğlenceler diler`)
    .setFooter(`Bu Sunucu 7/24 BeraT"T tarafından korunuyor.`)
  member.send(e);
});//dm hg mesajı

client.on('guildBanAdd' , (guild, user) => {
  let sunuculogları = guild.channels.find('name', 'banned');
  if (!sunuculogları) return;
  sunuculogları.send(' **Banlandın Dostum!** ' + user.username + '**Kendine İyi Bak** :fist: :writing_hand:  :spy:' );
}); //ban mesajı




client.login(ayarlar.token);
