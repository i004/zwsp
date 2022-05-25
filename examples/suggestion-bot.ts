import { Client, Intents, TextChannel } from 'discord.js';
import { encode, decode } from 'zwsp';

const client = new Client({
	intents: [ Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES ]
});

const SUGGESTION_CHANNEL_ID = '111111111111111111';

client.on('messageCreate', async (message) => {
	if (!message.guild || message.author.bot || !message.content)
    	return;
	const args = message.content.split(/\s+/);
    
    if (args[0] == '!suggest') {
    	const data = { authorId: message.author.id };
        const channel = client.channels.cache.get(SUGGESTION_CHANNEL_ID) as TextChannel;

    	await channel.send({
        	embeds: [{
            	author: { name: message.author.username, iconURL: message.author.displayAvatarURL() },
                description: args.slice(1).join(' ') + encode(data)
            }]
        })
    	await message.reply('Your suggestion was successfully submitted!');
    } else if (args[0] == '!edit-suggestion') {
        const channel = client.channels.cache.get(SUGGESTION_CHANNEL_ID) as TextChannel;
        const msg = await channel.messages.fetch(args[1]);
        const data: { authorId: string } = decode(msg.embeds[0].description);

        if (data.authorId != message.author.id)
            await message.reply('This is not your suggestion!');
        else {
            await msg.edit({
                embeds: [{
                    author: { name: message.author.username, iconURL: message.author.displayAvatarURL() },
                    description: args.slice(2).join(' ') + encode(data)
                }]
            });

            await message.reply('Your suggestion was successfully edited!');
        }
    }
});

client.login('token');