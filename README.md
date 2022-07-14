# Discord-Guess-Member-Bot
A discord bot with a command where you have to guess a member by it's profile picture.


## Features:
- A fully functional and easy to setup game bot for your discord server
- Execute the guess game with the /guess command (standard)
- A leaderboard to track the best guesser from your server (optional)


## Requirements:
- [Node.js](https://nodejs.org/en/download/) recommended: 16.14.0
- Privileged Intents for your bot in the developer portal.


## Installation:
1. Setup a application in the discord developer portal, if you don't know how ~~learn it~~ visit [this link][1] and read the chapter [*setting up a bot application*][2] and [*Adding your bot to server*][3].
2. Next you need your Bot's token as well as it's client id. You will get both in the developer portal under your application. You will find your Token in the *bot* section. Here you will have to reset it first to copy it. Your client id will be in the *OAuth2* section under *Client Information*.
![TOKEN][4] ![CLIENTID][5]
3. Now you have to insert both the token and the client id in the [config.json](../main/config.json).
4. After this you have to register the commands. Do this by executing the [deploy-commands.bat](../main/deploy-commands.bat).
5. Lastly start the bot by running the [start.bat](../main/start.bat) file. Now you're ready to go. Whenever you want the bot to be online just start the bot via the [start.bat](../main/start.bat) file.

### Leaderboard
1. To setup the leaderboard firstly set the leaderboard variable in the [config.json](../main/config.json) to true.
2. Then restart your bot and run the /guess command one time.
3. Now  a leaderboard file will be created. Your server member will now be able to use the /leaderboard and /rank command.


## Customization:
* You can edit the time someone will be able to guess the member in [config.json](../main/config.json) via the `guessTime` variable.
* You can edit the [language.json](../main/language.json) file to match the command to your language.
###### WARNING: If you edit the command names, command descriptions or command options variables you will have to run the [deploy-commands.bat](../main/deploy-commands.bat) file first to update the command


## Credits
If you're using my code I would be very pleased if you leave the `credits` variable in the [language.json](../main/language.json) as well as in the actual code. I know the code isn't very complicated but it's still my work you're downloading, so please respect that. If you're planning on mentioning my project on any social media (for example: Youtube) please link the github repo and message me via an [issue](../../issues).

## Disclaimer:
I only executed the bot on my windows computer. I can't help you with hosting on an external server. Also if you're on Linux you will have to rename the `.bat` files to `.sh`.


## Feedback
If you're experiencing any issues or you got any improvements feels free to write me via the [issues](../../issues). Moreover if you have any feature requests for new commands that would fit to the Guess bot contact me on Discord Nils#7168.




[1]: https://discordjs.guide/
[2]: https://discordjs.guide/preparations/setting-up-a-bot-application.html
[3]: https://discordjs.guide/preparations/adding-your-bot-to-servers.html
[4]: https://cloud.n1lzh.de/s/89RBEjy98tB7ZaJ/preview
[5]: https://cloud.n1lzh.de/s/YX2TQ5wRWoWtiCr/preview
