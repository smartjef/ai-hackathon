import React from 'react'
import { makeStyles, Tab, TabList, shorthands } from '@fluentui/react-components'
import { 
  HomeRegular, 
  HomeFilled, 
  PeopleRegular, 
  PeopleFilled, 
  BoxRegular, 
  BoxFilled, 
  MoneyRegular, 
  MoneyFilled, 
  ChartMultipleRegular, 
  ChartMultipleFilled, 
  SparkleRegular, 
  SparkleFilled,
  WeatherMoonRegular,
  WeatherSunnyRegular
} from '@fluentui/react-icons'
import { useTheme } from '../../context/ThemeContext'
import { Button } from '@fluentui/react-components'
import { useNavigate, useLocation } from 'react-router-dom'

const useStyles = makeStyles({
  container: {
    width: '260px',
    height: 'calc(100vh - 32px)',
    position: 'fixed',
    left: '16px',
    top: '16px',
    background: 'var(--glass-bg)',
    backdropFilter: 'var(--glass-blur)',
    border: '1px solid var(--glass-border)',
    borderRadius: 'var(--radius-lg)',
    display: 'flex',
    flexDirection: 'column',
    padding: '24px 0',
    zIndex: 1000,
    boxShadow: 'var(--shadow-lg)',
    transition: 'all 0.3s ease',
  },
  logo: {
    padding: '0 24px 32px',
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap('12px'),
  },
  logoText: {
    fontSize: '22px',
    fontWeight: '800',
    background: 'linear-gradient(135deg, var(--color-primary), #818cf8)',
    '-webkit-background-clip': 'text',
    '-webkit-text-fill-color': 'transparent',
    letterSpacing: '-0.5px',
  },
  tabList: {
    flexDirection: 'column',
    ...shorthands.padding('0', '12px'),
    ...shorthands.gap('4px'),
  },
  tab: {
    ...shorthands.borderRadius('12px'),
    ...shorthands.margin('2px', '0'),
    transition: 'all 0.2s ease',
    height: '48px',
    color: 'var(--color-text-muted)',
    ':hover': {
      backgroundColor: 'var(--color-primary-soft)',
      color: 'var(--color-primary)',
    },
    '&[aria-selected="true"]': {
      backgroundColor: 'var(--color-primary)',
      color: '#ffffff',
      boxShadow: '0 8px 16px -4px var(--color-primary-glow)',
      '& .fui-Tab__icon': {
        color: '#ffffff',
      }
    }
  },
  footer: {
    marginTop: 'auto',
    padding: '20px 24px',
    borderTop: '1px solid var(--color-border)',
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('16px'),
  },
  footerInfo: {
    fontSize: '12px',
    color: 'var(--color-text-muted)',
  },
  themeToggle: {
    width: '100%',
    height: '42px',
    ...shorthands.borderRadius('12px'),
    backgroundColor: 'var(--color-primary-soft)',
    color: 'var(--color-primary)',
    fontWeight: '700',
    transition: 'all 0.3s ease',
    ':hover': {
      backgroundColor: 'var(--color-primary)',
      color: '#ffffff',
    }
  }
})

export const Sidebar: React.FC = () => {
  const styles = useStyles()
  const navigate = useNavigate()
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()

  const onTabSelect = (_ev: any, data: any) => {
    navigate(data.value)
  }

  const menuItems = [
    { value: '/', label: 'Overview', icon: HomeRegular, filledIcon: HomeFilled },
    { value: '/customers', label: 'Customers', icon: PeopleRegular, filledIcon: PeopleFilled },
    { value: '/products', label: 'Inventory', icon: BoxRegular, filledIcon: BoxFilled },
    { value: '/sales', label: 'Transactions', icon: MoneyRegular, filledIcon: MoneyFilled },
    { value: '/analytics', label: 'Analytics', icon: ChartMultipleRegular, filledIcon: ChartMultipleFilled },
    { value: '/ai-insights', label: 'AI Strategy', icon: SparkleRegular, filledIcon: SparkleFilled },
  ]

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <div className={styles.logoText}>BizPulse AI</div>
      </div>
      <TabList vertical className={styles.tabList} selectedValue={location.pathname} onTabSelect={onTabSelect}>
        {menuItems.map((item) => (
          <Tab 
            key={item.value}
            className={styles.tab} 
            value={item.value} 
            icon={location.pathname === item.value ? <item.filledIcon /> : <item.icon />}
          >
            {item.label}
          </Tab>
        ))}
      </TabList>
      <div className={styles.footer}>
        <Button 
          className={styles.themeToggle}
          icon={theme === 'dark' ? <WeatherSunnyRegular /> : <WeatherMoonRegular />}
          onClick={toggleTheme}
        >
          {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </Button>
        <div className={styles.footerInfo}>
          v1.0.4 • Premium
        </div>
      </div>
    </div>
  )
}
