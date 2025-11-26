// import "./ErrorMessage.css";

// // Componente para exibir mensagens de erro individuais
// function ErrorMessage({ errors, fieldName }) {
//   if (!errors || !errors[fieldName] || errors[fieldName].length === 0) {
//     return null;
//   }

//   return (
//     <div className="error-messages">
//       {errors[fieldName].map((error, index) => (
//         <span key={index} className="error-message">
//           ⚠️ {error}
//         </span>
//       ))}
//     </div>
//   );
// }

// // Componente para exibir erro geral no topo do formulário
// export function FormErrorAlert({ error }) {
//   if (!error) return null;

//   return (
//     <div className="form-error-alert">
//       <span className="error-icon">⚠️</span>
//       <span>{error}</span>
//     </div>
//   );
// }

// // Componente para exibir sucesso
// export function FormSuccessAlert({ message }) {
//   if (!message) return null;

//   return (
//     <div className="form-success-alert">
//       <span className="success-icon">✓</span>
//       <span>{message}</span>
//     </div>
//   );
// }

// // CSS inline para compatibilidade
// export const ErrorMessageStyles = `
// .error-messages {
//   display: flex;
//   flex-direction: column;
//   gap: 4px;
//   margin-top: 4px;
// }

// .error-message {
//   color: #ff4444;
//   font-size: 0.875rem;
//   display: flex;
//   align-items: center;
//   gap: 4px;
// }

// .form-error-alert {
//   background-color: rgba(255, 68, 68, 0.1);
//   border: 1px solid #ff4444;
//   color: #ff4444;
//   padding: 12px;
//   border-radius: 8px;
//   margin-bottom: 16px;
//   display: flex;
//   align-items: center;
//   gap: 8px;
//   animation: slideDown 0.3s ease;
// }

// .form-success-alert {
//   background-color: rgba(76, 175, 80, 0.1);
//   border: 1px solid #4caf50;
//   color: #4caf50;
//   padding: 12px;
//   border-radius: 8px;
//   margin-bottom: 16px;
//   display: flex;
//   align-items: center;
//   gap: 8px;
//   animation: slideDown 0.3s ease;
// }

// .error-icon, .success-icon {
//   font-size: 1.2rem;
// }

// .input-error {
//   border-color: #ff4444 !important;
//   background-color: rgba(255, 68, 68, 0.05);
// }

// .input-success {
//   border-color: #4caf50 !important;
//   background-color: rgba(76, 175, 80, 0.05);
// }

// @keyframes slideDown {
//   from {
//     opacity: 0;
//     transform: translateY(-10px);
//   }
//   to {
//     opacity: 1;
//     transform: translateY(0);
//   }
// }
// `;

// export default ErrorMessage;

// =======
import React from "react";
import "./ErrorMessage.css";

function ErrorMessage({ errors, fieldName }) {
  if (!errors || !errors[fieldName] || errors[fieldName].length === 0) {
    return null;
  }

  return (
    <div className="error-messages">
      {errors[fieldName].map((error, index) => (
        <span key={index} className="error-message">
          ⚠️ {error}
        </span>
      ))}
    </div>
  );
}

export function FormErrorAlert({ error }) {
  if (!error) return null;

  return (
    <div className="form-error-alert">
      <span className="error-icon">⚠️</span>
      <span>{error}</span>
    </div>
  );
}

export function FormSuccessAlert({ message }) {
  if (!message) return null;

  return (
    <div className="form-success-alert">
      <span className="success-icon">✓</span>
      <span>{message}</span>
    </div>
  );
}

export default ErrorMessage;
