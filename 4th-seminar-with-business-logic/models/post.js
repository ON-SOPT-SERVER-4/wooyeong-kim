module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Post",
    {
      // 모델의 Attributes를 정의하는 곳
      title: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      contents: {
        type: DataTypes.TEXT(),
        allowNull: false,
      },
      postImageUrl: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
    },
    {
      freezeTableName: true,
      timestamps: true,
    },
  );
};
