const { httpResponse } = require("../../config/http-response");
import Letter from "../../models/Letter";

export const getOneLetter = async (req, res) => {
    try {
        const { letterId } = req.params;
        const letterInfo = await Letter.find({ _id: letterId });
        httpResponse.SUCCESS_OK(res, "", letterInfo);
    } catch (error) {
        httpResponse.BAD_REQUEST(res, "", error);
    }
};

export const patchOneLetter = (req, res) => {};

export const deleteOneLetter = (req, res) => {};

export const getAllLettersArray = (req, res) => {};

export const getParentLettersArray = (req, res) => {};

export const getChildrenLettersArray = (req, res) => {};
