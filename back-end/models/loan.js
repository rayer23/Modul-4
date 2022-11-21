"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Loan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        // define association here
        Loan.belongsTo(models.User);
        Loan.hasMany(models.Loan_Detail);
    }
    }
    Loan.init(
        {
            no_invoice: {
                type: DataTypes.STRING(300),
                primaryKey: true,
                allowNull: false,
                unique: true,
            },
            Borrow_date: {
                type: DataTypes.DATEONLY,
                allowNull: false,
            },
            Return_date: {
                type: DataTypes.DATEONLY,
                allowNull: false,
            },
            transaction_status: {
                type: DataTypes.ENUM('Submission', 'On loan' ,'Finished', 'Canceled'),
                defaultValue: 'Submission',
                allowNull: false,
            },
        },
        {
        sequelize,
        modelName: "Loan",
        }
    );
    return Loan;
};