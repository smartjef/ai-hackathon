import React, { useState } from 'react'
import { 
  makeStyles, 
  shorthands, 
  Title2,
  Button, 
  Input,
  Select,
  Field,
  Subtitle1,
  Divider,
  Table,
  TableHeader,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  TableCellLayout,
  mergeClasses,
  Text
} from '@fluentui/react-components'
import { AddRegular, DeleteRegular, MoneyRegular, CartRegular, PersonRegular } from '@fluentui/react-icons'

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('32px'),
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap('12px'),
  },
  title: {
    fontSize: '32px',
    fontWeight: '900',
    letterSpacing: '-1px',
    color: 'var(--color-text-base)',
  },
  mainGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 360px',
    ...shorthands.gap('32px'),
    '@media (max-width: 1024px)': {
      gridTemplateColumns: '1fr',
    }
  },
  glassPanel: {
    backgroundColor: 'var(--glass-bg)',
    backdropFilter: 'var(--glass-blur)',
    ...shorthands.border('1px', 'solid', 'var(--glass-border)'),
    ...shorthands.borderRadius('var(--radius-lg)'),
    padding: '32px',
    boxShadow: 'var(--shadow-md)',
  },
  formSection: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('24px'),
  },
  table: {
    '--fui-DataGrid-row-background': 'transparent',
  },
  itemRow: {
    height: '64px',
    ':hover': {
      backgroundColor: 'var(--color-primary-soft)',
    }
  },
  qtyInput: {
    width: '70px',
    height: '36px',
    ...shorthands.borderRadius('8px'),
  },
  summaryCard: {
    height: 'fit-content',
    position: 'sticky',
    top: '32px',
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('20px'),
  },
  totalSection: {
    ...shorthands.padding('20px', 0),
    ...shorthands.margin('8px', 0),
    borderTop: '1px solid var(--color-border)',
    borderBottom: '1px solid var(--color-border)',
  },
  totalLabel: {
    fontSize: '14px',
    color: 'var(--color-text-muted)',
    fontWeight: '600',
  },
  totalValue: {
    fontSize: '36px',
    fontWeight: '900',
    color: 'var(--color-primary)',
    letterSpacing: '-1px',
  },
  checkoutButton: {
    height: '56px',
    fontSize: '18px',
    fontWeight: '800',
    ...shorthands.borderRadius('16px'),
    boxShadow: '0 12px 24px -6px var(--color-primary-glow)',
    transition: 'all 0.3s ease',
    ':hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 20px 30px -8px var(--color-primary-glow)',
    }
  }
})

interface SaleItem {
  productId: string
  name: string
  quantity: number
  price: number
}

export const Sales: React.FC = () => {
  const styles = useStyles()
  const [selectedCustomerId, setSelectedCustomerId] = useState('')
  const [items, setItems] = useState<SaleItem[]>([])
  const [paymentMethod, setPaymentMethod] = useState('Cash')

  const customers = [
    { id: '1', name: 'Alice Smith' },
    { id: '2', name: 'Bob Johnson' },
  ]

  const products = [
    { id: '1', name: 'Coffee Beans', price: 15 },
    { id: '2', name: 'Milk', price: 3 },
  ]

  const addItem = () => {
    const product = products[Math.floor(Math.random() * products.length)]
    setItems([...items, { productId: product.id, name: product.name, quantity: 1, price: product.price }])
  }

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index))
  }

  const updateQuantity = (index: number, qty: number) => {
    const newItems = [...items]
    newItems[index].quantity = Math.max(1, qty)
    setItems(newItems)
  }

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  return (
    <div className={mergeClasses(styles.container, 'animate-fade-in')}>
      <div className={styles.header}>
        <CartRegular fontSize={32} color="var(--color-primary)" />
        <Title2 className={styles.title}>New Transaction</Title2>
      </div>
      
      <div className={styles.mainGrid}>
        <div className={mergeClasses(styles.glassPanel, styles.formSection)}>
          <Field label={
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <PersonRegular fontSize={16} />
              <Text weight="semibold">Customer Information</Text>
            </div>
          }>
            <Select 
              style={{ height: '44px', borderRadius: '12px' }}
              value={selectedCustomerId} 
              onChange={(e) => setSelectedCustomerId(e.target.value)}
            >
              <option value="">Walk-in Customer</option>
              {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </Select>
          </Field>

          <Divider />
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Subtitle1 style={{ fontWeight: 800 }}>Order Items</Subtitle1>
            <Button 
              icon={<AddRegular />} 
              appearance="subtle" 
              onClick={addItem}
              style={{ borderRadius: '8px' }}
            >
              Quick Add
            </Button>
          </div>

          <Table className={styles.table}>
            <TableHeader>
              <TableRow>
                <TableHeaderCell><Text weight="bold">Product</Text></TableHeaderCell>
                <TableHeaderCell style={{ width: '100px' }}><Text weight="bold">Qty</Text></TableHeaderCell>
                <TableHeaderCell style={{ width: '100px' }}><Text weight="bold">Total</Text></TableHeaderCell>
                <TableHeaderCell style={{ width: '48px' }}></TableHeaderCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.length === 0 ? (
                <TableRow>
                  <TableCell>
                    <Text weight="semibold" color="var(--color-text-muted)">Your cart is empty. Click "Quick Add" to start.</Text>
                  </TableCell>
                  <TableCell />
                  <TableCell />
                  <TableCell />
                </TableRow>
              ) : items.map((item, index) => (
                <TableRow key={index} className={styles.itemRow}>
                  <TableCell>
                    <TableCellLayout><Text weight="semibold">{item.name}</Text></TableCellLayout>
                  </TableCell>
                  <TableCell>
                    <Input 
                      className={styles.qtyInput}
                      type="number" 
                      value={item.quantity.toString()} 
                      onChange={(e) => updateQuantity(index, parseInt(e.target.value) || 0)}
                    />
                  </TableCell>
                  <TableCell>
                    <Text weight="bold">${(item.price * item.quantity).toFixed(2)}</Text>
                  </TableCell>
                  <TableCell>
                    <Button icon={<DeleteRegular />} appearance="subtle" onClick={() => removeItem(index)} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className={mergeClasses(styles.glassPanel, styles.summaryCard)}>
          <Subtitle1 style={{ fontWeight: 800 }}>Order Summary</Subtitle1>
          
          <Field label="Payment Method">
            <Select 
              style={{ height: '44px', borderRadius: '12px' }}
              value={paymentMethod} 
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option>Cash</option>
              <option>Mobile Money</option>
              <option>Card</option>
              <option>Crypto</option>
            </Select>
          </Field>

          <div className={styles.totalSection}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <Text color="var(--color-text-muted)">Subtotal</Text>
              <Text weight="semibold">${total.toFixed(2)}</Text>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <Text color="var(--color-text-muted)">Tax (0%)</Text>
              <Text weight="semibold">$0.00</Text>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <Text className={styles.totalLabel}>Payable Amount</Text>
              <Text className={styles.totalValue}>${total.toFixed(2)}</Text>
            </div>
          </div>

          <Button 
            className={styles.checkoutButton}
            appearance="primary" 
            icon={<MoneyRegular fontSize={24} />} 
            size="large" 
            disabled={items.length === 0}
          >
            Complete Sale
          </Button>
          
          <Text size={100} align="center" color="var(--color-text-muted)">
            Transaction ID will be generated upon completion
          </Text>
        </div>
      </div>
    </div>
  )
}
