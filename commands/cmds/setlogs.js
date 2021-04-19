const Discord = require("discord.js");
const fs = require("fs");
const db = require("quick.db");
const dateFormat = require("dateformat");

exports.run = async (bot, message, args, functions) => {

if(!message.member.hasPermission('ADMINISTRATOR')) return;
let channel = message.mentions.channels.first();
if(!channel || channel.type !== "text") return functions.errorEmbed(message, message.channel, "Text channel?");

let channelFetched = message.guild.channels.cache.find(c => c.id === channel.id);
if(!channelFetched || channelFetched.type !== "text") return functions.errorEmbed(message, message.channel, "**Mention the text channel?**");

let embed = new Discord.MessageEmbed()
.setAuthor(`✅ | Logs updated`)
.setColor("#36393f")
.setTimestamp()
.setFooter(`Ticket System`, bot.user.displayAvatarURL())
.addField(`Channel`, channelFetched, true)
.addField(`By`, message.author, true)
.addField(`Date`, `\`${dateFormat(new Date(), "dd/mm/yyyy - HH:MM:ss")}\``, true);

db.set(`logs_${message.guild.id}`, channelFetched.id);
channelFetched.send(message.author, {embed: embed});
functions.successEmbed(message, message.channel, `logs channel: ${channelFetched}`);

}

exports.help = {
    name: "setlogs",
    aliases: ['logs', 'channel']
}