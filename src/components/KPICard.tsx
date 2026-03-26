import React from 'react'
import { Card, CardHeader, makeStyles, shorthands, tokens, Caption1, Text } from '@fluentui/react-components'

const useStyles = makeStyles({
  card: {
    width: '100%',
    minWidth: '150px',
    backgroundColor: tokens.colorNeutralBackground1,
  },
  value: {
    fontSize: '24px',
    fontWeight: 'bold',
    ...shorthands.margin('4px', '0', '0', '0'),
  },
  trend: {
    ...shorthands.margin('4px', '0', '0', '0'),
  },
  trendUp: {
    color: tokens.colorPaletteGreenForeground1,
  },
  trendDown: {
    color: tokens.colorPaletteRedForeground1,
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
    <Card className={styles.card}>
      <CardHeader 
        header={<Text weight="semibold">{title}</Text>}
        description={<Caption1>{icon}</Caption1>}
      />
      <div className={styles.value}>{value}</div>
      {trend && (
        <Caption1 className={`${styles.trend} ${trendDirection === 'up' ? styles.trendUp : styles.trendDown}`}>
          {trendDirection === 'up' ? '↑' : '↓'} {trend}
        </Caption1>
      )}
    </Card>
  )
}
