import React, { useContext } from 'react';
import { FaUniversity, FaBusinessTime, FaTools, FaUsers, FaSuitcase, FaGlobe } from "react-icons/fa";
import Banner from '../components/Banner';
import SectionHeader from '../components/SectionHeader';
import { Link, useLoaderData } from 'react-router-dom';
import { AuthContext } from '../firebase/AuthProvider';
import faq from "../assets/lotties/faq.json"
import Lottie from "lottie-react";
function Home() {
  // Define categories
  const categories = [
    {
      icon: <FaUniversity size={40} className="text-bulu" />,
      title: "Education Visa",
      description: "Discover opportunities to study in your dream institutions worldwide.",
    },
    {
      icon: <FaBusinessTime size={40} className="text-green-500" />,
      title: "Business Immigration",
      description: "Explore business visas that empower your entrepreneurial journey abroad.",
    },
    {
      icon: <FaTools size={40} className="text-yellow-500" />,
      title: "Skilled Immigration",
      description: "Secure visas designed for professionals in high-demand industries.",
    },
    {
      icon: <FaUsers size={40} className="text-purple-500" />,
      title: "Spouse/Family Visas",
      description: "Reunite with your loved ones through dedicated family visa options.",
    },
    {
      icon: <FaSuitcase size={40} className="text-orange-500" />,
      title: "Tourist & Visitor Visas",
      description: "Plan your next adventure with hassle-free tourist visa solutions.",
    },
    {
      icon: <FaGlobe size={40} className="text-teal-500" />,
      title: "Resident Return Visas",
      description: "Ensure a smooth return to your country of residence with these visas.",
    },
  ];

  // Fetch latest visa data
  const latestVisa = useLoaderData();

  // Use context for theme
  const { theme } = useContext(AuthContext);

  

  return (
    <>
      {/* Banner Section */}
      <Banner />

      {/* Latest Visa Updates Section */}
      <div className="container mx-auto">
        <SectionHeader
          title="Latest Visa Updates"
          subTitle="Stay ahead with the newest opportunities for work, study, and travel."
        />

        {/* Latest Visa Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {Array.isArray(latestVisa) && latestVisa.length > 0 ? (
            latestVisa.map((allVisa) => {
              const { image, name, visaType, fee, _id, time, validity, method } = allVisa;

              return (
                <div key={_id} className="card bg-base-100 shadow-xl">
                  <figure>
                    <img src={image} alt="Visa" />
                  </figure>
                  <div className="p-6">
                    <div className="flex flex-col gap-3">
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
                    <div className="card-actions justify-start mt-5">
                      <Link to={`/visadetails/${_id}`}>
                        <button className={`btn bg-komla ${theme === "dark" ? "text-[#fff] hover:bg-transparent hover:border-2 hover:border-[#fff]" : "text-[#fff] hover:text-nil hover:bg-transparent hover:border-2 hover:border-nil"}`}>Details</button>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div>No visa updates available at the moment.</div>
          )}
        </div>

        {/* See All Visas Button */}
        <div className="flex justify-center my-10">
          <Link to='/allvisas'>
            <button className={`btn bg-komla ${theme === "dark" ? "text-[#fff] hover:bg-transparent hover:border-2 hover:border-[#fff]" : "text-[#fff] hover:text-nil hover:bg-transparent hover:border-2 hover:border-nil"}`}>See All Visas</button>
          </Link>
        </div>

        {/* Explore Visa Category Section */}
        <SectionHeader title="Explore Visa Categories" subTitle="Find the perfect visa to begin your journey today." />
        <div className="p-6 bg-gray-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <div key={index} className="p-8 border border-bulu bg-white shadow-lg rounded-lg flex items-start space-x-4 hover:shadow-xl transition-shadow">
                <div className='text-bulu'>{category.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold text-bulu">{category.title}</h3>
                  <p className="text-gray-600 mt-2">{category.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Faq section */}
        <SectionHeader title='Frequently Asked Questions' subTitle='Find answers to the most common questions about visas, the application process, eligibility, and more.' />
        <div className="grid grid-cols-1 items-center md:grid-cols-2 gap-3">
            <div><Lottie  animationData={faq} loop={true} /></div>
            <div>
            <div className="join join-vertical w-full">
  <div className="collapse collapse-arrow join-item border-base-300 border">
    <input type="radio" name="my-accordion-4" defaultChecked />
    <div className="collapse-title text-xl font-medium">How do I apply for a visa?</div>
    <div className="collapse-content">
      <p>You can apply for a visa by selecting the visa type you need from the homepage or the visa catalog. Fill out the required information in the application form and submit the necessary documents online.</p>
    </div>
  </div>
  <div className="collapse collapse-arrow join-item border-base-300 border">
    <input type="radio" name="my-accordion-4" />
    <div className="collapse-title text-xl font-medium">Can I update my visa details after submission?</div>
    <div className="collapse-content">
      <p>Yes, you can update your visa details by clicking the "Update" button in the My Visas section. Make the necessary changes in the provided fields, and your updates will be processed immediately.</p>
    </div>
  </div>
  <div className="collapse collapse-arrow join-item border-base-300 border">
    <input type="radio" name="my-accordion-4" />
    <div className="collapse-title text-xl font-medium"> How long does visa processing take?</div>
    <div className="collapse-content">
      <p>The processing time depends on the type of visa and the country you're applying to. Specific timeframes are provided on the visa details page, such as "5-10 business days" for most tourist visas.</p>
    </div>
  </div>
  <div className="collapse collapse-arrow join-item border-base-300 border">
    <input type="radio" name="my-accordion-4" />
    <div className="collapse-title text-xl font-medium"> Can I cancel my visa application after submission?</div>
    <div className="collapse-content">
      <p>Yes, you can cancel your application by clicking the "Cancel" button in the My Visas section. However, please note that application fees may not be refundable.
</p>
    </div>
  </div>
  <div className="collapse collapse-arrow join-item border-base-300 border">
    <input type="radio" name="my-accordion-4" />
    <div className="collapse-title text-xl font-medium">How can I track my visa application status?</div>
    <div className="collapse-content">
      <p>You can track your visa application status in real-time by logging into your account and navigating to the My Visas section. The processing status will be displayed for each application.</p>
    </div>
  </div>
</div>
            </div>
        </div>
        {/* Faq section */}
      </div>
    </>
  );
}

export default Home;
