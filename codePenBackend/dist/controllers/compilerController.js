"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCodes = exports.editCode = exports.deleteCode = exports.getMyCodes = exports.loadCode = exports.saveCode = void 0;
const codeModel_1 = require("../models/codeModel");
const userModel_1 = require("../models/userModel");
const saveCode = async (req, res) => {
    const { fullCode, title } = req.body;
    let ownerName = "Anonymous";
    let ownerInfo = undefined;
    let isAuthenticated = false;
    let user;
    if (req._id) {
        user = await userModel_1.User.findById(req._id);
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found",
            });
        }
        ownerName = user.username;
        ownerInfo = user._id;
        isAuthenticated = true;
    }
    if (!fullCode.html && !fullCode.css && !fullCode.javascript) {
        return res.status(400).send({
            success: false,
            message: "Code cannot be empty",
        });
    }
    try {
        const newCode = await codeModel_1.Code.create({
            fullCode: fullCode,
            ownerName: ownerName,
            ownerInfo: ownerInfo,
            title: title,
        });
        if (isAuthenticated && user) {
            user.savedCodes.push(newCode._id);
            await user.save();
        }
        return res.status(201).send({
            success: true,
            message: "Successfully saved code",
            url: newCode._id,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error saving code",
            error,
        });
    }
};
exports.saveCode = saveCode;
const loadCode = async (req, res) => {
    const { urlId } = req.body;
    const userId = req._id;
    let isOwner = false;
    if (!urlId) {
        return res.status(400).send({
            success: false,
            message: "urlId is required",
        });
    }
    try {
        const existingCode = await codeModel_1.Code.findById(urlId);
        if (!existingCode) {
            return res.status(404).send({
                success: false,
                message: "Code not found",
            });
        }
        if (req._id) {
            const user = await userModel_1.User.findById(userId);
            console.log("username", user?.username);
            console.log("ownername", existingCode?.ownerName);
            if (user?.username === existingCode.ownerName) {
                isOwner = true;
            }
        }
        return res.status(200).send({
            success: true,
            message: "Successfully found code",
            fullCode: existingCode.fullCode,
            isOwner,
        });
    }
    catch (error) {
        return res.status(500).send({
            success: false,
            message: "Error loading code",
            error,
        });
    }
};
exports.loadCode = loadCode;
const getMyCodes = async (req, res) => {
    const userId = req._id;
    try {
        const user = await userModel_1.User.findById(userId).populate({
            path: "savedCodes",
            options: { sort: { createdAt: -1 } },
        });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Can not fid user!",
            });
        }
        return res.status(200).send(user.savedCodes);
    }
    catch (error) {
        return res.status(500).send({
            success: false,
            message: "Error loading myCodes",
            error,
        });
    }
};
exports.getMyCodes = getMyCodes;
const deleteCode = async (req, res) => {
    const userId = req._id;
    const { id } = req.params;
    console.log("userId", userId);
    console.log("postId", id);
    try {
        const owner = await userModel_1.User.findById(userId);
        if (!owner) {
            return res.status(404).send({
                success: false,
                message: "Can not find the owner profile",
            });
        }
        const existingCode = await codeModel_1.Code.findById(id);
        console.log("existingCode", existingCode);
        console.log("username", owner.username);
        if (!existingCode) {
            return res.status(404).send({
                success: false,
                message: "Code not found",
            });
        }
        if (existingCode.ownerName !== owner.username) {
            console.log("true");
            return res.status(400).send({
                success: false,
                message: "unAuthorized user to delete",
            });
        }
        const deleteCode = await codeModel_1.Code.findByIdAndDelete(id);
        if (!deleteCode) {
            return res.status(404).send({
                success: false,
                message: "Code not Found",
            });
        }
        else {
            return res.status(200).send({
                success: true,
                message: "successfully deleted",
                id,
            });
        }
    }
    catch (error) {
        return res.status(500).send({
            success: false,
            message: "Error Deleting code",
            error,
        });
    }
};
exports.deleteCode = deleteCode;
const editCode = async (req, res) => {
    const userId = req._id;
    const postId = req.params.id;
    const fullCode = req.body;
    try {
        const owner = await userModel_1.User.findById(userId);
        if (!owner) {
            return res.status(404).send({
                success: false,
                message: "Can not find owner",
            });
        }
        const existingCode = await codeModel_1.Code.findById(postId);
        if (!existingCode) {
            return res.status(404).send({
                success: false,
                message: "Can not find post to edit",
            });
        }
        if (existingCode.ownerName !== owner.username) {
            return res.status(400).send({
                success: false,
                message: "unAuthorized user to edit",
            });
        }
        await codeModel_1.Code.findByIdAndUpdate(postId, { fullCode: fullCode });
        res.status(200).send({
            success: true,
            message: "Post updated successfully",
        });
    }
    catch (error) {
        return res.status(500).send({
            success: false,
            message: "Error editing code",
            error,
        });
    }
};
exports.editCode = editCode;
const getAllCodes = async (req, res) => {
    try {
        const allCodes = await codeModel_1.Code.find().sort({ createdAt: -1 });
        return res.status(200).send(allCodes);
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal Server Erro",
            error,
        });
    }
};
exports.getAllCodes = getAllCodes;
