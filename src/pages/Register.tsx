import React, { useState } from 'react'
import { 
  makeStyles, 
  shorthands, 
  Button, 
  Input, 
  Label, 
  Title2,
  Link,
  Select,
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
    maxWidth: '500px',
    padding: '40px',
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('24px'),
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
    ...shorthands.gap('8px'),
  },
  logo: {
    fontSize: '24px',
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
    fontSize: '22px',
    fontWeight: '800',
    color: 'var(--color-text-base)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('16px'),
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    ...shorthands.gap('16px'),
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('6px'),
  },
  fullWidth: {
    gridColumn: 'span 2',
  },
  label: {
    fontSize: '13px',
    fontWeight: '600',
    color: 'var(--color-text-base)',
    paddingLeft: '4px',
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    height: '40px',
    ...shorthands.borderRadius('10px'),
  },
  submitButton: {
    height: '48px',
    fontSize: '15px',
    fontWeight: '700',
    ...shorthands.borderRadius('12px'),
    marginTop: '12px',
    transition: 'all 0.3s ease',
  },
  footer: {
    display: 'flex',
    justifyContent: 'center',
    ...shorthands.gap('8px'),
    marginTop: '4px',
  },
  link: {
    fontWeight: '700',
    color: 'var(--color-primary)',
    textDecoration: 'none',
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
    <div className={mergeClasses(styles.container, 'animate-fade-in')}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.logo}>
            <SparkleRegular fontSize={28} />
            BizPulse AI
          </div>
          <Title2 className={styles.title}>Create Account</Title2>
          <Text size={300} color="var(--color-text-muted)">Start your 14-day free trial today</Text>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.grid}>
            <div className={mergeClasses(styles.field, styles.fullWidth)}>
              <Label className={styles.label} htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="John Doe" value={formData.name} onChange={handleChange} required className={styles.input} />
            </div>
            <div className={mergeClasses(styles.field, styles.fullWidth)}>
              <Label className={styles.label} htmlFor="email">Email Address</Label>
              <Input id="email" type="email" placeholder="john@business.com" value={formData.email} onChange={handleChange} required className={styles.input} />
            </div>
            <div className={styles.field}>
              <Label className={styles.label} htmlFor="businessName">Business Name</Label>
              <Input id="businessName" placeholder="Acme Inc." value={formData.businessName} onChange={handleChange} required className={styles.input} />
            </div>
            <div className={styles.field}>
              <Label className={styles.label} htmlFor="businessCategory">Category</Label>
              <Select id="businessCategory" value={formData.businessCategory} onChange={handleChange} className={styles.input}>
                <option>Retail</option>
                <option>Food</option>
                <option>Services</option>
                <option>Health</option>
                <option>Other</option>
              </Select>
            </div>
            <div className={mergeClasses(styles.field, styles.fullWidth)}>
              <Label className={styles.label} htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" value={formData.password} onChange={handleChange} required className={styles.input} />
            </div>
          </div>
          <Button appearance="primary" type="submit" className={styles.submitButton}>Get Started</Button>
        </form>

        <div className={styles.footer}>
          <Body1>Already have an account?</Body1>
          <Link className={styles.link} onClick={() => navigate('/login')}>Sign In</Link>
        </div>
      </div>
    </div>
  )
}
