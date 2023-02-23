import "./SignUp.css"

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const Update = ({ setUpdate }) => {
    const id = localStorage.getItem("id")
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [updateDetails, setupdateDetails] = useState({
        email: "",
        firstName: "",
        lastName: "",
        photo: ""
    });
    const onUpload = () => {
        const data = new FormData()
        data.append("file", updateDetails.photo)
        data.append("upload_preset", "cwbbldjh")
        data.append("cloud_name", "dxuegysae")
        fetch("  https://api.cloudinary.com/v1_1/dxuegysae/image/upload", {
            method: "post",
            body: data
        })
            .then(resp => resp.json())
            .then(data => {
                setupdateDetails({...updateDetails,photo:data.url})
            })
            .catch(err => console.log(err))
    }

    async function onSubmit() {
        onUpload()
        var formData = {}
           

        const options = {
            method: 'GET',
            url: 'https://mailcheck.p.rapidapi.com/',
            params: { domain: updateDetails.email },
            headers: {
                'X-RapidAPI-Key': '080d5c1b4emsh5a99b990e190ee5p167317jsn191d459fc152',
                'X-RapidAPI-Host': 'mailcheck.p.rapidapi.com'
            }
        };

        axios.request(options).then(function (response) {
            console.log(response.data)
            if (!response.data.disposable && (response.data.risk === 8 || response.data.risk === 10)) {
                fetch(`http://localhost:5000/data/${id}`).then(res=>{
                    formData={
                        "firstName": updateDetails.firstName,
                        "lastName": updateDetails.lastName,
                        "email": updateDetails.email,
                        "photo":updateDetails.photo,
                        "passward":res.data.passward
                    }
                })
                fetch(`http://localhost:5000/data/${id}`, {
                    method: 'put',
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify(formData)
                }).then((res) => {
                    setUpdate(false)
                    alert('updated successfully')
                })

            }
        }).catch(function (error) {
            alert("invalid email")
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
                        setupdateDetails({ ...updateDetails, firstName: e.target.value })
                    }
                    value={updateDetails.firstName} /><br />
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
                        setupdateDetails({ ...updateDetails, lastName: e.target.value })
                    }
                    value={updateDetails.lastName} /><br />
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
                        setupdateDetails({ ...updateDetails, email: e.target.value })
                    }
                    value={updateDetails.email} /><br />

                {errors.email && (
                    <p className="error">* {errors.email.message}</p>
                )}
                <label htmlFor="photo">Upload Profile photo</label>
                <input className="form-control" type="file" placeholder="photo" name="photo"
                    {...register("photo")
                    }
                    onChange={(e) =>
                        setupdateDetails({ ...updateDetails, photo: e.target.files[0] })
                    }
                /><br />

                <button type="submit" className="btn btn-primary">update</button>
                <button className="btn btn-primary" onClick={() => setUpdate(false)}>cancel</button>
            </form>
        </section>

    </div>


}
export default Update;