export const CaptureResMiddleware = (req, res, next) => {

    const originaljson = res.json;

    res.json = (obj) => {
        res.logger = {
            data: obj
        };

        originaljson.call(res, obj);
    }

    next();
}