const sequelize = require("./db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: "USER" },
});

const Post = sequelize.define("post", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false },
    userId: { 
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    }
});

User.hasMany(Post, { as: 'posts', foreignKey: 'userId' });
Post.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
    User,
    Post,
};