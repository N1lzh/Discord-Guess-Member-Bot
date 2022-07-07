const { ActivityType } = require("discord-api-types/v9");

require("dotenv").config();

module.exports = {
	name: "ready",
	once: true,
	execute(client) {
        console.log(`Bot is online as ${client.user.tag}!`);
		client.user.setActivity("guessing", { type: ActivityType.Playing });
	},
};




// This file was written by N1lzh; https://github.com/N1lzh
