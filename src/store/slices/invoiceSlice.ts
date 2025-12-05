import { createSlice } from "@reduxjs/toolkit";
const invoiceandQuoteSlice=createSlice({
    name:"invoiceandQuote",
    initialState:{
        invoices:[],
        quotes:[],
    },
    reducers:{
        setInvoices:(state,action)=>{
            state.invoices=action.payload;
        },
        setQuotes:(state,action)=>{
            state.quotes=action.payload;
        },
        clearInvoices:(state)=>{
            state.invoices=[]
        },
        clearQuotes:(state)=>{
            state.quotes=[]
        }

    }
})

export const {setInvoices,setQuotes,clearInvoices,clearQuotes}=invoiceandQuoteSlice.actions
export default invoiceandQuoteSlice.reducer