module.exports.run = (bot, message, [mention]) =>{
    if(!mention.startsWith("<@")){ message.channel.send("You must mention a user.");
        return;
    }
    let mentioned = message.guild.members.find('id', mention.slice(2).trim().split('>')[0]);
    console.log(mentioned.user.username);
    message.channel.send(`<@${message.author.id}> slapped ${mention} with a fish!`);
}

module.exports.help = {
    name: "slap"
}