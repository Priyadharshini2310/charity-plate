// import React from "react";
// import { HowItWorks } from "./HowItWorks";
// import CharityPlateNavbar, { FloatingDockDemo } from "./FloatingDockDemo";
// import logo from "../images/charity-plate-logo.svg"; // Adjust the path as necessary
// import FeedbackForm from "./FeedbackForm";
// import ImpactStatistics from "./OurImpact";
// import TestimonialsSection from "./Testimonials";
// import Footer from "./Footer";
// const LandingPage = () => {
//   return (
//     <div className="min-h-screen font-sans bg-gray-50">
//       {/* Header */}

//       <header className="absolute inset-x-0 top-0 z-50">
//         <nav // Centered the dock entirely in the nav bar
//           className="flex items-center justify-center h-20 p-6 lg:px-8"
//           aria-label="Global"
//         >
//           {/* Floating Dock Navigation: Centered and Aligned */}
//           <div className="flex items-center justify-center flex-1 h-full">
//             {/* <FloatingDockDemo /> */}
//             <CharityPlateNavbar />
//           </div>
//         </nav>
//       </header>

//       <main>
//         {/* Hero Section */}
//         <div className="relative px-6 isolate pt-14 lg:px-8">
//           <div className="max-w-2xl py-32 mx-auto sm:py-48 lg:py-56">
//             <div className="text-center">
//               <h1 className="text-6xl font-bold text-gray-900 sm:text-7xl">
//                 Seamless Giving, Maximum Impact
//               </h1>
//               <p className="mt-6 text-xl leading-8 tracking-tight text-gray-600">
//                 CharityPlate connects donors with verified charities, making it
//                 easy to support causes you care about and see the real-world
//                 impact of your generosity.
//               </p>
//               <div className="flex items-center justify-center mt-10 gap-x-6">
//                 <button className="px-8 py-4 font-semibold text-white transition-all duration-300 transform shadow-lg bg-gradient-to-r from-sky-600 to-sky-600 rounded-xl hover:shadow-xl hover:from-sky-600 hover:to-sky-700 hover:-translate-y-1">
//                   Start Donating Now
//                 </button>
//                 <button className="px-8 py-4 font-semibold text-gray-700 transition-all duration-300 bg-white border-2 border-gray-200 rounded-xl hover:border-sky-300 hover:text-sky-700 hover:bg-sky-50/50">
//                   Learn More About Us
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* How It Works Section */}
//         <HowItWorks />

//         <ImpactStatistics />

//         {/* Testimonials Section */}
//         <TestimonialsSection />
//         <FeedbackForm />
//         {/* Call to Action */}
//         <div className="bg-white">
//           <div className="px-6 py-24 mx-auto max-w-7xl sm:py-32 lg:px-8">
//             <h2 className="text-3xl font-bold tracking-tight text-center text-gray-900 sm:text-4xl">
//               Ready to make a difference?
//             </h2>
//             <div className="flex items-center justify-center mt-8 gap-x-6">
//               <a
//                 href="#"
//                 className="rounded-md bg-sky-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
//               >
//                 Sign Up Now
//               </a>
//               <a
//                 href="#"
//                 className="text-sm font-semibold leading-6 text-gray-900"
//               >
//                 Contact Us <span aria-hidden="true">→</span>
//               </a>
//             </div>
//           </div>
//         </div>
//       </main>

//       {/* Footer */}
//       <Footer />
//     </div>
//   );
// };

// export default LandingPage; 
import React from "react";
import { HowItWorks } from "./HowItWorks";
import CharityPlateNavbar, {  } from "../FloatingDockDemo";
import logo from "../images/charity-plate-logo.svg"; // Adjust the path as necessary
import FeedBack from "./FeedBack";
import ImpactStatistics from "./OurImpact";
import TestimonialsSection from "./Testimonials";
import Footer from "./Footer";
import ParticlesComponent from "ui/particle";

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen font-sans bg-gray-50">
      {/* Header */}

      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          className="flex items-center justify-center h-20 p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex items-center justify-center flex-1 h-full">
            <CharityPlateNavbar />
          </div>
        </nav>
      </header>

      <main>
         
        {/* Hero Section */}
        <div className="relative px-6 isolate pt-14 lg:px-8">
           <div className="fixed inset-0 -z-10">
                <ParticlesComponent id="particles-js" />
                <div className="absolute inset-0 backdrop-blur-sm" />
              </div>
          <div className="max-w-2xl py-32 mx-auto sm:py-48 lg:py-56">
            <div className="text-center">
              <h1 className="text-6xl font-bold text-gray-900 sm:text-7xl">
                Seamless Giving, Maximum Impact
              </h1>
              <p className="mt-6 text-xl leading-8 tracking-tight text-gray-600">
                CharityPlate connects donors with verified charities, making it
                easy to support causes you care about and see the real-world
                impact of your generosity.
              </p>
              <div className="flex items-center justify-center mt-10 gap-x-6">
                <button className="px-8 py-4 font-semibold text-white transition-all duration-300 transform shadow-lg bg-gradient-to-r from-sky-600 to-sky-600 rounded-xl hover:shadow-xl hover:from-sky-600 hover:to-sky-700 hover:-translate-y-1">
                  Start Donating Now
                </button>
                <button className="px-8 py-4 font-semibold text-gray-700 transition-all duration-300 bg-white border-2 border-gray-200 rounded-xl hover:border-sky-300 hover:text-sky-700 hover:bg-sky-50/50">
                  Learn More About Us
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <HowItWorks />

        <ImpactStatistics />

        {/* Testimonials Section */}
        <TestimonialsSection />
        <FeedBack />

        {/* Call to Action */}
        <div className="bg-white">
          <div className="px-6 py-24 mx-auto max-w-7xl sm:py-32 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight text-center text-gray-900 sm:text-4xl">
              Ready to make a difference?
            </h2>
            <div className="flex items-center justify-center mt-8 gap-x-6">
              <a
                href="#"
                className="rounded-md bg-sky-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
              >
                Sign Up Now
              </a>
              <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                Contact Us <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
