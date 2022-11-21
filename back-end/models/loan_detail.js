"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Loan_Detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        // define association here
        Loan_Detail.belongsTo(models.Loan);
        Loan_Detail.belongsTo(models.Book);
    }
    }
    Loan_Detail.init(
        {
        },
        {
        sequelize,
        modelName: "Loan_Detail",
        }
    );
    return Loan_Detail;
};