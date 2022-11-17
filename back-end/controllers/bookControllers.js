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
            author: q ? q : "",
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
      const { author, title, genre, publisher, sinopsis, images, stock } =
        req.body;
      const newData = {
        author: author,
        title: title,
        genre: genre,
        publisher: publisher,
        sinopsis: sinopsis,
        images: images,
        stock: stock,
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
  uploadBook: async (req, res) => {
    try {
      let fileUploaded = req.file;
      console.log("controller", fileUploaded);

      await book.update(
        {
          images: `http://localhost:2000/` + fileUploaded.filename,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      const getBook = await book.findOne({
        where: {
          id: req.params.id,
        },
        raw: true,
      });
      res.status(200).send({
        success: true,
        id: getBook.id,
        images: getBook.images,
      });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
  search: async (req, res) => {
    try {
      const { page, limit, search_query, order, order_direction } = req.query;
      const booklist_page = parseInt(page) || 0;
      const list_limit = parseInt(limit) || 10;
      const search = search_query || "";
      const offset = list_limit * booklist_page;
      const orderby = order || "title";
      const direction = order_direction || "ASC";
      const totalRows = await book.count({
        where: {
          [Op.or]: [
            {
              title: {
                [Op.like]: "%" + search + "%",
              },
            },
            {
              author: {
                [Op.like]: "%" + search + "%",
              },
            },
            {
              publisher: {
                [Op.like]: "%" + search + "%",
              },
            },
          ],
        },
      });
      const totalPage = Math.ceil(totalRows / limit);
      const result = await book.findAll({
        where: {
          [Op.or]: [
            {
              title: {
                [Op.like]: "%" + search + "%",
              },
            },
            {
              author: {
                [Op.like]: "%" + search + "%",
              },
            },
            {
              publisher: {
                [Op.like]: "%" + search + "%",
              },
            },
          ],
        },
        offset: offset,
        limit: list_limit,
        order: [[orderby, direction]],
      });

      res.status(200).json({
        result: result,
        page: booklist_page,
        limit: list_limit,
        totalRows: totalRows,
        totalPage: totalPage,
      });
    } catch (error) {
      res.status(400).send(error);
    }
  },
};
