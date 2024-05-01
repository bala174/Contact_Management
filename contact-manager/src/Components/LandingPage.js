import Login from '../Components/Login';
import Navbar from '../Components/Navbar';
import logo from '../image/logo.jpg';

function LandingPage(){
    return(
        <>
            <Navbar pic={logo}></Navbar>
            <Login></Login>
        </>
    );
}
export default LandingPage;