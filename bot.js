const { Client, MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const querystring = require('querystring');

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
        
        message.channel.send(list[0].definition);
    }
});

// CODE for Oreinos
client.login('NzcwOTkzMDY5NjU0NTQwMzQ4.X5lpQA.3_q5RC5pHXEVifIBil_FBkNZ3HA');