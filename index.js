const Discord = require('discord.js');
const { token, channel, message, upvote, downvote, states } = require('./config.json');
const client = new Discord.Client({
  intents: ['GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS']
});

client.once('ready', () => {
  console.log('Ready');

  (loop = async () => {
    const _channel = await client.channels.fetch(channel);
    const _message = await _channel.messages.fetch(message);
    const cache = _message.reactions.cache;

    const upvotes = cache.has(upvote) ? cache.get(upvote).count : 0;
    const downvotes = cache.has(downvote) ? cache.get(downvote).count : 0;
  
    if (upvotes > downvotes) await _channel.setName(states[0]);
    else if (upvotes === downvotes) await _channel.setName(states[1]);
    else if (upvotes < downvotes) await _channel.setName(states[2]);

    console.log('Done');
  
    setTimeout(loop, 60 * 1e3);
  })();
});

client.login(token);
