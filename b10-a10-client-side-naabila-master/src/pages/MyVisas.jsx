import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../firebase/AuthProvider';
import PageBanner from '../components/PageBanner';
import { toast } from 'react-toastify';
import { useLoaderData } from 'react-router-dom';

function MyVisas() {
  const updatedData=useLoaderData()
  
  const { user,theme } = useContext(AuthContext); 
  const [myVisa, setMyVisa] = useState([]); 
  const [selectedVisa, setSelectedVisa] = useState(null);


//loading data according to email
  useEffect(() => {
    if (user?.email) {
     
      fetch(`https://server-jade-xi.vercel.app/added-visa?email=${user.email}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error('Failed to fetch visas');
          }
          return res.json();
        })
        .then((data) => setMyVisa(data))
        .catch((error) => console.error('Error fetching visas:', error));
    }
  }, [user?.email]);

  //delete fuctionality
  const handleDel=(id)=>{
    fetch(`https://server-jade-xi.vercel.app/update-visa/${id}`,{
      method:"DELETE"
    })
    .then(res=>res.json())
    .then(data=>{
      if(data.deletedCount>0){
        toast("Visa deleted successfully");
        const remaining=myVisa.filter(v=>v._id!==id)
        setMyVisa(remaining);
      }
    })
  }


  

  // Update functionality
  // load to be updated visa data
const loadVisaDataForUpdate=(id)=>{
  document.getElementById('update-visa').showModal();
  fetch(`https://server-jade-xi.vercel.app/update-visa/${id}`)
  .then(res=>res.json())
  .then(data=>setSelectedVisa(data))
  
}
//update visa
  const handleUpdateVisa = (e) => {
    e.preventDefault();
  const form=e.target;
  const image=form.image.value;
  const name=form.name.value;
  const visaType=form.visaType.value;
  const fee=form.fee.value;
  const validity=form.validity.value;
  const method=form.method.value;
  const updatedVisa={
    image,
    name,
    visaType,
    fee,
    validity,
    method}

    console.log(updatedVisa)

    // Send updated data to backend
   fetch(`https://server-jade-xi.vercel.app/update-visa/${selectedVisa._id}`,{
    method:'PUT',
    headers:{
      "content-type":"application/json"
    },
    body:JSON.stringify(updatedVisa)
   })
   .then(res=>res.json())
   .then(data=>{
    if(data.modifiedCount>0){
      toast("Visa updated successfully");
      const updatedVisas = myVisa.map((visa) =>
        visa._id === selectedVisa._id ? { ...visa, ...updatedVisa } : visa
      );

      // Update the state with the modified array
      setMyVisa(updatedVisas);
      
    }
   });


   document.getElementById("update-visa").close()
  };
  
  
  return (
    <>
      <PageBanner title="My Visas" />

      <div className="container mx-auto">
      <div className="grid mt-16 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {myVisa.length > 0 ? (
          myVisa.map((visa)=>{
            const{_id,name,image,visaType,time,fee,validity,method}=visa
            return(
              <div key={_id} className="card bg-base-100 shadow-xl">
                  <figure>
                    <img src={image} alt="Visa" />
                  </figure>
                  <div className="p-6">
                    <div className="flex flex-col gap-3">
                      {/* Visa Details */}
                      <div className="flex gap-2 justify-start">
                        <p className={`font-bold ${theme === "dark" ? "text-[#fff]" : "text-nil"}`}>Country:</p>
                        <p className="text-left">{name}</p>
                      </div>
                      <div className="flex gap-2 justify-start">
                        <p className={`font-bold ${theme === "dark" ? "text-[#fff]" : "text-nil"}`}>Visa Type:</p>
                        <p className="text-left">{visaType}</p>
                      </div>
                      <div className="flex gap-2 justify-start">
                        <p className={`font-bold ${theme === "dark" ? "text-[#fff]" : "text-nil"}`}>Processing Time:</p>
                        <p className="text-left">{time}</p>
                      </div>
                      <div className="flex gap-2 justify-start">
                        <p className={`font-bold ${theme === "dark" ? "text-[#fff]" : "text-nil"}`}>Fee:</p>
                        <p className="text-left">{fee} USD</p>
                      </div>
                      <div className="flex gap-2 justify-start">
                        <p className={`font-bold ${theme === "dark" ? "text-[#fff]" : "text-nil"}`}>Validity:</p>
                        <p className="text-left">{validity}</p>
                      </div>
                      <div className="flex gap-2 justify-start">
                        <p className={`font-bold ${theme === "dark" ? "text-[#fff]" : "text-nil"}`}>Application Method:</p>
                        <p className="text-left">{method}</p>
                      </div>

                     
                    </div>

                    {/* Card Actions */}
                    <div className="card-actions justify-start mt-5">
                      <button
                        onClick={()=>handleDel(_id)}
                        className={`btn bg-komla ${
                          theme === "dark"
                            ? "text-[#fff] hover:bg-transparent hover:border-2 hover:border-[#fff]"
                            : "text-[#fff] hover:text-nil hover:bg-transparent hover:border-2 hover:border-nil"
                        }`}
                      >
                        Cancel
                      </button>
                      <button
                       onClick={()=>loadVisaDataForUpdate(_id)}
                        className={`btn bg-komla ${
                          theme === "dark"
                            ? "text-[#fff] hover:bg-transparent hover:border-2 hover:border-[#fff]"
                            : "text-[#fff] hover:text-nil hover:bg-transparent hover:border-2 hover:border-nil"
                        }`}
                      >
                        update
                      </button>
                    </div>
                  </div>
                </div>
            )
          })
            
          )
        : (
          <p>No visas found for this user.</p>
        )}
      </div>
      </div>
      {/* visa update modal */}
     
<dialog id="update-visa" className="modal">
  <div className="modal-box">
   {/* Modal content */}
   <form onSubmit={handleUpdateVisa}>
        
        {/* Country Image */}
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Country Image (URL)</span>
          </label>
          <input
            type="text"
            name='image'
            defaultValue={selectedVisa?.image}
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
            defaultValue={selectedVisa?.name}
            placeholder="Enter the country name"
            className="input input-bordered w-full"
          />
        </div>

        {/* Visa Type Dropdown */}
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Visa Type</span>
          </label>
          <select className="select select-bordered w-full"
          name='visaType'
          value={selectedVisa?.visaType || ""} 
          onChange={(e) =>
          setSelectedVisa((prev) => ({
          ...prev,
            visaType: e.target.value,
           }))
           } 
          >
            <option value='Tourist Visa'>Tourist Visa</option>
            <option value='Student Visa'>Student Visa</option>
            <option value='Official Visa'>Official Visa</option>
            <option value='Medical Visa'>Medical Visa</option>
            <option value='Working Visa'>Working Visa</option>
            <option value='Business Visa'>Business Visa</option>
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
            defaultValue={selectedVisa?.time}
            placeholder="e.g., 5-10 business days"
            className="input input-bordered w-full"
          />
        </div>

        

        {/* Age Restriction */}
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Age Restriction</span>
          </label>
          <input
            type="number"
            name="age"
            defaultValue={selectedVisa?.age}
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
            defaultValue={selectedVisa?.fee}
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
            defaultValue={selectedVisa?.validity}
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
            defaultValue={selectedVisa?.method}
            placeholder="e.g., Online or In-Person"
            className="input input-bordered w-full"
          />
        </div>

        {/* Add Visa Button */}
        <button  className={`btn bg-komla w-full mt-4 ${
    theme === "dark"
      ? "text-[#fff] hover:bg-transparent hover:border-2 hover:border-[#fff]"
      : "text-[#fff] hover:text-nil hover:bg-transparent hover:border-2 hover:border-nil"
        }`}>Update Visa</button>
       </form>   
   {/* Modal content */}
    
  </div>
</dialog>
    </>
  );
}

export default MyVisas;
