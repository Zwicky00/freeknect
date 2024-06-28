import getGoogleUrl from "../../utils/getGoogleUrl";
import logo from '../../assets/images/logo.png'
import google_icon from '../../assets/images/google_icon.svg'
import './Login.css';
import axios from "axios";
import { SERVER_ENDPOINT } from "../../constatnts";
const handleSubmit = () => {
    window.location.href = getGoogleUrl();
}

const Login = (props: {
     handleUser: (arg0: any) => void; 
}) => {
    const userDataUrl = `${SERVER_ENDPOINT}/api/fetchDetails`;
    axios.get(userDataUrl,{
        withCredentials: true
    }).then(res => {
        console.log(res.data);
        props.handleUser(res.data)
    })
    return (
        <div className="container-fluid">
            <div id="firstBlock">
                <img className="logo" src={logo} alt="Logo" />
            </div>
            <div id="secondBlock">
                <button className="btn btn-light" id="text-image" onClick={handleSubmit}>
                    <img src={google_icon} alt="Google Icon" />
                    <span>Login With Google</span>
                </button>
            </div>
        </div>
    );
}
export default Login;