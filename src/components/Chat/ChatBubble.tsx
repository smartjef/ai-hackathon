import React from 'react'
import { 
  makeStyles, 
  shorthands, 
  Avatar, 
  Text,
  mergeClasses
} from '@fluentui/react-components'
import { CopyRegular, ShareRegular } from '@fluentui/react-icons'

const useStyles = makeStyles({
  container: {
    display: 'flex',
    ...shorthands.gap('12px'),
    ...shorthands.margin('8px', '0'),
    width: '100%',
  },
  userContainer: {
    flexDirection: 'row-reverse',
  },
  bubble: {
    maxWidth: '80%',
    ...shorthands.padding('12px', '16px'),
    ...shorthands.borderRadius('12px'),
    boxShadow: 'var(--shadow-sm)',
    position: 'relative',
  },
  userBubble: {
    backgroundColor: 'var(--color-user-bubble)',
    color: '#ffffff',
    borderTopRightRadius: '4px',
  },
  aiBubble: {
    backgroundColor: 'var(--color-ai-bubble)',
    color: 'var(--color-text-base)',
    borderTopLeftRadius: '4px',
    ...shorthands.border('1px', 'solid', 'var(--color-border)'),
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '4px',
  },
  timestamp: {
    fontSize: '11px',
    color: 'var(--color-text-muted)',
  },
  actions: {
    display: 'flex',
    ...shorthands.gap('8px'),
    marginTop: '8px',
    opacity: 0,
    transition: 'opacity 0.2s ease',
    ':hover': {
      opacity: 1,
    }
  },
  actionIcon: {
    fontSize: '16px',
    cursor: 'pointer',
    color: 'var(--color-text-muted)',
    ':hover': {
      color: 'var(--color-primary)',
    }
  }
})

interface ChatBubbleProps {
  message: string
  isAI?: boolean
  timestamp: string
  senderName: string
  avatarUrl?: string
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ 
  message, 
  isAI = false, 
  timestamp, 
  senderName,
  avatarUrl 
}) => {
  const styles = useStyles()

  return (
    <div className={mergeClasses(styles.container, !isAI && styles.userContainer)}>
      <Avatar
        name={senderName}
        image={{ src: avatarUrl }}
        size={32}
      />
      <div className={mergeClasses(styles.bubble, isAI ? styles.aiBubble : styles.userBubble)}>
        <div className={styles.header}>
          <Text size={100} weight="semibold" className={!isAI ? styles.timestamp : undefined} style={{ color: isAI ? 'var(--color-primary)' : 'inherit' }}>
            {senderName}
          </Text>
          <Text className={styles.timestamp}>{timestamp}</Text>
        </div>
        <Text size={300}>{message}</Text>
        
        {isAI && (
          <div className={styles.actions}>
            <CopyRegular className={styles.actionIcon} title="Copy" />
            <ShareRegular className={styles.actionIcon} title="Share" />
          </div>
        )}
      </div>
    </div>
  )
}
