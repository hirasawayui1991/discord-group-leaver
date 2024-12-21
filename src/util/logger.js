const colors = {
    white: "\x1b[37m",
    blue: '\x1b[34m',
    yellow: '\x1b[33m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    magenta: '\x1b[35m',
    reset: '\x1b[0m'
}

export const logger = {

    info: (message) => {
        console.log(`[${colors.blue}INFO${colors.white}] ${message}`);
    },

    warn: (message) => {
        console.log(`[${colors.yellow}WARN${colors.white}] ${message}`);
    },

    // Added just for this tool.
    limited: (message) => {
        console.log(`[${colors.yellow}LIMITED${colors.white}] ${message}`);
    },

    error: (message) => {
        console.log(`[${colors.red}ERROR${colors.white}] ${message}`);
    },

    success: (message) => {
        console.log(`[${colors.green}SUCCESS${colors.white}] ${message}`);
    },

    debug: (message) => {
        console.log(`[${colors.magenta}DEBUG${colors.white}] ${message}`);
    }
}