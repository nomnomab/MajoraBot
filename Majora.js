const Discord = require("discord.js");
const fs = require("fs");

// youtube
const ytdl = require('ytdl-core');
const queue = new Map();

const settings = require("./config.json");
const prefix = settings.prefix;

const bot = new Discord.Client({
    disableEveryone:true
});
bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) =>{
    if(err) console.error(err);

    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if(jsfiles.length <= 0){
        console.log("No commands to load!");
        return;
    }

    console.log(`Loading ${jsfiles.length} commands!`);

    jsfiles.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(`${i+1}: ${f} loaded!`);
        bot.commands.set(props.help.name, props);
    });
});

bot.on('ready', async ()=>{
    console.log(`Bot is ready! ${bot.user.username}`);
    console.log(bot.commands);
    bot.guilds.forEach(c=>{
        let channel = c.channels.find(channel=>channel.name == "bot-notifications");
        if(!channel) contine;
        channel.send('Bot started!');
    });
});

bot.on('message', async message =>{
    if(message.author.bot) return;
    if(message.channel.type === 'dm') return;

    if(!message.content.startsWith(prefix)) return;

    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    let command = args.shift().toLowerCase();

    let cmd = bot.commands.get(command);
    if(cmd) cmd.run(bot, message, args);
    else await additionalCommands(bot, command, message, args);
});

async function additionalCommands(bot, command, message, args){
}

bot.login(settings.token);