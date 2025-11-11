const PostModel = require('../models/Post.model');
const UserModel = require('../models/User.model');
const ObjectId = require('mongoose').Types.ObjectId;


// Create a new post
exports.createPost = async (req, res) => {
    try {
        const newPost = new PostModel({
            userId: req.user.id,
            title: req.body.title,
            content: req.body.content,
            media: req.body.media,
            likers: [],
            comments: []
        });
        await newPost.save()
        res.status(201).json(newPost);
        } catch (error) {
            res.status(400).json({ message: 'Error creating post: ', error});
    }
};


// Retrieve all posts
exports.getAllPosts = async (req, res) => {
    try {
        const posts = await PostModel.find()
            .populate('userId', 'username avatar')
            .populate('comments')
            .sort({ createdAt: -1 });
            res.status(200).json(posts)
    } catch (err) {
        res.status(500).send({ message: 'Failed to retrieve posts: ' + err });
    }
};


 // Retrieve a single post by ID
exports.getPostById = async (req, res) => {
    // Check if the ID is valid
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send({ message: `The ID ${req.params.id} is not valid` });
    }
    // Find the post by ID and return it
    try {
        // If the post does not exist
        const post = await PostModel.findById(req.params.id)
            .populate('userId', 'username avatar')
            .populate('comments');

        if (!post) {
            return res.status(404).send({ message: 'Post not found' })
        }
            res.status(200).json(post);
        } catch (err) {
            res.status(500).send({ message: 'Failed to retrieve this post: ' + err });
        }   
};

 // Update a post by ID
exports.updatePost = async (req, res) => {
    // Check if the ID is valid
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send({ message: `The ID ${req.params.id} is not valid` });
    }

    // What we want to update
    const wantToUp = {
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
        if (post.userId.toString() !== req.user.id) {
            return res.status(403).send({ message: 'You are not authorized to update this post' })
        }

        const updatedPost = await PostModel.findByIdAndUpdate(
            req.params.id,
            {$set: wantToUp},
            { new: true, setDefaultsOnInsert: true, runValidators: true }
        );
            res.status(200).json(updatedPost);
    } catch (err) {
        res.status(400).send({ message: 'Error to update the post: ' + err });
    }
};


// Delete a post by ID
exports.deletePost = async (req, res) => {
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
        if (post.userId.toString() !== req.user.id) {
            return res.status(403).send({ message: 'You cannot delete this post.' })
        }
        
        await PostModel.findByIdAndDelete(req.params.id);
        res.status(200).send({ message: 'Post deleted successfully' });
    } catch (err) {
        res.status(400).send({ message: 'Error deleted post' + err });
    }
};


// Like a post
exports.likePost = async (req, res) => {
    // Check if the ID is valid
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send({ message: `The ID ${req.params.id} is not valid` });
    }
    try {
        const userId = req.user.id;
        // Check if the post exists
        const post = await PostModel.findById(req.params.id);
        if (!post) {
            return res.status(404).send({ message: 'Post not found'})
        }
        const updatedPost = await PostModel.findByIdAndUpdate(
            req.params.id,
            {
                $addToSet: { likers: userId },
            },
            { new: true },
        );

        // Check if the user exists
        const user = await UserModel.findById(req.user.id);
        if (!user) {
            return res.status(404).send({ message: 'the user does not exist'})
        }

        if (post.likers.includes(userId)) {
            return res.status(400).send({ message: 'You have already liked this post' });
        }

        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            { $addToSet: { likes: req.params.id } },
            { new: true }
        );

        res.status(200).json({
            message: 'Post likes succesfully',
            updatedPost,
            updatedUser
        });
    } catch (err) {
        res.status(400).send({ message: 'Cannot like this post' + err });
    }
}


// Unlike a post
exports.unlikePost = async (req, res) => {
    // Check if the ID is valid
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send({ message: `The ID ${req.params.id} is not valid` });
    }
    try {
        const userId = req.user.id;
        // Check if the post exists
        const post = await PostModel.findById(req.params.id);
        if (!post) {
           return res.status(404).send({ message: 'Post not found'}) 
        }
        const updatedPost = await PostModel.findByIdAndUpdate(
            req.params.id,
            {
                $pull: { likers: userId},
            },
            { new: true },
        );

        // Check if the user exists
        const user = await UserModel.findById(req.body.userId);
        if (!user) {
            return res.status(404).send({ message: 'the user does not exist'})
        }
        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            {
                $pull: { likes: req.params.id },
            },
            { new: true },
        )  
        res.status(200).json({
            message: 'The like has been removed',
            updatedPost,
            updatedUser
        });
    } catch (err) {
        res.status(400).send({ message: 'Error to unlike the post: ' + err});
    }
}