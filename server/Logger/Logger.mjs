import Winston from "winston";
import "dotenv/config";

const isDev = process.env.NODE_ENV === "development";
const isProd = process.env.NODE_ENV === "production";
const Removed = "*";

const format = Winston.format.combine(
    isDev ? Winston.format.colorize({ all: true }) : Winston.format.uncolorize(),
    Winston.format.timestamp({
        format: 'hh:mm:ss A',
    }),
    Winston.format.printf((info) => {

        const { timestamp, level, message, ...meta } = info;

        let metaParsed = '';
        if (Object.keys(meta).length > 0) {
            isDev ? metaParsed = JSON.stringify(meta, null, 2) : metaParsed = JSON.stringify(meta);
        }

        return `[${timestamp}] ${level}: ${message} ${metaParsed}`
    })
)

const fileTransport = new Winston.transports.File({ filename: `logs/${(new Date().toISOString().split('T')[0])}.log`, format });

const consoleTransport = new (Winston.transports.Console)({ format });

const transport = isDev ? consoleTransport : fileTransport;

const logger = new (Winston.Logger)({
    level: "info",
    transports: [transport],
});

export const LogInfo = (message, meta) => {
    logger.log("info", message, meta);
}

export const LogError = (message, meta) => {
    logger.log("error", message, meta);
}

export const ExtractReqInfo = (req) => {
    if (req.body.password && isProd) {
        req.body.password = Removed;
    }

    let token = "";
    if (req.user && isProd) {
        token = Removed;
    }
    else {
        token = req.get("Authorization");
    }

    let user = req.user;
    if (isProd) {
        user.password = Removed;
    }

    const request = {
        authenticated: req.user ? {
            user: req.user,
            token
        } : false,
        URL: req.originalUrl,
        method: req.method,
        body: req.body,
        params: req.params,
        query: req.query
    };

    return request;
}

export const ExtractResInfo = (res) => {
    const response = {
        data: res.logger.data
    };

    return response;
}