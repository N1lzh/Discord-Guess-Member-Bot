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
		.setName(`${language.rankCommandName}`)
		.setDescription(`${language.rankCommandDesc}`)
        .addUserOption(option => option.setName('user').setDescription(`${language.rankCommandUserOptionDesc}`)),


	async execute(interaction) {

        if(config.leaderboard === false) return interaction.reply({ content: `${language.featureNotAvailable}`, ephemeral: true});

        let leaderboardPath = (`./leaderboards/${interaction.guild.id}.json`);
        if(!fs.existsSync(`${leaderboardPath}`)) return interaction.reply({content: `${language.leaderboardIsntSetup}`, ephemeral: true})
        const guildLeaderboard = require(`.${leaderboardPath}`);

        const target = interaction.options.getUser('user');

        if(!target == true){

            let leaderboard = guildLeaderboard.data.sort((a, b) => parseFloat(b.level) - parseFloat(a.level));

            if (guildLeaderboard.data.find(x => x.memberID === interaction.member.id) === undefined) return interaction.reply({content: `${language.targetNotAvailable}`, ephemeral: true})
            
            let guildMember = guildLeaderboard.data.find(x => x.memberID === interaction.member.id)
            const place = (element) => element.memberID == interaction.member.id;
            
            let leaderboardEmbed = new MessageEmbed()
                .setColor("#0099ff")
                .setTitle(`${interaction.member.user.tag}`)
                .setThumbnail(interaction.member.user.displayAvatarURL())
                .addField("\u200B", `${language.rankEmbedLevel} **${guildMember.level}** \n${language.rankEmbedPlace} **${leaderboard.findIndex(place) + 1}**`)
                .setFooter({text: `${language.credits}`})

            await interaction.reply({embeds: [leaderboardEmbed]});

        } else if(!target == false){

            let leaderboard = guildLeaderboard.data.sort((a, b) => parseFloat(b.level) - parseFloat(a.level));
        
            if (guildLeaderboard.data.find(x => x.memberID === target.id) === undefined) return interaction.reply({content: `${language.targetNotAvailable}`, ephemeral: true})

            let guildMember = guildLeaderboard.data.find(x => x.memberID === target.id)
            const place = (element) => element.memberID == target.id;
            
            let leaderboardEmbed = new MessageEmbed()
                .setColor("#0099ff")
                .setTitle(`${target.tag}`)
                .setThumbnail(target.displayAvatarURL())
                .addField("\u200B", `${language.rankEmbedLevel} **${guildMember.level}** \n${language.rankEmbedPlace} **${leaderboard.findIndex(place) + 1}**`)
                .setFooter({text: `${language.credits}`})

            await interaction.reply({embeds: [leaderboardEmbed]});

        }

	},
};