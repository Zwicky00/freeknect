import { useEffect, useState } from "react";
import "./App.css";
import { userDataType } from "./types/user";
import Login from "./components/Login/Login";
import Content from "./components/Content";
import axios from "axios";
import { SERVER_ENDPOINT } from "./Config";

const initialState: userDataType = {
  _id: "",
  name: "",
  email: "",
  picture: "",
};
function App() {
  const [user, setUser] = useState<userDataType>(initialState);

  const updateUserState = (data: Record<string, string>) => {
    setUser({
      _id: data._id,
      name: data.name,
      email: data.email,
      picture: data.picture,
    });
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDataUrl = `${SERVER_ENDPOINT}/api/fetchDetails`;
        const response = await axios.get(userDataUrl, {
          withCredentials: true,
        });
        updateUserState(response.data);
      } catch (error: any) {
        console.error("Error fetching user data:", error.message);
      }
    };
    fetchData();
  }, []);

  if (user.email === "") {
    return <Login />;
  } else {
    return (
      <>
        <Content user={user} />
      </>
    );
  }
}

export default App;
