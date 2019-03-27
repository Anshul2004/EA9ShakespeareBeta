const botconfig = require("./botconfig.json");
const Discord = require("discord.js");

const bot = new Discord.Client({disableEveryone:true});

//==========================================
var score = {};
var scoredUsers = {};
var hour = d.getTime();
var d = new Date();
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
                        message.channel.send("You have already rewarded " + messageArray[1] + " for peer editing!");
                    }
                    else{
                        if(score[messageArray[1]] > 0){
                            score[messageArray[1]] = score[messageArray[1]] + 1;
                        }
                        else{
                            score[messageArray[1]] = 1
                        }
                        scoredUsers[message.author.username] += " "+messageArray[1];
                        message.channel.send("You have rewarded " + messageArray[1] + " for peer editing.");
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
                    message.channel.send(message.author.username + " has rewarded " + messageArray[1] + " for peer editing.");
                }
            }
            else{
                message.channel.send("Please reward a valid user with a tag!");
            }
        }
    }
    if(cmd == prefix+"rules"){
        message.channel.send("This bot was designed to encourage peer editing in the 2018-2019 EA9 discord server. Please do not reward yourself and please reward fairly.");
    }
});

bot.login(botconfig.token);