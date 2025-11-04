const CommentModel = require('../models/Comment.model');
const UserModel = require('../models/User.model');
const PostModel = require('../models/Post.model');
const RecipeModel = require('../models/Recipe.model');
const ObjectId = require('mongoose').Types.ObjectId;


            /* =====Create a new comment for a post or recipe===== */
module.exports.createComment = async (req, res) => {
    
    const postId = req.params.postId;
    const recipeId =req.params.recipeId;

     // Check if the ID is valid
    if (postId && !ObjectId.isValid(postId)) {
        return res.status(400).send({ message: 'ID is not a valid' });
    }
    if (recipeId && !ObjectId.isValid(recipeId)) {
        return res.status(400).send({ message: 'ID is not a valid' });
    }
    // Check comment ownership
    if (!postId && !recipeId) {
        return res.status(400).send({ message: 'A comment must belong to a post or recipe.' })
    }
    if (postId && recipeId) {
        return res.status(400).send({ message: 'A comment cannot be linked to two entities.' })
    }
    try {
        if (postId) {
            const newComment = new CommentModel({
                userId: req.body.userId,
                text: req.body.text,
                postId,  
            });
            const savedComment = await newComment.save()
            await PostModel.findByIdAndUpdate(
                req.params.postId,
                {
                    $push: {comments: savedComment}
                },
                { new: true }
            )
        } else if (recipeId) {
            const newComment = new CommentModel({
                userId: req.body.userId,
                text: req.body.text,
                recipeId,
            });
            const savedComment = await newComment.save()
            await RecipeModel.findByIdAndUpdate(
                req.params.recipeId,
                {
                    $addToSet: {comments: savedComment}
                },
                { new: true }
            )
        }
        res.status(201).json({ message: 'The comment has been added' })
    } catch (err) {
        res.status(400).send({ message: 'Error creating comment: ' + err });
    }
}


            /* =====Update a comment by ID for a post or recipe===== */
module.exports.updateComment = async (req, res) => {
    // Check if the ID is valid
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send({ message: `The ID ${req.params.id} is not valid` });
    }
    // What we want to update
    const updatedComment = {
        text: req.body.text,
    }

    // Find the comment by ID and update it
    try {
        // Find the comment first
        const comment = await CommentModel.findById(req.params.id,);
        if (comment === null) {
            return res.status(404).send({ message: 'Comment not found' });
        }

        // Check if the user is the owner of the comment to update
        if (comment.userId !== req.body.userId) {
            return res.status(403).send({ message: 'You are not authorized to update this comment' });
        }

        const commentToUpdate = await CommentModel.findByIdAndUpdate(
            req.params.id,
            {$set: updatedComment},
            {
                new: true,
                runValidators: true
            },
        )
        res.status(200).json({ message: 'The comment has been updated' });
    } catch (err) {
        res.status(400).send({ message: 'Error to updated comment: ' + err });
    }
}


            /* =====Delete a comment by ID for a post or recipe===== */
module.exports.deleteComment = async (req, res) => {
    // Check if the ID is valid
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send({ message: `The ID ${req.params.id} is not valid` });
    }

    // Find the comment by ID and delete it
    try {
        const comment = await CommentModel.findById(req.params.id);
        if (!comment) {
            return res.status(404).send({ message: 'Comment not found' })
        }
        // Check if the user is the owner of the comment to delete
        if (comment.userId !== req.body.userId) {
            return res.status(403).send({ message: 'You cannot delete this comment.' })
        }

        const commentToDelete = await CommentModel.findByIdAndDelete(req.params.id);
        res.status(200).send({ message: 'Comment deleted succesfully', deleted: commentToDelete });
    } catch (err) {
        res.status(400).send({ message: 'Error deleted comment: ' + err });
    }
}