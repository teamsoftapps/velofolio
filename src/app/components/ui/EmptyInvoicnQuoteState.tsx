import React from 'react'
import AddButton from './AddButton'
import { useRouter } from 'next/navigation'

const EmptyInvoicnQuoteState = ({setOpenForm, id,type="Invoice",desibled=false}:any) => {
    const router = useRouter()

  return (
          <div className="flex flex-col items-center justify-start pt-8 sm:pt-12 gap-6">
        <img
          src="/images/no-task.png"
          alt="No tasks"
          className="w-24 h-24 object-contain"
        />
        <p className="text-center text-sm sm:text-base md:text-lg lg:text-xl text-black px-4 sm:px-8">
          No {type} yet! Create your first {type} to keep your workflow on track.
        </p>

   {!desibled &&    <div
          className="w-40"
          onClick={() => router.push(`/add${type}?id=${id}`)}
        >
          <AddButton setOpenForm={setOpenForm} title={`Add ${type}`}/>
        </div>}
      </div>
  )
}

export default EmptyInvoicnQuoteState
