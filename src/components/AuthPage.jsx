import { useState } from 'react'

function AuthPage({ hasAccounts, onCreateAccount, onLogin }) {
  const [mode, setMode] = useState(hasAccounts ? 'login' : 'create')
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [errorMessage, setErrorMessage] = useState('')

  const isCreateMode = mode === 'create'

  const switchMode = (nextMode) => {
    setMode(nextMode)
    setFormValues({
      name: '',
      email: '',
      password: '',
    })
    setErrorMessage('')
  }

  const handleFieldChange = (field, value) => {
    setFormValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setErrorMessage('')

    try {
      if (isCreateMode) {
        onCreateAccount(formValues)
        return
      }

      onLogin(formValues)
    } catch (error) {
      setErrorMessage(error.message || 'Please try again.')
    }
  }

  return (
    <section className="auth-shell">
      <div className="container auth-layout">
        <div className="auth-copy">
          <p className="eyebrow">Welcome</p>
          <h1>
            {isCreateMode
              ? 'Create your account before you start building.'
              : 'Sign in to open your saved laptops.'}
          </h1>
          <p className="hero__lede">
            {isCreateMode
              ? 'Save your laptop builds, keep your latest setup close, and come back to it whenever you want.'
              : 'Pick up where you left off, review your saved choices, and keep refining the laptop that fits you best.'}
          </p>

          <div className="auth-copy__list">
            <div>
              <strong>Save your picks</strong>
              <span>Keep favorite laptops together under one account.</span>
            </div>
            <div>
              <strong>Return anytime</strong>
              <span>Your latest setup is ready when you come back.</span>
            </div>
            <div>
              <strong>Keep it simple</strong>
              <span>Just a name, email, and password to get started.</span>
            </div>
          </div>
        </div>

        <div className="panel-card auth-card">
          <div className="panel-card__header">
            <p className="eyebrow">
              {isCreateMode ? 'Create Account' : 'Sign In'}
            </p>
            <h2>
              {isCreateMode
                ? 'Set up your account to start exploring.'
                : 'Welcome back.'}
            </h2>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            {isCreateMode ? (
              <label className="auth-field">
                <span>Your Name</span>
                <input
                  autoComplete="name"
                  className="auth-input"
                  name="name"
                  required
                  type="text"
                  value={formValues.name}
                  onChange={(event) =>
                    handleFieldChange('name', event.target.value)
                  }
                />
              </label>
            ) : null}

            <label className="auth-field">
              <span>Email</span>
              <input
                autoComplete={isCreateMode ? 'email' : 'username'}
                className="auth-input"
                name="email"
                required
                type="email"
                value={formValues.email}
                onChange={(event) =>
                  handleFieldChange('email', event.target.value)
                }
              />
            </label>

            <label className="auth-field">
              <span>Password</span>
              <input
                autoComplete={isCreateMode ? 'new-password' : 'current-password'}
                className="auth-input"
                name="password"
                required
                type="password"
                value={formValues.password}
                onChange={(event) =>
                  handleFieldChange('password', event.target.value)
                }
              />
            </label>

            {errorMessage ? (
              <div className="auth-error">{errorMessage}</div>
            ) : null}

            <button className="primary-button primary-button--full" type="submit">
              {isCreateMode ? 'Create Account' : 'Sign In'}
            </button>
          </form>

          {hasAccounts ? (
            <button
              className="text-button auth-toggle"
              type="button"
              onClick={() =>
                switchMode(isCreateMode ? 'login' : 'create')
              }
            >
              {isCreateMode
                ? 'Already have an account? Sign in'
                : 'First time here? Create an account'}
            </button>
          ) : null}
        </div>
      </div>
    </section>
  )
}

export default AuthPage
