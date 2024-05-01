function ContactEditModel({ model, contact, onClose, onSubmit, onChange }) {

    return (    
        <>
            {model && (
                <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Contact</h5>
                                <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-floating mt-3 mx-5">
                                        <input type="text" className="form-control" id="floatingInput" name="name" placeholder="name" value={contact.name} onChange={onChange} required></input>
                                        <label htmlFor="floatingInput">Enter Full Name</label>
                                    </div>
                                    <div className="form-floating mt-3 mx-5">
                                        <input type="email" className="form-control" id="floatingInput" name="email" placeholder="email" value={contact.email} onChange={onChange} required></input>
                                        <label htmlFor="floatingInput">Enter Email</label>
                                    </div>
                                    <div className="form-floating mt-3 mx-5">
                                        <input type="tel" className="form-control" id="floatingInput" name="phone" placeholder="phone" value={contact.phone} onChange={onChange} required></input>
                                        <label htmlFor="floatingInput">Enter Phone number</label>
                                    </div>
                                    <div className="form-floating mt-3 mx-5">
                                        <input type="text" className="form-control" id="floatingInput" name="location" placeholder="location" value={contact.location} onChange={onChange} required></input>
                                        <label htmlFor="floatingInput">Enter Location</label>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
                                <button type="button" className="btn btn-primary" onClick={onSubmit}>Edit contact</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default ContactEditModel;
