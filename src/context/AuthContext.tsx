import React, { createContext, useContext, useState, useEffect } from 'react'

interface User {
  id: string
  name: string
  email: string
  businessName: string
  businessCategory: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (data: any) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)

  // Mock checking for existing session
  useEffect(() => {
    const savedUser = sessionStorage.getItem('user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const login = async (email: string, _password: string) => {
    // Mock login
    const mockUser: User = {
      id: '1',
      name: 'John Doe',
      email: email,
      businessName: 'My Awesome Shop',
      businessCategory: 'Retail',
    }
    setUser(mockUser)
    sessionStorage.setItem('user', JSON.stringify(mockUser))
  }

  const register = async (data: any) => {
    // Mock register
    const mockUser: User = {
      id: '2',
      name: data.name,
      email: data.email,
      businessName: data.businessName,
      businessCategory: data.businessCategory,
    }
    setUser(mockUser)
    sessionStorage.setItem('user', JSON.stringify(mockUser))
  }

  const logout = () => {
    setUser(null)
    sessionStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
