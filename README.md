# Google search Discord bot
 
### Features
 - Allows a user to search on google through discord. If the user types !google nodejs, reply with top 5 links that you would get when you search nodejs on google.com
 - Functionality to search through your search history. MongoDB is used to make search data persistent. If a user uses !google to search for "nodejs" "apple games" "game of thrones", and after these searches, if user types !recent game, bot replies with "apple games" and "game of thrones"
    
### Prerequisites
- mongodb 3.6.3
- node v15.4.0
- npm 7.0.15

### Quick start
 - Run the following commands inside terminal.
 - Clone the project ``` git clone https://github.com/rohtash03/google-search-discord-bot.git ```
 - Install dependencies inside repo folder ``` npm i ```
 - Start mongodb server on localhost.
 - Change credentials in config/config.json file. 
 - Start bot with ``` npm run start ```
 - Use ``` npm run test``` - to start test run.

### Code Flow
- app.js starts bot, listens and responds to user messages.
- Database models are defined in dbModels folder.
- modules folder contains all functionality related code.
- Test run files are in tests folder inside modules.