const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const language = require("../language.json");
const config = require("../config.json");

module.exports = {
	data: new SlashCommandBuilder()
		.setName(`${language.commandName}`)
		.setDescription(`${language.commandDesc}`),


	async execute(interaction) {
		
        const guildMembers = await interaction.guild.members.fetch();

        const format = /[^\x00-\x7F]/g;
        let randMember;

        do {
            randMember = guildMembers.random()
            await console.log(format.test(randMember.displayName));
        } while (format.test(randMember.displayName));

        timeInSeconds = config.guessTime;

        const member = randMember.displayName;
        const number = (interaction.createdTimestamp / 1000) + timeInSeconds + 2;
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


            
        interaction.reply({ embeds: [guessEmbed], fetchReply: true })
        .then(message => {

            let embed = message;

            let filter = message => message.content.toLowerCase() == member.toLowerCase();
            interaction.channel.awaitMessages({ filter, max: 1, time: timeInSeconds * 1000, errors: ['time'] })
                .then(collected => {
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