import React from 'react'
import { Card, CardHeader, CardFooter, Button, makeStyles, shorthands, tokens, Body1, Title3, Caption1 } from '@fluentui/react-components'
import { SparkleRegular } from '@fluentui/react-icons'

const useStyles = makeStyles({
  card: {
    width: '100%',
    ...shorthands.margin('20px', '0'),
    backgroundColor: tokens.colorBrandBackground2,
    ...shorthands.border('1px', 'solid', tokens.colorBrandStroke1),
  },
  content: {
    ...shorthands.padding('10px', '0'),
  },
  refreshButton: {
    ...shorthands.margin('0', '0', '0', 'auto'),
  }
})

interface AIInsightCardProps {
  insight: string
  onRefresh?: () => void
  loading?: boolean
}

export const AIInsightCard: React.FC<AIInsightCardProps> = ({ insight, onRefresh, loading }) => {
  const styles = useStyles()

  return (
    <Card className={styles.card}>
      <CardHeader 
        header={<Title3>AI Insight</Title3>}
        action={
          <Button 
            appearance="subtle" 
            icon={<SparkleRegular />} 
            onClick={onRefresh} 
            disabled={loading}
            className={styles.refreshButton}
          >
            Refresh
          </Button>
        }
      />
      <div className={styles.content}>
        <Body1><i>{loading ? 'Analyzing your business data...' : insight}</i></Body1>
      </div>
      <CardFooter>
        <Caption1>Based on your sales data from the last 30 days.</Caption1>
      </CardFooter>
    </Card>
  )
}
