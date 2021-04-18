const Discord = require('discord.js');
const config = require('./config/config.json');
const {
    messageConsumer,
} = require('./modules/botConsumer/botMessageHandler/botMessage.consumer');


// setup mongo connection to store recent search data
const { mongoDbKeys } = require('./config/config.json');
const { mongoInit } = require('./dbModels/connection');
mongoInit({ db: mongoDbKeys });

const client = new Discord.Client();
// login via bot, read messages and reply
client.on('message', async (message) => {
    const response = await messageConsumer({ messageText: message.content.trim().toLowerCase(), author: message.author  });
    if (response.reply) {
        return message.reply(response.message);
    }
    return;
});

client.login(config.botToken);
