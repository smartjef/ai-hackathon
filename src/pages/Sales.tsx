import React, { useState } from 'react'
import { 
  makeStyles, 
  shorthands, 
  Title2, 
  Button, 
  tokens,
  Input,
  Card,
  Select,
  Field,
  Subtitle1,
  Body1,
  Divider,
  Table,
  TableHeader,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  TableCellLayout
} from '@fluentui/react-components'
import { AddRegular, DeleteRegular, MoneyRegular } from '@fluentui/react-icons'

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('20px'),
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('15px'),
  },
  row: {
    display: 'flex',
    ...shorthands.gap('10px'),
    alignItems: 'flex-end',
  },
  summary: {
    ...shorthands.margin('20px', '0', '0', '0'),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    ...shorthands.gap('5px'),
  },
  total: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: tokens.colorBrandForeground1,
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

  // Mock data for selection
  const customers = [
    { id: '1', name: 'Alice Smith' },
    { id: '2', name: 'Bob Johnson' },
  ]

  const products = [
    { id: '1', name: 'Coffee Beans', price: 15 },
    { id: '2', name: 'Milk', price: 3 },
  ]

  const addItem = () => {
    const product = products[0]
    setItems([...items, { productId: product.id, name: product.name, quantity: 1, price: product.price }])
  }

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index))
  }

  const updateQuantity = (index: number, qty: number) => {
    const newItems = [...items]
    newItems[index].quantity = qty
    setItems(newItems)
  }

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  return (
    <div className={styles.container}>
      <Title2>New Sale</Title2>
      
      <Card>
        <div className={styles.formContainer}>
          <Field label="Select Customer">
            <Select value={selectedCustomerId} onChange={(e) => setSelectedCustomerId(e.target.value)}>
              <option value="">Walk-in Customer</option>
              {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </Select>
          </Field>

          <Divider />
          
          <Subtitle1>Items</Subtitle1>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderCell>Product</TableHeaderCell>
                <TableHeaderCell style={{ width: '80px' }}>Qty</TableHeaderCell>
                <TableHeaderCell style={{ width: '100px' }}>Total</TableHeaderCell>
                <TableHeaderCell style={{ width: '50px' }}></TableHeaderCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <TableCellLayout>{item.name}</TableCellLayout>
                  </TableCell>
                  <TableCell>
                    <Input 
                      type="number" 
                      value={item.quantity.toString()} 
                      onChange={(e) => updateQuantity(index, parseInt(e.target.value) || 0)}
                      style={{ width: '60px' }}
                    />
                  </TableCell>
                  <TableCell>
                    ${(item.price * item.quantity).toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Button icon={<DeleteRegular />} appearance="subtle" onClick={() => removeItem(index)} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Button icon={<AddRegular />} onClick={addItem}>Add Item</Button>

          <Divider />

          <div className={styles.row}>
            <Field label="Payment Method" style={{ flexGrow: 1 }}>
              <Select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                <option>Cash</option>
                <option>Mobile Money</option>
                <option>Card</option>
              </Select>
            </Field>
          </div>

          <div className={styles.summary}>
            <Body1>Subtotal: ${total.toFixed(2)}</Body1>
            <div className={styles.total}>Total: ${total.toFixed(2)}</div>
          </div>

          <Button appearance="primary" icon={<MoneyRegular />} size="large" disabled={items.length === 0}>
            Complete Sale
          </Button>
        </div>
      </Card>
    </div>
  )
}
