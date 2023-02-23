import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";

const Password =({setPassword})=>{
    const id =localStorage.getItem("id")
    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm();
    const [changePassword, setChangePassword] = useState({
        password: "",
        confirmPassword: "",
        currentPassword:""
    });

    async function onSubmit() {
       
              axios.get(`http://localhost:5000/data/${id}`).then(function (response) {
            console.log(response.data)
            
            if (response.data.passward===changePassword.currentPassword) { 
                const formData = {
                   
                    "firstName": response.data.firstName,
                    "lastName": response.data.lastName,
                    "email": response.data.email,
                    "passward": changePassword.password,
                }
                    fetch(`http://localhost:5000/data/${id}`, {
                        method: 'put',
                        headers: { "content-type": "application/json" },
                        body: JSON.stringify(formData)
                    }).then((res) => {
                        setPassword(false)
                        alert('password updated successfully')
                    })               
            }
        }).catch(function (error) {
            alert("current Password doesn't match")
            console.error(error);
        });

    }
    return<>
    <div className="main-box">
        <section className="information">
            <p className="signup-para">Change Your Password</p>
            <form className="form" onSubmit={handleSubmit(onSubmit)} >
            <input className="form-control form-control-md" type="password" placeholder="current password"
                    {...register("currentPassword", {
                        required: "Please Enter Your current Password",
                        minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters long!",
                        },
                    })}
                    onChange={(e) =>
                        setChangePassword({ ...changePassword, currentPassword: e.target.value })

                    }
                    value={changePassword.currentPassword}
                /><br />

                {errors.currentPassword && (
                    <p className="error">* {errors.currentPassword.message}</p>
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
                        setChangePassword({ ...changePassword, password: e.target.value })

                    }
                    value={changePassword.password}
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
                        setChangePassword({ ...changePassword, confirmPassword: e.target.value })
                    }
                    value={changePassword.confirmPassword} />


                {errors.confirmPassword && (
                    <p className="error">* {errors.confirmPassword.message}</p>
                )}
                <button type="submit" className="btn btn-primary">Change</button>
                <button  className="btn btn-primary" onClick={()=>setPassword(false)}>cancel</button>
            </form>
        </section>

    </div>
    </>
}
export default Password;