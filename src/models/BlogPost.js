module.exports = (sequelize, DataTypes) => {
    const BlogPost = sequelize.define(
      'BlogPost',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER,
        },
        title: DataTypes.STRING,
        content: DataTypes.STRING,
        published: {
          allowNull: false,
          type: DataTypes.DATE,
        },
        updated: {
          allowNull: false,
          type: DataTypes.DATE,
        },
        userId: {
          foreignKey: true,
          allowNull: false,
          type: DataTypes.INTEGER,
        },
      },
      {
        tableName: 'blog_posts',
        timestamps: false,
        underscored: true
      }
    );
    BlogPost.associate = (models) => {
      BlogPost.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      });
    };
    return BlogPost;
  };