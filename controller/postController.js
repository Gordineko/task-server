const { User, Post } = require('../models');


const create = async (req, res) => {
    try {
        const { userId, title, content } = req.body;
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ error: 'Користувач не найден' });
        }

        const post = await Post.create({ title, content, userId });
        res.status(201).json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Помилка' });
    }
};


const deleted = async (req, res) => {
    try {
        const { userId, postId } = req.body; 
        const user = await User.findByPk(userId);
        const post = await Post.findByPk(postId);

        if (!post) {
            return res.status(404).json({ error: 'Пост не знайдено' });
        }

        if (post.userId !== userId && user.role !== "ADMIN") {
            return res.status(403).json({ error: 'Ви не можете видаляти чужі пости' });
        }

        await post.destroy();
        res.status(200).json({ message: 'Пост видален' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Помилка' });
    }
};

module.exports = {
    create,
    deleted,
};
