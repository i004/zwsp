import { Client, Intents, TextChannel } from 'discord.js';
import { encode, decode } from 'zwsp';

const client = new Client({
	intents: [ Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES ]
});

const SUGGESTION_CHANNEL_ID = '111111111111111111';
type SuggestionData = { authorId: string };

client.on('messageCreate', async (message) => {
	if (!message.guild || message.author.bot || !message.content) // ignore bots, DM messages and messages with no content
    	return;
    
	const args = message.content.split(' '); // split message by spaces
    
    if (args[0] == '!suggest') {
    	const data: SuggestionData = { authorId: message.author.id }; // suggestion data
        const suggestionChannel = client.channels.cache.get(SUGGESTION_CHANNEL_ID) as TextChannel;

    	await suggestionChannel.send({
        	embeds: [{
            	author: { name: message.author.username, iconURL: message.author.displayAvatarURL() },
                description: args.slice(1).join(' ') + encode(data) // merge suggestion text with encoded suggestion data
            }]
        })

    	await message.reply('Your suggestion was successfully submitted!');
    } else if (args[0] == '!edit-suggestion') {
        const suggestionChannel = client.channels.cache.get(SUGGESTION_CHANNEL_ID) as TextChannel;
        const suggestionMessage = await suggestionChannel.messages.fetch(args[1]); // fetch message

        const data: SuggestionData = decode(suggestionMessage.embeds[0].description); // extract data from embed description

        if (data.authorId != message.author.id) // prohibit users from editing suggestions they didn't submit
            await message.reply('This is not your suggestion!');
        else {
            await suggestionMessage.edit({
                embeds: [{
                    author: { name: message.author.username, iconURL: message.author.displayAvatarURL() },
                    description: args.slice(2).join(' ') + encode(data)
                }]
            });

            await message.reply('Your suggestion was successfully edited!');
        }
    }
});

client.login('dQw4w9WgXcQ11ablkhaboahj.tfb_Ct.zp3cliAHhmPEMa31HsrldJOE91j8ke7ZKrT07I');