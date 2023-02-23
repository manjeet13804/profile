import "./SignUp.css"
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useForm } from "react-hook-form";
const Login = () => {
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [loginDetails, setLoginDetails] = useState({
        email: "",
        password: "",
    });
const [isLogin,setIsLogin]=useState(0)
    const login = () => {
        let DATA = {
            email: loginDetails.email,
            passward: loginDetails.password
        }
        axios.get('http://localhost:5000/data')
            .then(function (response) {
                response.data.map((item)=>{
                    if(item.email===DATA.email) {
                        if(item.passward===DATA.passward){
                            localStorage.setItem('userId', DATA.email)
                            localStorage.setItem('id', item.id)
                            setIsLogin(1)
                            navigate('/dashboard')
                        }
                        else{
                            alert("Password is incorrect")
                        }
                    }
                   
                })
                if(isLogin===0){
                    setIsLogin(2)
                }
            })
    }

    return <div className="main-box">
        {isLogin===1 && <p>Login Successful</p>}
        {isLogin===2 && <p>Email with entered details doesn't Exists</p>}
        <section className="information">
            <p className="login-para">Enter your credentials to login your account</p>
            
            <form onSubmit={handleSubmit(login)}>
             <input className="form-control" type="email" placeholder="Mail Id"
                    {...register("email", {
                        required: "Please Enter Your Email!",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Please Enter A Valid Email!",
                        },
                    })}
                    onChange={(e) =>
                        setLoginDetails({ ...loginDetails, email: e.target.value })
                    }
                    value={loginDetails.email} /><br />
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
                        setLoginDetails({ ...loginDetails, password: e.target.value })

                    }
                    value={loginDetails.password}
                /><br />

                {errors.password && (
                    <p className="error">* {errors.password.message}</p>
                )}
                < input type="checkbox" className="checkbox" />
                <span>  Remember me?</span>
                <button className="btn btn-primary" >Login</button>
            </form>
            <div className="signup-link">
                <span>Need an Account? </span>
                <Link to="/signup">
                    <span className="signup-link1">Sign Up</span>
                </Link>
            </div>
        </section >

    </div >
}
export default Login;

