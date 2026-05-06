'use client';

import { useCreateOrganizationMutation } from '@/store/apis/Common';
import { setCredientials } from '@/store/slices/authSlice';
import { Dispatch, SetStateAction, useState } from 'react';
import { BiPlus } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

interface CreateWorkspaceModalProps {
  setWorkspaceOpen: Dispatch<SetStateAction<boolean>>;
}


export default function CreateWorkspaceModal({ setWorkspaceOpen }: CreateWorkspaceModalProps) {
  const [companyName, setCompanyName] = useState('');
  const [createOrganization]=useCreateOrganizationMutation()
const dispatch=useDispatch()
const auth=useSelector((state:any)=>state.persisted.auth)
  const handleCreate = async() => {
    if (!companyName.trim()) return;
    console.log('Creating workspace:', companyName);
    const user=auth.user
  const res= await createOrganization({name:companyName}).unwrap()
  toast.success('Workspace created successfully!')
  console.log(res)
dispatch(
  setCredientials({
    user: {
      ...user,
      organization: res.map((org: any) => org._id),
    },
    token: auth.token, // KEEP THE TOKEN
    role: user.role,
  })
);

    // TODO: Call API to create workspace
    setCompanyName('');
    setWorkspaceOpen(false);
  };

  return (
    <div className="absolute top-60  sm:right-[340px] bg-white rounded-2xl shadow-2xl w-72 p-4 z-50" onClick={(e)=>e.stopPropagation()}>
      <h2 className="text-lg  mb-2 text-gray-800">Create Workspace</h2>
      <input
        type="text"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
        placeholder="Company Name"
        className="w-full text-gray-700 border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
      />
      <button
        onClick={handleCreate}
        className="w-full bg-[var(--primary-color)] text-white py-2 rounded-full font-medium hover:bg-[#019cc7] transition cursor-pointer"
      >
        Create
      </button>
      <button
        onClick={() => setWorkspaceOpen(false)}
        className="w-full mt-2 text-gray-700 py-2 rounded-full border border-gray-300 hover:bg-gray-50 transition cursor-pointer"
      >
        Cancel
      </button>
    </div>
  );
}
