const Discord = require('discord.js');
exports.run = async (client, message, args) => {
let kişi = message.mentions.members.first() || message.author;
exports.run = async (client, message, args) => {
message.channel.send(`**${kişi}** adlı kişinin ID numarası: **${kişi.id}** idir.`);
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["Id", "ıd", "ID"],
  permLevel: 0
};

exports.help = {
  name: "id",
  description: "Belirtilen Kişinin ID'sini Verir.",
  usage: "id"
};
