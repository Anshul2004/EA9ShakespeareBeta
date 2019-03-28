const botconfig = require("./botconfig.json");
const Discord = require("discord.js");

const bot = new Discord.Client({disableEveryone:true});

//==========================================
var score = {};
var scoredUsers = {};
var d = new Date();
var hour = d.getTime();
var done = false;
//==========================================

bot.on("ready", async () => {
    console.log(bot.user.username + " is online!");
});

bot.on("message", async message =>{
    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    if(d.getHours() - hour >= 6 && !done){
        done = true;
        scoredUsers[message.author.username] = null;
    }
    else if(done && !(d.getHours() - hour >= 6)){
        done = false;
    }
    
    if(score[messageArray[1]] == undefined){
        score[messageArray[1]] = 0;
    }

    if(cmd == prefix+"score"){
        if(messageArray.length >= 2){
            if(messageArray[1].substring(0, 2) == "<@"){
                message.channel.send("Score: " + score[messageArray[1]]);
            }
        }
    }
    if(cmd == prefix+"reward"){
        if(messageArray.length >= 2){
            if(messageArray[1].substring(2, messageArray[1].length-1) != message.author.id){
                if(messageArray[1].substring(0, 2) == "<@"){
                    if(scoredUsers[message.author.username] != null){
                        var hasGiven = false;
                        hasGivenArray = scoredUsers[message.author.username].split(" ");
                        for(i = 0; i < hasGivenArray.length; i++){
                            if(hasGivenArray[i] == messageArray[1]){
                                hasGiven = true;
                            }
                        }
                        if(hasGiven){
                            message.channel.send("Thee has't already reward'd " + messageArray[1] + " f'r pe'r editing!");
                        }
                        else{
                            if(score[messageArray[1]] > 0){
                                score[messageArray[1]] = score[messageArray[1]] + 1;
                            }
                            else{
                                score[messageArray[1]] = 1
                            }
                            scoredUsers[message.author.username] += " "+messageArray[1];
                            message.channel.send("Thee has't reward'd " + messageArray[1] + " f'r pe'r editing.");
                        }
                    }
                    else{
                        if(score[messageArray[1]] > 0){
                            score[messageArray[1]] = score[messageArray[1]] + 1;
                        }
                        else{
                            score[messageArray[1]] = 1
                        }
                        scoredUsers[message.author.username] += " "+messageArray[1];
                        message.channel.send(message.author.username + " hast reward'd " + messageArray[1] + " f'r pe'r editing.");
                    }
                }
                else{
                    message.channel.send("Prithee reward a valid us'r with a tag!");
                }
            }
            else{
                message.channel.send("Thee can't reward yourself bum!");
            }
        }
    }
    if(cmd == prefix+"rules"){
        message.channel.send("This bot wast design'd to encourageth pe'r editing in the 2018-2019 ea9 disc'rd s'rv'r.  Prithee doth not reward yourself and prithee reward fairly.");
    }
    if(cmd == prefix+"setScore" && message.author.username == "Anshul"){
        if(messageArray.length >= 3){
            if(messageArray[1].substring(0, 2) == "<@"){
                score[messageArray[1]] = parseInt(messageArray[2]);
                message.channel.send("Score: " + score[messageArray[1]]);
            }
        }
    }
    else if(cmd == prefix+"setScore" && message.author.username != "Anshul" && message.author.username != "EA9 Darwin Beta"){
        message.channel.send("Thee can't changeth the sc're... bum! Thee can't compareth to the god anshul!");
    }
});

bot.login(botconfig.token);