const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, Message } = require("discord.js");
const language = require("../language.json");
const config = require("../config.json");
const fs = require('node:fs');

function isASCII(str, extended) {
    return (extended ? /^[\x00-\xFF]*$/ : /^[\x00-\x7F]*$/).test(str);
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName(`${language.lbCommandName}`)
		.setDescription(`${language.lbCommandDesc}`),


	async execute(interaction) {

        if(config.leaderboard === false) return interaction.reply({ content: `${language.featureNotAvailable}`, ephemeral: true});

        let leaderboardPath = (`./leaderboards/${interaction.guild.id}.json`);
        if(!fs.existsSync(`${leaderboardPath}`)) return interaction.reply({content: `${language.leaderboardIsntSetup}`, ephemeral: true})
        const guildLeaderboard = require(`.${leaderboardPath}`);

        let leaderboard = guildLeaderboard.data.sort((a, b) => parseFloat(b.level) - parseFloat(a.level));
        console.log(leaderboard)
        
        let leaderboardEmbed = new MessageEmbed()
            .setColor("#0099ff")
            .setTitle(`${language.lbEmbedTitle}`)
            .setDescription(`${language.lbEmbedDesc}`)
            .setFooter({text: `${language.credits}`})
 
        for(let i = 0; i < config.leaderboardLength && i < leaderboard.length; i++) {
            leaderboardEmbed.addField(`${i + 1}. ${leaderboard[i].username}`, `${language.lbEmbedLevel} ${leaderboard[i].level}`, config.leaderboardInline)
        }

        await interaction.reply({embeds: [leaderboardEmbed]});

	},
};