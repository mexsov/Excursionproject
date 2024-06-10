import { ExtractReqInfo, ExtractResInfo, LogInfo } from "./Logger.mjs";
import uniqid from "uniqid";

export const LogRouteInfo = (req, res) => {

    let startTime = Date.now();
    req.logger = {
        requestId: uniqid()
    };

    res.on("finish", () => {
        let responseTimeMS = Date.now() - startTime;

        const request = ExtractReqInfo(req);
        const response = ExtractResInfo(res);
        LogInfo(`[${req.logger.requestId}] Request finished.`, {
            request,
            response,
            responseTimeMS
        });
    });
}