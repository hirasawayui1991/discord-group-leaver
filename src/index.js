import axios from "axios";
import { Client } from "discord.js-selfbot-v13";
import { prompt } from "./util/prompt.js";
import { logger } from "./util/logger.js";

const client = new Client({ checkupdate: false });

const headers = {
    
}

(async() => {

    const token = await prompt("token> ");
    if (!token && typeof token != "string") return logger.error("The token is invalid");

    client.login(token);

    client.once("ready", () => {
        logger.success(`Logged in as ${client.user.tag}`);
    });

    const channels = client.channels.cache().filter(channel => channel.type === "DM");

    for (const channel of channels) {

        try {

            const response = await axios.delete()
        
        } catch (e) {
            logger.error(e);
        }
    }
})();