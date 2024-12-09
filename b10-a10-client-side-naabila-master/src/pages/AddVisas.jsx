import React, { useContext, useState } from 'react'
import { AuthContext } from '../firebase/AuthProvider';
import PageBanner from '../components/PageBanner';
import Swal from 'sweetalert2'
import { Fade } from 'react-awesome-reveal';
function AddVisas() {
  const { theme, toggleTheme,user } = useContext(AuthContext);
  // const[allVisa,setAllVisa]=useState([])
  const userEmail=user.email;
  console.log(userEmail)
  const handleAddVisa = (e) => {
    e.preventDefault();
  
    const form = e.target; 
    const image = form.image.value; 
    const name = form.name.value;
    const visaType = form.querySelector("select").value; 
    const time = form.time.value;
    const description = form.description.value;
    const age = form.age.value;
    const fee = form.fee.value;
    const validity = form.validity.value;
    const method = form.method.value;
   //  required documents
   const checkboxes = form.querySelectorAll(".checkbox"); 
   const requiredDocuments = Array.from(checkboxes)
     .filter((checkbox) => checkbox.checked) 
     .map((checkbox) => checkbox.value); 


    //  data object
    const visaData = { name, image, visaType, time, description, age, fee, validity, method,requiredDocuments,userEmail };
   
    fetch('https://server-jade-xi.vercel.app/visas',{
      method:"POST",
      headers:{
        'content-type':'application/json'
      },
      body:JSON.stringify(visaData)
    })
    .then(res=>res.json())
    .then(data=>{
      e.target.reset();
      if(data.insertedId){
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Visa added successfully",
          showConfirmButton: false,
          timer: 1500
        });   
      }
    })
    
  };
  return (
    <>
    <PageBanner title="Add Visa" />
      <Fade>
      <div className="container mx-auto">
      <div  className="min-h-screen bg-base-100 py-8">
      

      <div className="container mx-auto max-w-4xl shadow-lg bg-base-200 p-8 rounded-lg">
      <h2 className={`text-3xl ${theme==="dark"?'text-[#fff]':'text-nil'}  font-bold text-center`}>
            Add Visa
          </h2>

          {/* Add visa form */}
       <form onSubmit={handleAddVisa}>
        
        {/* Country Image */}
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Country Image (URL)</span>
          </label>
          <input
            type="text"
            name='image'
            placeholder="Paste the image link here"
            className="input input-bordered w-full"
          />
        </div>

        {/* Country Name */}
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Country Name</span>
          </label>
          <input
            type="text"
            name='name'
            placeholder="Enter the country name"
            className="input input-bordered w-full"
          />
        </div>

        {/* Visa Type Dropdown */}
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Visa Type</span>
          </label>
          <select className="select select-bordered w-full">
            <option>Tourist Visa</option>
            <option>Student Visa</option>
            <option>Official Visa</option>
            <option>Medical Visa</option>
            <option>Working Visa</option>
            <option>Business Visa</option>
          </select>
        </div>

        {/* Processing Time */}
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Processing Time</span>
          </label>
          <input
            type="text"
            name='time'
            placeholder="e.g., 5-10 business days"
            className="input input-bordered w-full"
          />
        </div>

        {/* Required Documents */}
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Required Documents</span>
          </label>
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2">
              <input type="checkbox" value={'Valid passport'} className="checkbox" /> Valid Passport
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" value={'Visa Application Form'} className="checkbox" /> Visa Application Form
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" value={'Recent Passport-Sized Photograph'} className="checkbox" /> Recent Passport-Sized Photograph
            </label>
          </div>
        </div>

        {/* Description */}
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <textarea
            className="textarea textarea-bordered"
            name='description'
            placeholder="Add a description"
          ></textarea>
        </div>

        {/* Age Restriction */}
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Age Restriction</span>
          </label>
          <input
            type="number"
            name="age"
            placeholder="Enter minimum age (if any)"
            className="input input-bordered w-full"
          />
        </div>

        {/* Fee */}
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Fee</span>
          </label>
          <input
            type="number"
            name='fee'
            placeholder="Enter the visa fee"
            className="input input-bordered w-full"
          />
        </div>

        {/* Validity */}
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Validity</span>
          </label>
          <input
            type="text"
            name="validity"
            placeholder="e.g., 6 months"
            className="input input-bordered w-full"
          />
        </div>

        {/* Application Method */}
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Application Method</span>
          </label>
          <input
            type="text"
            name='method'
            placeholder="e.g., Online or In-Person"
            className="input input-bordered w-full"
          />
        </div>

        {/* Add Visa Button */}
        <button className={`btn bg-komla w-full mt-4 ${
    theme === "dark"
      ? "text-[#fff] hover:bg-transparent hover:border-2 hover:border-[#fff]"
      : "text-[#fff] hover:text-nil hover:bg-transparent hover:border-2 hover:border-nil"
        }`}>Add Visa</button>
       </form>   

      </div>
    </div>
      </div>
      </Fade>
    </>
  )
}

export default AddVisas