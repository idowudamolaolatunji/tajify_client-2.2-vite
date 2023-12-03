import React from 'react'
import moment from 'moment/moment';
import Currency from "react-currency-formatter";

const TransactionHistoryCard = ({data}) => {
  return (
    <>
    <div className='flex justify-between items-center w-full p-4 border-[1px] mb-3'>
        <div>
            {/* <h2 className='text-primary font-semibold'>{data.transaction_type}</h2> */}
            <h2 className='text-primary font-semibold'>Payment</h2>
            {/* <p className='text-gray-600'>{ moment(data.created_at).format('YYYY-MM-DD HH:mm:ss')}</p> */}
            <p className='text-gray-600'>22-12-11</p>
        </div>

        <div>
  
      <h2 className='text-primary'><Currency quantity={100} currency="NGN" /></h2>
      <h2 className='text-primary'><Currency quantity={50} currency="NGN" /></h2>
  
</div>


        {/* <div>
            {
                user.role == 'mediahouse' ? (
                    data.sender_id == user.id ? <h2 className='text-red-600'>-<Currency quantity={data.mh_amount || data.amount} currency="NGN" /></h2> : data.reciever_id == user.id ? <h2 className='text-green-600'>+<Currency quantity={data.mh_amount || data.amount} currency="NGN" /></h2> : <h2 className='text-primary'><Currency quantity={data.mh_amount || data.amount} currency="NGN" /></h2>
                ):
                (
                    data.sender_id == user.id ? <h2 className='text-red-600'>-<Currency quantity={data.amount} currency="NGN" /></h2> : data.reciever_id == user.id ? <h2 className='text-green-600'>+<Currency quantity={data.amount} currency="NGN" /></h2> : <h2 className='text-primary'><Currency quantity={data.amount} currency="NGN" /></h2>
                )
                
            }
        </div> */}
    </div>
    </>
  )
}

export default TransactionHistoryCard