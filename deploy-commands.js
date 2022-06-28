const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('node:fs');
const config = require("./config.json");

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(config.token);

(async () => {
	try {
		console.log('Started refreshing application commands.');

		await rest.put(
			Routes.applicationCommands(config.clientID),
			{ body: commands },
		);

		console.log('Successfully reloaded application commands.');
	} catch (error) {
		console.error(error);
	}
})();
