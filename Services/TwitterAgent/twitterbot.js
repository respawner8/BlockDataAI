import { Scraper } from "agent-twitter-client";
const config = require('../config.js');

// const scraper = await getScraper({ authMethod: 'password' });

const scraper = new Scraper();
// await scraper.login('username', 'password');



// If using v2 functionality (currently required to support polls)
await scraper.login(
    config.username,
    config.password,
    config.email,
    config.appKey,
    config.appSecret,
    config.accessToken,
    config.accessSecret
);

async function fetchTweets(user, maxTweets) {
    const tweetsGenerator = scraper.getTweets(user, maxTweets);

    for await (const tweet of tweetsGenerator) {
        console.log("Tweet ID:", tweet.id);
        console.log("Text:", tweet.text);
        console.log("Likes:", tweet.likes);
        console.log("Retweets:", tweet.retweets);
        console.log("--------------");
    }
}

// Example usage:
fetchTweets("elonmusk", 1);



