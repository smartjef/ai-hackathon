import React from 'react'
import { 
  makeStyles, 
  shorthands, 
  Title2, 
  Button, 
  Subtitle1,
  mergeClasses,
  Text
} from '@fluentui/react-components'
import { 
  AddRegular, 
  PersonAddRegular, 
  StorageRegular,
  MoneyRegular,
  PeopleRegular,
  BoxRegular,
  TagRegular,
  SparkleRegular
} from '@fluentui/react-icons'
import { useAuth } from '../context/AuthContext'
import { KPICard } from '../components/KPICard'
import { AIInsightCard } from '../components/AIInsightCard'

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('40px'),
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('8px'),
    animation: 'fadeIn 0.8s ease-out',
  },
  greeting: {
    fontSize: '40px',
    fontWeight: '900',
    color: 'var(--color-text-base)',
    background: 'linear-gradient(135deg, var(--color-primary) 0%, #818cf8 50%, #c084fc 100%)',
    '-webkit-background-clip': 'text',
    '-webkit-text-fill-color': 'transparent',
    letterSpacing: '-1.5px',
    ...shorthands.margin(0),
  },
  subGreeting: {
    color: 'var(--color-text-muted)',
    fontSize: '18px',
    fontWeight: '500',
    letterSpacing: '-0.2px',
  },
  kpiRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    ...shorthands.gap('24px'),
  },
  quickActions: {
    display: 'flex',
    flexWrap: 'wrap',
    ...shorthands.gap('16px'),
    padding: '8px 0',
  },
  actionButton: {
    height: '48px',
    ...shorthands.borderRadius('16px'),
    ...shorthands.padding('0', '28px'),
    fontWeight: '700',
    fontSize: '14px',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    ':hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 15px -3px var(--color-primary-glow)',
    }
  },
  secondaryButton: {
    backgroundColor: 'var(--glass-bg)',
    backdropFilter: 'var(--glass-blur)',
    border: '1px solid var(--glass-border)',
    ':hover': {
      backgroundColor: 'var(--color-primary-soft)',
    }
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('20px'),
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: '800',
    color: 'var(--color-text-base)',
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap('10px'),
  },
  emptyCard: {
    padding: '60px',
    textAlign: 'center',
    color: 'var(--color-text-muted)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    ...shorthands.gap('12px'),
    background: 'var(--glass-bg)',
    backdropFilter: 'var(--glass-blur)',
    ...shorthands.border('1px', 'solid', 'var(--glass-border)'),
    ...shorthands.borderRadius('var(--radius-lg)'),
  }
})

export const Dashboard: React.FC = () => {
  const styles = useStyles()
  const { user } = useAuth()

  return (
    <div className={mergeClasses(styles.container, 'animate-fade-in')}>
      <div className={styles.header}>
        <Title2 className={styles.greeting}>Welcome back, {user?.businessName || 'Business Owner'} 👋</Title2>
        <Text className={styles.subGreeting}>Here's what's happening with your business today.</Text>
      </div>

      <div className={styles.quickActions}>
        <Button icon={<AddRegular />} appearance="primary" className={styles.actionButton}>Create Sale</Button>
        <Button icon={<PersonAddRegular />} className={mergeClasses(styles.actionButton, styles.secondaryButton)}>New Customer</Button>
        <Button icon={<StorageRegular />} className={mergeClasses(styles.actionButton, styles.secondaryButton)}>New Product</Button>
      </div>

      <div className={styles.kpiRow}>
        <KPICard 
          title="Revenue" 
          value="$12,450" 
          icon={<MoneyRegular />} 
          trend="12.5% increase" 
          trendDirection="up" 
        />
        <KPICard 
          title="Customers" 
          value="156" 
          icon={<PeopleRegular />} 
          trend="8.2% growth" 
          trendDirection="up" 
        />
        <KPICard 
          title="Inventory" 
          value="42" 
          icon={<BoxRegular />} 
          trend="4 items low" 
          trendDirection="down" 
        />
        <KPICard 
          title="Best Performance" 
          value="Organic Coffee" 
          icon={<TagRegular />} 
        />
      </div>

      <div className={styles.section}>
        <AIInsightCard 
          insight="Your **sales velocity** for Organic Coffee has increased by 15% this week. We recommend increasing your inventory by 20% to avoid stockouts before the weekend peak." 
        />
      </div>

      <div className={styles.section}>
        <Subtitle1 className={styles.sectionTitle}>
          <SparkleRegular fontSize={20} color="var(--color-primary)" />
          Recent Activity
        </Subtitle1>
        <div className={styles.emptyCard}>
          <Text size={500} weight="semibold">No activity yet</Text>
          <Text block>Your recent transactions and updates will appear here once you start using BizPulse AI.</Text>
          <Button appearance="subtle" className={styles.actionButton}>Learn how to start</Button>
        </div>
      </div>
    </div>
  )
}
