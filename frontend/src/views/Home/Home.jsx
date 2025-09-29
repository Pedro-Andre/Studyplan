import "./Home.css";
import SideMenu from "../../components/Sidemenu/Sidemenu";
import TopBar from "../../components/TopBar/TopBar";

function Home() {
  return (
    <main className="view-container">
      <SideMenu />
      <TopBar />
    </main>
  );
}

export default Home;
