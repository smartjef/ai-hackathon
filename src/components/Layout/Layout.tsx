import React from 'react'
import { makeStyles } from '@fluentui/react-components'
import { Sidebar } from './Sidebar'
import { BottomNav } from './BottomNav'
import { useAuth } from '../../context/AuthContext'
import { Navigate, useLocation } from 'react-router-dom'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: 'transparent',
  },
  main: {
    flexGrow: 1,
    padding: '24px',
    backgroundColor: 'transparent',
    paddingBottom: '80px', // For mobile bottom nav
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    '@media (min-width: 768px)': {
      marginLeft: '280px', // Adjusted for wider floating sidebar
      padding: '32px 40px',
      paddingBottom: '40px',
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
  children: React.ReactNode
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
    return <div className="animate-fade-in">{children}</div>
  }

  return (
    <div className={styles.root}>
      <div className={styles.sidebarWrapper}>
        <Sidebar />
      </div>
      <main className={mergeClasses(styles.main, 'animate-fade-in')}>
        {children}
      </main>
      <div className={styles.navWrapper}>
        <BottomNav />
      </div>
    </div>
  )
}

// Helper to use mergeClasses which wasn't imported
import { mergeClasses } from '@fluentui/react-components'
