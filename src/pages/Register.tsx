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
  Select,
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
    minHeight: '90vh',
    ...shorthands.padding('20px'),
  },
  card: {
    width: '100%',
    maxWidth: '450px',
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

export const Register: React.FC = () => {
  const styles = useStyles()
  const navigate = useNavigate()
  const { register } = useAuth()
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    businessName: '',
    businessCategory: 'Retail'
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({ ...prev, [id]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await register(formData)
    navigate('/')
  }

  return (
    <div className={styles.container}>
      <Title3 className={styles.title}>Create your BizPulse AI account</Title3>
      <Card className={styles.card}>
        <CardHeader header={<Text weight="semibold">Business Registration</Text>} />
        <form className={styles.form} onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" value={formData.name} onChange={handleChange} required style={{ width: '100%' }} />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={formData.email} onChange={handleChange} required style={{ width: '100%' }} />
          </div>
          <div>
            <Label htmlFor="businessName">Business Name</Label>
            <Input id="businessName" value={formData.businessName} onChange={handleChange} required style={{ width: '100%' }} />
          </div>
          <div>
            <Label htmlFor="businessCategory">Business Category</Label>
            <Select id="businessCategory" value={formData.businessCategory} onChange={handleChange} style={{ width: '100%' }}>
              <option>Retail</option>
              <option>Food</option>
              <option>Services</option>
              <option>Health</option>
              <option>Other</option>
            </Select>
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" value={formData.password} onChange={handleChange} required style={{ width: '100%' }} />
          </div>
          <Button appearance="primary" type="submit">Register</Button>
        </form>
        <CardFooter className={styles.footer}>
          <Body1>
            Already have an account? {' '}
            <Link onClick={() => navigate('/login')}>Login</Link>
          </Body1>
        </CardFooter>
      </Card>
    </div>
  )
}
