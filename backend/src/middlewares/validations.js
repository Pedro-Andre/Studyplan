// import { body, validationResult } from "express-validator";

// const validationCreateUser = [
//   body("name")
//     .isString()
//     .withMessage("Nome dever um texto!")
//     .isLength({ min: 3 })
//     .withMessage("Nome muito curto"),
//   body("username")
//     .isString()
//     .withMessage("Nome de usuário dever um texto!")
//     .isLength({ min: 3 })
//     .withMessage("Nome de usuário muito curto"),
//   body("email")
//     .isEmail()
//     .withMessage("E-mail inválido")
//     .isString()
//     .withMessage("E-mail dever um texto!"),
//   body("password").isLength({ min: 6 }).withMessage("Senha muito curta"),
// ];

// const validationLoginUser = [
//   // body("email").isEmail().withMessage("Email inválido"),
//   body("password").notEmpty().withMessage("Senha obrigatória"),
// ];

// export { validationCreateUser, validationLoginUser };

// ============
import { body } from "express-validator";

// VALIDAÇÕES - AUTENTICAÇÃO
const validationCreateUser = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Nome é obrigatório")
    .isLength({ min: 3, max: 100 })
    .withMessage("Nome deve ter entre 3 e 100 caracteres")
    .matches(/^[a-zA-ZÀ-ÿ\s]+$/)
    .withMessage("Nome deve conter apenas letras"),

  body("username")
    .trim()
    .notEmpty()
    .withMessage("Nome de usuário é obrigatório")
    .isLength({ min: 3, max: 30 })
    .withMessage("Nome de usuário deve ter entre 3 e 30 caracteres")
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage(
      "Nome de usuário deve conter apenas letras, números e underscore"
    )
    .toLowerCase(),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("E-mail é obrigatório")
    .isEmail()
    .withMessage("E-mail inválido")
    .normalizeEmail()
    .isLength({ max: 255 })
    .withMessage("E-mail muito longo"),

  body("password")
    .notEmpty()
    .withMessage("Senha é obrigatória")
    .isLength({ min: 6, max: 100 })
    .withMessage("Senha deve ter entre 6 e 100 caracteres")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage(
      "Senha deve conter pelo menos uma letra maiúscula, uma minúscula e um número"
    ),
];

const validationLoginUser = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("E-mail é obrigatório")
    .isEmail()
    .withMessage("E-mail inválido")
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage("Senha é obrigatória")
    .isLength({ min: 6 })
    .withMessage("Senha muito curta"),
];

// VALIDAÇÕES - METAS
const validationCreateGoal = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Nome da meta é obrigatório")
    .isLength({ min: 3, max: 200 })
    .withMessage("Nome deve ter entre 3 e 200 caracteres"),

  body("category")
    .optional({ nullable: true })
    .trim()
    .isLength({ max: 100 })
    .withMessage("Categoria muito longa"),

  body("priority")
    .notEmpty()
    .withMessage("Prioridade é obrigatória")
    .isIn(["Baixo", "Médio", "Alta"])
    .withMessage("Prioridade inválida. Use: Baixo, Médio ou Alta"),

  body("finishBy")
    .notEmpty()
    .withMessage("Data de conclusão é obrigatória")
    .isISO8601()
    .withMessage("Data inválida")
    .custom((value) => {
      const date = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (date < today) {
        throw new Error("Data de conclusão não pode ser no passado");
      }
      return true;
    }),
];

const validationUpdateGoal = [
  body("name")
    .optional()
    .trim()
    .isLength({ min: 3, max: 200 })
    .withMessage("Nome deve ter entre 3 e 200 caracteres"),

  body("category")
    .optional({ nullable: true })
    .trim()
    .isLength({ max: 100 })
    .withMessage("Categoria muito longa"),

  body("priority")
    .optional()
    .isIn(["Baixo", "Médio", "Alta"])
    .withMessage("Prioridade inválida"),

  body("finishBy").optional().isISO8601().withMessage("Data inválida"),
];

const validationUpdateGoalStatus = [
  body("status")
    .notEmpty()
    .withMessage("Status é obrigatório")
    .isIn(["Não Iniciado", "Em Progresso", "Finalizado"])
    .withMessage("Status inválido"),
];

// VALIDAÇÕES - EVENTOS (CALENDÁRIO)
const validationCreateEvent = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Título do evento é obrigatório")
    .isLength({ min: 3, max: 200 })
    .withMessage("Título deve ter entre 3 e 200 caracteres"),

  body("start")
    .notEmpty()
    .withMessage("Data de início é obrigatória")
    .isISO8601()
    .withMessage("Data de início inválida"),

  body("end")
    .notEmpty()
    .withMessage("Data de término é obrigatória")
    .isISO8601()
    .withMessage("Data de término inválida")
    .custom((value, { req }) => {
      if (new Date(value) <= new Date(req.body.start)) {
        throw new Error("Data de término deve ser posterior à data de início");
      }
      return true;
    }),

  body("desc")
    .optional({ nullable: true })
    .trim()
    .isLength({ max: 1000 })
    .withMessage("Descrição muito longa (máximo 1000 caracteres)"),

  body("color")
    .optional()
    .matches(/^#[0-9A-Fa-f]{6}$/)
    .withMessage("Cor inválida (use formato hexadecimal #RRGGBB)"),
];

const validationUpdateEvent = [
  body("title")
    .optional()
    .trim()
    .isLength({ min: 3, max: 200 })
    .withMessage("Título deve ter entre 3 e 200 caracteres"),

  body("start").optional().isISO8601().withMessage("Data de início inválida"),

  body("end").optional().isISO8601().withMessage("Data de término inválida"),

  body("desc")
    .optional({ nullable: true })
    .trim()
    .isLength({ max: 1000 })
    .withMessage("Descrição muito longa"),

  body("color")
    .optional()
    .matches(/^#[0-9A-Fa-f]{6}$/)
    .withMessage("Cor inválida"),
];

// VALIDAÇÕES - PERFIL
const validationUpdateProfile = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Nome é obrigatório")
    .isLength({ min: 3, max: 100 })
    .withMessage("Nome deve ter entre 3 e 100 caracteres")
    .matches(/^[a-zA-ZÀ-ÿ\s]+$/)
    .withMessage("Nome deve conter apenas letras"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("E-mail é obrigatório")
    .isEmail()
    .withMessage("E-mail inválido")
    .normalizeEmail()
    .isLength({ max: 255 })
    .withMessage("E-mail muito longo"),
];

const validationUpdatePassword = [
  body("senhaAtual").notEmpty().withMessage("Senha atual é obrigatória"),

  body("novaSenha")
    .notEmpty()
    .withMessage("Nova senha é obrigatória")
    .isLength({ min: 6, max: 100 })
    .withMessage("Nova senha deve ter entre 6 e 100 caracteres")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage(
      "Nova senha deve conter pelo menos uma letra maiúscula, uma minúscula e um número"
    ),

  body("confirmarSenha")
    .notEmpty()
    .withMessage("Confirmação de senha é obrigatória")
    .custom((value, { req }) => {
      if (value !== req.body.novaSenha) {
        throw new Error("As senhas não coincidem");
      }
      return true;
    }),
];

const validationUpdatePhoto = [
  body("profileImage")
    .notEmpty()
    .withMessage("Imagem é obrigatória")
    .isString()
    .withMessage("Formato de imagem inválido")
    .custom((value) => {
      // Validar se é base64
      const base64Regex = /^data:image\/(png|jpg|jpeg|gif|webp);base64,/;
      if (!base64Regex.test(value)) {
        throw new Error(
          "Formato de imagem inválido. Use PNG, JPG, JPEG, GIF ou WEBP"
        );
      }
      return true;
    }),
];

const validationDeleteAccount = [
  body("senha")
    .notEmpty()
    .withMessage("Senha é obrigatória para deletar a conta"),
];

// EXPORTAÇÕES
export {
  // Auth
  validationCreateUser,
  validationLoginUser,

  // Goals
  validationCreateGoal,
  validationUpdateGoal,
  validationUpdateGoalStatus,

  // Events
  validationCreateEvent,
  validationUpdateEvent,

  // Profile
  validationUpdateProfile,
  validationUpdatePassword,
  validationUpdatePhoto,
  validationDeleteAccount,
};
