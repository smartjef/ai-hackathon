import React, { useState, useRef } from 'react'
import { 
  makeStyles, 
  shorthands, 
  Button, 
  Textarea,
  mergeClasses
} from '@fluentui/react-components'
import { SendRegular, AttachRegular, MicRegular } from '@fluentui/react-icons'

const useStyles = makeStyles({
  container: {
    display: 'flex',
    alignItems: 'flex-end',
    ...shorthands.gap('8px'),
    ...shorthands.padding('16px'),
    backgroundColor: 'var(--color-bg-chat)',
    borderTop: '1px solid var(--color-border)',
    boxShadow: '0 -2px 10px rgba(0,0,0,0.05)',
  },
  inputWrapper: {
    flexGrow: 1,
    position: 'relative',
  },
  textarea: {
    width: '100%',
    minHeight: '40px',
    maxHeight: '150px',
    backgroundColor: 'var(--color-bg-ai)',
    ...shorthands.borderRadius('20px'),
    ...shorthands.padding('8px', '16px'),
    fontSize: '14px',
    lineHeight: '1.5',
    border: '1px solid var(--color-border)',
    ':focus-within': {
      ...shorthands.border('1px', 'solid', 'var(--color-primary)'),
      boxShadow: '0 0 0 2px rgba(79, 70, 229, 0.1)',
    }
  },
  iconButton: {
    minWidth: '40px',
    height: '40px',
    ...shorthands.borderRadius('50%'),
    color: 'var(--color-text-muted)',
    ':hover': {
      color: 'var(--color-primary)',
      backgroundColor: 'rgba(79, 70, 229, 0.05)',
    }
  },
  sendButton: {
    backgroundColor: 'var(--color-primary)',
    color: '#ffffff',
    ':hover': {
      backgroundColor: 'var(--color-primary-hover)',
    },
    ':disabled': {
      backgroundColor: 'var(--color-border)',
      color: 'var(--color-text-muted)',
    }
  }
})

interface ChatInputProps {
  onSend: (message: string) => void
  disabled?: boolean
  placeholder?: string
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSend, disabled, placeholder = "Type your message..." }) => {
  const styles = useStyles()
  const [value, setValue] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSend = () => {
    if (value.trim() && !disabled) {
      onSend(value)
      setValue('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className={styles.container}>
      <Button icon={<AttachRegular />} appearance="subtle" className={styles.iconButton} />
      <div className={styles.inputWrapper}>
        <Textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={styles.textarea}
          resize="none"
          rows={1}
          disabled={disabled}
        />
      </div>
      <Button icon={<MicRegular />} appearance="subtle" className={styles.iconButton} />
      <Button 
        icon={<SendRegular />} 
        appearance="primary" 
        className={mergeClasses(styles.iconButton, styles.sendButton)}
        onClick={handleSend}
        disabled={!value.trim() || disabled}
      />
    </div>
  )
}
