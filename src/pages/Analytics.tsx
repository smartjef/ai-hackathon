import React from 'react'
import { 
  makeStyles, 
  shorthands, 
  Title2,
  Subtitle1,
  mergeClasses,
  Text
} from '@fluentui/react-components'
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend
} from 'recharts'
import { ChartMultipleRegular } from '@fluentui/react-icons'

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('32px'),
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('8px'),
  },
  title: {
    fontSize: '36px',
    fontWeight: '900',
    color: 'var(--color-text-base)',
    background: 'linear-gradient(135deg, var(--color-primary), #c084fc)',
    '-webkit-background-clip': 'text',
    '-webkit-text-fill-color': 'transparent',
    letterSpacing: '-1px',
    ...shorthands.margin(0),
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
    ...shorthands.gap('24px'),
  },
  card: {
    padding: '24px',
    backgroundColor: 'var(--glass-bg)',
    backdropFilter: 'var(--glass-blur)',
    ...shorthands.border('1px', 'solid', 'var(--glass-border)'),
    ...shorthands.borderRadius('var(--radius-lg)'),
    boxShadow: 'var(--shadow-md)',
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('20px'),
  },
  cardTitle: {
    fontSize: '18px',
    fontWeight: '700',
    color: 'var(--color-text-base)',
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap('10px'),
  },
  chartContainer: {
    height: '320px',
    width: '100%',
    ...shorthands.padding('10px'),
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    ...shorthands.borderRadius('12px'),
  }
})

// Mock data
const revenueData = [
  { name: 'Mon', revenue: 400 },
  { name: 'Tue', revenue: 700 },
  { name: 'Wed', revenue: 500 },
  { name: 'Thu', revenue: 600 },
  { name: 'Fri', revenue: 800 },
  { name: 'Sat', revenue: 1200 },
  { name: 'Sun', revenue: 900 },
]

const categoryData = [
  { name: 'Food', value: 450 },
  { name: 'Supplies', value: 300 },
  { name: 'Electronics', value: 200 },
  { name: 'Other', value: 50 },
]

const topCustomers = [
  { name: 'Alice', spend: 890 },
  { name: 'Bob', spend: 450 },
  { name: 'Charlie', spend: 320 },
  { name: 'David', spend: 210 },
  { name: 'Eve', spend: 150 },
]

export const Analytics: React.FC = () => {
  const styles = useStyles()
  
  // Custom theme colors matching our HSL palette
  const primaryColor = 'hsl(235, 75%, 60%)'
  const secondaryColor = '#818cf8'
  const accentColor = '#c084fc'
  const mutedColor = 'var(--color-text-muted)'
  const borderColor = 'var(--color-border)'

  const COLORS = [primaryColor, secondaryColor, accentColor, '#6366f1']

  return (
    <div className={mergeClasses(styles.container, 'animate-fade-in')}>
      <div className={styles.header}>
        <Title2 className={styles.title}>Business Analytics</Title2>
        <Text size={400} className={mutedColor}>Deep dive into your sales and customer performance.</Text>
      </div>

      <div className={mergeClasses(styles.card)}>
        <div className={styles.cardTitle}>
          <ChartMultipleRegular color={primaryColor} />
          <Subtitle1>Weekly Revenue Trends</Subtitle1>
        </div>
        <div className={styles.chartContainer}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke={borderColor} vertical={false} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: mutedColor, fontSize: 12}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: mutedColor, fontSize: 12}} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--color-bg-card)', 
                  border: '1px solid var(--color-border)', 
                  borderRadius: '12px',
                  boxShadow: 'var(--shadow-lg)'
                }} 
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke={primaryColor} 
                strokeWidth={4} 
                dot={{ r: 6, fill: primaryColor, strokeWidth: 2, stroke: '#fff' }}
                activeDot={{ r: 8, strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className={styles.grid}>
        <div className={styles.card}>
          <div className={styles.cardTitle}>
            <Subtitle1>Sales by Category</Subtitle1>
          </div>
          <div className={styles.chartContainer}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardTitle}>
            <Subtitle1>Top Customers ($)</Subtitle1>
          </div>
          <div className={styles.chartContainer}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topCustomers} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={borderColor} horizontal={false} />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{fill: mutedColor, fontSize: 12}} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: mutedColor, fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: 'rgba(0,0,0,0.05)'}}
                  contentStyle={{ 
                    backgroundColor: 'var(--color-bg-card)', 
                    border: '1px solid var(--color-border)', 
                    borderRadius: '12px'
                  }} 
                />
                <Bar dataKey="spend" fill={secondaryColor} radius={[0, 10, 10, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}
