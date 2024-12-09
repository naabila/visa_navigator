import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../firebase/AuthProvider';
import { toast } from 'react-toastify';
import { GoogleAuthProvider } from 'firebase/auth';
import Swal from 'sweetalert2';

function Register() {
  const { emailSignup, googleLogin ,theme} = useContext(AuthContext);
  const googleProvider = new GoogleAuthProvider();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.userName.value;
    const email = e.target.email.value;
    const photo = e.target.photo.value;
    const password = e.target.password.value;
    const newUser={name,email,photo}
    // Password validation
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      toast.error("Enter a valid password: at least 6 characters, 1 uppercase, and 1 lowercase letter.");
      return;
    }

    // Email signup
    emailSignup(email, password)
      .then((result) => {
        toast.success("User registered successfully");
        e.target.reset();
        const newUser={name,email,photo}
        console.log(result.user)
        navigate("/");
        //save user info to database
        fetch("https://server-jade-xi.vercel.app/users",{
          method:"POST",
          headers:{
            'content-type':'application/json'
          },
          body:JSON.stringify(newUser)
        })
        .then(res=>res.json())
        .then(data=>{
          if(data.insertedId){
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "User Signup Successful",
              showConfirmButton: false,
              timer: 1500
            });   
          }
        })
      })
      .catch((err) => {
        toast.error("Error during registration: " + err.message);
        e.target.reset();
      });
  };

  const handleGoogleLogin = () => {
    googleLogin(googleProvider)
      .then((result) => {
        toast.success("Logged in successfully with Google");
        navigate("/");
      })
      .catch((err) => {
        toast.error("Error during Google login: " + err.message);
      });
  };

  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-center min-h-screen bg-blue-700/10">
        <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
          <h2 className={`text-3xl ${theme==="dark"?'text-[#fff]':'text-nil'}  font-bold text-center`}>Register your account</h2>

          {/* Signup Form */}
          <form onSubmit={handleRegister} className="mt-4">
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text text-deepBlue font-semibold">Your Name</span>
              </label>
              <input
                type="text"
                name="userName"
                placeholder="Enter your name"
                className="input input-bordered w-full"
                required
              />
            </div>

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text font-semibold text-deepBlue">Photo URL</span>
              </label>
              <input
                type="text"
                name="photo"
                placeholder="Enter your photo URL"
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text font-semibold text-deepBlue">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email address"
                className="input input-bordered w-full"
                required
              />
            </div>

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text font-semibold text-deepBlue">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="input input-bordered w-full"
                required
              />
            </div>

            <button
              className={`btn bg-komla w-full mt-4 ${
    theme === "dark"
      ? "text-[#fff] hover:bg-transparent hover:border-2 hover:border-[#fff]"
      : "text-[#fff] hover:text-nil hover:bg-transparent hover:border-2 hover:border-nil"
  }`}
              type="submit"
            >
              Register
            </button>
          </form>

          <button
  type="button"
  onClick={handleGoogleLogin}
  className={`btn bg-komla w-full mt-4 ${
    theme === "dark"
      ? "text-[#fff] hover:bg-transparent hover:border-2 hover:border-[#fff]"
      : "text-[#fff] hover:text-nil hover:bg-transparent hover:border-2 hover:border-nil"
  }`}
>
  Sign in with Google
</button>


          <p className={`mt-4 text-center text-sm ${theme === "dark" ? 'text-[#fff]' : "text-gray-600 font-light"}`}>
            Already Have An Account?{" "}
            <Link to="/login" className={`${theme==="dark"?'text-[#fff]':'text-nil'} font-semibold`}>
              Please Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
