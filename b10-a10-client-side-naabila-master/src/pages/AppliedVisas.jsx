import { Link, useLoaderData } from "react-router-dom";
import PageBanner from "../components/PageBanner";
import SectionHeader from "../components/SectionHeader";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../firebase/AuthProvider";
import { toast } from "react-toastify";

function AppliedVisas() {
  const { theme } = useContext(AuthContext);
  const[search,setSearch]=useState("")

  const appliedVisas = useLoaderData();
  
  const [applied, setApplied] = useState(appliedVisas);

  //serach data
  useEffect(() => {
    fetch(`https://server-jade-xi.vercel.app/application?searchParams=${search}`)
      .then((res) => res.json())
      .then((data) => setApplied(data)) // Update state with fetched data
      .catch((error) => console.error("Error fetching applied visas:", error));
  }, [search]);
  

  const handleVisaApplicationDelete = (id) => {
    fetch(`https://server-jade-xi.vercel.app/application/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          toast("Visa deleted successfully");
          const remaining = applied.filter((a) => a._id !== id);
          setApplied(remaining);
        }
      });
  };

  return (
    <>
      <PageBanner title="Applied Visas" />
      <SectionHeader
        title="See All Applied Visas"
        subTitle="Review all your visa applications and stay updated on their progress in one place."
      />

<div className="container mx-auto my-10">
      <div className="flex flex-wrap justify-center items-center gap-4">
        {/* Search Field */}
        <input
          type="text"
          onChange={(e)=>setSearch(e.target.value)}
          value={search}
          placeholder="Search here..."
          className={`input input-bordered w-full max-w-lg ${
            theme === "dark" ? "bg-[#333] text-[#fff]" : "bg-[#f9f9f9] text-nil"
          }`}
        />

        {/* Search Button */}
        <button
          className={`btn bg-komla ${
            theme === "dark"
              ? "text-[#fff] hover:bg-transparent hover:border-2 hover:border-[#fff]"
              : "text-[#fff] hover:text-nil hover:bg-transparent hover:border-2 hover:border-nil"
          }`}
        >
          Search
        </button>
      </div>
    </div>

      {/* All Applied Cards */}
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {Array.isArray(applied) && applied.length > 0 ? (
            applied.map((allVisa) => {
              const {
                _id,
                detailsData: { image, name, visaType, fee, time, validity, method } = {},
                appliedDate,
                firstName,
                lastName,
              } = allVisa;

              return (
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

                      {/* Application Details */}
                      <div className="flex gap-2 justify-start">
                        <p className={`font-bold ${theme === "dark" ? "text-[#fff]" : "text-nil"}`}>Application Date:</p>
                        <p className="text-left">{appliedDate}</p>
                      </div>
                      <div className="flex gap-2 justify-start">
                        <p className={`font-bold ${theme === "dark" ? "text-[#fff]" : "text-nil"}`}>Applicant's Name:</p>
                        <p className="text-left">
                          {firstName} {lastName}
                        </p>
                      </div>
                    </div>

                    {/* Card Actions */}
                    <div className="card-actions justify-start mt-5">
                      <button
                        onClick={() => handleVisaApplicationDelete(_id)}
                        className={`btn bg-komla ${
                          theme === "dark"
                            ? "text-[#fff] hover:bg-transparent hover:border-2 hover:border-[#fff]"
                            : "text-[#fff] hover:text-nil hover:bg-transparent hover:border-2 hover:border-nil"
                        }`}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div>No visa updates available at the moment.</div>
          )}
        </div>
      </div>
    </>
  );
}

export default AppliedVisas;
