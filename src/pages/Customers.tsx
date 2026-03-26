import React, { useState } from 'react'
import { 
  makeStyles, 
  shorthands, 
  Title2, 
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
  Field
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
  searchBar: {
    width: '100%',
    maxWidth: '300px',
  },
  drawer: {
    width: '100%',
    maxWidth: '400px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('15px'),
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
    renderHeaderCell: () => 'Name',
    renderCell: (item) => <TableCellLayout>{item.name}</TableCellLayout>
  }),
  createTableColumn<Customer>({
    columnId: 'phone',
    renderHeaderCell: () => 'Phone',
    renderCell: (item) => item.phone
  }),
  createTableColumn<Customer>({
    columnId: 'totalPurchases',
    renderHeaderCell: () => 'Spend',
    renderCell: (item) => `$${item.totalPurchases}`
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
    <div className={styles.container}>
      <div className={styles.header}>
        <Title2>Customers</Title2>
        <Button icon={<AddRegular />} appearance="primary" onClick={() => setIsDrawerOpen(true)}>Add Customer</Button>
      </div>

      <div className={styles.searchBar}>
        <Input 
          contentBefore={<SearchRegular />} 
          placeholder="Search customers..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: '100%' }}
        />
      </div>

      <DataGrid items={filteredCustomers} columns={columns} selectionMode="single">
        <DataGridHeader>
          <DataGridRow>
            {({ renderHeaderCell }) => (
              <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
            )}
          </DataGridRow>
        </DataGridHeader>
        <DataGridBody<Customer>>
          {({ item, rowId }) => (
            <DataGridRow key={rowId}>
              {({ renderCell }) => (
                <DataGridCell>{renderCell(item)}</DataGridCell>
              )}
            </DataGridRow>
          )}
        </DataGridBody>
      </DataGrid>

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
              <Input required />
            </Field>
            <Field label="Phone Number" required>
              <Input type="tel" required />
            </Field>
            <Field label="Email Address">
              <Input type="email" />
            </Field>
            <Button appearance="primary" style={{ marginTop: '20px' }} onClick={() => setIsDrawerOpen(false)}>Save Customer</Button>
          </form>
        </DrawerBody>
      </Drawer>
    </div>
  )
}
