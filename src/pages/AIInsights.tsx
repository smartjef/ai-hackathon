import React from 'react'
import { 
  makeStyles, 
  shorthands, 
  Title2, 
  tokens,
  Card,
  CardHeader,
  Body1,
  Subtitle1,
  Button,
  Caption1,
  Text
} from '@fluentui/react-components'
import { 
  SparkleRegular, 
} from '@fluentui/react-icons'

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('20px'),
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('15px'),
  },
  insightCard: {
    ...shorthands.borderLeft('4px', 'solid', tokens.colorBrandStroke1),
  },
  alertCard: {
    ...shorthands.borderLeft('4px', 'solid', tokens.colorPaletteRedBorderActive),
  },
  suggestionCard: {
    ...shorthands.borderLeft('4px', 'solid', tokens.colorPaletteYellowBorderActive),
  }
})

export const AIInsights: React.FC = () => {
  const styles = useStyles()

  return (
    <div className={styles.container}>
      <Title2>AI Business Advisor</Title2>
      
      <div className={styles.section}>
        <Subtitle1>Weekly Business Summary</Subtitle1>
        <Card className={styles.insightCard}>
          <CardHeader 
            header={<Text weight="semibold">Performance Analysis</Text>}
          />
          <Body1>
            Your business had a strong week with a 15% increase in revenue compared to last week. 
            The peak performers were <strong>Coffee Beans</strong> and <strong>Milk</strong>. 
            Customer footfall was highest on Saturday afternoon.
          </Body1>
        </Card>
      </div>

      <div className={styles.section}>
        <Subtitle1>Sales Trend Analysis</Subtitle1>
        <Card className={styles.insightCard}>
          <CardHeader 
            header={<Text weight="semibold">Tuesday Sales Growth</Text>}
          />
          <Body1>
            We've identified a consistent 40% spike in sales every Tuesday. 
            This seems to correlate with your "Morning Brew" discounts. 
            <strong>Action:</strong> Consider extending this promotion to Wednesday mornings to see if it captures a similar trend.
          </Body1>
        </Card>
      </div>

      <div className={styles.section}>
        <Subtitle1>Customer Retention Alerts</Subtitle1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Card className={styles.alertCard}>
            <CardHeader 
              header={<Text weight="semibold">At-Risk Customers</Text>}
            />
            <Body1>
              5 high-value customers haven't visited in over 30 days. 
              <strong>Alice Smith</strong> (Last spend $890) is among them.
            </Body1>
            <Button appearance="subtle">Sent "We Miss You" Discount</Button>
          </Card>
        </div>
      </div>

      <div className={styles.section}>
        <Subtitle1>Product Recommendations</Subtitle1>
        <Card className={styles.suggestionCard}>
          <CardHeader 
            header={<Text weight="semibold">Inventory Optimization</Text>}
          />
          <Body1>
            <strong>Paper Cups</strong> are overstocked (500+ units), while <strong>Milk</strong> is frequently running low. 
            Consider reducing your next Paper Cup order and increasing Milk stock by 20% to avoid stockouts.
          </Body1>
        </Card>
      </div>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Caption1>These insights are generated periodically using your business data and Azure OpenAI.</Caption1>
        <br />
        <Button appearance="outline" icon={<SparkleRegular />} style={{ marginTop: '10px' }}>
          Regenerate Full Report
        </Button>
      </div>
    </div>
  )
}
