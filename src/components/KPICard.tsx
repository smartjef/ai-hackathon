import React from 'react'
import { makeStyles, shorthands, Text, mergeClasses } from '@fluentui/react-components'

const useStyles = makeStyles({
  card: {
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('16px'),
    backgroundColor: 'var(--glass-bg)',
    backdropFilter: 'var(--glass-blur)',
    border: '1px solid var(--glass-border)',
    borderRadius: 'var(--radius-lg)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    ':hover': {
      transform: 'translateY(-6px)',
      boxShadow: '0 20px 40px -10px var(--color-primary-glow)',
      ...shorthands.borderColor('var(--color-primary-soft)'),
    }
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: 'var(--color-text-muted)',
    fontSize: '13px',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    fontWeight: '600',
  },
  iconWrapper: {
    fontSize: '22px',
    color: 'var(--color-primary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '44px',
    height: '44px',
    backgroundColor: 'var(--color-primary-soft)',
    ...shorthands.borderRadius('14px'),
    boxShadow: '0 4px 12px -2px var(--color-primary-glow)',
  },
  value: {
    fontSize: '32px',
    fontWeight: '800',
    color: 'var(--color-text-base)',
    letterSpacing: '-0.5px',
  },
  trend: {
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap('6px'),
    padding: '4px 10px',
    ...shorthands.borderRadius('var(--radius-md)'),
    fontSize: '12px',
    fontWeight: '700',
    width: 'fit-content',
  },
  trendUp: {
    color: '#059669', // Emerald-600
    backgroundColor: 'rgba(5, 150, 105, 0.1)',
  },
  trendDown: {
    color: '#e11d48', // Rose-600
    backgroundColor: 'rgba(225, 29, 72, 0.1)',
  }
})

interface KPICardProps {
  title: string
  value: string | number
  icon?: React.ReactNode
  trend?: string
  trendDirection?: 'up' | 'down'
}

export const KPICard: React.FC<KPICardProps> = ({ title, value, icon, trend, trendDirection }) => {
  const styles = useStyles()

  return (
    <div className={mergeClasses(styles.card)}>
      <div className={styles.header}>
        <Text className={styles.title}>{title}</Text>
        <div className={styles.iconWrapper}>{icon}</div>
      </div>
      <div className={styles.value}>{value}</div>
      {trend && (
        <div className={mergeClasses(styles.trend, trendDirection === 'up' ? styles.trendUp : styles.trendDown)}>
          {trendDirection === 'up' ? '↗' : '↘'} {trend}
        </div>
      )}
    </div>
  )
}
