import { NavLink } from 'react-router-dom';
import logo from '../image/logo.jpg';
import userlogo from '../image/userIcon.jpg';
import '../Components/Navbar.css';

function LoggedNavbar(props){
    return(
        <div className='container-fluid navbg mb-3'>
            <div className='name'>
                <img src = {logo} alt='unavailable' height='70px' width='70px' className='mt-2 mb-2'></img>
                <p className="mt-4 mx-2"><NavLink to="/User"><button className="btn"><p className="h4">Contact Manager</p></button></NavLink></p>
            </div>
            <ul className="align mx-5">
                <img src = {userlogo} alt='unavailable' height='40px' width='40px'></img>
                <div>
                    <p style={{fontStyle: 'italic'}} className='mx-2'>Hello, {props.name}</p>
                    <NavLink to="/"><button style={{marginTop:'-40px'}}className="btn color">Logout</button></NavLink>
                </div>
            </ul>
        </div>
    );
}
export default LoggedNavbar;