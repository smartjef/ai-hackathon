import React, { useState } from 'react'
import { 
  makeStyles, 
  shorthands, 
  Button, 
  Input, 
  Label, 
  Title2,
  Link,
  Text,
  Body1,
  mergeClasses
} from '@fluentui/react-components'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { SparkleRegular } from '@fluentui/react-icons'

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    width: '100vw',
    ...shorthands.padding('20px'),
    position: 'relative',
  },
  card: {
    width: '100%',
    maxWidth: '440px',
    padding: '48px',
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('32px'),
    backgroundColor: 'var(--glass-bg)',
    backdropFilter: 'var(--glass-blur)',
    ...shorthands.border('1px', 'solid', 'var(--glass-border)'),
    ...shorthands.borderRadius('var(--radius-lg)'),
    boxShadow: 'var(--shadow-xl)',
    animation: 'fadeIn 1s cubic-bezier(0.22, 1, 0.36, 1)',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    ...shorthands.gap('12px'),
  },
  logo: {
    fontSize: '28px',
    fontWeight: '900',
    background: 'linear-gradient(135deg, var(--color-primary), #818cf8)',
    '-webkit-background-clip': 'text',
    '-webkit-text-fill-color': 'transparent',
    letterSpacing: '-1px',
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap('8px'),
  },
  title: {
    fontSize: '24px',
    fontWeight: '800',
    color: 'var(--color-text-base)',
    letterSpacing: '-0.5px',
  },
  subtitle: {
    color: 'var(--color-text-muted)',
    fontSize: '15px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('24px'),
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('8px'),
  },
  label: {
    fontSize: '14px',
    fontWeight: '600',
    color: 'var(--color-text-base)',
    paddingLeft: '4px',
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    height: '44px',
    ...shorthands.borderRadius('12px'),
  },
  submitButton: {
    height: '50px',
    fontSize: '16px',
    fontWeight: '700',
    ...shorthands.borderRadius('14px'),
    marginTop: '8px',
    transition: 'all 0.3s ease',
    ':hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 10px 20px -5px var(--color-primary-glow)',
    }
  },
  footer: {
    display: 'flex',
    justifyContent: 'center',
    ...shorthands.gap('8px'),
    marginTop: '8px',
  },
  link: {
    fontWeight: '700',
    color: 'var(--color-primary)',
    textDecoration: 'none',
    ':hover': {
      textDecoration: 'underline',
    }
  }
})

export const Login: React.FC = () => {
  const styles = useStyles()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await login(email, password)
    navigate('/')
  }

  return (
    <div className={mergeClasses(styles.container, 'animate-fade-in')}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.logo}>
            <SparkleRegular fontSize={32} />
            BizPulse AI
          </div>
          <Title2 className={styles.title}>Welcome Back</Title2>
          <Text className={styles.subtitle}>Enter your credentials to access your dashboard</Text>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <Label className={styles.label} htmlFor="email">Email Address</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="name@business.com"
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              className={styles.input}
            />
          </div>
          <div className={styles.field}>
            <Label className={styles.label} htmlFor="password">Password</Label>
            <Input 
              id="password" 
              type="password" 
              placeholder="••••••••"
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              className={styles.input}
            />
          </div>
          <Button appearance="primary" type="submit" className={styles.submitButton}>Sign In</Button>
        </form>

        <div className={styles.footer}>
          <Body1>New to BizPulse?</Body1>
          <Link className={styles.link} onClick={() => navigate('/register')}>Create an account</Link>
        </div>
      </div>
    </div>
  )
}
