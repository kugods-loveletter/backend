class httpResponse {
    static SUCCESS_OK(res, message, data) {
        const response = {
            status: 200,
            message: message || "",
            data: data || {},
        };
        console.log(response);
        res.json(response);
    }
    static SUCCESS_CREATED(res, message, data) {
        const response = {
            status: 201,
            message: message || "",
            data: data || {},
        };
        res.json(response);
    }
    static NOT_FOUND(res, message, data) {
        const response = {
            status: 404,
            message: message || "",
            data: data || {},
        };
        res.json(response);
    }
    static BAD_REQUEST(res, message, data) {
        const response = {
            status: 400,
            message: message || "",
            data: data || {},
        };
        console.log(response);

        res.json(response);
    }
    static INTERNAL_ERROR(res, message, data) {
        const response = {
            status: 500,
            message: message || "",
            data: data || {},
        };
        res.json(response);
    }
}

module.exports = { httpResponse };
