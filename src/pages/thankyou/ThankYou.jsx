import React from 'react'
import { useParams } from 'react-router-dom'
import CardPage from '../../components/General/CardPage';
import SideBar from '../../components/General/SideBar'
import { FcApproval } from 'react-icons/fc';

const ThankYou = () => {
    const { ref } = useParams();
  return (
    <>
    <SideBar>
        <CardPage>
            <div className='h-[80vh] flex justify-center items-center'>
                <div className='flex flex-col justify-center items-center gap-2'>
                    <FcApproval size={100}/>
                    <h3 className='text-primary font-bold text-3xl text-center'>Operation Complete, The Media House will be notified</h3>
                <p className=' text-gray-600 text-center'>Your Transaction reference is  <span className='text-secondary'>{ref}</span></p>
                </div>
                
            </div>
        </CardPage>
    </SideBar>
    </>
  )
}

export default ThankYou