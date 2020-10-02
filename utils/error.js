const {MessageEmbed} = require("discord.js");
var colors = require('colors');

module.exports = {
    
    discordAPIError (error, obj, lang){
        if(error.code === 50034){
            return obj.channel.send(lang.error50034);
        }
    },

    consoleLog(error, obj, name) {
        var today = new Date();
        today = `${today.getDate()}/${today.getMonth()+1}/${today.getFullYear()}`
    
        if(obj){
            console.log(`[Error]`.brightRed +` Name: ${name} // Error: ${error} // Guild: ${obj.guild} // Data: ${today}`.red);
        }else{
            console.log(`[Error]`.brightRed +` Name: ${name} // Error: ${error} // Guild: Null // Data: ${today}`.red);
        }
    },

    async errorReturn(error, obj, name) {   
        this.consoleLog(error, obj, name)
        let typeObj = obj.constructor.name.toLowerCase();

        if (obj && typeObj === "message"){
            const lang = await obj.client.langs.langReturn(obj.guild.language, "error", "event");
            
            if(error.name === "DiscordAPIError") return this.discordAPIError(error, obj, lang);
            
            let embed = new MessageEmbed()
                .setThumbnail("https://github.com/Zaetic/Nayoi/blob/master/images/nayoi/nayoiError404.png?raw=true")
                .setTitle("Error")
                .setDescription(`${error}`)
                .addField("Name", name, true)
                .addField("Error" ,lang.errorField, true)
                .setColor("c23a3a")
                .setTimestamp()
            
            return message.channel.send(embed);
        }
        
    }
}