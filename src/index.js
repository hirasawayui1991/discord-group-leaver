import axios from "axios";
import { Client } from "discord.js-selfbot-v13";
import { prompt } from "./util/prompt.js";
import { sleep } from "./util/sleep.js";
import { logger } from "./util/logger.js";

const client = new Client({ checkupdate: false });

const headers = (token) => {
    return {
        "accept": "*/*",
        "accept-encoding": "gzip, deflate, br, zstd",
        "accept-language": "ja;q=0.9",
        "authorization": token,
        "content-length": "107",
        "content-type": "application/json",
        "origin": "https://discord.com",
        "priority": "u=1, i",
        "referer": "https://discord.com",
        "sec-ch-ua": "\"Brave\";v=\"131\", \"Chromium\";v=\"131\", \"Not_A Brand\";v=\"24\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-model": "\"\"",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-ch-ua-platform-version": "\"15.0.0\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "sec-gpc": "1",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
        "x-debug-options": "bugReporterEnabled",
        "x-discord-locale": "ja",
        "x-discord-timezone": "Asia/Tokyo",
        "x-super-properties": "eyJvcyI6IldpbmRvd3MiLCJicm93c2VyIjoiQ2hyb21lIiwiZGV2aWNlIjoiIiwic3lzdGVtX2xvY2FsZSI6ImphIiwiYnJvd3Nlcl91c2VyX2FnZW50IjoiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzEzMS4wLjAuMCBTYWZhcmkvNTM3LjM2IiwiYnJvd3Nlcl92ZXJzaW9uIjoiMTMxLjAuMC4wIiwib3NfdmVyc2lvbiI6IjEwIiwicmVmZXJyZXIiOiIiLCJyZWZlcnJpbmdfZG9tYWluIjoiIiwicmVmZXJyZXJfY3VycmVudCI6IiIsInJlZmVycmluZ19kb21haW5fY3VycmVudCI6IiIsInJlbGVhc2VfY2hhbm5lbCI6InN0YWJsZSIsImNsaWVudF9idWlsZF9udW1iZXIiOjM1NTYyNCwiY2xpZW50X2V2ZW50X3NvdXJjZSI6bnVsbCwiaGFzX2NsaWVudF9tb2RzIjpmYWxzZX0="
    }
}

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
})();