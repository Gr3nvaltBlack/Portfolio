const PostModel = require('../models/post.model');
const UserModel = require('../models/User.model');
const ObjectId = require('mongoose').Types.ObejectId;


            /* =====Create a new post for a user===== */
module.exports.createPost = (req, res) => {
    const newPost = new PostModel({
        userId: req.body.userId,
        title: req.body.title,
        content: req.body.content,
        media: req.body.media,
        likers: [],
        comments: [],
    });
    newPost.save()
        .then((post) => res.status(201).json(post))
        .catch((error) =>res.status(400).send({ message: 'Error creating post: ' + error}));
}


            /* =====Recover all posts===== */
module.exports.getAllPosts = async (req, res) => {
    try {
        const posts = await PostModel.find()
            res.status(200).json(posts)
    } catch (err) {
        res.status(500).send({ message: 'Failed to retrieve posts: ' + err });
    }
}


            /* =====Recover a single post by ID===== */
module.exports.getPostById = async (req, res) => {
    // Check if the ID is valid
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send({ message: `The ID ${req.params.id} is not valid` });
    }
    // Find the post by ID and return it
    try {
        // If the post does not exist
        const post = await PostModel.findById(req.params.id)
        if (!post) {
            return res.status(404).send({ message: 'Post not found' })
        }
            res.status(200).json(post);
        } catch (err) {
            res.status(500).send({ message: 'Failed to retrieve this post: ' + err });
        }   
}


            /* =====Update a post by ID===== */
module.exports.updatePost = async (req, res) => {
    // Check if the ID is valid
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send({ message: `The ID ${req.params.id} is not valid` });
    }

    // What we want to update
    const updatedPost = {
        title: req.body.title,
        content: req.body.content,
    }

    // Find the post by ID and update it
    try {
        // Find the post first
        const post = await PostModel.findById( req.params.id);
        if (!post) {
            return res.status(404).send({ message: 'Post not found' })
        }
        // Check if the user is the owner of the post to update
        if (post.userId !== req.body.userId) {
            return res.status(403).send({ message: 'You are not authorized to update this post' })
        }

        const updatedPost = await PostModel.findByIdAndUpdate(
            req.params.id,
            {$set: updatedPost},
            {
                new: true,
                setDefaultsOnInsert: true,
                runValidators: true
            },
        )
            res.status(200).json(updatedPost);
    } catch (err) {
        res.status(400).send({ message: 'Error to update the post: ' + err });
    }
}


            /* =====Delete a post by ID===== */
module.exports.deletePost = async (req, res) => {
    // Check if the ID is valid
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send({ message: `The ID ${req.params.id} is not valid` });
    }

    // Find the post by ID and delete it
    try {
        // If the post does not exist
        const post = await PostModel.findById(req.params.id);
        if (!post) {
            return res.status(404).send({ message: 'Post not found'})
        }
        // Check if the user is the owner of the post to delete
        if (post.userId !== req.body.userId) {
            return res.status(403).send({ message: 'You cannot delete this post.' })
        }

        const postToDelete = await PostModel.findByIdAndDelete(req.params.id);
        res.status(200).send({ message: 'Post deleted successfully', deleted: postToDelete });
    } catch (error) {
        res.status(400).send({ message: 'Error deleted post' + err });
    }
}


            /* =====Like a post===== */
module.exports.likePost = async (req, res) => {
    // Check if the ID is valid
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send({ message: `The ID ${req.params.id} is not valid` });
    }
    try {
        // Check if the post exists
        const post = await PostModel.findById(req.params.id);
        if (!post) {
            return res.status(404).send({ message: 'Post not found'})
        }
        const updatedPost = await PostModel.findByIdAndUpdate(
            req.params.id,
            {
                $addToSet: { likers: req.body.userId },
            },
            { new: true },
        );

        // Check if the user exists
        const user = await UserModel.findById(req.body.userId);
        if (!user) {
            return res.status(404).send({ message: 'the user does not exist'})
        }
        const updatedUser = await UserModel.findByIdAndUpdate(
            req.body.userId,
            {
                $addToSet: { likes: req.params.id },
            },
            { new: true },
        )
        res.status(200).json({
            message: 'Post likes succesfully',
            updatedPost,
            updatedUser
        });
    } catch (err) {
        res.status(400).send({ message: 'Cannot like this post' + err });
    }
}


            /* =====Unlike a post===== */
module.exports.unlikePost = async (req, res) => {
    // Check if the ID is valid
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send({ message: `The ID ${req.params.id} is not valid` });
    }
    try {
        // Check if the post exists
        const post = await PostModel.findById(req.params.id);
        if (!post) {
           return res.status(404).send({ message: 'Post not found'}) 
        }
        const updatedPost = await PostModel.findByIdAndUpdate(
            req.params.id,
            {
                $pull: { likers: req.body.userId},
            },
            { new: true },
        );

        // Check if the user exists
        const user = await UserModel.findById(req.body.userId);
        if (!user) {
            return res.status(404).send({ message: 'the user does not exist'})
        }
        const updatedUser = await UserModel.findByIdAndUpdate(
            req.body.userId,
            {
                $pull: { likes: req.params.id },
            },
            { new: true },
        )  
        res.status(200).json({
            message: 'the like has been removed',
            updatedPost,
            updatedUser
        });
    } catch (err) {
        res.status(400).send({ message: 'Error to unlike the post: ' + err});
    }
}