const db = require("../models");
const bcrypt = require("bcrypt");
const book = db.Book;
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const transporter = require("../helpers/transporter");
const fs = require("fs");
const handlebars = require("handlebars");
module.exports = {
  findAll: async (req, res) => {
    try {
      const result = await book.findAll();
      res.status(200).send(result);
    } catch (error) {
      res.status(400).send(error.message);
    }
  },

  filter: async (req, res) => {
    try {
      const { filter, order } = req.query;
      const result = await book.findAll({
        order: [[filter, order]],
      });
      if (result.length === 0) throw "book you filtered not found";
      res.status(200).send(result);
    } catch (error) {
      res.status(400).send(error.message);
    }
  },

  searchBook: async (req, res) => {
    try {
      const { q } = req.query;
      const result = await book.findAll({
        where: {
          [Op.or]: {
            author: {[Op.like]:`%`+q+`%`} ? q : "",
            title: q ? q : "",
            genre: q ? q : "",
            publisher: q ? q : "",
          },
        },
      });
      if (result.length === 0) throw "book not found";

      res.status(200).send(result);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  addBook: async (req, res) => {
    try {
      const { author, title, genre, publisher, sinopsis, images } = req.body;
      const newData = {
        author: author,
        title: title,
        genre: genre,
        publisher: publisher,
        sinopsis: sinopsis,
        images: images,
      };
      const result = await book.create(newData);
      res.status(200).send(result);
    } catch (error) {
      res.status(400).send(error.message);
    }
  },
  updateBook: async (req, res) => {
    try {
      await book.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      res.status(200).send("Success Edit book data");
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
  deleteBook: async (req, res) => {
    try {
      await book.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).send("Success Delete book data");
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
};
