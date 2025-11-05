const Message = require('../models/Message.model');
const User = require('../models/User.model');


exports.sendMessage = async (req, res) => {
	try {
		const sender = req.user.id;
		const receiver = req.body.receiver;
		const content = req.body.content;
		const existinReceiver = await User.findById(receiver);

		if (!existinReceiver) {
			return res.status(404).json({message: 'User not found'});
		}

		if (!content) {
			return res.status(204).end();
		}

		const message = new Message({
				sender: req.user.id,
				receiver: req.body.receiver,
				content: req.body.content
			});

		await message.save();
		res.status(201).json({message: 'Message shared successfuly'});

	} catch {
		res.status(500).json({message: 'Internal server error'});
	}
};


exports.getConversation = async (req, res) => {
	try {
        	const userId = req.user.id;
        	const otherUser = req.params.otherUserId;

        	const exists = await User.findById(otherUser);
        	if (!exists) {
        		return res.status(404).json({ message: "User not found" });
		}

        const messages = await Message.find({
		$or: [
                	{ sender: userId, receiver: otherUser },
                	{ sender: otherUser, receiver: userId }
		]
	}).sort({ createdAt: 1 });

        res.status(200).json(messages);

	} catch (error) {
		res.status(500).json({ message: "Internal server error" });
    	}
};


exports.deleteMessage = async (req, res) => {
	try {
		const message = await Message.findById(req.params.id);

                if (!message) {
                        return res.status(404).json({message: 'The message does not exist'});
                }

                if (message.sender.toString() !== req.user.id) {
                        return res.status(403).send('Access denied')
                }

                await message.deleteOne();

                return res.status(200).json({
                        message: 'Message successfully deleted',
                }); 
	} catch {
		res.status(500).json({message: 'Internal server error'});
	}
}
