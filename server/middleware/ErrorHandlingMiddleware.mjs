import { LogRouteError } from "../Logger/LogRouteError.mjs";
import { SERVER_SIDE_ERROR } from "../cfg/ErrorMessages.mjs";

export const ErrorHandlingMiddleware = (error, req, res, next) => {

    LogRouteError(req, res, error);

    res.status(500).json({ message: SERVER_SIDE_ERROR });
}