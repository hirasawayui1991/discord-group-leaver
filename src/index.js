import axios from "axios";
import { Client } from "discord.js-selfbot-v13";
import { headers } from "./util/headers.js";
import { logger } from "./util/logger.js";
import { prompt } from "./util/prompt.js";
import { sleep } from "./util/sleep.js";

const client = new Client({ checkupdate: false });

process.on("uncaughtException", (e) => {
    logger.error(e);
});

(async() => {

    logger.info("This tool was created by 由比ゅ♂, and I am not responsible for any problems caused by this tool.");

    const token = await prompt("token> ");
    if (!token) {
        logger.error("The token is invalid.");
        await sleep(6000);
        process.exit(0);
    }

    client.login(token);

    client.once("ready", async () => {

        logger.success(`Logged in as (${client.user.tag})`);

        const channels = client.channels.cache.filter(channel => channel.type === "GROUP_DM").map(channel => channel.id);

        if (channels.length === 0) {
            logger.info("No group DMs to leave.");
            await sleep(6000);
            process.exit(0);
        }
      
        logger.info(`We've got a group of ${channels.length}, we're going to start exiting.`);

        let leavedCount = 0;

        for (const channel of channels) {

            try {

                const response = await axios({
                    method: "DELETE",
                    url: `https://canary.discord.com/api/v9/channels/${channel.trim()}?silent=false`,
                    headers: headers(token.trim())
                });
    
                if (response.status === 200) {
                    logger.success(`Leaved:`, channel);
                    leavedCount++;
                    if (leavedCount === channels.length) {
                        logger.info("Exit from all acquired group DMs completed.");
                        await sleep(6000);
                        process.exit(0);
                    }
                }
            } catch (e) {
    
                if (e.response) {
                    if (e.response.status === 429) {
                        logger.limited(`Rate limited. Retrying after ${e.response.headers["retry-after"]} ms`);
                        await sleep(e.response.headers["retry-after"]);
                        continue;
                    } else {
                        logger.error(`Failed to leave group DM: ${channel}`);
                        logger.error(`Status: ${e.response.status}`);
                    }
                } else {
                    logger.error(`Failed to leave group DM: ${channel}`);
                    logger.error(`Error message: ${e.message}`);
                }
            }
        }
    });
})();