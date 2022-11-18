"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        // define association here
        Profile.belongsTo(models.User)
    }
    }
    Profile.init(
        {
            address: {
                type: DataTypes.STRING,
            },
            birthday_date: {
                type: DataTypes.STRING,
            },
            gender: {
                type: DataTypes.STRING,
            },
            profilePic: {
                type: DataTypes.STRING,
                defaultValue: "",
            }
        },
        {
        sequelize,
        modelName: "Profile",
        }
    );
    return Profile;
};