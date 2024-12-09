import React, { useContext, useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import PageBanner from "../components/PageBanner";
import SectionHeader from "../components/SectionHeader";
import { AuthContext } from "../firebase/AuthProvider";
import { Fade } from "react-awesome-reveal";

function AllVisas() {
  const loadedVisas = useLoaderData();
  const { theme } = useContext(AuthContext);
  const [allVisas, setAllVisas] = useState(loadedVisas);
  const [filteredVisas, setFilteredVisas] = useState(loadedVisas); // New state for filtered data

  const filterData = [
    { label: "All", value: "All" }, // Include "All" to reset filter
    { label: "Tourist Visa", value: "Tourist Visa" },
    { label: "Student Visa", value: "Student Visa" },
    { label: "Medical Visa", value: "Medical Visa" },
    { label: "Working Visa", value: "Working Visa" },
    { label: "Business Visa", value: "Business Visa" },
  ];

  const handleFilterVisa = (e) => {
    const selectedType = e.target.value;

    if (selectedType === "All") {
      setFilteredVisas(allVisas); // Reset to all visas
    } else {
      const filtered = allVisas.filter((visa) => visa.visaType === selectedType);
      setFilteredVisas(filtered);
    }
  };

  return (
    <>
      <PageBanner title="See all visas" />
      <div className="container mx-auto">
        <SectionHeader
          title="Explore all visas"
          subTitle="Find the perfect visa suited to your needs. Browse through a variety of visa options, including work, study, travel, and residency."
        />

        {/* Dropdown filter */}
        <div className="container mx-auto">
          <div className="flex justify-between mb-16">
            <h2
              className={`
            text-2xl
            font-extrabold
            my-3
            ${theme === "dark" ? "text-komla" : "text-nil"}
            `}
            >
              See Visa by type
            </h2>
            <select onChange={handleFilterVisa} className="select select-bordered">
              {filterData.map((data, indx) => (
                <option key={indx} value={data.value}>
                  {data.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Visa card */}
        <Fade>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredVisas.map((visa) => {
              const { image, name, visaType, fee, _id } = visa;
              return (
                <div key={_id} className="card bg-base-100 shadow-xl">
                  <figure>
                    <img src={image} alt="Visa" />
                  </figure>
                  <div className="p-6">
                    {/* Visa Details */}
                    <div className="flex gap-2 justify-start">
                      <p className={`font-bold ${theme === "dark" ? "text-[#fff]" : "text-nil"}`}>
                        Country name:
                      </p>
                      <p className="text-left">{name}</p>
                    </div>
                    <div className="flex gap-2 justify-start my-3">
                      <p className={`font-bold ${theme === "dark" ? "text-[#fff]" : "text-nil"}`}>
                        Visa type:
                      </p>
                      <p className="text-left">{visaType}</p>
                    </div>
                    <div className="flex gap-2 justify-start">
                      <p className={`font-bold ${theme === "dark" ? "text-[#fff]" : "text-nil"}`}>
                        Fee:
                      </p>
                      <p className="text-left">{fee}</p>
                    </div>

                    {/* Details Button */}
                    <div className="card-actions justify-start mt-5">
                      <Link to={`/visadetails/${_id}`}>
                        <button
                          className={`btn bg-komla ${
                            theme === "dark"
                              ? "text-[#fff] hover:bg-transparent hover:border-2 hover:border-[#fff]"
                              : "text-[#fff] hover:text-nil hover:bg-transparent hover:border-2 hover:border-nil"
                          }`}
                        >
                          Details
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Fade>
      </div>
    </>
  );
}

export default AllVisas;
