import { useState } from "react";
import LoggedNavbar from "./LoggedNavbar";
import { useNavigate, useLocation } from 'react-router-dom';
import swal from 'sweetalert2';

function Newcontact(){

    const location = useLocation();
    const username = location.state?.name || 'Unknownn';

    const navigate = useNavigate();

    const [formdata , setFormdata] = useState({
        name:'',
        email:'',
        phone:'',
        location:'',
        photo:null,
    });

    const handleChange = (e) => {
        if (e.target.name === 'photo') {
            setFormdata({
                ...formdata,
                photo: e.target.files[0]
            });
        } else {
            setFormdata({
                ...formdata,
                [e.target.name]: e.target.value
            });
        }
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        const dataToSend = new FormData();
        dataToSend.append('name', formdata.name);
        dataToSend.append('email', formdata.email);
        dataToSend.append('phone', formdata.phone);
        dataToSend.append('location', formdata.location);
        dataToSend.append('photo', formdata.photo);
        dataToSend.append('Uname', username);
        try{
            const response = await fetch('/api/addContact',{
                method:"POST",
                body : dataToSend,
            });
            if (!response.ok) {
                throw new Error('Failed to fetch contact data');
            }
            const data = await response.json();
            if(data.status){
                navigate("/User",{state:{username:username}});
            }
            swal.fire({
                icon : data.status ? 'success' : 'error',
                title : data.status ? 'Success' : 'Error',
                text : data.message,  
            });
        }catch(err){
            console.log('ERROR : ',err);
        }
        setFormdata({
            name:'',
            email:'',
            phone:'',
            location:'',
            photo:null,
        });
    }

    return(
        <>
            <LoggedNavbar name={username}/>
            <h4 style={{textAlign:"center"}}>Add new Contact</h4>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-4"></div>
                    <div className="col">
                        <div className="card mt-3" style={{textAlign:"center"}}>
                        <form onSubmit={handleSubmit}>
                            <h5 className='mt-2'>Personal Information</h5>
                            <div className="form-floating mt-3 mx-5">
                                <input type="text" className="form-control" id="floatingInput" name="name" placeholder="name" value={formdata.name} onChange={handleChange} required></input>
                                <label htmlFor="floatingInput">Enter Full Name</label>
                            </div>
                            <div className="form-floating mt-3 mx-5">
                                <input type="email" className="form-control" id="floatingInput" name="email" placeholder="email" value={formdata.email} onChange={handleChange} required></input>
                                <label htmlFor="floatingInput">Enter Email Id</label>
                            </div>
                            <div className="form-floating mt-3 mx-5">
                                <input type="text" className="form-control" id="floatingInput" name="phone" placeholder="phone_number" value={formdata.phone} onChange={handleChange} required></input>
                                <label htmlFor="floatingInput">Enter Phone Number</label>
                            </div>
                            <div class="form-floating mt-3 mx-5">
                                <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" name="location" value={formdata.location} onChange={handleChange} style={{height: "100px"}}></textarea>
                                <label for="floatingTextarea2">Enter Location</label>
                            </div>
                            <div class="mb-3 mt-3 mx-5">
                                <label for="formFile" className="form-label">Select the profile photo</label>
                                <input className="form-control" type="file" id="formFile" name="photo" onChange={handleChange} required></input>
                            </div>
                            <button type='submit' className="btn btn-info mx-5 mb-3">Add Contact</button>
                        </form>
                        </div>
                    </div>
                    <div className="col-4"></div>
                </div>
            </div>
        </>
    );
}
export default Newcontact;