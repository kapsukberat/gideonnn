const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const ayarlar = require('./ayarlar.json');
exports.run = async (client, message, args) => {
let kişi = message.mentions.members.first() || message.author;
}
let kufurEngel = JSON.parse(fs.readFileSync("./jsonlar/kufurEngelle.json", "utf8"));
var prefix = ayarlar.prefix;

client.on('ready', () => {
  console.log(`Bot aktif ${client.user.tag}!`);
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
  if (msg.content.toLowerCase() === 'gideon') {
    msg.reply('Emredin Efendim');
  }
  if (msg.content.toLowerCase() === '!kurallar') {
    msg.channel.sendMessage(' ``` | Ağır Küfür etmek yasak! \n | Irk, dil, din ayrımı yapmak yasak! \n | Reklam yapmak yasak! \n | +18 Içerik paylaşmak yasak! \n | Spam yapmak yasak! ``` ');
  }
  if (!msg.content.startsWith(prefix)){
    return;
  }
  if (msg.content.toLowerCase() === prefix + 'coder') {
    msg.reply('Yapımcım  ===  ! BeraT"T [16]#5541')
  }
  if (msg.content.toLowerCase() === '!yardım') {
    msg.channel.sendMessage('```!kurallar \n--------------\n!coder\n--------------\n!mod - !mod2\n--------------\n!renkbelirle\n--------------\n!dc```');
  }
  if (msg.content.toLowerCase() === '!mod') {
    msg.channel.sendMessage('```Yakında Botumuza Mod eklenicek```');
  }
  if (msg.content.toLowerCase() === '!mod2') {
    msg.channel.sendMessage('```Yakında Botumuza Mod2 eklenicek```');
  }
  if (msg.content.toLowerCase() === prefix + 'renkbelirle') {
    msg.reply('Rengin gözükmesi istediğiniz rolün üstüne mavi , turuncu ve sarı rol ekleyiniz ardından -- !mavi - !turuncu - !sari  yazabilirsiniz')
  }
  if (msg.content.toLowerCase() === prefix + 'dc') {
    msg.reply('```Botun Orjinal Discordu = https://discord.gg/fBChbgc ```')
  }












});

client.on("message", msg => {
  if (!msg.guild) return;
  if (!kufurEngel[msg.guild.id]) return;
  if (kufurEngel[msg.guild.id].küfürEngel === 'kapali') return;
    if (kufurEngel[msg.guild.id].küfürEngel=== 'acik') {
      const kufur = ["mk", "amk", "aq", "orospu", "oruspu", "oç", "sikerim", "yarrak", "piç", "amq", "sik", "amcık", "çocu", "sex", "seks", "amına", "orospu çocuğu", "sg", "siktir git"];
  if (kufur.some(word => msg.content.toLowerCase().includes(word)) ) {
    if (!msg.member.hasPermission("ADMINISTRATOR")) {
      msg.delete()
       msg.reply("Küfür filtresi, aktif!").then(message => message.delete(3000));
    }
}
    }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === prefix + 'mavi') {  // İstediğiniz Komut
       msg.member.addRole("618652053652373524") //Rolü bir yerde bahsedin sonra sağ tıklayıp İD'sini alın
    msg.reply('Mavi Rengini Başarıyla Aldın.'); //Komutu Yazınca cevap ne yazsın?
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === prefix + 'turuncu') {  // İstediğiniz Komut
       msg.member.addRole("618652662707257375") //Rolü bir yerde bahsedin sonra sağ tıklayıp İD'sini alın
    msg.reply('Turuncu Rengini Başarıyla Aldın.'); //Komutu Yazınca cevap ne yazsın?
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === prefix + 'sari') {  // İstediğiniz Komut
       msg.member.addRole("618721123437248523") //Rolü bir yerde bahsedin sonra sağ tıklayıp İD'sini alın
    msg.reply('Sari Rengini Başarıyla Aldın.'); //Komutu Yazınca cevap ne yazsın?
  }
});






client.on('message', msg => {
  if (msg.content.toLowerCase() === '!sil') {
    if (msg.channel.type === 'dm') {
      const ozelmesajuyari = new Discord.RichEmbed()
    .setColor(0xdcff00)
    .setTimestamp()
    .setAuthor(msg.author.username, msg.author.avatarURL)
    .addField(':x:**UYARI**:x:', 'Bu komutu özel mesajlarda kullanamazsın.')
      msg.author.sendEmbed(ozelmesajuyari); }
      if (msg.channel.type !== 'dm') {
        if (!msg.member.hasPermission("MANAGE_MESSAGES")) {
          if (msg.author.id !== ayarlar.yapimci) {
            const mesajlariyonet = new Discord.RichEmbed()
          .setColor(0xFF0000)
          .setTimestamp()
          .setAuthor(msg.author.username, msg.author.avatarURL)
          .addField(':x:**UYARI**:x:', 'Bu komutu kulllanmak için `Mesajları Yönet` iznine sahip olmalısın.')
          return msg.author.sendEmbed(mesajlariyonet);
      }}
      msg.channel.bulkDelete(10);

      const sohbetsilindi = new Discord.RichEmbed()
    .setColor(0x35ff00)
    .setTimestamp()
    .addField('Eylem:', '**Sohbet silme**')
    .addField('Yetkili:', '` ' + msg.author.username + '`')
    .addField('Silinen Mesaj Sayısı:', '»'+ '  **15**  ' + '«')
    .addField('Sonuç:', '`Başarılı`'+ ' :white_check_mark: :ok_hand:  ')
    return msg.channel.sendEmbed(sohbetsilindi).then(msg => msg.delete(8000));
}}});

client.on('guildBanAdd' , (guild, user) => {
  let sunuculogları = guild.channels.find('name', 'banned');
  if (!sunuculogları) return;
  sunuculogları.send('https://media.giphy.com/media/8njotXALXXNrW/giphy.gif **Banlandın Dostum!** ' + user.username + '**Kendine İyi Bak** :fist: :writing_hand:  :spy:' );
});


client.login('NjE2NzExMjEwMTE2NzEwNDAx.XW-dcg.yk0_fpvymtrhqa4rZMMr7ed7npU');
