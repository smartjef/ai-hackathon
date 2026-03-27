import React, { useState } from 'react'
import { 
  makeStyles, 
  shorthands, 
  Title2, 
  Caption1
} from '@fluentui/react-components'
import { ChatBubble } from '../components/Chat/ChatBubble'
import { ChatInput } from '../components/Chat/ChatInput'
import { MessageList } from '../components/Chat/MessageList'

const useStyles = makeStyles({
  pageContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: 'calc(100vh - 100px)', /* Adjust based on navbar height */
    backgroundColor: 'var(--color-bg-chat)',
    ...shorthands.borderRadius('var(--radius-lg)'),
    ...shorthands.border('1px', 'solid', 'var(--color-border)'),
    overflow: 'hidden',
    boxShadow: 'var(--shadow-md)',
  },
  header: {
    ...shorthands.padding('16px', '20px'),
    borderBottom: '1px solid var(--color-border)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'var(--color-bg-base)',
  },
  title: {
    margin: 0,
    fontSize: '18px',
  }
})

interface Message {
  id: string
  text: string
  isAI: boolean
  timestamp: string
  senderName: string
  avatarUrl?: string
}

export const AIInsights: React.FC = () => {
  const styles = useStyles()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I've analyzed your business data for the past week. You had a strong performance with a 15% increase in revenue! Coffee Beans and Milk were your top sellers.",
      isAI: true,
      timestamp: "10:00 AM",
      senderName: "Aurora AI",
    },
    {
      id: '2',
      text: "That's great! Any specific trends I should know about for next week?",
      isAI: false,
      timestamp: "10:01 AM",
      senderName: "Business Owner",
    },
    {
      id: '3',
      text: "Yes, we've identified a consistent 40% spike in sales every Tuesday. This correlates with your 'Morning Brew' discounts. I recommend extending this to Wednesdays to capitalize on the momentum.",
      isAI: true,
      timestamp: "10:01 AM",
      senderName: "Aurora AI",
    },
    {
      id: '4',
      text: "Also, a heads-up on inventory: Paper Cups are overstocked, but Milk is running low. I suggest reducing your next cup order and increasing milk stock by 20%.",
      isAI: true,
      timestamp: "10:02 AM",
      senderName: "Aurora AI",
    }
  ])

  const handleSend = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isAI: false,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      senderName: "Business Owner",
    }
    setMessages([...messages, newMessage])

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm processing that request. I'll get back to you with a detailed analysis shortly!",
        isAI: true,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        senderName: "Aurora AI",
      }
      setMessages(prev => [...prev, aiResponse])
    }, 1000)
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <Title2 className={styles.title}>Aurora AI Business Advisor</Title2>
        <Caption1 style={{ color: 'var(--color-text-muted)' }}>Online</Caption1>
      </div>
      
      <MessageList>
        {messages.map((msg) => (
          <ChatBubble
            key={msg.id}
            message={msg.text}
            isAI={msg.isAI}
            timestamp={msg.timestamp}
            senderName={msg.senderName}
            avatarUrl={msg.avatarUrl}
          />
        ))}
      </MessageList>

      <ChatInput onSend={handleSend} />
    </div>
  )
}
