import { useEffect, useState, useContext } from "react";
import { fetchUserData } from "../api/apis";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../utils/AuthContext";
import { ProjectList } from "./ProjectList/ProjectList"
import { ProjectsProvider } from "./ProjectList/hooks/useProject";
import { Spinner } from "../Spinner";


function UserDashboard() {
  const { user: authUser } = useContext(AuthContext);
  console.log("authUser in UserDashboard:", authUser);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  // const { users } = useUsers();

  useEffect(() => {
    const fetchUser = async () => {
      // norint išvengti klaidų, kai vartotojas nėra prisijungęs, reikia patikrinti ar authUser yra
      // jeigu nėra, tai nukreipiame vartotoją į pagrindinį puslapį '/'
      // todėl gauname user null arba undefined, nes vartotojas atsijungė arba neprisijungė
      if (!authUser) {
        navigate("/");
        return;
      }
      try {
        const data = await fetchUserData(authUser.id);
        // gauname data
        if (data) {
          console.log(data);
          // ir nustatome userData state objekte
          setUserData(data);
        } else {
          console.error("No data in response");
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUser();
  }, [authUser, navigate]);

  return (
    <div className="dashboard_body">

      <div className="app-table">
        <h1 style={{ textTransform: "uppercase", marginTop: "1.5rem", color: "#394045" }}>Your Projects Summary</h1>
        <ProjectsProvider>
          <ProjectList />
        </ProjectsProvider>

      </div>
    </div>
  );
}

export default UserDashboard;
