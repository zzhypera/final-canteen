import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { ID_NUMBER_PATTERN, seedUsers } from '../data/users'

const SESSION_KEY = 'canteen_user'
const TOKEN_KEY = 'canteen_token'
const ACCOUNTS_KEY = 'canteen_accounts'

function readJSON(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key) || 'null') ?? fallback
  } catch {
    return fallback
  }
}

// Remove the password before keeping a user in the session.
function toSession(account) {
  return { idNumber: account.idNumber, name: account.name, role: account.role }
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref(readJSON(SESSION_KEY, null))
  const token = ref(localStorage.getItem(TOKEN_KEY) || '')
  // Accounts created through the Register page (students only)
  const registered = ref(readJSON(ACCOUNTS_KEY, []))

  const isAuthenticated = computed(() => !!token.value && !!user.value)
  const isAdmin = computed(() => user.value?.role === 'admin')

  const accounts = computed(() => [...seedUsers, ...registered.value])
  const students = computed(() => accounts.value.filter(a => a.role === 'student'))

  function startSession(account) {
    user.value = toSession(account)
    token.value = `session-${account.idNumber}`
    localStorage.setItem(TOKEN_KEY, token.value)
    localStorage.setItem(SESSION_KEY, JSON.stringify(user.value))
  }

  function login(idNumber, password) {
    const id = String(idNumber || '').trim()
    if (!id || !password) throw new Error('Please enter your ID number and password.')
    if (!ID_NUMBER_PATTERN.test(id)) throw new Error('ID number must be 5 digits (example: 18101).')

    const account = accounts.value.find(a => a.idNumber === id && a.password === password)
    if (!account) throw new Error('Incorrect ID number or password.')

    startSession(account)
    return user.value
  }

  function register(name, idNumber, password) {
    const fullName = String(name || '').trim()
    const id = String(idNumber || '').trim()

    if (!fullName || !id || !password) throw new Error('Please complete all required fields.')
    if (!ID_NUMBER_PATTERN.test(id)) throw new Error('ID number must be 5 digits (example: 18101).')
    if (password.length < 6) throw new Error('Password must be at least 6 characters.')
    if (accounts.value.some(a => a.idNumber === id)) throw new Error('That ID number is already registered.')

    // Self-registration always creates a student account. Admin accounts are seeded only.
    const account = { idNumber: id, name: fullName, role: 'student', password }
    registered.value.push(account)
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(registered.value))

    startSession(account)
    return user.value
  }

  function logout() {
    token.value = ''
    user.value = null
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(SESSION_KEY)
  }

  return { user, token, isAuthenticated, isAdmin, accounts, students, login, register, logout }
})
