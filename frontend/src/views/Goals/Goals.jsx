import SideMenu from "../../components/SideMenu/SideMenu";

function Goals() {
  return (
    <>
      <main className="view-container">
        <SideMenu />
        <div className="welcome-title">
          <h2 className="gradient-text">Metas</h2>
          {/* {user ? <p>Olá, {user.name}</p> : <p>Você não está logado</p>} */}
        </div>
      </main>
    </>
  );
}

export default Goals;
