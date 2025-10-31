import SideMenu from "../../components/SideMenu/SideMenu";
import TopBar from "../../components/TopBar/TopBar";

function Profile() {
  return (
    <main className="view-container">
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      <SideMenu />

      <div className="content">
        <TopBar />
        <h2 className="gradient-text page-title small-title">Perfil</h2>
        <div className="profile-container"></div>
      </div>
    </main>
  );
}

export default Profile;
