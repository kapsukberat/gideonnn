const Discord = require("discord.js");
const bot = new Discord.Client();
const ffmpeg = require("ffmpeg");
const ayarlar = "./ayarlar.json";
const prefix = ayarlar.prefix;



var fenomen = "https://cdneba.gov.tr/397/809/f66/af5/9cd/254/391/889/640/48b/b19/487/eb5/8ac/001/397809f66af59cd25439188964048bb19487eb58ac001.mp3"; 






exports.run = function (bot, message, args) {
		let mesaj = args.slice(0).join(' ');
if(!mesaj) {
	message.reply("**15 Temmuz Marşını Dinlemek İçin `g!15-temmuz çal` Yazmalısın**")
}		
    if (!message.member.voiceChannel) return message.reply("**15 Temmuz Marşını Dinlemek İçin Lütfen Sesli Kanala Gir**");

		    if (mesaj === "çal") {
        if (message.member.voiceChannel.join()
        .then(connection => {
            const dispatcher = connection.playStream(fenomen);
            return message.channel.send("**15 Temmuz Marşı Dinleniyor.**");
        }));
                    const turk = new Discord.RichEmbed()
          .setTitle('Ne Mutlu Türküm Diyene')
          .setImage('https://yunti.files.wordpress.com/2018/07/15temmuz_03_tam35-blogspot-com.gif')
          return message.channel.send(turk)
        return;
    };
	
	
	
	if (mesaj === "bitir") {
			const voiceChannel = message.member.voiceChannel;
			voiceChannel.leave()
	}
}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 0
};
exports.help = {
    name: "15-temmuz",
    description: "15 Temmuz Marşını Çalar.",
    usage: "15-temmuz çal"
};