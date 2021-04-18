const config = {
    'botToken': process.env.BOT_TOKEN,
    'googleSearch': {
        'url': 'https://google.com'
    },
    'mongoDbKeys': {
        'host': process.env.DB_HOST,
        'port': '27017',
        'database': process.env.DATABASE,
        'username': process.env.DB_USERNAME,
        'password': process.env.DB_PASS,
    }
};

module.exports = config;