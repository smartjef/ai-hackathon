import React from 'react'
import { makeStyles, Tab, TabList, tokens, Subtitle2 } from '@fluentui/react-components'
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
  SparkleFilled 
} from '@fluentui/react-icons'
import { useNavigate, useLocation } from 'react-router-dom'

const useStyles = makeStyles({
  container: {
    width: '240px',
    height: '100vh',
    position: 'fixed',
    left: 0,
    top: 0,
    backgroundColor: tokens.colorNeutralBackground1,
    borderRight: `1px solid ${tokens.colorNeutralStroke1}`,
    display: 'flex',
    flexDirection: 'column',
    padding: '20px 0',
  },
  header: {
    padding: '0 20px 20px',
    ...Subtitle2,
    color: tokens.colorBrandForeground1,
  },
  tabList: {
    flexDirection: 'column',
  },
})

export const Sidebar: React.FC = () => {
  const styles = useStyles()
  const navigate = useNavigate()
  const location = useLocation()

  const onTabSelect = (_ev: any, data: any) => {
    navigate(data.value)
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>BizPulse AI</div>
      <TabList vertical className={styles.tabList} selectedValue={location.pathname} onTabSelect={onTabSelect}>
        <Tab value="/" icon={location.pathname === '/' ? <HomeFilled /> : <HomeRegular />}>Dashboard</Tab>
        <Tab value="/customers" icon={location.pathname === '/customers' ? <PeopleFilled /> : <PeopleRegular />}>Customers</Tab>
        <Tab value="/products" icon={location.pathname === '/products' ? <BoxFilled /> : <BoxRegular />}>Products</Tab>
        <Tab value="/sales" icon={location.pathname === '/sales' ? <MoneyFilled /> : <MoneyRegular />}>Sales</Tab>
        <Tab value="/analytics" icon={location.pathname === '/analytics' ? <ChartMultipleFilled /> : <ChartMultipleRegular />}>Analytics</Tab>
        <Tab value="/ai-insights" icon={location.pathname === '/ai-insights' ? <SparkleFilled /> : <SparkleRegular />}>AI Insights</Tab>
      </TabList>
    </div>
  )
}
