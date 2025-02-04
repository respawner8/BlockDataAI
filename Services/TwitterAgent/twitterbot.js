import { Scraper } from 'agent-twitter-client';
import {
  twitterUsername,
  twitterPassword,
  twitterEmail,
  twitterAppKey,
  twitterAppSecret,
  twitterAccessToken,
  twitterAccessSecret,
} from "../../config.js";

import dbOperations from "../../Utils/dbOperations.js";


const scraper = new Scraper();

await scraper.login(
  twitterUsername,
  twitterPassword,
  twitterEmail,
  twitterAppKey,
  twitterAppSecret,
  twitterAccessToken,
  twitterAccessSecret
);

async function fetchTweets(user, maxTweets) {
    const tweetsGenerator = scraper.getTweets(user, maxTweets);

    for await (const tweet of tweetsGenerator) {
        console.log("Tweet ID:", tweet.id);
        console.log("Text:", tweet.text);
        console.log("Likes:", tweet.likes);
        console.log("Retweets:", tweet.retweets);
        console.log("--------------");

        // Insert tweet data into the database
        const tweetData = {
            tid: tweet.id,
            tenantId: 'Block', // Assuming user as partition key
            text: tweet.text,
            likes: tweet.likes,
            retweets: tweet.retweets,
            timestamp: new Date().toISOString()
        };

        await dbOperations.createFamilyItem(tweetData);
    }
}

// Example usage:
fetchTweets("elonmusk", 1);



