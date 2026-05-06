// import React, { useState } from 'react';

// const countries = [
//     { value: '', label: 'Select your country' },
//     { value: 'US', label: 'United States' },
//     { value: 'CA', label: 'Canada' },
//     { value: 'GB', label: 'United Kingdom' },
//     { value: 'AU', label: 'Australia' },
//     { value: 'DE', label: 'Germany' },
//     { value: 'JP', label: 'Japan' },
//   ];

//   // Sample timezone list (common ones)
//   const timezones = [
//     { value: '', label: 'Select your timezone' },
//     { value: 'America/Los_Angeles', label: 'GMT-08:00 Pacific Time (Los Angeles)' },
//     { value: 'America/New_York', label: 'GMT-05:00 Eastern Time (New York)' },
//     { value: 'America/Chicago', label: 'GMT-06:00 Central Time (Chicago)' },
//     { value: 'Europe/London', label: 'GMT+00:00 London' },
//     { value: 'Europe/Paris', label: 'GMT+01:00 Paris' },
//     { value: 'Asia/Tokyo', label: 'GMT+09:00 Tokyo' },
//     { value: 'Australia/Sydney', label: 'GMT+11:00 Sydney' },
//   ];
// const SettingForm = () => {
//   // const [formData, setFormData]=useState({
//   //   companyName: '',
//   //   website: '',
//   //   address: '',
//   //   phone: '',
//   //   email: '',
//   //   city: '',
//   //   state: '',
//   //   zip: '',
//   //   country: '',
//   //   timezone: '',
//   //   logo:"",

//   // })
//     const [companyName, setCompanyName] = useState('Velofolio');
//     const [website, setWebsite] = useState('https://velofolio.com');
//     const [address, setAddress] = useState('');
//     const [phone, setPhone] = useState('');
//     const [email, setEmail] = useState('');
//     const [city, setCity] = useState('');
//     const [state, setState] = useState('');
//     const [zip, setZip] = useState('');
//     const [country, setCountry] = useState('');
//     const [timezone, setTimezone] = useState('');


//   return (
//     <div className="w-full mt-12 pb-5 px-2">
//       {/* Form Container */}
//         {/* Your Existing Content Below */}
//       <div className="mt-12">
//         <h1 className="text-lg text-black">Company / Studio Name</h1>
//         {/* Add your original content here */}
//       </div>
//       <div className="space-y-6">
//         {/* Row 1: Company Name & Website */}
//         <div className="flex flex-col md:flex-row gap-6">
//           <div className="flex-1">
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Company / Studio Name
//             </label>
//             <input
//               type="text"
//               placeholder="Enter your company or studio name"
//               value={companyName}
//               onChange={(e) => setCompanyName(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
              
//             />
//           </div>
//           <div className="flex-1">
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Website
//             </label>
//             <input
//               type="url"
//               placeholder="Enter your company or studio website"
//               value={website}
//               onChange={(e) => setWebsite(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
            
//             />
//           </div>
//         </div>

//         {/* Row 2: Email & Phone */}
//         <div className="flex flex-col md:flex-row gap-6">
//           <div className="flex-1">
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Company Email
//             </label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Enter your business email address"
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
//             />
//           </div>
//           <div className="flex-1">
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Phone Number
//             </label>
//             <input
//               type="tel"
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//               placeholder="Enter your company phone number"
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
//             />
//           </div>
//         </div>

//         {/* Row 3: Street & City */}
//         <div className="flex flex-col md:flex-row gap-6">
//           <div className="flex-1">
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Street Address
//             </label>
//             <input
//               type="text"
//               value={address}
//               onChange={(e) => setAddress(e.target.value)}
//               placeholder="Enter your street address"
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
//             />
//           </div>
//           <div className="flex-1">
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               City / Suburb
//             </label>
//             <input
//               type="text"
//               value={city}
//               onChange={(e) => setCity(e.target.value)}
//               placeholder="Enter your city or suburb"
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
//             />
//           </div>
//         </div>

//         {/* Row 4: State & Postcode */}
//         <div className="flex flex-col md:flex-row gap-6">
//           <div className="flex-1">
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               State / County
//             </label>
//             <input
//               type="text"
//               value={state}
//               onChange={(e) => setState(e.target.value)}
//               placeholder="Enter your state or county"
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
//             />
//           </div>
//           <div className="flex-1">
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Postcode / Zip
//             </label>
//             <input
//               type="text"
//               value={zip}
//               onChange={(e) => setZip(e.target.value)}
//               placeholder="Enter your postcode or zip code"
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
//             />
//           </div>
//         </div>

//         {/* Row 5: Country & Timezone */}
//         <div className="flex flex-col md:flex-row gap-6">
//           <div className="flex-1">
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Country
//             </label>
//             <select 
//             value={country}
//             onChange={(e) => setCountry(e.target.value)}
//             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black">
//               <option >Select your country</option>
//               {/* Add country options here */}
//               {
//                 countries.map((item:any,i:number)=><option key={i}>{item.label}</option>)
//               }
//             </select>
//           </div>
//           <div className="flex-1">
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Timezone
//             </label>
//             <select value={timezone}
//             onChange={(e) => setTimezone(e.target.value)}  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black">
//               <option>Select your timezone (e.g., GMT -08:00 Pacific Time)</option>
//               {/* Add timezone options here */}
//               {
//                 timezones.map((item:any,i:number)=><option key={i}>{item.label}</option>)
//               }
//             </select>
//           </div>
//         </div>

//         {/* Save Button */}
//         <div className="flex justify-start">
//           <button className="px-6 py-2 bg-[var(--primary-color)] text-white font-medium rounded-full transition-colors">
//             Save Changes
//           </button>
//         </div>
//       </div>

    
//     </div>
//   );
// };

// export default SettingForm;
import React, { useState } from 'react';

const countries = [
  { value: '', label: 'Select your country' },
  { value: 'US', label: 'United States' },
  { value: 'CA', label: 'Canada' },
  { value: 'GB', label: 'United Kingdom' },
  { value: 'AU', label: 'Australia' },
  { value: 'DE', label: 'Germany' },
  { value: 'JP', label: 'Japan' },
];

const timezones = [
  { value: '', label: 'Select your timezone' },
  { value: 'America/Los_Angeles', label: 'GMT-08:00 Pacific Time (Los Angeles)' },
  { value: 'America/New_York', label: 'GMT-05:00 Eastern Time (New York)' },
  { value: 'America/Chicago', label: 'GMT-06:00 Central Time (Chicago)' },
  { value: 'Europe/London', label: 'GMT+00:00 London' },
  { value: 'Europe/Paris', label: 'GMT+01:00 Paris' },
  { value: 'Asia/Tokyo', label: 'GMT+09:00 Tokyo' },
  { value: 'Australia/Sydney', label: 'GMT+11:00 Sydney' },
];

const SettingForm = () => {
  const [companyName, setCompanyName] = useState('Velofolio');
  const [website, setWebsite] = useState('https://velofolio.com');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '');
    setPhone(val);
  };

  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [country, setCountry] = useState('');
  const [timezone, setTimezone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if(!companyName || !website || !email || !phone || !address || !city || !state || !zip || !country || !timezone) {
      alert('Please fill in all required fields.');
      return;
    }
    const formData = {
      companyName,
      website,
      email,
      phone,
      address,
      city,
      state,
      zip,
      country,
      timezone,
    };

    console.log('Form submitted:', formData);
    alert(`Form submitted successfully! submission id  ${Date.now()}`);
    setAddress('');
    setCity('');
    setState('');
    setZip('');
    setCountry('');
    setTimezone('');
    setPhone('');
    setEmail('');
  
   
    

  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[0-9]/g, '');
    setCompanyName(val);
  };

  return (
    <div className="w-full mt-12 pb-5 px-2">
      <form onSubmit={handleSubmit}>
        <div className="mt-12">
          <h1 className="text-lg text-black">Company / Studio Name</h1>
        </div>
        <div className="space-y-6">
          {/* Row 1: Company Name & Website */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company / Studio Name
              </label>
              <input
                type="text"
                placeholder="Enter your company or studio name"
                value={companyName}
                maxLength={40}
                onChange={handleNameChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent text-black"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Website
              </label>
              <input
                type="url"
                placeholder="Enter your company or studio website"
                value={website}
                maxLength={100}
                onChange={(e) => setWebsite(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent text-black"
              />
            </div>
          </div>

          {/* Row 2: Email & Phone */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company Email
              </label>
              <input
                type="email"
                value={email}
                maxLength={60}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your business email address"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent text-black"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                maxLength={15}
                onChange={handlePhoneChange}
                placeholder="Enter your company phone number"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent text-black"
              />
            </div>
          </div>

          {/* Row 3: Street & City */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Street Address
              </label>
              <input
                type="text"
                value={address}
                maxLength={100}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your street address"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent text-black"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City / Suburb
              </label>
              <input
                type="text"
                value={city}
                maxLength={40}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter your city or suburb"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent text-black"
              />
            </div>
          </div>

          {/* Row 4: State & Postcode */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                State / County
              </label>
              <input
                type="text"
                value={state}
                maxLength={40}
                onChange={(e) => setState(e.target.value)}
                placeholder="Enter your state or county"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent text-black"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Postcode / Zip
              </label>
              <input
                type="text"
                value={zip}
                maxLength={15}
                onChange={(e) => setZip(e.target.value)}
                placeholder="Enter your postcode or zip code"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent text-black"
              />
            </div>
          </div>

          {/* Row 5: Country & Timezone */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Country
              </label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent text-black"
              >
                {countries.map((item, i) => (
                  <option key={i} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Timezone
              </label>
              <select
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent text-black"
              >
                {timezones.map((item, i) => (
                  <option key={i} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-start">
            <button
              type="submit"
              className="px-6 py-2 bg-[var(--primary-color)] text-white font-medium rounded-full transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SettingForm;
