const { httpResponse } = require("../../config/http-response");
const { ObjectId } = require("mongodb");
import User from "../../models/User";
import Posting from "../../models/Posting";

export const getAllPostings = async (req, res) => {
    try {
        const postings = await Posting.find({});
        return httpResponse.SUCCESS_OK(res, "", postings);
    } catch (error) {
        return httpResponse.BAD_REQUEST(res, "", error);
    }
};
export const postOnePosting = async (req, res) => {
    const userId = req.session.loggedInUser._id;
    const { title, body } = req.body;
    try {
        const posting = await Posting.create({
            userId,
            title,
            body,
            isChecking : 0
        });
        return httpResponse.SUCCESS_OK(res, "", posting._id);
    } catch (error) {
        return httpResponse.BAD_REQUEST(res, "", error);
    }
};

export const getOnePosting = async (req, res) => {
    try {
        const id = req.params.postingId;
        const posting = await Posting.find({_id: `${id}`});
        return httpResponse.SUCCESS_OK(res, "", posting);
    } catch (error) {
        return httpResponse.BAD_REQUEST(res, "", error);
    }
};


export const patchOnePosting = async (req, res) => {
    const { title, body } = req.body;
    try {
        const id = req.params.postingId;
        const filter = { _id: ObjectId(id) };
        const options = { upsert: true };
        const updateDoc = {
          $set: {
            title: title,
            body: body
          },
        };
        const result = await Posting.updateOne(filter, updateDoc, options);
        return httpResponse.SUCCESS_OK(res, "", result);
    } catch (error) {
        return httpResponse.BAD_REQUEST(res, "", error);
    }
};

export const deleteOnePosting = async (req, res) => {
    try {
        const id = req.params.postingId;
        const result = await Posting.deleteOne({ _id: ObjectId(id) });
        return httpResponse.SUCCESS_OK(res, "", result);
    } catch (error) {
        return httpResponse.BAD_REQUEST(res, "", error);
    }
};

export const getAllReplyLetters = (req, res) => {
    
};

export const postOneReplyLetter = (req, res) => {};
