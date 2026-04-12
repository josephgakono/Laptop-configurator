import { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import AuthPage from './components/AuthPage'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import ConfiguratorPage from './pages/ConfiguratorPage'
import SavedBuildsPage from './pages/SavedBuildsPage'
import { defaultConfig } from './data/configOptions'
import {
  createAccount,
  hasStoredAccounts,
  loadCurrentSession,
  loginAccount,
  logoutAccount,
  saveAccountBuilds,
  saveAccountDraft,
} from './utils/storage'
import './App.css'

const initialSession = loadCurrentSession()

function App() {
  const [hasAccounts, setHasAccounts] = useState(initialSession.hasAccounts)
  const [currentAccount, setCurrentAccount] = useState(initialSession.account)
  const [savedBuilds, setSavedBuilds] = useState(initialSession.savedBuilds)
  const [draftConfig, setDraftConfig] = useState(
    initialSession.draftConfig ?? defaultConfig,
  )

  useEffect(() => {
    if (!currentAccount) {
      return
    }

    saveAccountBuilds(currentAccount.id, savedBuilds)
  }, [currentAccount, savedBuilds])

  useEffect(() => {
    if (!currentAccount) {
      return
    }

    saveAccountDraft(currentAccount.id, draftConfig)
  }, [currentAccount, draftConfig])

  const handleSaveBuild = (build) => {
    setSavedBuilds((currentBuilds) => [build, ...currentBuilds])
  }

  const handleDeleteBuild = (buildId) => {
    setSavedBuilds((currentBuilds) =>
      currentBuilds.filter((build) => build.id !== buildId),
    )
  }

  const handleCreateAccount = (formValues) => {
    const nextSession = createAccount(formValues)
    setHasAccounts(nextSession.hasAccounts)
    setCurrentAccount(nextSession.account)
    setSavedBuilds(nextSession.savedBuilds)
    setDraftConfig(nextSession.draftConfig ?? defaultConfig)
  }

  const handleLogin = (formValues) => {
    const nextSession = loginAccount(formValues)
    setHasAccounts(nextSession.hasAccounts)
    setCurrentAccount(nextSession.account)
    setSavedBuilds(nextSession.savedBuilds)
    setDraftConfig(nextSession.draftConfig ?? defaultConfig)
  }

  const handleSignOut = () => {
    logoutAccount()
    setCurrentAccount(null)
    setSavedBuilds([])
    setDraftConfig(defaultConfig)
    setHasAccounts(hasStoredAccounts())
  }

  if (!currentAccount) {
    return (
      <AuthPage
        hasAccounts={hasAccounts}
        onCreateAccount={handleCreateAccount}
        onLogin={handleLogin}
      />
    )
  }

  return (
    <div className="app-shell">
      <Navbar
        currentAccount={currentAccount}
        onSignOut={handleSignOut}
        savedBuildCount={savedBuilds.length}
      />
      <main className="page-shell">
        <Routes>
          <Route path="/" element={<HomePage savedBuilds={savedBuilds} />} />
          <Route
            path="/configurator"
            element={
              <ConfiguratorPage
                draftConfig={draftConfig}
                onSaveBuild={handleSaveBuild}
                onUpdateDraftConfig={setDraftConfig}
                savedBuildCount={savedBuilds.length}
              />
            }
          />
          <Route
            path="/saved-builds"
            element={
              <SavedBuildsPage
                savedBuilds={savedBuilds}
                onDeleteBuild={handleDeleteBuild}
              />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
