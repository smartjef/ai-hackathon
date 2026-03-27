import React from 'react'
import { makeStyles, shorthands, Button, Text, Title3 } from '@fluentui/react-components'
import { SparkleRegular, ArrowClockwiseRegular } from '@fluentui/react-icons'

const useStyles = makeStyles({
  card: {
    ...shorthands.margin('24px', '0'),
    padding: '32px',
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: 'var(--glass-bg)',
    backdropFilter: 'var(--glass-blur)',
    border: '1px solid var(--glass-border)',
    borderRadius: 'var(--radius-lg)',
    boxShadow: 'var(--shadow-xl)',
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('12px'),
    '::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '4px',
      background: 'linear-gradient(to right, var(--color-primary), #818cf8, var(--color-primary))',
      backgroundSize: '200% 100%',
      animation: 'gradientMove 3s linear infinite',
    }
  },
  '@keyframes gradientMove': {
    '0%': { backgroundPosition: '0% 50%' },
    '100%': { backgroundPosition: '200% 50%' },
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
  },
  titleWrapper: {
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap('12px'),
    color: 'var(--color-primary)',
  },
  aiTitle: {
    fontSize: '20px',
    fontWeight: '800',
    letterSpacing: '-0.3px',
  },
  iconGlow: {
    filter: 'drop-shadow(0 0 8px var(--color-primary-glow))',
    animation: 'pulse 2s ease-in-out infinite',
  },
  '@keyframes pulse': {
    '0%, 100%': { opacity: 1, transform: 'scale(1)' },
    '50%': { opacity: 0.8, transform: 'scale(1.1)' },
  },
  content: {
    lineHeight: '1.7',
    color: 'var(--color-text-base)',
    fontSize: '16px',
    ...shorthands.padding('8px', '0'),
    '& strong': {
      color: 'var(--color-primary)',
      fontWeight: '700',
    }
  },
  footer: {
    marginTop: '12px',
    fontSize: '12px',
    color: 'var(--color-text-muted)',
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap('8px'),
    opacity: 0.8,
  },
  refreshButton: {
    height: '32px',
    ...shorthands.borderRadius('var(--radius-md)'),
    color: 'var(--color-text-muted)',
    ':hover': {
      color: 'var(--color-primary)',
      backgroundColor: 'var(--color-primary-soft)',
    }
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
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.titleWrapper}>
          <SparkleRegular fontSize={24} className={styles.iconGlow} />
          <Title3 className={styles.aiTitle}>AI Intelligence</Title3>
        </div>
        <Button 
          appearance="subtle" 
          icon={<ArrowClockwiseRegular />} 
          onClick={onRefresh} 
          disabled={loading}
          className={styles.refreshButton}
        >
          Refresh
        </Button>
      </div>
      <div className={styles.content}>
        {loading ? (
          <Text italic className="animate-pulse">Analyzing your business performance...</Text>
        ) : (
          <div dangerouslySetInnerHTML={{ __html: insight.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
        )}
      </div>
      <div className={styles.footer}>
        <SparkleRegular fontSize={14} />
        <span>Insights generated via BizPulse AI Engine</span>
      </div>
    </div>
  )
}
