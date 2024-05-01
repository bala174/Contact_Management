import { useState,useEffect } from "react";
import LoggedNavbar from "./LoggedNavbar";
import { useLocation, useNavigate } from 'react-router-dom';
import book from '../image/book.jpg';
import swal from 'sweetalert2';
import '../Components/User.css';
import ContactEditModel from "../Components/ContactEditModel";

function User(){

    const [contactData,setContactData] = useState([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editedContact, setEditedContact] = useState(null);

    const location = useLocation();
    const username = location.state?.username || 'Unknown';

    useEffect(() => {
        const callFunction = async() => {
            try {
                const response = await fetch('/api/getContact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: username }),
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch contact data');
                }
                const data = await response.json();
                setContactData(data);
            } catch (error) {
                console.error('ERROR:', error);
            }
        };
        callFunction();
    }, [username]);

    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/Newcontact',{state : {name : username}});
    }

    const editClick = (email) => {
        const contact = contactData.find(contact => contact.email === email);
        setEditedContact(contact); 
        setIsEditModalOpen(true);
    }

    const changeEditValue = (e) => {
        setEditedContact({
            ...editedContact,
            [e.target.name]: e.target.value
        });
    }

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        console.log(editedContact);
        const dataSent = {};
        contactData.forEach(contact => {
            if (contact.id === editedContact.id) {
                if (contact.name !== editedContact.name) {
                    dataSent.name = editedContact.name;
                }
                if (contact.email !== editedContact.email) {
                    dataSent.email = editedContact.email;
                }
                if (contact.phone !== editedContact.phone) {
                    dataSent.phone = editedContact.phone;
                }
                if (contact.location !== editedContact.location) {
                    dataSent.location = editedContact.location;
                }
                dataSent.id = contact.id;
                dataSent.username = contact.username;
            }
        });
        try {
            const res = await fetch('/api/editContact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataSent),
            });
            if (!res.ok) {
                throw new Error('Failed to edit contact');
            }
            const data = await res.json();
            setContactData(prevContacts => prevContacts.map(contact =>
                contact.id === editedContact.id ? editedContact : contact
            ));
            swal.fire({
                icon: data.status ? 'success' : 'error',
                title: data.status ? 'Success' : 'Error',
                text: data.message,
            });
            setIsEditModalOpen(false);
        } catch (error) {
            console.error('ERROR:', error);
        }
    }

    const deleteClick = async(email) => {
        try{
            const res = await fetch('/api/deleteContact',{
                method : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: username, ID: email }),
            });
            if(!res.ok){
                throw new Error('Failed to fetch contact data');
            }
            const data = await res.json();
            setContactData(prevContacts => prevContacts.filter(contact => contact.email !== email));
            swal.fire({
                icon : data.status ? 'success' : 'error',
                title : data.status ? 'Success' : 'Error',
                text : data.message,  
            });
        } catch(error){
            console.error('ERROR:', error);
        }
    }

    const contactList = contactData.map(list => (
        <div key={list.email} className="col-md-3">
            <div className="card mx-2 mb-3">
                <div className="img1"></div>
                <div className="img">
                    <img className="rounded-circle" src={list.photo} alt="img" width="150px" height="150px"/>
                </div>
                <div className="icn">
                    <i className="fa-solid fa-pen-to-square fa-lg" onClick={()=>editClick(list.email)}></i>
                    <i className="fa-solid fa-trash fa-lg mx-3" style={{color:'rgb(244, 45, 45)'}} onClick={()=>deleteClick(list.email)}></i>
                </div>
                <div className="card-body">
                    <h5 className="text-center"> {list.name}</h5>
                    <p className="mx-4"><i className="fa fa-envelope"></i> {list.email}</p>
                    <p className="mx-4"><i className="fa fa-phone"></i> {list.phone}</p>
                    <p className="mx-4"><i className="fa fa-location-dot"></i> {list.location}</p>
                </div>
            </div>
        </div>
    ));
    

    return(
        <>
            <LoggedNavbar name={username}/>
            <div className="cnt">
                <h5 className="mx-5 mt-2">All Contacts</h5>
                <button className="btn btn-success mx-5" onClick={handleClick}>New Contact</button>
            </div>
            <hr></hr>
            {contactData.length === 0 ? 
                <>
                    <div className="text-center">
                        <img src={book} alt="img" width="200px" height="200px"></img>
                        <h4>Your contact list was empty</h4>
                    </div>
                </> 
                : <div className="row">{contactList}</div>}
            {isEditModalOpen && <ContactEditModel model={isEditModalOpen} contact={editedContact} onClose={() => setIsEditModalOpen(false)} onSubmit={handleEditSubmit} onChange={changeEditValue}/>}
        </>
    );
}
export default User;
