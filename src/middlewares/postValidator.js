const { body } = require("express-validator");

exports.postValidationRules = [
  body("title").notEmpty().withMessage("Başlık boş olamaz"),
  body("content").notEmpty().withMessage("İçerik boş olamaz"),
];