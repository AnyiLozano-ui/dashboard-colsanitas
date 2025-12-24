import { Routes, Route } from 'react-router-dom'
import Login from './Pages/Login'
import Dashboard from './Pages/Dashboard'
import Tablausers from './Pages/Components/Tables/TablaUsers'
import Ranckin from './Pages/Components/Tables/Ranckin'
import { useEffect } from 'react'
import Companys from './Pages/Components/Tables/Companys'

function App() {
  useEffect(() => {
      if (!window.location.href.includes('login') && !localStorage.getItem('token')) {
        window.location.href = '/login'
      }
  }, [])

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/tabla-users" element={<Tablausers />} />
      <Route path="/ranckin" element={<Ranckin />} />
      <Route path="/companys" element={<Companys />} />
    </Routes>
  )
}

export default App