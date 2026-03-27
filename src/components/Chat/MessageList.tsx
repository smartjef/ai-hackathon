import React, { useRef, useEffect } from 'react'
import { makeStyles, shorthands } from '@fluentui/react-components'

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.padding('20px'),
    ...shorthands.gap('16px'),
    overflowY: 'auto',
    flexGrow: 1,
    scrollbarWidth: 'thin',
    '::-webkit-scrollbar': {
      width: '6px',
    },
    '::-webkit-scrollbar-thumb': {
      backgroundColor: 'var(--color-border)',
      borderRadius: '3px',
    }
  }
})

interface MessageListProps {
  children: React.ReactNode
}

export const MessageList: React.FC<MessageListProps> = ({ children }) => {
  const styles = useStyles()
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight
    }
  }, [children])

  return (
    <div ref={listRef} className={styles.container}>
      {children}
    </div>
  )
}
