import React, { useContext, useEffect, useState } from 'react';
import PageBanner from '../components/PageBanner';
import SectionHeader from '../components/SectionHeader';
import userInterface from '../assets/lotties/user-interface.json';
import Swal from 'sweetalert2';
import Lottie from 'lottie-react';
import { AuthContext } from '../firebase/AuthProvider';
import { useLoaderData } from 'react-router-dom';

function Detail() {
  const detailsData = useLoaderData();
  const { image, name, visaType, requiredDocuments, description } = detailsData;

  const { theme,user } = useContext(AuthContext);
console.log(user)
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [appliedDate, setAppliedDate] = useState('');
  const [visaFee, setVisaFee] = useState('');

  // Set the current date as the default applied date
  useEffect(() => {
    const currentDate = new Date().toISOString().split('T')[0];
    setAppliedDate(currentDate);
  }, []);

  // Fetch user info
  useEffect(() => {
    fetch('https://server-jade-xi.vercel.app/users') // Replace with the correct API endpoint
      .then((res) => res.json())
      .then((data) => {
        
        setEmail(user?.email); 
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      email,
      firstName,
      lastName,
      appliedDate,
      visaFee,
      detailsData,
    };

    fetch('https://server-jade-xi.vercel.app/application', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          e.target.reset();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Data added successfully',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
      document.getElementById('visa-details').close();
  };

  return (
    <>
      <PageBanner title="Visa Details" />
      <div className="container mx-auto">
        <SectionHeader
          title="Visa Details"
          subTitle="Get comprehensive information about this visa, including eligibility, requirements, application process, and benefits"
        />

        {/* Country Details */}
        <div className="flex justify-center w-full">
          <div className="flex card bg-base-100 p-8 shadow-xl flex-col gap-5 justify-center">
            <img src={image} className="lg:w-[40vw] rounded-3xl" alt="image" />
            {/* Name */}
            <div className="flex gap-2 justify-start items-center">
              <p className={`font-bold text-xl ${theme === 'dark' ? 'text-[#fff]' : 'text-nil'}`}>
                Country:
              </p>
              <p className="text-left">{name}</p>
            </div>

            {/* Visa type */}
            <div className="flex gap-2 justify-start items-center">
              <p className={`font-bold text-xl ${theme === 'dark' ? 'text-[#fff]' : 'text-nil'}`}>
                Visa type:
              </p>
              <p className="text-left">{visaType}</p>
            </div>

            {/* Required documents */}
            <div className="">
              <p className={`font-bold my-3 text-2xl ${theme === 'dark' ? 'text-[#fff]' : 'text-nil'}`}>
                Required documents:
              </p>
              <p className="text-left">
                {requiredDocuments.map((doc, index) => (
                  <p key={index}>{doc}, </p>
                ))}
              </p>
            </div>

            {/* Description */}
            <div className="my-3">
              <p className={`font-bold my-2 text-xl ${theme === 'dark' ? 'text-[#fff]' : 'text-nil'}`}>
                Description:
              </p>
              <p className="text-left max-w-[700px]">{description}</p>
            </div>
          </div>
        </div>

        {/* Modal */}
        <div className="flex justify-center items-center -mt-[150px] flex-col">
          <Lottie className="w-[700px] h-auto" animationData={userInterface} loop={true} />

          <button
            className={`btn bg-komla ${
              theme === 'dark'
                ? 'text-[#fff] hover:bg-transparent hover:border-2 hover:border-[#fff]'
                : 'text-[#fff] hover:text-nil hover:bg-transparent hover:border-2 hover:border-nil'
            }`}
            onClick={() => document.getElementById('visa-details').showModal()}
          >
            Apply for the Visa
          </button>

          <dialog id="visa-details" className="modal">
            <div className="modal-box w-11/12">
              <div className="p-6 max-w-lg mx-auto bg-white rounded-md">
                <h2 className="text-2xl font-bold mb-6">Visa Application Form</h2>
                <form onSubmit={handleSubmit}>
                  {/* Email Field */}
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1" htmlFor="email">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      disabled
                      className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100"
                    />
                  </div>

                  {/* First Name Field */}
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1" htmlFor="firstName">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  {/* Last Name Field */}
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1" htmlFor="lastName">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  {/* Applied Date Field */}
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1" htmlFor="appliedDate">
                      Applied Date *
                    </label>
                    <input
                      type="date"
                      id="appliedDate"
                      value={appliedDate}
                      disabled
                      className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100"
                    />
                  </div>

                  {/* Visa Fee Field */}
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1" htmlFor="visaFee">
                      Visa Fee *
                    </label>
                    <input
                      type="number"
                      id="visaFee"
                      value={visaFee}
                      onChange={(e) => setVisaFee(e.target.value)}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  {/* Submit Button */}
                  <div>
                    <button
                      className={`btn w-full bg-komla ${
                        theme === 'dark'
                          ? 'text-[#fff] hover:bg-transparent hover:border-2 hover:border-[#fff]'
                          : 'text-[#fff] hover:text-nil hover:bg-transparent hover:border-2 hover:border-nil'
                      }`}
                    >
                      Apply for the Visa
                    </button>
                  </div>
                </form>
              </div>
              <div className="modal-action">
                <form method="dialog">
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      </div>
    </>
  );
}

export default Detail;
