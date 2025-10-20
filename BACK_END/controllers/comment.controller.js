const CommentModel = require('../models/comment.model');
const UserModel = require('../models/User');
const PostModel = require('../models/post.model');
const ObjectId = require('mongoose').Types.ObjectId;


    /* -----Create a new comment for a post or recipe----- */
module.exports.createComment = async (req, res) => {
    const newComment = new CommentModel({
        userId: req.body.userId,
        text: req.body.text,
    });
    try {
        await newComment.save()
        res.status(201).json(newComment)
    } catch (error) {
        res.status(400).send({ message: 'Error creating post: ' + error });
    }
}


    /* -----Update a comment by ID for a post or recipe----- */
module.exports.updateComment = async (req, res) => {
    // Check if the ID is valid
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send('the' + req.params.id + ' is not a valid ID');
    }
    // What we want to update
    const updatedComment = {
        text: req.body.text,
    }
    // Find the comment by ID and update it
    try {
        await CommentModel.findByIdAndUpdate(
            {_id: req.params.id},
            {$set: updatedComment},
            {
                new: true,
                runValidators: true
            },
        )
        if (!error) {
                res.status(200).json(docs);
            } else {
                res.status(400).send({ message: error });
            }
        } catch (error) {
            res.status(400).send({ message: error });
        }
}


    /* -----Delete a comment by ID for a post or recipe----- */
module.exports.deleteComment = async (req, res) => {
    // Check if the ID is valid
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send('the' + req.params.id + ' is not a valid ID');
    }
    // Find the comment by ID and delete it
    try {
        await CommentModel.findByIdAndDelete({_id: req.params.id}).exec();
        res.status(200).send({ message: 'Comment deleted succesfully' });
    } catch (error) {
        res.status(400).send(error.message);
    }
}