import React, { useState } from 'react'
import { 
  makeStyles, 
  shorthands, 
  Button, 
  Input, 
  Drawer,
  DrawerHeader,
  DrawerHeaderTitle,
  DrawerBody,
  Badge,
  Field,
  Select,
  Text,
  mergeClasses
} from '@fluentui/react-components'
import { AddRegular, SearchRegular, DismissRegular, BoxRegular } from '@fluentui/react-icons'

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('32px'),
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    ...shorthands.gap('20px'),
  },
  title: {
    fontSize: '32px',
    fontWeight: '900',
    letterSpacing: '-1px',
    color: 'var(--color-text-base)',
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap('12px'),
  },
  searchBar: {
    width: '300px',
    backgroundColor: 'var(--glass-bg)',
    ...shorthands.borderRadius('12px'),
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    ...shorthands.gap('24px'),
  },
  productCard: {
    padding: '16px',
    backgroundColor: 'var(--glass-bg)',
    backdropFilter: 'var(--glass-blur)',
    ...shorthands.border('1px', 'solid', 'var(--glass-border)'),
    ...shorthands.borderRadius('var(--radius-lg)'),
    boxShadow: 'var(--shadow-md)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    ':hover': {
      transform: 'translateY(-8px)',
      boxShadow: 'var(--shadow-lg)',
      ...shorthands.borderColor('var(--color-primary-soft)'),
    }
  },
  emojiContainer: {
    height: '140px',
    backgroundColor: 'var(--color-bg-ai)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '64px',
    ...shorthands.borderRadius('16px'),
    ...shorthands.margin(0, 0, '16px', 0),
    transition: 'transform 0.3s ease',
  },
  priceTag: {
    fontSize: '20px',
    fontWeight: '800',
    color: 'var(--color-primary)',
  },
  stockBadge: {
    ...shorthands.borderRadius('8px'),
    padding: '4px 10px',
    fontWeight: '700',
  },
  drawer: {
    width: '440px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('20px'),
    ...shorthands.padding('20px', 0),
  },
  input: {
    height: '44px',
    ...shorthands.borderRadius('12px'),
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
    <div className={mergeClasses(styles.container, 'animate-fade-in')}>
      <div className={styles.header}>
        <div className={styles.title}>
          <BoxRegular fontSize={32} color="var(--color-primary)" />
          Inventory
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <Input 
            className={styles.searchBar}
            contentBefore={<SearchRegular />} 
            placeholder="Search products..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button 
            icon={<AddRegular />} 
            appearance="primary" 
            style={{ borderRadius: '12px', fontWeight: 'bold' }}
            onClick={() => setIsDrawerOpen(true)}
          >
            Add Product
          </Button>
        </div>
      </div>

      <div className={styles.grid}>
        {filteredProducts.map(product => (
          <div key={product.id} className={styles.productCard}>
            <div className={styles.emojiContainer}>{product.emoji}</div>
            <div style={{ padding: '0 4px' }}>
              <Text size={500} weight="bold" block>{product.name}</Text>
              <Text size={200} color="var(--color-text-muted)" block>{product.category}</Text>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
                <Text className={styles.priceTag}>${product.price}</Text>
                <Badge 
                  className={styles.stockBadge}
                  color={product.stock < 5 ? 'danger' : 'important'}
                  appearance="tint"
                >
                  {product.stock} in stock
                </Badge>
              </div>
            </div>
          </div>
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
              <Input className={styles.input} required placeholder="e.g. Espresso Beans" />
            </Field>
            <Field label="Category">
              <Select className={styles.input}>
                <option>Food</option>
                <option>Supplies</option>
                <option>Electronics</option>
                <option>Other</option>
              </Select>
            </Field>
            <Field label="Price" required>
              <Input className={styles.input} type="number" required contentBefore="$" />
            </Field>
            <Field label="Initial Stock" required>
              <Input className={styles.input} type="number" required />
            </Field>
            <Field label="Unit">
              <Select className={styles.input}>
                <option>piece</option>
                <option>kg</option>
                <option>litre</option>
              </Select>
            </Field>
            <Button 
              appearance="primary" 
              style={{ marginTop: '20px', height: '48px', borderRadius: '12px', fontWeight: 'bold' }} 
              onClick={() => setIsDrawerOpen(false)}
            >
              Save Product
            </Button>
          </form>
        </DrawerBody>
      </Drawer>
    </div>
  )
}
