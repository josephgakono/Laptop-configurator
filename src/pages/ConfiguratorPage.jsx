import { useEffect, useState } from 'react'
import ConfigPanel from '../components/ConfigPanel'
import LaptopPreview from '../components/LaptopPreview'
import StatsPanel from '../components/StatsPanel'
import { defaultConfig } from '../data/configOptions'
import { calculateLaptopStats, createBuildRecord } from '../utils/calculations'

function ConfiguratorPage({
  draftConfig = defaultConfig,
  onSaveBuild,
  onUpdateDraftConfig,
  savedBuildCount,
}) {
  const [config, setConfig] = useState(draftConfig)
  const [saveMessage, setSaveMessage] = useState('')

  useEffect(() => {
    if (onUpdateDraftConfig) {
      onUpdateDraftConfig(config)
    }
  }, [config, onUpdateDraftConfig])

  const stats = calculateLaptopStats(config)

  const handleConfigChange = (key, value) => {
    setConfig((currentConfig) => ({
      ...currentConfig,
      [key]: value,
    }))
    setSaveMessage('')
  }

  const handleSaveBuild = () => {
    const build = createBuildRecord(config)
    onSaveBuild(build)
    setSaveMessage(`${build.name} is saved and ready to compare.`)
  }

  return (
    <section className="section">
      <div className="container">
        <div className="page-intro">
          <p className="eyebrow">Customize</p>
          <h1>Build the laptop that fits your day from the inside out.</h1>
          <p>
            Choose the setup you want, review the look, and keep an eye on
            price, performance, and battery life as you go.
          </p>
        </div>

        <div className="configurator-grid">
          <ConfigPanel config={config} onConfigChange={handleConfigChange} />
          <LaptopPreview config={config} />
          <StatsPanel
            stats={stats}
            onSaveBuild={handleSaveBuild}
            saveMessage={saveMessage}
            savedBuildCount={savedBuildCount}
          />
        </div>
      </div>
    </section>
  )
}

export default ConfiguratorPage
