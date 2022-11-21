const db = require("../models");
const user = db.User;
const cart = db.Cart;
const book = db.Book;
const loan = db.Loan;
const loan_detail = db.Loan_Detail;
const { Op } = require("sequelize");

module.exports = {
  addLoan: async (req, res) => {
    try {
      const { Borrow_date, Return_date, data, NIM, isVerified, isActive } =
        req.body;

      if (!isVerified)
        throw "Your account is not verified please verified your account first";
      if (isActive !== 0) throw "You still have transaction active";
      if (Borrow_date === "" || Return_date === "")
        throw "Please input the right date";
      if (Borrow_date === Return_date)
        throw "You cant borrow and return at the same day";
      if (Borrow_date > Return_date)
        throw "You return date cant borrow date";

      let date = new Date();
      let tahun = date.getFullYear();
      const inv = await loan.findAll();
      const no_invoice = `OL-${tahun}${inv.length + 1}`;

      await loan.create({
        no_invoice,
        Borrow_date,
        Return_date,
        UserNIM: NIM,
      });

      data.map(async (item) => {
        await loan_detail.create({
          BookId: item.Book.id,
          LoanNoInvoice: no_invoice,
        });
      });
      data.map(async (item) => {
        await cart.destroy({
          where: {
            id: item.id,
          },
        });
      });

      res.status(200).send({
        message: "Transaction success",
        no_invoice,
      });
    } catch (err) {
      res.status(400).send(err);
      console.log(err);
    }
  },
  getLoanActive: async (req, res) => {
    try {
      const { NIM } = req.params;
      const loans = await loan.findAll({
        where: {
          [Op.and]: {
            UserNIM: NIM,
            transaction_status: ['Submission', 'On loan'],
          },
        },
        include: [
          {
            model: loan_detail,
            include: [
              {
                model: book,
              },
            ],
          },
        ],
      });
      res.status(200).send(loans);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
  cancelLoan: async (req, res) => {
    try {
      await loan.update(
        { transaction_status: "Canceled" },
        {
          where: {
            no_invoice: req.params.inv,
          },
        }
      );

      res.status(200).send({
        message: "Transanction canceled",
      });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
};
