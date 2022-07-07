const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const language = require("../language.json");
const config = require("../config.json");
const fs = require('node:fs');

function isASCII(str, extended) {
    return (extended ? /^[\x00-\xFF]*$/ : /^[\x00-\x7F]*$/).test(str);
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName(`${language.guessCommandName}`)
		.setDescription(`${language.guessCommandDesc}`),


	async execute(interaction) {

        let leaderboardPath = (`./leaderboards/${interaction.guild.id}.json`)
		
        const guildMembers = await interaction.guild.members.fetch();

        let randMember;

        do {
            randMember = guildMembers.random();

        } while (isASCII(randMember.displayName, true) == false);

        timeInSeconds = config.guessTime;

        const member = randMember.displayName;
        const number = (interaction.createdTimestamp / 1000) + timeInSeconds;
        const countdown = number | 0;

        const guessEmbed = new MessageEmbed()
            .setColor("GREEN")
            .setTitle(language.guessEmbedTitle)
            .setDescription(`<t:${countdown}:R>`)
            .setImage(`${randMember.displayAvatarURL({ size: 256 })}`)
            .setFooter({text: `${language.credits}`})

        const guessEmbedEnd = new MessageEmbed()
            .setColor("RED")
            .setTitle(`${language.guessedEmbedTitle} ${member}!`)
            .setImage(`${randMember.displayAvatarURL({ size: 256 })}`)
            .setFooter({text: `${language.credits}`})

         if(config.leaderboard == true){

            if(!fs.existsSync(`${leaderboardPath}`)){
    
                fs.writeFile(`${leaderboardPath}`, '{ "data": [] }', err => {
                    if(err){
                        console.error(err);
                    }
                });
                return interaction.reply({content: `${language.leaderboardSetup}`, ephemeral: true});
    
            }
      
         }

            
        interaction.reply({ embeds: [guessEmbed], fetchReply: true })
        .then(message => {

            

            let embed = message;
            const guildLeaderboard = require(`.${leaderboardPath}`);

           

            let filter = message => message.content.toLowerCase() == member.toLowerCase();
            interaction.channel.awaitMessages({ filter, max: 1, time: timeInSeconds * 1000, errors: ['time'] })
                .then(collected => {

                    if(config.leaderboard == true){

                        const isFound = guildLeaderboard.data.some(element => {
                            if (element.memberID === collected.first().author.id) {
                                return true;
                            }
                          
                            return false;
                        });

                        if(!isFound){
    
                            let guildMember = {
                                memberID: collected.first().author.id, 
                                username: collected.first().author.username,
                                level: 1
                            }

                            guildLeaderboard.data.push(guildMember)

                            fs.writeFile(`${leaderboardPath}`, JSON.stringify (guildLeaderboard, null, 2), err => {
                                if (err) throw err;
                            })
            
                        } else {
            
                            
                            let guildMember = guildLeaderboard.data.find(x => x.memberID === collected.first().author.id)

                            console.log(guildMember.username == collected.first().author.username)

                            if(guildMember.username != collected.first().author.username){
                                console.log("test");
                                guildMember.username = collected.first().author.username;
                            }
                            guildMember.level = guildMember.level + 1;

                            fs.writeFile(`${leaderboardPath}`, JSON.stringify (guildLeaderboard, null, 2), err => {
                                if (err) throw err;
                            })
            
                        }

                    }

                    interaction.followUp(`<@${collected.first().author.id}> ${language.correctAnswer} ${member}.`);
                    embed.edit({embeds: [guessEmbedEnd]});
                })
                .catch(collected => {

                    interaction.followUp(`${language.noCorrectAnswer} ${member}.`);
                    embed.edit({embeds: [guessEmbedEnd]});
                });

        });

	},
};




// This file was written by N1lzh; https://github.com/N1lzh
