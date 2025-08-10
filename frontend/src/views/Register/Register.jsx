import "./Register.css";

function Register() {
  return (
    <>
      <div className="form-container">
        <h4 class="form-title">Cadastro</h4>
        <form action="" className="form">
          <label htmlFor="user-name" className="label">
            Nome de usuário
            <input type="text" name="" id="user-name" />
          </label>
          <label htmlFor="email" className="label">
            Email
            <input type="email" name="" id="email" />
          </label>
          <label htmlFor="password" className="label">
            Senha
            <input type="password" name="" id="password" />
          </label>
        </form>
      </div>
    </>
  );
}

export default Register;
