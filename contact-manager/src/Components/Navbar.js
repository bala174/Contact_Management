import { NavLink } from 'react-router-dom';
import '../Components/Navbar.css';

function Navbar(props){
    return(
        <>
        <div className='container-fluid navbg mb-5'>
            <div className='name'>
                <img src = {props.pic} alt='unavailable' height='70px' width='70px' className='mt-2 mb-2'></img>
                <p className="mt-3 mx-2"><NavLink to="/"><button className="btn"><p className="h4">Contact Manager</p></button></NavLink></p>
            </div>
            <ul className="align mx-5">
                <NavLink to="/"><button className="btn color">Login</button></NavLink>
                <NavLink to="/Signup"><button className="btn color">Sign UP</button></NavLink>
            </ul>
        </div>
        </>
    );
}
export default Navbar;
