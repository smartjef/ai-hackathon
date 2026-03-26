import React from 'react'
import { 
  makeStyles, 
  shorthands, 
  Title2, 
  tokens,
  Card,
  CardHeader,
  Subtitle1,
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

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('20px'),
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    ...shorthands.gap('20px'),
  },
  chartContainer: {
    height: '300px',
    width: '100%',
    ...shorthands.margin('10px', '0', '0', '0'),
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

const COLORS = [tokens.colorBrandBackgroundStatic, tokens.colorPaletteBerryBackground2, tokens.colorPaletteMarigoldBackground2, tokens.colorNeutralBackgroundStatic]

export const Analytics: React.FC = () => {
  const styles = useStyles()

  return (
    <div className={styles.container}>
      <Title2>Analytics</Title2>

      <Card>
        <CardHeader header={<Subtitle1>Weekly Revenue</Subtitle1>} />
        <div className={styles.chartContainer}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke={tokens.colorBrandForeground1} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className={styles.grid}>
        <Card>
          <CardHeader header={<Subtitle1>Sales by Category</Subtitle1>} />
          <div className={styles.chartContainer}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {categoryData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <CardHeader header={<Subtitle1>Top Customers ($)</Subtitle1>} />
          <div className={styles.chartContainer}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topCustomers} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" />
                <Tooltip />
                <Bar dataKey="spend" fill={tokens.colorBrandForeground1} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  )
}
