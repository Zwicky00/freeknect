import getGoogleUrl from "../../utils/getGoogleUrl";
import logo from "../../assets/images/logo.png";
import google_icon from "../../assets/images/google_icon.svg";
import "./Login.css";
const handleSubmit = () => {
  window.location.href = getGoogleUrl();
};

const Login = () => {
  return (
    <div className="login-content">
      <div id="firstBlock">
        <img className="logo" src={logo} alt="Logo" />
      </div>
      <div id="secondBlock">
        <button
          className="btn btn-light"
          id="text-image"
          onClick={handleSubmit}
        >
          <img src={google_icon} alt="Google Icon" />
          <span>Login With Google</span>
        </button>
      </div>
    </div>
  );
};
export default Login;
