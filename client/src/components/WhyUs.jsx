import icon1 from "../assets/icon1.png";
import icon2 from "../assets/icon2.png";
import icon3 from "../assets/icon3.png";
import icon4 from "../assets/icon4.png";

const WhyUs = () => {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
        Why Choose Our Platform?
        </h2>
        <p className="text-gray-600 text-center mb-8 max-w-2xl">
        Experience a smarter, more efficient way to monitor and manage road construction projects. Our AI-powered platform brings precision, automation, and actionable insights to your fingertips
        </p>
  
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {/* Box 1 */}
          <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
            <img
              src={icon1}
              alt="Feature 1"
              className="w-16 h-16 mb-4"
            />
            <h3 className="font-semibold text-gray-800 mb-2">Real-Time Insights</h3>
            <p className="text-sm text-gray-600 text-center">
            Stay updated as our AI algorithms analyze every stage of construction, providing instant updates on progress and potential delays.
            </p>
          </div>
  
          {/* Box 2 */}
          <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
            <img
              src={icon2}
              alt="Feature 2"
              className="w-16 h-16 mb-4"
            />
            <h3 className="font-semibold text-gray-800 mb-2">Detailed Reports</h3>
            <p className="text-sm text-gray-600 text-center">
            Generate reports, including progress metrics, activity breakdowns, and completion timelines according to your project requirements.
            </p>
          </div>
  
          {/* Box 3 */}
          <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
            <img
              src={icon3}
              alt="Feature 3"
              className="w-16 h-16 mb-4"
            />
            <h3 className="font-semibold text-gray-800 mb-2">Simple Interface</h3>
            <p className="text-sm text-gray-600 text-center">
            Navigate effortlessly with our intuitive design. Visualize data through interactive charts, maps, and annotations, ensuring a smooth user experience.            </p>
          </div>
  
          {/* Box 4 */}
          <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
            <img
              src={icon4}
              alt="Feature 4"
              className="w-16 h-16 mb-4"
            />
            <h3 className="font-semibold text-gray-800 mb-2">Eco-Friendly</h3>
            <p className="text-sm text-gray-600 text-center">
            Our platform minimizes fuel usage and emissions by replacing frequent on-site inspections with drone data. It eliminates the need for paper-based reporting.            </p>
          </div>
        </div>
      </div>
    );
  };
  
  export default WhyUs;
  