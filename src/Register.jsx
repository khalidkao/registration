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

    async function save(e) {
        e.preventDefault();

        // Vérifier si au moins une des conditions est cochée
        if (Object.values(conditions).some((condition) => condition)) {
            alert("Impossible de s'inscrire en raison de conditions médicales.");
            return;
        }
        

        try {
            await axios.post("http://localhost:8080/register", {
                email: email,
                nom: name,
                prenom: name,
                password: pass,
                bloodtype: groupeSanguin,
                numerotele: age,
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
                <label htmlFor="email">Email</label>
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="youremail@gmail.com"
                    id="email"
                    name="email"
                />
                <label htmlFor="password">Password</label>
                <input
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    type="password"
                    placeholder="****"
                    id="password"
                    name="password"
                />
                <label htmlFor="age">Age</label>
                <input
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    type="number"
                    placeholder="Age"
                    id="age"
                    name="age"
                />
                <label htmlFor="groupeSanguin">Blood Type</label>
                <select
                    value={groupeSanguin}
                    onChange={(e) => setGroupeSanguin(e.target.value)}
                    id="groupeSanguin"
                    name="groupeSanguin"
                >
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