const { MongoClient, ObjectId } = require('mongodb');
const url = require('./mongo_url');
const fs = require('fs');

const client = new MongoClient(url);

const connectToDb = async () => {
    try {
        await client.connect();
        console.log("Successfully connected to the database");
    } catch (err) {
        console.error("Error connecting to the database:", err);
    }
}
connectToDb();

const Collection = client.db("users").collection("credentials");
const contactdb = client.db("contactManagement");

const insertUser = async(req,res) => {
    const user = {
        Email : req.body.email,
        Username : req.body.username,
        Password1 : req.body.password1,
        Password2 : req.body.password2,
    }
    if(user.Password1 === user.Password2){
        await Collection.insertOne(user);
        await contactdb.createCollection(user.Username);
        return res.status(200).send({status:true,message:'Account is created sucessfully you can login now'});
    }else{
        return res.status(400).send({status:false,message:'Your password and conform password not matched'});
    }
}

const checkUser = async(req,res) => {
    const user = {
        Email : req.body.email,
        Username : req.body.username,
        Password : req.body.password,
    }
    const name = await Collection.findOne({ Username: user.Username });
    if(name && user.Password === name.Password1){
        return res.status(200).send({status:true,message:'Login Sucessfull'});
    }else{
        return res.status(400).send({status:false,message:'Invalid credential check and try again'});
    }
}

const addContact = async(req,res) => {
    const contact = {
        name : req.body.name,
        email : req.body.email,
        phone : req.body.phone,
        location : req.body.location,
        photo : {
            data: fs.readFileSync(req.file.path),
            contentType: req.file.mimetype
        },
        username : req.body.Uname,
    }
    const insertContact = contactdb.collection(contact.username);
    await insertContact.insertOne(contact);
    return res.status(200).send({status:true,message:'Contact was added successfully'});
}

const getContact = async(req,res) => {
    const name = req.body.name;
    const contact = contactdb.collection(name);
    const details = await contact.find({}).toArray();
    const contactsWithPhotos = details.map(contact => ({
        id: contact._id,
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        location: contact.location,
        photo: contact.photo ? `data:${contact.photo.contentType};base64,${contact.photo.data.toString('base64')}` : null,
        username: contact.username,
    }));
    return res.status(200).json(contactsWithPhotos);
}

const deleteContact = async(req,res) => {
    const name = req.body.name;
    const ID = req.body.ID;
    const contact = contactdb.collection(name);
    await contact.deleteOne({email:ID});
    return res.status(200).send({status:true,message:'The selected contact was deleted sucessfully'});
}

const editContact = async (req, res) => {
    const { username, id, name, phone, email, location } = req.body;
    const contact = contactdb.collection(username);
    const updateFields = {};
    if (name) updateFields.name = name;
    if (phone) updateFields.phone = phone;
    if (email) updateFields.email = email;
    if (location) updateFields.location = location;
    await contact.updateOne({ _id: new ObjectId(id) }, { $set: updateFields });
    return res.status(200).send({ status: true, message: 'The contact was updated successfully' });
};

module.exports = { editContact };


module.exports = {insertUser,checkUser,getContact,addContact,deleteContact,editContact};