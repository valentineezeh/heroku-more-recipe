

export default (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipes', {
    id: {
      allowNull: true,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    userId: {
      allowNull: false,
      references: {
        model: 'User',
        key: 'id'
      },
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Empty strings not allowed' }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Empty strings not allowed' }
      }
    },
    upvotes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        notEmpty: { msg: 'Empty strings not allowed' }
      }
    },
  });
  // Recipe.associate = (models) => {
  //   // associations can be defined here
  //   Recipe.hasMany(models.Favorites, { foreignKey: 'recipeId', onDelete: 'SET NULL' });

  // };
  Recipe.associate = (models) => {
    // associations can be defined here
    Recipe.hasMany(models.votes, { foreignKey: 'recipeId', onDelete: 'SET NULL' });
  };
  return Recipe;
};
