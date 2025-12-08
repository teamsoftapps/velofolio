// // components/FourStepsSection.tsx
// import Image from 'next/image';

// export default function FourStepsSection() {
//   const steps = [
//     {
//       title: "Manage Jobs",
//       description: "Add clients, leads, and jobs in seconds.",
//     },
//     {
//       title: "Billing & Quotes",
//       description: "Professional packages and automatic invoices.",
//     },
//     {
//       title: "Manage Workflow",
//       description: "Track progress from lead to completed job.",
//     },
//     {
//       title: "Collaborate Easily",
//       description: "Assign tasks, track performance, and stay in sync.",
//     },
//   ];

//   return (
//     <section className=" py-16 lg:py-16 overflow-hidden">
//       <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
//         <div className="bg-white rounded-3xl p-10 lg:p-8 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

//           {/* Left: Text Content */}
//           <div className="flex-1 text-center lg:text-left ml-7">
//             <h2 className="text-lg sm:text-4xl lg:text-5xl font-medium text-gray-900 leading-snug mb-12">
//               Run Your Studio in<br className='hidden sm:block'/>
//               <span >4 Simple Steps</span>
//             </h2>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10">
//               {steps.map((step, index) => (
//                 <div key={index} className="text-left">
//                   <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3">
//                     {step.title}
//                   </h3>
//                   <p className="text-gray-600 leading-relaxed">
//                     {step.description}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Right: Image */}
//           <div className="flex-shrink-0 w-full lg:w-3/7 h-full">
//             <div className="relative">
//               <div className="bg-white h-full rounded-3xl overflow-hidden border border-gray-100">
//                 <Image
//                   src="/images/meeting.png" // Replace with your actual image path
//                   alt="Team collaborating in studio"
//                   width={400}
//                   height={900}
//                   className="w-full h-[500px] object-cover"
//                   priority
//                 />
//               </div>
//               {/* Optional subtle overlay decoration */}
//               <div className="absolute -inset-4 bg-cyan-400/10 rounded-3xl -z-10 blur-3xl"></div>
//             </div>
//           </div>

//         </div>
//       </div>
//     </section>
//   );
// }
// components/FourStepsSection.tsx
import Image from 'next/image';

export default function FourStepsSection() {
  const steps = [
    { title: "Manage Jobs", description: "Add clients, leads, and jobs in seconds." },
    { title: "Billing & Quotes", description: "Professional packages and automatic invoices." },
    { title: "Manage Workflow", description: "Track progress from lead to completed job." },
    { title: "Collaborate Easily", description: "Assign tasks, track performance, and stay in sync." },
  ];

  return (
    <section className="w-full py-16 lg:py-20 bg-[#E5F7FD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">

        <div className="bg-white rounded-3xl p-8 sm:p-10 lg:p-12 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* LEFT TEXT */}
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 leading-tight mb-10">
              Run Your Studio in <br className="hidden sm:block" />
              <span>4 Simple Steps</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-10">
              {steps.map((step, index) => (
                <div key={index} className="text-left">
                  <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="bg-white rounded-3xl overflow-hidden border border-gray-200">
                <Image
                  src="/images/meeting.png"
                  alt="Team collaborating in studio"
                  width={500}
                  height={600}
                  className="w-full h-[450px] sm:h-[500px] object-cover"
                  priority
                />
              </div>

              {/* DECORATIVE GLOW */}
              <div className="absolute -inset-4 bg-cyan-400/10 rounded-3xl -z-10 blur-3xl"></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
