module.exports.run = async (bot, message, args) =>{
    message.channel.send(`Reloading ${args[0]}.js`);

    try{
        delete require.cache[require.resolve(`./${args[0]}.js`)];
    }catch(e){
        console.log(e.stack);
        message.reply(`${args[0]}.js does not exist.`);
        return;
    }
    message.reply(`The command ${args[0]} has been reloaded.`);
}

module.exports.help = {
    name: "restart"
}