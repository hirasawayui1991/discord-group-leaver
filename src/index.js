import axios from "axios";
import { Client } from "discord.js-selfbot-v13";
import { headers } from "./util/headers.js";
import { logger } from "./util/logger.js";
import { prompt } from "./util/prompt.js";
import { sleep } from "./util/sleep.js";

const client = new Client({ checkupdate: false });

(async() => {

    logger.info("This tool was created by 由比ゅ♂, and I am not responsible for any problems caused by this tool.");

    const token = await prompt("token> ");
    if (!token && typeof token != "string") return logger.error("The token is invalid.");

    client.login(token);

    client.once("ready", () => {
        logger.success(`Logged in as (${client.user.tag})`);
    });

    const channels = client.users.cache.map(user => user.dmChannel).filter(channel => channel && channel.type === "DM");

    for (const channel of channels) {

        try {

            const response = await axios.delete(`https://discord.com/api/v10/channels/${channel.id}`, {
                headers: headers(token)
            }).catch(response => {

                if (response.status === 200) {
                    logger.success(`Created:`);
                }
            });
        } catch (e) {

            if (e.response.status === 429) {
                logger.limited(`Time: ${response.headers["retry_after"]}`);
                await sleep(response.headers["retry_after"]);
                continue;
            } else {
                logger.error(e);
            }
        }
    }

    logger.success("Exit from all acquired group DMs completed.");
    await sleep(6000);
    process.exit(0);
})();