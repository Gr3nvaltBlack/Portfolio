const PostModel = require('../models/post.model');
const UserModel = require('../models/User');
const ObjectId = require('mongoose').Types.ObejectId;


    /* -----Create a new post for a user----- */
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


    /* -----Recover all posts----- */
module.exports.getAllPosts = (req, res) => {
    PostModel.find((err, docs) => {
        if (!err) {
            res.status(200).json(docs)
        } else {
            console.error('Error to get post: ' + err);
        }
    });
}


    /* -----Recover a single post by ID----- */
module.exports.getPostById = (req, res) => {
    // Check if the ID is valid
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send('the ' + req.params.id + ' is not a valid ID');
    }
    // Find the post by ID and return it
    PostModel.findById(req.params.id, (err, docs) => {
        if (!err) {
            res.status(200).json(docs);
        } else {
            console.log('Error to get this post: ' + err);
        }
    })
}


    /* -----Update a post by ID----- */
module.exports.updatePost = async (req, res) => {
    // Check if the ID is valid
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send('the' + req.params.id + ' is not a valid ID');
    }
    // What we want to update
    const updatedPost = {
        title: req.body.title,
        content: req.body.content,
    }
    // Find the post by ID and update it
    PostModel.findByIdAndUpdate(
        {_id: req.params.id},
        {$set: updatedPost},
        {
            new: true,
            setDefaultsOnInsert: true,
            runValidators: true
        },
        (err, docs) => {
            if (!err) {
                res.status(200).json(docs);
            } else {
                res.status(400).send({ message: err });
            }
        }
    )
}


    /* -----Delete a post by ID----- */
module.exports.deletePost = async (req, res) => {
    // Check if the ID is valid
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send('Invalid post ID format');
    }
    // Find the post by ID and delete it
    try {
        await PostModel.findByIdAndDelete({_id: req.params.id}).exec();
        res.status(200).send({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(400).send(error.message);
    }
}


    /* -----Like a post----- */
module.exports.likePost = async (req, res) => {
    // Check if the ID is valid
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send('Invalid post ID format');
    }
    try {
        await PostModel.findByIdAndUpdate(
            req.params.id,
            {
                $addToSet: { likers: req.body.id },
            },
            { new: true }
        )
        res.status(200).send(res);
        await UserModel.findByIdAndUpdate(
            req.params.id,
            {
                $addToSet: { likes: req.params.id },
            },
            { new: true }
        )
        res.status(200).send(res);
    } catch (err) {
        if (err) {
            res.status(400).send(err)
        }
    }
}


    /* -----Unlike a post----- */
module.exports.unlikePost = async (req, res) => {
    // Check if the ID is valid
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send('Invalid post ID format');
    }
    try {
        await PostModel.findByIdAndUpdate(
            req.params.id,
            {
                $pull: { likers: req.body.id},
            },
            { new: true }
        )
        res.status(200).send(res);
        await UserModel.findByIdAndUpdate(
            req.params.id,
            {
                $pull: { likes: req.params.id },
            },
            { new: true }
        )
        res.status(200).send(res);
    } catch (err) {
        if (err) {
            res.status(400).send(err)
        }
    }
}