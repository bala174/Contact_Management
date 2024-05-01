import { useState } from 'react';
import logo from '../image/contactLogo.png';
import { NavLink, useNavigate } from 'react-router-dom';
import swal from 'sweetalert2';

function Login(){
    const [formdata, setFormdata] = useState({
        email: '',
        username: '',
        password: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormdata({
            ...formdata,
            [name] : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('/api/login',{
            method : 'POST',
            headers : { 'Content-Type': 'application/json' },
            body : JSON.stringify(formdata)
        })
        .then(response => response.json())
        .then(data => {
            if(data.status){
                navigate("/User",{state:{username:formdata.username}});
            }
            swal.fire({
                icon : data.status ? 'success' : 'error',
                title : data.status ? 'Success' : 'Error',
                text : data.message,  
            });
        })
        .catch(err => console.error('Error',err))
            setFormdata({
                email: '',
                username: '',
                password: '',
            });
    };

    const align = {
        marginLeft: "150px"
    };

    return(
        <>
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
                                <div className="form-floating mt-3 mx-5">
                                    <input type="email" className="form-control" id="floatingInput" name="email" value={formdata.email} onChange={handleChange} placeholder="email" required></input>
                                    <label htmlFor="floatingInput">Email address</label>
                                </div>
                                <div className="form-floating mt-4 mx-5">
                                    <input type="text" className="form-control" id="floatingInput" name="username" value={formdata.username} onChange={handleChange}placeholder="user name" required></input>
                                    <label htmlFor="floatingInput">User Name</label>
                                </div>
                                <div className="form-floating mt-4 mb-4 mx-5">
                                    <input type="password" className="form-control" id="floatingInput" name="password" value={formdata.password} onChange={handleChange} placeholder="password" required></input>
                                    <label htmlFor="floatingInput">Password</label>
                                </div>
                                <button type='submit' className='btn btn-primary mx-5 mb-3'>Login</button>
                                <p style={{textAlign:"center"}}>Don't have an account <NavLink to="/Signup"><button>Signup</button></NavLink></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Login;
