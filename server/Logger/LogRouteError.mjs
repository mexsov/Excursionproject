import { ExtractReqInfo, LogError } from "./Logger.mjs";

export const LogRouteError = (req, res, error) => {
    res.on("finish", () => {
        LogError(`[${req.logger.requestId}] Request finished with an error.`, {
            error: error.stack
        });
    });
}