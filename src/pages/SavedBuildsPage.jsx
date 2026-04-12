import { useState } from 'react'
import { Link } from 'react-router-dom'
import BuildCard from '../components/BuildCard'
import ComparisonTable from '../components/ComparisonTable'

function SavedBuildsPage({ savedBuilds, onDeleteBuild }) {
  const [selectedBuildIds, setSelectedBuildIds] = useState([])

  const handleToggleCompare = (buildId) => {
    setSelectedBuildIds((currentIds) => {
      const availableIds = currentIds.filter((id) =>
        savedBuilds.some((build) => build.id === id),
      )

      if (availableIds.includes(buildId)) {
        return availableIds.filter((id) => id !== buildId)
      }

      if (availableIds.length >= 3) {
        return availableIds
      }

      return [...availableIds, buildId]
    })
  }

  const activeSelectedIds = selectedBuildIds.filter((id) =>
    savedBuilds.some((build) => build.id === id),
  )

  const selectedBuilds = savedBuilds.filter((build) =>
    activeSelectedIds.includes(build.id),
  )

  if (savedBuilds.length === 0) {
    return (
      <section className="section">
        <div className="container">
          <div className="empty-state empty-state--large">
            <p className="eyebrow">Saved Picks</p>
            <h1>You have not saved a laptop yet.</h1>
            <p>
              Start with a setup you like, then come back here to compare your
              favorites in one place.
            </p>
            <Link className="primary-button" to="/configurator">
              Start Your Build
            </Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="section">
      <div className="container">
        <div className="page-intro">
          <p className="eyebrow">Saved Picks</p>
          <h1>Keep your favorite laptops in one place.</h1>
          <p>
            Compare up to three options side by side and narrow down the one
            that feels right.
          </p>
        </div>

        <ComparisonTable builds={selectedBuilds} />

        <div className="saved-builds__toolbar">
          <p>
            {activeSelectedIds.length} pick
            {activeSelectedIds.length === 1 ? '' : 's'} in comparison
          </p>
          <span>Choose up to three below.</span>
        </div>

        <div className="saved-builds__grid">
          {savedBuilds.map((build) => (
            <BuildCard
              key={build.id}
              build={build}
              isSelected={activeSelectedIds.includes(build.id)}
              compareDisabled={
                activeSelectedIds.length >= 3 &&
                !activeSelectedIds.includes(build.id)
              }
              onToggleCompare={handleToggleCompare}
              onDeleteBuild={onDeleteBuild}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default SavedBuildsPage
