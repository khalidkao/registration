import React, { useState } from "react";
import axios from 'axios';

export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');
    const [groupeSanguin, setGroupeSanguin] = useState('');
    const [age, setAge] = useState('');
    const [conditions, setConditions] = useState({
        hiv: false,
        creutzfeldtJakob: false,
        hepatitis: false,
        cancer: false,
        hereditaryBloodDisorders: false,
        coagulationDisorders: false,
        highRiskSexualPractices: false,
    });
    const [errors, setErrors] = useState([]);
    const validate = () => {
        const error ={};

        if(!email){
            error.email ="Email is Required";}
        else if(!/\S+@\S+\.\S+/.test(email)){
            error.email="Email not Matched";
        }  else{
            error.email="";
        }  
        if(!pass){
            error.pass ="Password is Required";}
        else if(pass.length<8){
            error.pass="Password more than 8 Character";
        }  else{
            error.pass="";
        }    
        const numericAge = parseInt(age, 10); 
        if(!age){
            error.age ="age is Required";}
        else if(numericAge < 18 || numericAge >= 65){
            error.age="Your age must be between 18-65";
        }  else{
            error.age="";
        }  
        if(!name){
            error.name ="Name is Required";}
            else{
                error.name="";}
        return error; 
    }

    async function save(e) {
        e.preventDefault();
        const errors=validate();
        setErrors(errors);
        const errorValues = Object.values(errors);

        // Vérifier si au moins une des conditions est cochée
        if (Object.values(conditions).some((condition) => condition)) {
            alert("Impossible de s'inscrire en raison de conditions médicales.");
            return;
        }
        else if (errorValues.length > 0 && errorValues.some((error) => error !== "")) {
            console.log("Erreurs dans le formulaire :");
            return;
        }

        try {
            await axios.post("http://localhost:8888/users-registration/register", {
                email: email,
                name: name,
                password: pass,
                groupeSanguin: groupeSanguin,
                age: age,
            });

            alert("Inscription réussie");
            setName("");
            setEmail("");
            setPass("");
            setGroupeSanguin("");
            setAge("");
        } catch (err) {
            alert("Échec de l'inscription");
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    };

    const handleCheckboxChange = (condition) => {
        setConditions((prevConditions) => ({
            ...prevConditions,
            [condition]: !prevConditions[condition],
        }));
    };

    return (
        <div className="auth-form-container">
            <h2>Register</h2>
            <form className="register-form" onSubmit={handleSubmit}>
                <label htmlFor="name">Full name</label>
                <input
                    value={name}
                    name="name"
                    onChange={(e) => setName(e.target.value)}
                    id="name"
                    placeholder="Full Name"
                />
                {errors.name && <div className='error'>{errors.name}</div>}
                <label htmlFor="email">Email</label>
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="youremail@gmail.com"
                    id="email"
                    name="email"
                />
                {errors.email && <div className='error'>{errors.email}</div>}
                <label htmlFor="password">Password</label>
                <input
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    type="password"
                    placeholder="****"
                    id="password"
                    name="password"
                />
                {errors.pass && <div className='error'>{errors.pass}</div>}
                <label htmlFor="age">Age</label>
                <input
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    type="number"
                    placeholder="Age"
                    id="age"
                    name="age"
                />
                {errors.age && <div className='error'>{errors.age}</div>}
                <label htmlFor="groupeSanguin">Blood Type</label>
                <select
                    value={groupeSanguin}
                    onChange={(e) => setGroupeSanguin(e.target.value)}
                    id="groupeSanguin"
                    name="groupeSanguin"
                >
                    <option value="groupeSanguin">groupeSanguin</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                </select>
                
                <label htmlFor="Maladie">Maladie</label>
                <select onChange={(e) => handleCheckboxChange(e.target.value)}>
                    <option>s7i7 fsi7</option>
                    <option value="hiv" selected={conditions.hiv}>Infection par le VIH</option>
                    <option value="creutzfeldtJakob" selected={conditions.creutzfeldtJakob}>Maladie de Creutzfeldt-Jakob</option>
                    <option value="hepatitis" selected={conditions.hepatitis}>Hépatite B ou C chronique</option>
                    <option value="cancer" selected={conditions.cancer}>Cancer</option>
                    <option value="hereditaryBloodDisorders" selected={conditions.hereditaryBloodDisorders}>Troubles sanguins héréditaires graves</option>
                    <option value="coagulationDisorders" selected={conditions.coagulationDisorders}>Troubles de la coagulation sanguine graves</option>
                    <option value="highRiskSexualPractices" selected={conditions.highRiskSexualPractices}>Pratiques sexuelles à haut risque</option>
                </select>
                
                

                <button type="submit" onClick={save}>
                    Register
                </button>
            </form>
            <button
                className="link-btn"
                onClick={() => props.onFormSwitch('login')}
            >
                Already have an account? Login here.
            </button>
        </div>
    );
};