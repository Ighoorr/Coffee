import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {


    const [firstname, firstnamechange] = useState("");
    const [secondname, secondnamechange] = useState("");
    const [pass, passwordchange] = useState("");
    const [email, emailchange] = useState("");
    const [age, agechange] = useState("");



    const navigate = useNavigate();

    const IsValidate = () => {
        let isproceed = true;
        let errormessage = 'Please enter the value in ';
        if (firstname === null || firstname === '') {
            isproceed = false;
            errormessage += ' Firstname';
        }
        if (secondname === null || secondname === '') {
            isproceed = false;
            errormessage += ' Secondname';
        }
        if (pass === null || pass === '') {
            isproceed = false;
            errormessage += ' Password';
        }
        if (email === null || email === '') {
            isproceed = false;
            errormessage += ' Email';
        } if (age === null || age === '') {
            isproceed = false;
            errormessage += ' Age';
        }

        if (!isproceed) {
            toast.warning(errormessage)
        } else {
            if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {

            } else {
                isproceed = false;
                toast.warning('Please enter the valid email')
            }
        }
        return isproceed;
    }


    const handlesubmit = (e) => {
        e.preventDefault();
        let regobj = { firstname, secondname, age, pass, email };
        if (IsValidate()) {
            //console.log(regobj);
            fetch("https://localhost:44379/api/users/", {
                method: "POST",
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(regobj)
            })
                .then((res) => {
                    if (res.status == 409) {
                        throw new Error(`${res.status} User with the same email already exists.`);
                    }
                    if (res.status >= 400) {
                        throw new Error(`${res.status} ${res.text()}`);
                    }
                    return res.text();
                })
                .then((data) => {
                    toast.success('Registered successfully.');
                    navigate('/');
                })
                .catch((err) => {
                    toast.error('Failed: ' + err.message);
                });
            


        }
    }
    return (
        <div>
            <div className="offset-lg-3 col-lg-6">
                <form className="container" onSubmit={handlesubmit}>
                    <div className="card">
                        <div className="card-header">
                            <h1>User Registeration</h1>
                        </div>
                        <div className="card-body">

                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Email <span className="errmsg">*</span></label>
                                        <input value={email} onChange={e => emailchange(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Password <span className="errmsg">*</span></label>
                                        <input value={pass} onChange={e => passwordchange(e.target.value)} type="password" className="form-control"></input>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>First Name <span className="errmsg">*</span></label>
                                        <input value={firstname} onChange={e => firstnamechange(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Second name <span className="errmsg">*</span></label>
                                        <input value={secondname} onChange={e => secondnamechange(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>

                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Age <span className="errmsg"></span></label>
                                        <input value={age} type="number" min="10" max="90" onChange={e => agechange(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>


                            </div>

                        </div>
                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary">Register</button> |
                            <Link to={'/'} className="btn btn-danger">Close</Link>
                        </div>
                    </div>
                </form>
            </div>


        </div>
    );
}

export default Register;