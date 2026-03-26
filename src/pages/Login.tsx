import React, { useState } from 'react'
import { 
  makeStyles, 
  shorthands, 
  Button, 
  Input, 
  Label, 
  Card, 
  CardHeader, 
  CardFooter,
  Title3,
  Link,
  Text,
  Body1
} from '@fluentui/react-components'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '80vh',
    ...shorthands.padding('20px'),
  },
  card: {
    width: '100%',
    maxWidth: '400px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('15px'),
  },
  footer: {
    display: 'flex',
    justifyContent: 'center',
    ...shorthands.margin('10px', '0', '0', '0'),
  },
  title: {
    ...shorthands.margin('0', '0', '20px', '0'),
    textAlign: 'center',
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
    <div className={styles.container}>
      <Title3 className={styles.title}>Welcome to BizPulse AI</Title3>
      <Card className={styles.card}>
        <CardHeader header={<Text weight="semibold">Login to your account</Text>} />
        <form className={styles.form} onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              style={{ width: '100%' }}
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              style={{ width: '100%' }}
            />
          </div>
          <Button appearance="primary" type="submit">Login</Button>
        </form>
        <CardFooter className={styles.footer}>
          <Body1>
            Don't have an account? {' '}
            <Link onClick={() => navigate('/register')}>Register</Link>
          </Body1>
        </CardFooter>
      </Card>
    </div>
  )
}
