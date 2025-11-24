import { body, validationResult } from "express-validator";

const validationCreateUser = [
  body("name")
    .isString()
    .withMessage("Nome dever um texto!")
    .isLength({ min: 3 })
    .withMessage("Nome muito curto"),
  body("username")
    .isString()
    .withMessage("Nome de usuário dever um texto!")
    .isLength({ min: 3 })
    .withMessage("Nome de usuário muito curto"),
  body("email")
    .isEmail()
    .withMessage("E-mail inválido")
    .isString()
    .withMessage("E-mail dever um texto!"),
  body("password").isLength({ min: 6 }).withMessage("Senha muito curta"),
];

const validationLoginUser = [
  // body("email").isEmail().withMessage("Email inválido"),
  body("password").notEmpty().withMessage("Senha obrigatória"),
];

export { validationCreateUser, validationLoginUser };
