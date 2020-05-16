const { MessageEmbed } = require("discord.js");
const { errorReturn } = require("../../functions.js");
const { prefix } = require("../../botconfig.json");

module.exports.run = async (bot, message, args) => {
    try{
        let user = message.mentions.users.first()
        if (!user) return message.reply("Para saber informações do comando digite `"+prefix+"help "+this.help.name+"`");
        let msg = await message.channel.messages.cache.filter(msg => msg.author.id === user.id);
        msg = msg.last();
        if (!msg) return message.reply("Você esta sem Chakra :anger: !!");
        
        const embed = new MessageEmbed()
            .setDescription("**Cópia de **`"+user.tag+"` :  " +msg.content)
            .setImage("https://media1.giphy.com/media/ZL2iRxhnDwtSE/giphy.gif")
            .setAuthor(message.member.user.tag, message.member.user.avatarURL())
    
        return message.channel.send(embed)
    }catch(e){
        errorReturn(e, message, this.help.name);
    }
}

module.exports.help = {
    name: "sharingan",
    description: "Traz a ultima msg da pessoa selecionada",
    usability: "Pode ser utilizado de maneira simples `"+prefix+"sharingan @usuário`\n",
    additional: "",
    others: "A msg retornada é referente ao canal onde foi utilizado o comando",
    type: "fun"
}

module.exports.requirements = {
    userPerms: [],
    clientPerms: [],
    ownerOnly: false
}