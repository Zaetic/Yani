const { errorReturn, returnNull, formatId } = require("../../utils/functions.js");
const { prefix } = require("../../botconfig.json");
const ms = require("ms");

module.exports.run = (bot, message, args) => {
    try{
        let typeMsg = args[0];
        let time = args[1];
        let channel = message.guild.channels.cache.get(formatId(args[2]))
        time = ms(time);

        if(returnNull(typeMsg) || returnNull(time)) return message.reply("Para saber informações do comando digite `"+prefix+"help "+this.help.name+"`");
        if(!isNaN(time) && !isNaN(args[1].charAt(args[1].length-1))) return message.reply("Preciso de um tempo valido !! :timer:")

        let text = undefined;
        if(typeMsg === "msg"){
            if(!returnNull(channel)){
                text = args.join(" ").slice(args[0].length + args[1].length + 1 + args[2].length)
                if(returnNull(text)) return message.reply("Preciso de uma mensagem :disappointed:")
            }
            else{
                text = args.join(" ").slice(args[0].length + args[1].length + 1)
                if(returnNull(text)) return message.reply("Preciso de uma mensagem :disappointed:")
            }    
        }
        else if(typeMsg === "embed"){
            if(!returnNull(channel)){
                let msgSplit = args.join(" ").slice(args[0].length + args[1].length + 1 + args[2].length).split("||");

                text = new MessageEmbed()
                .setTitle(msgSplit[0])
                .setDescription(msgSplit[1])
                .setColor(bot.baseColor)
            }
            else{
                let msgSplit = args.join(" ").slice(args[0].length + args[1].length + 1).split("||");

                let text = new MessageEmbed()
                .setTitle(msgSplit[0])
                .setDescription(msgSplit[1])
                .setColor(bot.baseColor)
            }
        }else return message.reply("Para saber informações do comando digite `"+prefix+"help "+this.help.name+"`");

        setTimeout(function(){
            if(!returnNull(channel)) channel.send(text);
            else message.channel.send(text)
        }, time);

        let thisDate = new Date();
        thisDate = Math.abs((thisDate / 1000) + (time / 1000))
        thisDate = new Date(thisDate * 1000);

        return message.reply(`Seu anúncio sera enviado as:  \`${thisDate}\``)
    }catch(e){
        errorReturn(e, message, this.help.name)
    }
}

module.exports.help = {
    name: "notice", //anuncio
    type: "adm"
}


module.exports.requirements = {
    userPerms: ["ADMINISTRATOR"],
    clientPerms: ["ADMINISTRATOR"],
    ownerOnly: false
}