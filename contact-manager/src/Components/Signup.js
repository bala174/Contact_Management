import { useState } from 'react';
import logo from '../image/contactLogo.png';
import pic from '../image/logo.jpg';
import Navbar from './Navbar';
import { NavLink } from 'react-router-dom';
import swal from 'sweetalert2';

function Signup(){
    const [formdata, setFormdata] = useState({
        email: '',
        username: '',
        password1: '',
        password2: '',
    });
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormdata({
            ...formdata,
            [name] : value
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('/api/signup',{
            method : 'POST',
            headers : { 'Content-Type': 'application/json' },
            body : JSON.stringify(formdata)
        })
        .then(response => response.json())
        .then(data => {
            swal.fire({
                icon : data.status ? 'success' : 'error',
                title : data.status ? 'Success' : 'Error',
                text : data.message,  
            });
        })
        .catch(err => console.error('Error',err));
        setFormdata({
            email: '',
            username: '',
            password1: '',
            password2: '',
        });
    };
    const align = {
        marginLeft: "150px"
    };
    return(
       <>
       <Navbar pic={pic}/>
        <div className="container-fluid">
        <div className="row">
            <div className="col-6">
                <div style={align}>
                <img src={logo} alt='unavailable' height='70px' width='70px'></img>
                <p><h1>Contact Manager</h1><p>Manage all your contact from single place</p></p>
                <h1>Manage every contact with this intuitive contact management software</h1>
                <p>People are a resource—but keeping track of every single contact can be a handful. With this contact management software, easily maintain an online contact database, professional or personal. With relevant fields for every detail, you'll never find yourself reaching for a notepad again.</p>
                </div>
            </div>
            <div className="col-6">
            <form onSubmit={handleSubmit}>
                <div className='card' style={{width:"27rem",marginLeft:"30px",backgroundColor:"rgb(234, 232, 232)"}}>
                    <h5 className='mt-2 mx-5'>Get start your contact Management</h5>
                    <div class="form-floating mt-3 mx-5">
                        <input type="email" class="form-control" id="floatingInput" name="email" value={formdata.email} onChange={handleChange} placeholder="email" required></input>
                        <label for="floatingInput">Email address</label>
                    </div>
                    <div class="form-floating mt-3 mx-5">
                        <input type="text" class="form-control" id="floatingInput" name="username" value={formdata.username} onChange={handleChange}placeholder="user name" required></input>
                        <label for="floatingInput">User Name</label>
                    </div>
                    <div class="form-floating mt-3 mx-5">
                        <input type="password" class="form-control" id="floatingInput" name="password1" value={formdata.password1} onChange={handleChange} placeholder="password1" required></input>
                        <label for="floatingInput">New Password</label>
                    </div>
                    <div class="form-floating mt-3 mb-4 mx-5">
                        <input type="password" class="form-control" id="floatingInput" name="password2" value={formdata.password2} onChange={handleChange} placeholder="password2" required></input>
                        <label for="floatingInput">Conform Password</label>
                    </div>
                    <button type='submit' className='btn btn-primary mx-5 mb-3'>Sign Up</button>
                    <p style={{textAlign:"center"}}>Already have an account <NavLink to="/"><button>Login</button></NavLink></p>
                </div>
            </form>
            </div>
        </div>
        </div>
       </>
    );
}
export default Signup;