// UTILITÁRIO DE VALIDAÇÕES FRONTEND
// Validar Nome (3-100 caracteres, apenas letras)
// export const validateName = (name) => {
//   const errors = [];

//   if (!name || !name.trim()) {
//     errors.push("Nome é obrigatório");
//   } else if (name.trim().length < 3) {
//     errors.push("Nome deve ter no mínimo 3 caracteres");
//   } else if (name.trim().length > 100) {
//     errors.push("Nome deve ter no máximo 100 caracteres");
//   } else if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(name)) {
//     errors.push("Nome deve conter apenas letras");
//   }

//   return errors;
// };

// // Validar Username (3-30 caracteres, alfanumérico + underscore)
// export const validateUsername = (username) => {
//   const errors = [];

//   if (!username || !username.trim()) {
//     errors.push("Nome de usuário é obrigatório");
//   } else if (username.trim().length < 3) {
//     errors.push("Nome de usuário deve ter no mínimo 3 caracteres");
//   } else if (username.trim().length > 30) {
//     errors.push("Nome de usuário deve ter no máximo 30 caracteres");
//   } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
//     errors.push(
//       "Nome de usuário deve conter apenas letras, números e underscore"
//     );
//   }

//   return errors;
// };

// // Validar Email
// export const validateEmail = (email) => {
//   const errors = [];

//   if (!email || !email.trim()) {
//     errors.push("E-mail é obrigatório");
//   } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//     errors.push("E-mail inválido");
//   } else if (email.length > 255) {
//     errors.push("E-mail muito longo");
//   }

//   return errors;
// };

// // Validar Senha
// export const validatePassword = (password, isNew = false) => {
//   const errors = [];

//   if (!password) {
//     errors.push("Senha é obrigatória");
//   } else if (password.length < 6) {
//     errors.push("Senha deve ter no mínimo 6 caracteres");
//   } else if (password.length > 100) {
//     errors.push("Senha deve ter no máximo 100 caracteres");
//   } else if (isNew && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
//     errors.push(
//       "Senha deve conter pelo menos uma letra maiúscula, uma minúscula e um número"
//     );
//   }

//   return errors;
// };

// // Validar Confirmação de Senha
// export const validatePasswordMatch = (password, confirmPassword) => {
//   const errors = [];

//   if (!confirmPassword) {
//     errors.push("Confirmação de senha é obrigatória");
//   } else if (password !== confirmPassword) {
//     errors.push("As senhas não coincidem");
//   }

//   return errors;
// };

// // Validar Nome da Meta/Tarefa
// export const validateGoalName = (name) => {
//   const errors = [];

//   if (!name || !name.trim()) {
//     errors.push("Nome da tarefa é obrigatório");
//   } else if (name.trim().length < 3) {
//     errors.push("Nome deve ter no mínimo 3 caracteres");
//   } else if (name.trim().length > 200) {
//     errors.push("Nome deve ter no máximo 200 caracteres");
//   }

//   return errors;
// };

// // Validar Categoria
// export const validateCategory = (category) => {
//   const errors = [];

//   if (category && category.length > 100) {
//     errors.push("Categoria muito longa (máximo 100 caracteres)");
//   }

//   return errors;
// };

// // Validar Data de Conclusão
// export const validateFinishDate = (date) => {
//   const errors = [];

//   if (!date) {
//     errors.push("Data de conclusão é obrigatória");
//   } else {
//     const selectedDate = new Date(date);
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);

//     if (selectedDate < today) {
//       errors.push("Data de conclusão não pode ser no passado");
//     }
//   }

//   return errors;
// };

// // Validar Prioridade
// export const validatePriority = (priority) => {
//   const errors = [];
//   const validPriorities = ["Baixo", "Médio", "Alta"];

//   if (!priority) {
//     errors.push("Prioridade é obrigatória");
//   } else if (!validPriorities.includes(priority)) {
//     errors.push("Prioridade inválida");
//   }

//   return errors;
// };

// // Validar Título do Evento
// export const validateEventTitle = (title) => {
//   const errors = [];

//   if (!title || !title.trim()) {
//     errors.push("Título do evento é obrigatório");
//   } else if (title.trim().length < 3) {
//     errors.push("Título deve ter no mínimo 3 caracteres");
//   } else if (title.trim().length > 200) {
//     errors.push("Título deve ter no máximo 200 caracteres");
//   }

//   return errors;
// };

// // Validar Datas do Evento
// export const validateEventDates = (startDate, startTime, endDate, endTime) => {
//   const errors = [];

//   if (!startDate) {
//     errors.push("Data de início é obrigatória");
//   }

//   if (!startTime) {
//     errors.push("Hora de início é obrigatória");
//   }

//   if (!endDate) {
//     errors.push("Data de término é obrigatória");
//   }

//   if (!endTime) {
//     errors.push("Hora de término é obrigatória");
//   }

//   if (startDate && startTime && endDate && endTime) {
//     const start = new Date(`${startDate}T${startTime}`);
//     const end = new Date(`${endDate}T${endTime}`);

//     if (end <= start) {
//       errors.push("Data de término deve ser posterior à data de início");
//     }
//   }

//   return errors;
// };

// // Validar Descrição do Evento
// export const validateEventDescription = (desc) => {
//   const errors = [];

//   if (desc && desc.length > 1000) {
//     errors.push("Descrição muito longa (máximo 1000 caracteres)");
//   }

//   return errors;
// };

// // Validar Cor (formato hexadecimal)
// export const validateColor = (color) => {
//   const errors = [];

//   if (color && !/^#[0-9A-Fa-f]{6}$/.test(color)) {
//     errors.push("Cor inválida (use formato #RRGGBB)");
//   }

//   return errors;
// };

// // Validar Imagem (base64)
// export const validateImage = (imageData) => {
//   const errors = [];

//   if (!imageData) {
//     errors.push("Imagem é obrigatória");
//   } else {
//     const base64Regex = /^data:image\/(png|jpg|jpeg|gif|webp);base64,/;
//     if (!base64Regex.test(imageData)) {
//       errors.push(
//         "Formato de imagem inválido. Use PNG, JPG, JPEG, GIF ou WEBP"
//       );
//     }
//   }

//   return errors;
// };

// // VALIDAÇÃO COMPLETA DE FORMULÁRIOS

// // Validar Formulário de Cadastro
// export const validateRegisterForm = (formData) => {
//   const allErrors = {};

//   const nameErrors = validateName(formData.name);
//   if (nameErrors.length > 0) allErrors.name = nameErrors;

//   const usernameErrors = validateUsername(formData.username);
//   if (usernameErrors.length > 0) allErrors.username = usernameErrors;

//   const emailErrors = validateEmail(formData.email);
//   if (emailErrors.length > 0) allErrors.email = emailErrors;

//   const passwordErrors = validatePassword(formData.password, true);
//   if (passwordErrors.length > 0) allErrors.password = passwordErrors;

//   return allErrors;
// };

// // Validar Formulário de Login
// export const validateLoginForm = (formData) => {
//   const allErrors = {};

//   const emailErrors = validateEmail(formData.email);
//   if (emailErrors.length > 0) allErrors.email = emailErrors;

//   const passwordErrors = validatePassword(formData.password);
//   if (passwordErrors.length > 0) allErrors.password = passwordErrors;

//   return allErrors;
// };

// // Validar Formulário de Meta/Tarefa
// export const validateGoalForm = (formData) => {
//   const allErrors = {};

//   const nameErrors = validateGoalName(formData.name);
//   if (nameErrors.length > 0) allErrors.name = nameErrors;

//   const categoryErrors = validateCategory(formData.category);
//   if (categoryErrors.length > 0) allErrors.category = categoryErrors;

//   const priorityErrors = validatePriority(formData.priority);
//   if (priorityErrors.length > 0) allErrors.priority = priorityErrors;

//   const finishByErrors = validateFinishDate(formData.finishBy);
//   if (finishByErrors.length > 0) allErrors.finishBy = finishByErrors;

//   return allErrors;
// };

// // Validar Formulário de Evento
// export const validateEventForm = (formData) => {
//   const allErrors = {};

//   const titleErrors = validateEventTitle(formData.title);
//   if (titleErrors.length > 0) allErrors.title = titleErrors;

//   const dateErrors = validateEventDates(
//     formData.startDate,
//     formData.startTime,
//     formData.endDate,
//     formData.endTime
//   );
//   if (dateErrors.length > 0) allErrors.dates = dateErrors;

//   const descErrors = validateEventDescription(formData.desc);
//   if (descErrors.length > 0) allErrors.desc = descErrors;

//   const colorErrors = validateColor(formData.color);
//   if (colorErrors.length > 0) allErrors.color = colorErrors;

//   return allErrors;
// };

// // Validar Atualização de Perfil
// export const validateProfileForm = (formData) => {
//   const allErrors = {};

//   const nameErrors = validateName(formData.nome);
//   if (nameErrors.length > 0) allErrors.nome = nameErrors;

//   const emailErrors = validateEmail(formData.email);
//   if (emailErrors.length > 0) allErrors.email = emailErrors;

//   return allErrors;
// };

// // Validar Atualização de Senha
// export const validatePasswordChangeForm = (formData) => {
//   const allErrors = {};

//   if (!formData.senhaAtual) {
//     allErrors.senhaAtual = ["Senha atual é obrigatória"];
//   }

//   const newPasswordErrors = validatePassword(formData.novaSenha, true);
//   if (newPasswordErrors.length > 0) allErrors.novaSenha = newPasswordErrors;

//   const matchErrors = validatePasswordMatch(
//     formData.novaSenha,
//     formData.confirmarSenha
//   );
//   if (matchErrors.length > 0) allErrors.confirmarSenha = matchErrors;

//   return allErrors;
// };

// // HELPER: Verificar se há erros
// export const hasErrors = (errors) => {
//   return Object.keys(errors).length > 0;
// };

// // HELPER: Obter primeira mensagem de erro
// export const getFirstError = (errors) => {
//   const firstKey = Object.keys(errors)[0];
//   return errors[firstKey]?.[0] || "Erro de validação";
// };

// =======
// UTILITÁRIO DE VALIDAÇÕES FRONTEND

// Validar Nome
export const validateName = (name) => {
  const errors = [];

  if (!name || !name.trim()) {
    errors.push("Nome é obrigatório");
  } else if (name.trim().length < 3) {
    errors.push("Nome deve ter no mínimo 3 caracteres");
  } else if (name.trim().length > 100) {
    errors.push("Nome deve ter no máximo 100 caracteres");
  } else if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(name)) {
    errors.push("Nome deve conter apenas letras");
  }

  return errors;
};

// Validar Username
export const validateUsername = (username) => {
  const errors = [];

  if (!username || !username.trim()) {
    errors.push("Nome de usuário é obrigatório");
  } else if (username.trim().length < 3) {
    errors.push("Nome de usuário deve ter no mínimo 3 caracteres");
  } else if (username.trim().length > 30) {
    errors.push("Nome de usuário deve ter no máximo 30 caracteres");
  } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    errors.push(
      "Nome de usuário deve conter apenas letras, números e underscore"
    );
  }

  return errors;
};

// Validar Email
export const validateEmail = (email) => {
  const errors = [];

  if (!email || !email.trim()) {
    errors.push("E-mail é obrigatório");
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push("E-mail inválido");
  } else if (email.length > 255) {
    errors.push("E-mail muito longo");
  }

  return errors;
};

// Validar Senha
export const validatePassword = (password, isNew = false) => {
  const errors = [];

  if (!password) {
    errors.push("Senha é obrigatória");
  } else if (password.length < 6) {
    errors.push("Senha deve ter no mínimo 6 caracteres");
  } else if (password.length > 100) {
    errors.push("Senha deve ter no máximo 100 caracteres");
  } else if (isNew && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
    errors.push(
      "Senha deve conter pelo menos uma letra maiúscula, uma minúscula e um número"
    );
  }

  return errors;
};

// Validar Confirmação de Senha
export const validatePasswordMatch = (password, confirmPassword) => {
  const errors = [];

  if (!confirmPassword) {
    errors.push("Confirmação de senha é obrigatória");
  } else if (password !== confirmPassword) {
    errors.push("As senhas não coincidem");
  }

  return errors;
};

// Validar Nome da Meta/Tarefa
export const validateGoalName = (name) => {
  const errors = [];

  if (!name || !name.trim()) {
    errors.push("Nome da tarefa é obrigatório");
  } else if (name.trim().length < 3) {
    errors.push("Nome deve ter no mínimo 3 caracteres");
  } else if (name.trim().length > 200) {
    errors.push("Nome deve ter no máximo 200 caracteres");
  }

  return errors;
};

// Validar Categoria
export const validateCategory = (category) => {
  const errors = [];

  if (category && category.length > 100) {
    errors.push("Categoria muito longa (máximo 100 caracteres)");
  }

  return errors;
};

// Validar Data de Conclusão
export const validateFinishDate = (date) => {
  const errors = [];

  if (!date) {
    errors.push("Data de conclusão é obrigatória");
  } else {
    const selectedDate = new Date(date);
    const today = new Date();

    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      errors.push("Data de conclusão não pode ser no passado");
    }
  }

  return errors;
};

// Validar Prioridade
export const validatePriority = (priority) => {
  const errors = [];
  const validPriorities = ["Baixo", "Médio", "Alta"];

  if (!priority) {
    errors.push("Prioridade é obrigatória");
  } else if (!validPriorities.includes(priority)) {
    errors.push("Prioridade inválida");
  }

  return errors;
};

// Validar Título do Evento
export const validateEventTitle = (title) => {
  const errors = [];

  if (!title || !title.trim()) {
    errors.push("Título do evento é obrigatório");
  } else if (title.trim().length < 3) {
    errors.push("Título deve ter no mínimo 3 caracteres");
  } else if (title.trim().length > 200) {
    errors.push("Título deve ter no máximo 200 caracteres");
  }

  return errors;
};

// Validar Datas do Evento
export const validateEventDates = (startDate, startTime, endDate, endTime) => {
  const errors = [];

  if (!startDate) errors.push("Data de início é obrigatória");
  if (!startTime) errors.push("Hora de início é obrigatória");
  if (!endDate) errors.push("Data de término é obrigatória");
  if (!endTime) errors.push("Hora de término é obrigatória");

  if (startDate && startTime && endDate && endTime) {
    const start = new Date(`${startDate}T${startTime}`);
    const end = new Date(`${endDate}T${endTime}`);

    if (end <= start) {
      errors.push("Data de término deve ser posterior à data de início");
    }
  }

  return errors;
};

// Validar Descrição do Evento
export const validateEventDescription = (desc) => {
  const errors = [];

  if (desc && desc.length > 1000) {
    errors.push("Descrição muito longa (máximo 1000 caracteres)");
  }

  return errors;
};

// Validar Cor (hexadecimal)
export const validateColor = (color) => {
  const errors = [];

  if (color && !/^#[0-9A-Fa-f]{6}$/.test(color)) {
    errors.push("Cor inválida (use formato #RRGGBB)");
  }

  return errors;
};

// Validar Imagem Base64
export const validateImage = (imageData) => {
  const errors = [];

  if (!imageData) {
    errors.push("Imagem é obrigatória");
  } else if (!/^data:image\/(png|jpg|jpeg|gif|webp);base64,/i.test(imageData)) {
    errors.push("Formato de imagem inválido. Use PNG, JPG, JPEG, GIF ou WEBP");
  }

  return errors;
};

// === VALIDAÇÕES COMPLETAS DE FORMULÁRIO ===

export const validateRegisterForm = (formData) => {
  const allErrors = {};

  const nameErrors = validateName(formData.name);
  if (nameErrors.length) allErrors.name = nameErrors;

  const usernameErrors = validateUsername(formData.username);
  if (usernameErrors.length) allErrors.username = usernameErrors;

  const emailErrors = validateEmail(formData.email);
  if (emailErrors.length) allErrors.email = emailErrors;

  const passwordErrors = validatePassword(formData.password, true);
  if (passwordErrors.length) allErrors.password = passwordErrors;

  return allErrors;
};

export const validateLoginForm = (formData) => {
  const allErrors = {};

  const emailErrors = validateEmail(formData.email);
  if (emailErrors.length) allErrors.email = emailErrors;

  const passwordErrors = validatePassword(formData.password);
  if (passwordErrors.length) allErrors.password = passwordErrors;

  return allErrors;
};

export const validateGoalForm = (formData) => {
  const allErrors = {};

  const nameErrors = validateGoalName(formData.name);
  if (nameErrors.length) allErrors.name = nameErrors;

  const categoryErrors = validateCategory(formData.category);
  if (categoryErrors.length) allErrors.category = categoryErrors;

  const priorityErrors = validatePriority(formData.priority);
  if (priorityErrors.length) allErrors.priority = priorityErrors;

  const finishErrors = validateFinishDate(formData.finishBy);
  if (finishErrors.length) allErrors.finishBy = finishErrors;

  return allErrors;
};

export const validateEventForm = (formData) => {
  const allErrors = {};

  const titleErrors = validateEventTitle(formData.title);
  if (titleErrors.length) allErrors.title = titleErrors;

  const dateErrors = validateEventDates(
    formData.startDate,
    formData.startTime,
    formData.endDate,
    formData.endTime
  );
  if (dateErrors.length) allErrors.dates = dateErrors;

  const descErrors = validateEventDescription(formData.desc);
  if (descErrors.length) allErrors.desc = descErrors;

  const colorErrors = validateColor(formData.color);
  if (colorErrors.length) allErrors.color = colorErrors;

  return allErrors;
};

export const validateProfileForm = (formData) => {
  const allErrors = {};

  const nameErrors = validateName(formData.nome);
  if (nameErrors.length) allErrors.nome = nameErrors;

  const emailErrors = validateEmail(formData.email);
  if (emailErrors.length) allErrors.email = emailErrors;

  return allErrors;
};

export const validatePasswordChangeForm = (formData) => {
  const allErrors = {};

  if (!formData.senhaAtual) {
    allErrors.senhaAtual = ["Senha atual é obrigatória"];
  }

  const newErrors = validatePassword(formData.novaSenha, true);
  if (newErrors.length) allErrors.novaSenha = newErrors;

  const matchErrors = validatePasswordMatch(
    formData.novaSenha,
    formData.confirmarSenha
  );
  if (matchErrors.length) allErrors.confirmarSenha = matchErrors;

  return allErrors;
};

// HELPER: Verificar erros
export const hasErrors = (errors) => Object.keys(errors).length > 0;

// HELPER: Pegar primeira mensagem
export const getFirstError = (errors) => {
  const firstKey = Object.keys(errors)[0];
  return errors[firstKey]?.[0] || "Erro de validação";
};

// --- Validação por campo (helpers) ---

export const validateRegisterField = (fieldName, value) => {
  switch (fieldName) {
    case "name":
      return validateName(value).length ? { name: validateName(value) } : {};
    case "username":
      return validateUsername(value).length
        ? { username: validateUsername(value) }
        : {};
    case "email":
      return validateEmail(value).length ? { email: validateEmail(value) } : {};
    case "password":
      return validatePassword(value, true).length
        ? { password: validatePassword(value, true) }
        : {};
    default:
      return {};
  }
};

export const validateLoginField = (fieldName, value) => {
  switch (fieldName) {
    case "email":
      return validateEmail(value).length ? { email: validateEmail(value) } : {};
    case "password":
      return validatePassword(value).length
        ? { password: validatePassword(value) }
        : {};
    default:
      return {};
  }
};

export const validateGoalField = (fieldName, value, formData = {}) => {
  switch (fieldName) {
    case "name":
      return validateGoalName(value).length
        ? { name: validateGoalName(value) }
        : {};
    case "category":
      return validateCategory(value).length
        ? { category: validateCategory(value) }
        : {};
    case "finishBy":
      return validateFinishDate(value).length
        ? { finishBy: validateFinishDate(value) }
        : {};
    case "priority":
      return validatePriority(value).length
        ? { priority: validatePriority(value) }
        : {};
    default:
      return {};
  }
};

// Events: se o campo for parte das datas, validar as datas com o objeto completo
export const validateEventField = (fieldName, formData) => {
  const dateFields = ["startDate", "startTime", "endDate", "endTime"];
  if (dateFields.includes(fieldName)) {
    const dateErrors = validateEventDates(
      formData.startDate,
      formData.startTime,
      formData.endDate,
      formData.endTime
    );
    return dateErrors.length ? { dates: dateErrors } : {};
  }

  if (fieldName === "title") {
    return validateEventTitle(formData.title).length
      ? { title: validateEventTitle(formData.title) }
      : {};
  }

  if (fieldName === "desc") {
    return validateEventDescription(formData.desc).length
      ? { desc: validateEventDescription(formData.desc) }
      : {};
  }

  if (fieldName === "color") {
    return validateColor(formData.color).length
      ? { color: validateColor(formData.color) }
      : {};
  }

  return {};
};

// Profile single-field helpers
export const validateProfileField = (fieldName, value) => {
  if (fieldName === "nome") {
    return validateName(value).length ? { nome: validateName(value) } : {};
  }
  if (fieldName === "email") {
    return validateEmail(value).length ? { email: validateEmail(value) } : {};
  }
  return {};
};

// Password/change fields
export const validatePasswordField = (fieldName, passwordData) => {
  // passwordData: { senhaAtual, novaSenha, confirmarSenha }
  switch (fieldName) {
    case "senhaAtual":
      if (!passwordData.senhaAtual)
        return { senhaAtual: ["Senha atual é obrigatória"] };
      return {};
    case "novaSenha":
      return validatePassword(passwordData.novaSenha, true).length
        ? { novaSenha: validatePassword(passwordData.novaSenha, true) }
        : {};
    case "confirmarSenha":
      return validatePasswordMatch(
        passwordData.novaSenha,
        passwordData.confirmarSenha
      ).length
        ? {
            confirmarSenha: validatePasswordMatch(
              passwordData.novaSenha,
              passwordData.confirmarSenha
            ),
          }
        : {};
    default:
      return {};
  }
};
