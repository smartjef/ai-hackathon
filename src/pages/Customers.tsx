import React, { useState } from 'react'
import { 
  makeStyles, 
  shorthands, 
  Button, 
  Input,
  DataGrid,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridBody,
  DataGridRow,
  DataGridCell,
  createTableColumn,
  TableCellLayout,
  Drawer,
  DrawerHeader,
  DrawerHeaderTitle,
  DrawerBody,
  Field,
  mergeClasses,
  Text
} from '@fluentui/react-components'
import { AddRegular, SearchRegular, DismissRegular, PeopleRegular } from '@fluentui/react-icons'

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
  searchAndAction: {
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap('16px'),
    flexWrap: 'wrap',
  },
  searchBar: {
    width: '300px',
    backgroundColor: 'var(--glass-bg)',
    ...shorthands.borderRadius('12px'),
  },
  addButton: {
    height: '42px',
    ...shorthands.borderRadius('12px'),
    fontWeight: '700',
    padding: '0 20px',
  },
  tableContainer: {
    backgroundColor: 'var(--glass-bg)',
    backdropFilter: 'var(--glass-blur)',
    ...shorthands.border('1px', 'solid', 'var(--glass-border)'),
    ...shorthands.borderRadius('var(--radius-lg)'),
    boxShadow: 'var(--shadow-md)',
    overflow: 'hidden',
    padding: '8px',
  },
  grid: {
    '--fui-DataGrid-row-background': 'transparent',
    '--fui-DataGrid-header-background': 'transparent',
  },
  row: {
    transition: 'all 0.2s ease',
    ':hover': {
      backgroundColor: 'var(--color-primary-soft)',
    }
  },
  headerCell: {
    fontWeight: '700',
    color: 'var(--color-text-base)',
    fontSize: '14px',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  cell: {
    fontSize: '15px',
    color: 'var(--color-text-base)',
  },
  drawer: {
    width: '100%',
    maxWidth: '440px',
    backgroundColor: 'var(--color-bg-base)',
    backgroundImage: 'radial-gradient(circle at 0% 0%, var(--color-primary-soft) 0%, transparent 50%)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('24px'),
    ...shorthands.padding('20px', '0'),
  },
  input: {
    height: '44px',
    ...shorthands.borderRadius('12px'),
  }
})

interface Customer {
  id: string
  name: string
  phone: string
  email: string
  totalPurchases: number
  lastVisit: string
}

const columns = [
  createTableColumn<Customer>({
    columnId: 'name',
    renderHeaderCell: () => 'Customer Name',
    renderCell: (item) => (
      <TableCellLayout media={<div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--color-primary-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)', fontWeight: 'bold' }}>{item.name[0]}</div>}>
        <Text weight="semibold">{item.name}</Text>
      </TableCellLayout>
    )
  }),
  createTableColumn<Customer>({
    columnId: 'phone',
    renderHeaderCell: () => 'Phone',
    renderCell: (item) => <Text font="monospace">{item.phone}</Text>
  }),
  createTableColumn<Customer>({
    columnId: 'totalPurchases',
    renderHeaderCell: () => 'Total Spend',
    renderCell: (item) => <Text weight="bold" color="var(--color-primary)">${item.totalPurchases}</Text>
  }),
  createTableColumn<Customer>({
    columnId: 'lastVisit',
    renderHeaderCell: () => 'Last Activity',
    renderCell: (item) => <Text size={200} color="var(--color-text-muted)">{item.lastVisit}</Text>
  })
]

export const Customers: React.FC = () => {
  const styles = useStyles()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const [customers] = useState<Customer[]>([
    { id: '1', name: 'Alice Smith', phone: '0712345678', email: 'alice@example.com', totalPurchases: 450, lastVisit: '2023-10-25' },
    { id: '2', name: 'Bob Johnson', phone: '0787654321', email: 'bob@example.com', totalPurchases: 120, lastVisit: '2023-11-02' },
    { id: '3', name: 'Charlie Brown', phone: '0755555555', email: 'charlie@example.com', totalPurchases: 890, lastVisit: '2023-10-30' },
  ])

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.phone.includes(searchQuery)
  )

  return (
    <div className={mergeClasses(styles.container, 'animate-fade-in')}>
      <div className={styles.header}>
        <div className={styles.title}>
          <PeopleRegular fontSize={32} color="var(--color-primary)" />
          Customers
        </div>
        <div className={styles.searchAndAction}>
          <Input 
            className={styles.searchBar}
            contentBefore={<SearchRegular />} 
            placeholder="Search by name or phone..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button 
            className={styles.addButton}
            icon={<AddRegular />} 
            appearance="primary" 
            onClick={() => setIsDrawerOpen(true)}
          >
            New Customer
          </Button>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <DataGrid items={filteredCustomers} columns={columns} selectionMode="single" className={styles.grid}>
          <DataGridHeader>
            <DataGridRow>
              {({ renderHeaderCell }) => (
                <DataGridHeaderCell className={styles.headerCell}>{renderHeaderCell()}</DataGridHeaderCell>
              )}
            </DataGridRow>
          </DataGridHeader>
          <DataGridBody<Customer>>
            {({ item, rowId }) => (
              <DataGridRow key={rowId} className={styles.row}>
                {({ renderCell }) => (
                  <DataGridCell className={styles.cell}>{renderCell(item)}</DataGridCell>
                )}
              </DataGridRow>
            )}
          </DataGridBody>
        </DataGrid>
      </div>

      <Drawer
        className={styles.drawer}
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
            Add New Customer
          </DrawerHeaderTitle>
        </DrawerHeader>
        <DrawerBody>
          <form className={styles.form}>
            <Field label="Full Name" required>
              <Input className={styles.input} required placeholder="e.g. Jane Foster" />
            </Field>
            <Field label="Phone Number" required>
              <Input className={styles.input} type="tel" required placeholder="07XX XXX XXX" />
            </Field>
            <Field label="Email Address">
              <Input className={styles.input} type="email" placeholder="jane@example.com" />
            </Field>
            <Button 
              appearance="primary" 
              className={styles.addButton}
              style={{ marginTop: '12px', height: '48px' }} 
              onClick={() => setIsDrawerOpen(false)}
            >
              Save Customer
            </Button>
          </form>
        </DrawerBody>
      </Drawer>
    </div>
  )
}
