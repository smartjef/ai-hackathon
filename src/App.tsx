import { Routes, Route } from 'react-router-dom'
import { makeStyles, tokens } from '@fluentui/react-components'
import { Layout } from './components/Layout/Layout'

import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Dashboard } from './pages/Dashboard'
import { Customers } from './pages/Customers'
import { Products } from './pages/Products'
import { Sales } from './pages/Sales'
import { Analytics } from './pages/Analytics'
import { AIInsights } from './pages/AIInsights'

const useStyles = makeStyles({
  container: {
    fontFamily: tokens.fontFamilyBase,
  },
})

function App() {
  const styles = useStyles()

  return (
    <div className={styles.container}>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/products" element={<Products />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/ai-insights" element={<AIInsights />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Layout>
    </div>
  )
}

export default App
