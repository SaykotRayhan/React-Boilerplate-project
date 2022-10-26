import { useEffect } from 'react'
import axiosInstance from '../../services/utils/axiosInstance'
import './Dashboard.scss'

const Dashboard = () => {
  useEffect(() => {
    axiosInstance.get('http://localhost:8000/users/').then(res => {
      console.log(res)
    })
  }, [])

  return (
    <div className='px-6 pb-6 dashboard-wrapper'>
      {/* btn-container */}
      <section className='mt-4 flex gap-3 btn-container'>
        <button className='bg-orange-500 border rounded px-2 py-1 text-white'>
          Button 1
        </button>
        <button className='bg-blue-400 border rounded px-2 py-1 text-white'>
          Button 2
        </button>
      </section>

      {/* Map container */}
      <section className='mt-4 flex gap-2 map-wrapper'>
        <div className='bg-orange-200 map-container'>map</div>
        <div className='bg-blue-400 card-container'>card</div>
      </section>
    </div>
  )
}

export default Dashboard
