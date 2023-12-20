import { useState, useEffect} from 'react'
import Dashboard from './Dashboard'
import { useDataContext } from '../../context/DataContext'
import { useAuthContext } from '../../context/AuthContext'
import { usePageContext } from '../../context/PageContext'
import MyOrderSection from '../../components/special/MyOrderSection';

const MyOrders = () => {
    const { user } = useAuthContext();
    const { getRequest } = useDataContext();
    const { handleAllOrders, allOrders } = usePageContext();
    const [loading, setLoading] = useState(false);
    const [orders, setOrders] = useState(allOrders || null);


    useEffect(() => {
        if (allOrders) {
          return;
        }
        const getData = async (id) => {
          setLoading(true);
          const result = await getRequest(`client/get-all-orders/${id}`);
          if (result) {
            handleAllOrders(result);
            setOrders(result);
          }
          setLoading(false);
        }
        getData(user.id);
    }, []);
  return (
    <>
          {loading}
    <Dashboard>
        <h1 className='mb-4'>My Orders</h1>
        <div>
          {
            orders?.map((i) => (
              <MyOrderSection data={i}/>
            ))
          }
          
        </div>
    </Dashboard>
    </>
    
  )
}

export default MyOrders