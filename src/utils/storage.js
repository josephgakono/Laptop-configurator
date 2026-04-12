const LEGACY_BUILDS_KEY = 'smart-laptop-configurator-builds'
const ACCOUNTS_KEY = 'laptop-studio-accounts'
const SESSION_KEY = 'laptop-studio-session'

function canUseStorage() {
  return typeof window !== 'undefined'
}

function readJson(key, fallbackValue) {
  if (!canUseStorage()) {
    return fallbackValue
  }

  try {
    const rawValue = window.localStorage.getItem(key)
    if (!rawValue) {
      return fallbackValue
    }

    return JSON.parse(rawValue)
  } catch (error) {
    console.error(`Unable to read ${key} from storage.`, error)
    return fallbackValue
  }
}

function writeJson(key, value) {
  if (!canUseStorage()) {
    return
  }

  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error(`Unable to save ${key} to storage.`, error)
  }
}

function createId(prefix) {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }

  return `${prefix}-${Date.now()}-${Math.round(Math.random() * 10000)}`
}

function normalizeEmail(email) {
  return email.trim().toLowerCase()
}

function loadAccounts() {
  const parsedAccounts = readJson(ACCOUNTS_KEY, [])
  return Array.isArray(parsedAccounts) ? parsedAccounts : []
}

function saveAccounts(accounts) {
  writeJson(ACCOUNTS_KEY, accounts)
}

function sanitizeAccount(account) {
  if (!account) {
    return null
  }

  const { password: _password, savedBuilds: _savedBuilds, draftConfig: _draftConfig, ...publicAccount } = account
  return publicAccount
}

function buildSession(account, hasAccounts) {
  return {
    hasAccounts,
    account: sanitizeAccount(account),
    savedBuilds: Array.isArray(account?.savedBuilds) ? account.savedBuilds : [],
    draftConfig: account?.draftConfig ?? null,
  }
}

function updateAccount(accountId, updater) {
  const accounts = loadAccounts()
  const accountIndex = accounts.findIndex((account) => account.id === accountId)

  if (accountIndex === -1) {
    return
  }

  accounts[accountIndex] = updater(accounts[accountIndex])
  saveAccounts(accounts)
}

function loadLegacyBuilds() {
  const parsedBuilds = readJson(LEGACY_BUILDS_KEY, [])
  return Array.isArray(parsedBuilds) ? parsedBuilds : []
}

export function hasStoredAccounts() {
  return loadAccounts().length > 0
}

export function loadCurrentSession() {
  const accounts = loadAccounts()
  const hasAccounts = accounts.length > 0

  if (!canUseStorage()) {
    return buildSession(null, hasAccounts)
  }

  const sessionAccountId = window.localStorage.getItem(SESSION_KEY)
  const currentAccount =
    accounts.find((account) => account.id === sessionAccountId) ?? null

  if (sessionAccountId && !currentAccount) {
    window.localStorage.removeItem(SESSION_KEY)
  }

  return buildSession(currentAccount, hasAccounts)
}

export function createAccount({ name, email, password }) {
  const trimmedName = name.trim()
  const normalizedEmail = normalizeEmail(email)
  const nextPassword = password.trim()
  const accounts = loadAccounts()

  if (!trimmedName) {
    throw new Error('Enter your name to create an account.')
  }

  if (!normalizedEmail) {
    throw new Error('Enter your email address to create an account.')
  }

  if (!nextPassword) {
    throw new Error('Choose a password before continuing.')
  }

  if (accounts.some((account) => account.email === normalizedEmail)) {
    throw new Error('An account with that email already exists.')
  }

  const importedBuilds = accounts.length === 0 ? loadLegacyBuilds() : []
  const nextAccount = {
    id: createId('account'),
    name: trimmedName,
    email: normalizedEmail,
    password: nextPassword,
    createdAt: new Date().toISOString(),
    savedBuilds: importedBuilds,
    draftConfig: null,
  }

  const nextAccounts = [nextAccount, ...accounts]
  saveAccounts(nextAccounts)

  if (canUseStorage()) {
    window.localStorage.setItem(SESSION_KEY, nextAccount.id)
  }

  return buildSession(nextAccount, true)
}

export function loginAccount({ email, password }) {
  const normalizedEmail = normalizeEmail(email)
  const nextPassword = password.trim()
  const accounts = loadAccounts()
  const matchingAccount = accounts.find(
    (account) => account.email === normalizedEmail,
  )

  if (!matchingAccount || matchingAccount.password !== nextPassword) {
    throw new Error('That email or password did not match.')
  }

  if (canUseStorage()) {
    window.localStorage.setItem(SESSION_KEY, matchingAccount.id)
  }

  return buildSession(matchingAccount, accounts.length > 0)
}

export function logoutAccount() {
  if (!canUseStorage()) {
    return
  }

  window.localStorage.removeItem(SESSION_KEY)
}

export function saveAccountBuilds(accountId, builds) {
  updateAccount(accountId, (account) => ({
    ...account,
    savedBuilds: Array.isArray(builds) ? builds : [],
  }))
}

export function saveAccountDraft(accountId, draftConfig) {
  updateAccount(accountId, (account) => ({
    ...account,
    draftConfig,
  }))
}
