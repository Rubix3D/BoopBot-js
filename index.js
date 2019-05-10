const Discord = require('discord.js');
const bot = new Discord.Client();

//Prefix to start a command
const prefix = '-';

//Listener Event: Runs whenever the bot sends a ready event
bot.on('ready', () =>{
    console.log('Bot started.')
    bot.user.setActivity('-help for commands');
});

//Listener Event: Runs whenever a message is recieved
bot.on('message', message => {
    if(message.author.bot) return;
    if(message.channel.type == "dm") return;

    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    //Commands
    if (cmd === prefix + 'ping'){
        message.channel.send(':ping_pong: Pong!'); //Send a message to the channel the command was typed into
    }

    if(cmd === prefix + 'report'){

        let rUser = message.guild.member(message.mentions.users.first() || message.members.guild.get(args[0])); // finds the find user pinged after the command
        if(!rUser) return message.channel.send("Couldn't find user."); //If no user is found
        let reason = args.join(" ").slice(22); //Splits after the command word

        let reportEmbed = new Discord.RichEmbed() //Creates an embedded window
        .setDescription("Reports")
        .setColor('#15f153')
        .addField("Reported User", rUser + ' with ID: ' + rUser.id)
        .addField("Reported By: ", message.author + ' with ID: ' + message.author.id)
        .addField("Channel", message.channel)
        .addField("Time", message.createdAt)
        .addField("Reason", reason);

        let reportschannel = message.guild.channels.find(channels => channels.name === "reports"); //Chooses which channel the reports are sent to
        if(!reportschannel) return message.channel.send("Couldn't find the reports channel."); //If no channel found

        message.delete().catch(O_o=>{}); //Immediately deletes the command message
        reportschannel.send(reportEmbed); //Sends the report to the reports channel

        return;
    }

    if(cmd === prefix + 'serverinfo'){

        let sicon = message.guild.displayAvatarURL;
        let serverEmbed = new Discord.RichEmbed()
        .setDescription("Server Information")
        .setThumbnail(sicon)
        .addField("Server Name", message.guild.name)
        .addField("Created On", message.guild.createdAt)
        .addField("You Joined", message.member.joinedAt)
        .addField("Total Members", message.guild.memberCount);

        return message.channel.send(serverEmbed);
    }

    if(cmd === prefix + 'botinfo'){

        let bicon = bot.user.displayAvatarURL;
        let botEmbed = new Discord.RichEmbed()
        .setDescription("Bot Information")
        .setThumbnail(bicon)
        .addField("Bot Name", bot.user.username)
        .addField("Created On", bot.user.createdAt)
        .addField("Created By: ", "Rubix");

        return message.channel.send(botEmbed);
    }

});

bot.login('your auth token');
