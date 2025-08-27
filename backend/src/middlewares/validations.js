import { body, validationResult } from "express-validator";

const validationCreateUser = [
  body("name")
    .isLength({ min: 2 })
    .withMessage("Nome muito curto")
    .isString()
    .withMessage("Nome dever um texto!"),
  body("username")
    .isLength({ min: 3 })
    .withMessage("Usuário muito curto")
    .isString()
    .withMessage("Nome de usuário dever um texto!"),
  body("email")
    .isEmail()
    .withMessage("E-mail inválido")
    .isString()
    .withMessage("E-mail dever um texto!"),
  body("password").isLength({ min: 6 }).withMessage("Senha muito curta"),
];

const validationLoginUser = [
  body("email").isEmail().withMessage("Email inválido"),
  body("password").notEmpty().withMessage("Senha obrigatória"),
];

export { validationCreateUser, validationLoginUser };
