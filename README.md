# Discord-Guess-Member-Bot
A discord bot with a command where you have to guess a member by it's profile picture.


## Features:
- A fully functional and easy to setup game bot for your discord server
- Execute the guess game with the /guess command (standard)


## Installation:
1. Setup a application in the discord developer portal, if you don't know how ~~learn it~~ visit [this link][1] and read the chapter [*setting up a bot application*][2] and [*#Adding your bot to server*][3].
2. Next you need your Bot's token as well as it's client id. You will get both in the developer portal under your application. You will find your Token in the *bot* section. Here you will have to reset it first to copy it. Your client id will be in the *OAuth2* section under *Client Information*.
![TOKEN][4] ![CLIENTID][5]
3. Now you have to insert both the token and the client id in the [config.json](../main/config.json).
4. Now you can run the bot by running the [start.bat](../main/start.bat) file.


## Customization:
* You can edit the time someone will be able to guess the member in [config.json](../main/config.json) via the `guessTime` variable.
* You can edit the [language.json](../main/language.json) file to match the command to your language.
###### WARNING: If you edit the `commandName` or `commandDesc` variable you will have to run the [deploy-commands.bat](../main/deploy-commands.bat) file first to update the command


## Credits
If you're using my code I would be very pleased if you leave the `credits` variable in the [language.json](../main/language.json) as well as in the actual code. I know the code isn't very complicated but it's still my work you're downloading, so please respect that.


## Feedback
If you're experiencing any issues or you got any improvements feels free to write me via the [issues](../../issues). Moreover if you have any feature requests for new commands that would fit to the Guess bot contact me on Discord Nils#7168.




[1]: https://discordjs.guide/
[2]: https://discordjs.guide/preparations/setting-up-a-bot-application.html
[3]: https://discordjs.guide/preparations/adding-your-bot-to-servers.html
[4]: https://cloud.n1lzh.de/s/89RBEjy98tB7ZaJ/preview
[5]: https://cloud.n1lzh.de/s/YX2TQ5wRWoWtiCr/preview