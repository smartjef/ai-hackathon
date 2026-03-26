import React from 'react' // Force re-save to clear IDE errors
import { makeStyles, Tab, TabList, tokens } from '@fluentui/react-components'
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
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: tokens.colorNeutralBackground1,
    borderTop: `1px solid ${tokens.colorNeutralStroke1}`,
    zIndex: 100,
  },
  tabList: {
    display: 'flex',
    justifyContent: 'space-around',
    padding: '4px 0',
  },
})

export const BottomNav: React.FC = () => {
  const styles = useStyles()
  const navigate = useNavigate()
  const location = useLocation()

  const onTabSelect = (_ev: any, data: any) => {
    navigate(data.value)
  }

  return (
    <div className={styles.container}>
      <TabList className={styles.tabList} selectedValue={location.pathname} onTabSelect={onTabSelect}>
        <Tab value="/" icon={location.pathname === '/' ? <HomeFilled /> : <HomeRegular />} />
        <Tab value="/customers" icon={location.pathname === '/customers' ? <PeopleFilled /> : <PeopleRegular />} />
        <Tab value="/products" icon={location.pathname === '/products' ? <BoxFilled /> : <BoxRegular />} />
        <Tab value="/sales" icon={location.pathname === '/sales' ? <MoneyFilled /> : <MoneyRegular />} />
        <Tab value="/analytics" icon={location.pathname === '/analytics' ? <ChartMultipleFilled /> : <ChartMultipleRegular />} />
        <Tab value="/ai-insights" icon={location.pathname === '/ai-insights' ? <SparkleFilled /> : <SparkleRegular />} />
      </TabList>
    </div>
  )
}
