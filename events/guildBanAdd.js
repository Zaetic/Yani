const {RichEmbed} = require("discord.js");
const mongoose = require("mongoose");
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
const {errorReturn} = require("../functions.js");

module.exports = async (bot, guild, user) => {
    
    //Log
    const guild = await bot.Guild.findOne({'guildId': member.guild.id})
    try{
        if(guild.log == "on"){
            let logs = await guild.fetchAuditLogs({type: 22});
            let entry = logs.entries.find('target', user);

            let channel = message.guild.channels.find(channel => channel.id === guild.logChannel)
            if(channel != null){
                let embed = new RichEmbed()
                .addField(":hammer: [Banido]", `**Usuário:** ${user} **Razão:** ${entry.reason} **Por:** ${entry.executor}`)
            }
            channel.send(embed)
        }
    }catch(e){
        let channel = message.guild.channels.find(channel => channel.id === guild.logChannel)
        errorReturn(e, channel)
    }
    
}