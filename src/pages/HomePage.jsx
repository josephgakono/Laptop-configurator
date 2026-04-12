import { Link } from 'react-router-dom'
import FeaturedProductsSection from '../components/FeaturedProductsSection'
import {
  formatBuildName,
  formatCurrency,
  resolveSelections,
} from '../utils/calculations'

function HomePage({ savedBuilds }) {
  const latestBuild = savedBuilds[0]
  const latestSelections = latestBuild ? resolveSelections(latestBuild.config) : null
  const averagePrice =
    savedBuilds.length > 0
      ? Math.round(
          savedBuilds.reduce(
            (sum, build) => sum + build.stats.estimatedPrice,
            0,
          ) / savedBuilds.length,
        )
      : null

  return (
    <>
      <section className="section hero">
        <div className="container hero__grid">
          <div className="hero__copy">
            <p className="eyebrow">Find Your Next Laptop</p>
            <h1>Choose a laptop that matches the way you work, create, and move.</h1>
            <p className="hero__lede">
              Pick the power, memory, storage, finish, and body style that feel
              right for your day, then save the versions you want to compare
              before you decide.
            </p>
            <div className="hero__actions">
              <Link className="primary-button" to="/configurator">
                Build Yours
              </Link>
              <Link className="secondary-button" to="/saved-builds">
                View Saved Picks
              </Link>
            </div>
          </div>

          <div className="hero__summary panel-card">
            <div className="hero__summary-grid">
              <div>
                <span>Made around you</span>
                <strong>Power, finish, and fit</strong>
              </div>
              <div>
                <span>Clear tradeoffs</span>
                <strong>Price, speed, battery life</strong>
              </div>
              <div>
                <span>Saved for later</span>
                <strong>{savedBuilds.length} pick{savedBuilds.length === 1 ? '' : 's'}</strong>
              </div>
            </div>

            <div className="hero__saved-block">
              <h2>Your latest pick</h2>
              {latestBuild ? (
                <div className="hero__saved-highlight">
                  <strong>{formatBuildName(latestSelections)}</strong>
                  <span>{formatCurrency(latestBuild.stats.estimatedPrice)}</span>
                  <p>
                    Performance {latestBuild.stats.performanceScore} / Battery life{' '}
                    {latestBuild.stats.batteryScore}
                  </p>
                </div>
              ) : (
                <p className="hero__saved-empty">
                  Save a laptop you like and it will be waiting here for you.
                </p>
              )}

              {averagePrice ? (
                <p className="hero__saved-average">
                  Average saved price: {formatCurrency(averagePrice)}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading section-heading--split">
            <div>
              <p className="eyebrow">Plan With Confidence</p>
              <h2>Try different setups before you spend a thing.</h2>
            </div>
            <p className="section-copy">
              Explore the combinations that match your budget, your routine, and
              the look you want, then keep your favorites close for a final
              decision.
            </p>
          </div>

          <div className="info-grid">
            <article className="info-card">
              <h3>See the look</h3>
              <p>
                Switch finishes and body styles to get a better feel for the
                laptop you want.
              </p>
            </article>
            <article className="info-card">
              <h3>Match your routine</h3>
              <p>
                Balance speed, battery life, and price around work, study,
                travel, or gaming.
              </p>
            </article>
            <article className="info-card">
              <h3>Decide faster</h3>
              <p>
                Save your favorite setups and compare them side by side when
                you are ready.
              </p>
            </article>
          </div>
        </div>
      </section>

      <div className="container">
        <FeaturedProductsSection />
      </div>
    </>
  )
}

export default HomePage
