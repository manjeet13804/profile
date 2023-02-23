import "./SignUp.css"
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Signup() {
    const [data, setData] = useState([])

    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm();
    const [sigupDetails, setSignDetails] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: ""
    });

    const navigate = useNavigate();
    useEffect(() => {
        axios.get("http://localhost:5000/data")
            .then(res => setData(res.data.map((item) => item.email)))
    }, [])

    async function onSubmit() {
        const formData = {
            "firstName": sigupDetails.firstName,
            "lastName": sigupDetails.lastName,
            "email": sigupDetails.email,
            "passward": sigupDetails.password
        }

        const options = {
            method: 'GET',
            url: 'https://mailcheck.p.rapidapi.com/',
            params: { domain: sigupDetails.email },
            headers: {
                'X-RapidAPI-Key': '080d5c1b4emsh5a99b990e190ee5p167317jsn191d459fc152',
                'X-RapidAPI-Host': 'mailcheck.p.rapidapi.com'
            }
        };

        axios.request(options).then(function (response) {
            console.log(response.data)
            if (!response.data.disposable && (response.data.risk === 8 || response.data.risk === 10)) {
                if (data.includes(sigupDetails.email)) {
                    alert("email already exists")
                }
                else {
                    fetch('http://localhost:5000/data', {
                        method: 'post',
                        headers: { "content-type": "application/json" },
                        body: JSON.stringify(formData)
                    }).then((res) => {
                        alert('signup successfully')
                        navigate("/")
                    })
                }
            }
            else {
                alert("please enter a valid email")
            }
        }).catch(function (error) {
            console.error(error);
        });

    }

    return <div className="main-box">
        <section className="information">
            <p className="signup-para">Create New Account</p>
            <form className="form" onSubmit={handleSubmit(onSubmit)} >
                <input className="form-control" type="text" placeholder="First Name"
                    {...register("firstName", {
                        required: "Please Enter Your First Name!",
                        pattern: {
                            value: /^[a-z ,.'-]+$/i,
                            message: "Please Enter A Valid First name!",
                        },
                    })}
                    onChange={(e) =>
                        setSignDetails({ ...sigupDetails, firstName: e.target.value })
                    }
                    value={sigupDetails.firstName} /><br />
                {errors.firstName && (
                    <p className="error">* {errors.firstName.message}</p>
                )}
                <input className="form-control" type="text" placeholder="Last Name"
                    {...register("lastName", {
                        required: "Please Enter Your Last Name!",
                        pattern: {
                            value: /^[a-z ,.'-]+$/i,
                            message: "Please Enter A Valid Last name!",
                        },
                    })}
                    onChange={(e) =>
                        setSignDetails({ ...sigupDetails, lastName: e.target.value })
                    }
                    value={sigupDetails.lastName} /><br />
                {errors.lastName && (
                    <p className="error">* {errors.lastName.message}</p>
                )}
                <input className="form-control" type="email" placeholder="Mail Id"
                    {...register("email", {
                        required: "Please Enter Your Email!",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Please Enter A Valid Email!",
                        },
                    })}
                    onChange={(e) =>
                        setSignDetails({ ...sigupDetails, email: e.target.value })
                    }
                    value={sigupDetails.email} /><br />

                {errors.email && (
                    <p className="error">* {errors.email.message}</p>
                )}

                <input className="form-control form-control-md" type="password" placeholder="password"
                    {...register("password", {
                        required: "Please Enter Your Password",
                        minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters long!",
                        },
                    })}
                    onChange={(e) =>
                        setSignDetails({ ...sigupDetails, password: e.target.value })

                    }
                    value={sigupDetails.password}
                /><br />

                {errors.password && (
                    <p className="error">* {errors.password.message}</p>
                )}

                <input className="form-control" type="password" placeholder="Confirm password"
                    {...register("confirmPassword", {
                        required: "Please Confirm Your Password",
                        validate: (match) => {
                            const password = getValues("password");
                            return match === password || "Passwords should match!";
                        },
                    })}
                    onChange={(e) =>
                        setSignDetails({ ...sigupDetails, confirmPassword: e.target.value })
                    }
                    value={sigupDetails.confirmPassword} />


                {errors.confirmPassword && (
                    <p className="error">* {errors.confirmPassword.message}</p>
                )}
                <button type="submit" className="btn btn-primary">Sign up</button>

            </form>
        </section>

    </div>
}

export default Signup;

