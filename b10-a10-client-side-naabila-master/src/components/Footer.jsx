import { useContext } from "react";
import { AuthContext } from "../firebase/AuthProvider";
import Lottie from "lottie-react";
import compass from "../../src/assets/lotties/Compass.json";
import { Link } from "react-router-dom";


const Footer = () => {
  const { theme } = useContext(AuthContext); 

  return (
    <footer
      className={`py-10 mt-16 text-white ${
        theme === "light" ? "bg-[#cbd5e1]" : "bg-gray-900"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Logo and About */}
          <div>
          <Link>
    <div className="flex items-center">
  <Lottie className="h-[70px]" animationData={compass} loop={true} />
  <span className={`text-3xl ${theme==="dark"?'text-white':'text-nil'} font-bold  -ml-2`}>Visa Navigator</span>
</div>
    </Link>
            <p>
            Visa Navigator simplifies the visa application process with expert guidance, personalized assistance, and up-to-date information, ensuring a smooth journey for travel, study, work, or permanent residence applications
            </p>
          </div>

          {/* Column 2: Contact Details */}
          <div>
            <h3
              className={`text-xl font-bold mb-4 ${
                theme === "dark" ? "text-komla" : ""
              }`}
            >
              Contact Details
            </h3>
            <p>121 King Street, Melbourne, Victoria 3000 Australia</p>
            <p>Phone: +12 9 8765 4321</p>
            <p>Email: hello@.com</p>
            <p>Mon-Fri: 9:00AM – 6:30PM</p>
            <p>Saturday: 8:30AM – 3:30PM</p>
            <p>Sunday: Closed</p>
          </div>

          {/* Column 3: Useful Links */}
          <div>
            <h3
              className={`text-xl font-bold mb-4 ${
                theme === "dark" ? "text-komla" : ""
              }`}
            >
              Useful Links
            </h3>
            <ul className="space-y-2">
              <li>About Visa Navigator</li>
              <li>Visa Information</li>
              <li>Immigration FAQ</li>
              <li>Immigration Assistance</li>
              <li>Testimonials</li>
              <li>Contact Us</li>
              <li>Terms and Conditions</li>
            </ul>
          </div>

          {/* Column 4: Visas */}
          <div>
            <h3
              className={`text-xl font-bold mb-4 ${
                theme === "dark" ? "text-komla" : ""
              }`}
            >
              Visas
            </h3>
            <ul className="space-y-2">
              <li>Visitor Visas</li>
              <li>Permanent Residence Visas</li>
              <li>Business Visas</li>
              <li>Working Holiday Visas</li>
              <li>Studying & Training Visas</li>
              <li>Skilled Work Visas</li>
              <li>Family & Partner Visas</li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t mt-8 pt-4 text-center">
          <p>
            &copy; Copyright <span className="font-bold">Visa Navigator 2024</span>. All
            Rights Reserved
          </p>
          <div className="flex justify-center space-x-4 mt-4">
            <a href="#" className="text-white hover:text-komla">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="text-white hover:text-komla">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-white hover:text-komla">
              <i className="fab fa-google-plus-g"></i>
            </a>
            <a href="#" className="text-white hover:text-komla">
              <i className="fab fa-tumblr"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
