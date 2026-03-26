import React, { ReactNode } from 'react'
import { makeStyles, tokens } from '@fluentui/react-components'
import { Sidebar } from './Sidebar'
import { BottomNav } from './BottomNav'
import { useAuth } from '../../context/AuthContext'
import { Navigate, useLocation } from 'react-router-dom'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    minHeight: '100vh',
  },
  main: {
    flexGrow: 1,
    padding: '20px',
    backgroundColor: tokens.colorNeutralBackground2,
    paddingBottom: '80px', // For mobile bottom nav
    '@media (min-width: 768px)': {
      marginLeft: '240px',
      paddingBottom: '20px',
    },
  },
  navWrapper: {
    display: 'block',
    '@media (min-width: 768px)': {
      display: 'none',
    },
  },
  sidebarWrapper: {
    display: 'none',
    '@media (min-width: 768px)': {
      display: 'block',
    },
  },
})

interface LayoutProps {
  children: ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const styles = useStyles()
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  // Define public paths that don't need authentication or layout
  const publicPaths = ['/login', '/register']
  const isPublicPath = publicPaths.includes(location.pathname)

  if (!isAuthenticated && !isPublicPath) {
    return <Navigate to="/login" replace />
  }

  if (isPublicPath) {
    return <>{children}</>
  }

  return (
    <div className={styles.root}>
      <div className={styles.sidebarWrapper}>
        <Sidebar />
      </div>
      <main className={styles.main}>
        {children}
      </main>
      <div className={styles.navWrapper}>
        <BottomNav />
      </div>
    </div>
  )
}
