import React, { useState } from 'react'
import { 
  makeStyles, 
  shorthands, 
  Title2, 
  Button, 
  tokens,
  Input, 
  Drawer,
  DrawerHeader,
  DrawerHeaderTitle,
  DrawerBody,
  Card,
  CardHeader,
  Caption1,
  Badge,
  Field,
  Select,
  Text
} from '@fluentui/react-components'
import { AddRegular, SearchRegular, DismissRegular } from '@fluentui/react-icons'

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('20px'),
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    ...shorthands.gap('10px'),
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
    ...shorthands.gap('15px'),
  },
  productCard: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('8px'),
  },
  imagePlaceholder: {
    height: '100px',
    backgroundColor: tokens.colorNeutralBackground2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '40px',
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('15px'),
  }
})

interface Product {
  id: string
  name: string
  category: string
  price: number
  stock: number
  unit: string
  emoji: string
}

export const Products: React.FC = () => {
  const styles = useStyles()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const [products] = useState<Product[]>([
    { id: '1', name: 'Coffee Beans', category: 'Food', price: 15, stock: 24, unit: 'kg', emoji: '🫘' },
    { id: '2', name: 'Milk', category: 'Food', price: 3, stock: 4, unit: 'litre', emoji: '🥛' },
    { id: '3', name: 'Paper Cups', category: 'Supplies', price: 0.1, stock: 500, unit: 'piece', emoji: '🥤' },
    { id: '4', name: 'Sugar', category: 'Food', price: 2, stock: 15, unit: 'kg', emoji: '🍬' },
  ])

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Title2>Products</Title2>
        <Button icon={<AddRegular />} appearance="primary" onClick={() => setIsDrawerOpen(true)}>Add Product</Button>
      </div>

      <div style={{ maxWidth: '300px' }}>
        <Input 
          contentBefore={<SearchRegular />} 
          placeholder="Search products..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: '100%' }}
        />
      </div>

      <div className={styles.grid}>
        {filteredProducts.map(product => (
          <Card key={product.id} className={styles.productCard}>
            <div className={styles.imagePlaceholder}>{product.emoji}</div>
            <CardHeader 
              header={<Text weight="semibold">{product.name}</Text>}
              description={<Caption1>{product.category}</Caption1>}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text weight="bold">${product.price}</Text>
              <Badge color={product.stock < 5 ? 'danger' : 'important'}>
                Stock: {product.stock}
              </Badge>
            </div>
          </Card>
        ))}
      </div>

      <Drawer
        open={isDrawerOpen}
        onOpenChange={(_, { open }) => setIsDrawerOpen(open)}
        position="end"
      >
        <DrawerHeader>
          <DrawerHeaderTitle
            action={
              <Button
                appearance="subtle"
                aria-label="Close"
                icon={<DismissRegular />}
                onClick={() => setIsDrawerOpen(false)}
              />
            }
          >
            Add New Product
          </DrawerHeaderTitle>
        </DrawerHeader>
        <DrawerBody>
          <form className={styles.form}>
            <Field label="Product Name" required>
              <Input required />
            </Field>
            <Field label="Category">
              <Select>
                <option>Food</option>
                <option>Supplies</option>
                <option>Electronics</option>
                <option>Other</option>
              </Select>
            </Field>
            <Field label="Price" required>
              <Input type="number" required contentBefore="$" />
            </Field>
            <Field label="Initial Stock" required>
              <Input type="number" required />
            </Field>
            <Field label="Unit">
              <Select>
                <option>piece</option>
                <option>kg</option>
                <option>litre</option>
              </Select>
            </Field>
            <Button appearance="primary" style={{ marginTop: '20px' }} onClick={() => setIsDrawerOpen(false)}>Save Product</Button>
          </form>
        </DrawerBody>
      </Drawer>
    </div>
  )
}
