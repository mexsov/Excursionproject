import { LogRouteInfo } from "../Logger/LogRouteInfo.mjs";

export const LoggingMiddleware = (req, res, next) => {

    LogRouteInfo(req, res);

    next();
}