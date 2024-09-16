import "./AdminPage.css";
import close from "../../Images/close.svg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GridAdmin } from "../../componens/GridAdmin/GridAdmin";

export const AdminPage = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  const loginUser = async () => {
    if (login.trim().length === 0 || password.trim().length === 0) {
      alert("Введіть всі поля");
    }

    if (password === "12345" && login === "12345") {
      setIsValid(true);
      sessionStorage.setItem("isUserAdmin", "true");
    } else {
      alert("Не вірний пароль");
    }
  };

  useEffect(() => {
    const isUserAdmin = sessionStorage.getItem("isUserAdmin");
    if (isUserAdmin !== null) {
      setIsValid(true);
    }
    setIsLoaded(true);
  }, []);

  return (
    <>
      {isLoaded && (
        <>
          {isValid ? (
            <>
              <GridAdmin />
            </>
          ) : (
            <div className="modalWindow">
              <div className="signInContainer">
                <img
                  onClick={() => navigate("/")}
                  className="closeWindow"
                  alt=""
                  src={close}
                ></img>
                <h3 className="titleModal">Увійдіть в свій акаунт</h3>
                <div className="inputLogin">
                  <input
                    type="text"
                    onChange={(e) => setLogin(e.target.value)}
                    value={login}
                    className="Login"
                    placeholder="Логін"
                  ></input>
                </div>
                <div className="inputPassword">
                  <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    className="Password"
                    placeholder="Пароль"
                  ></input>
                </div>
                <div className="loginInBtn">
                  <button onClick={() => loginUser()} className="loginIn">
                    Увійти
                  </button>
                </div>
                <div className="registrarionBtn">
                  <button
                    onClick={() => navigate("/")}
                    className="registrarion"
                  >
                    Вийти
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};
