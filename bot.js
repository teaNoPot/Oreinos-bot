const { Client, MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const querystring = require('querystring');
http = require('http')
handle = (req, res) => res.end("hit");
server = http.createServer(handle);
server.listen(process.env.PORT || 5000);


const client = new Client();
const prefix = '!';

client.once('ready', () => {
    console.log('Ready!');
});

client.on('message', async message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();


    if (command === 'truth') {
        if (!args.length) {
            return message.channel.send('You need to supply a search term!');
        }

        const query = querystring.stringify({ term: args.join(' ') });

        const { list } = await fetch(`https://api.urbandictionary.com/v0/define?${query}`)
                                .then(response => response.json());

        console.log(list);
        if (list.length > 0) {
            const trim = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str);

            const [answer] = list;

            const embed = new MessageEmbed()
                .setColor('#EFFF00')
                .setTitle(answer.word)
                .setURL(answer.permalink)
                .addFields(
                    { name: 'Definition', value: trim(answer.definition, 1024) },
                    { name: 'Example', value: trim(answer.example, 1024) },
                    { name: 'Rating', value: `${answer.thumbs_up} thumbs up. ${answer.thumbs_down} thumbs down.` }
                );

            message.channel.send(embed);
        } else 
            message.channel.send("My infinite grimoire does not contain this magical word. They lied to you..");
        
    }



});

// CODE for Oreinos
client.login(process.env.BOT_TOKEN);