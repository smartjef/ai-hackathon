import React from 'react'
import { 
  makeStyles, 
  shorthands, 
  Title2, 
  Body1, 
  Button, 
  Subtitle1,
  Card
} from '@fluentui/react-components'
import { 
  AddRegular, 
  PersonAddRegular, 
  StorageRegular,
  MoneyRegular,
  PeopleRegular,
  BoxRegular,
  TagRegular
} from '@fluentui/react-icons'
import { useAuth } from '../context/AuthContext'
import { KPICard } from '../components/KPICard'
import { AIInsightCard } from '../components/AIInsightCard'

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('20px'),
  },
  kpiRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    ...shorthands.gap('15px'),
  },
  quickActions: {
    display: 'flex',
    flexWrap: 'wrap',
    ...shorthands.gap('10px'),
    ...shorthands.margin('10px', '0'),
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('10px'),
  }
})

export const Dashboard: React.FC = () => {
  const styles = useStyles()
  const { user } = useAuth()

  return (
    <div className={styles.container}>
      <div>
        <Title2>Good morning, {user?.businessName || 'Business Owner'} 👋</Title2>
        <Body1>Here's what's happening with your business today.</Body1>
      </div>

      <div className={styles.quickActions}>
        <Button icon={<AddRegular />} appearance="primary">Add Sale</Button>
        <Button icon={<PersonAddRegular />}>Add Customer</Button>
        <Button icon={<StorageRegular />}>Add Product</Button>
      </div>

      <div className={styles.kpiRow}>
        <KPICard 
          title="Total Revenue" 
          value="$12,450" 
          icon={<MoneyRegular />} 
          trend="12% from last month" 
          trendDirection="up" 
        />
        <KPICard 
          title="Total Customers" 
          value="156" 
          icon={<PeopleRegular />} 
          trend="5 new this week" 
          trendDirection="up" 
        />
        <KPICard 
          title="Products in Stock" 
          value="42" 
          icon={<BoxRegular />} 
        />
        <KPICard 
          title="Top Selling Product" 
          value="Organic Coffee" 
          icon={<TagRegular />} 
        />
      </div>

      <AIInsightCard 
        insight="💡 AI Insight: Your Tuesday sales are 40% higher than other weekdays. Consider running a 'Tuesday Treat' promotion to further boost these sales!" 
      />

      <div className={styles.section}>
        <Subtitle1>Recent Activity</Subtitle1>
        <Card>
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <Body1>No recent activity to show. Start by adding a sale!</Body1>
          </div>
        </Card>
      </div>
    </div>
  )
}

