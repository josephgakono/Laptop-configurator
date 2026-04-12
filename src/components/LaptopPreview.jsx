import { resolvePreviewImage } from '../data/previewImages'
import { resolveSelections } from '../utils/calculations'

function LaptopPreview({ config }) {
  const selections = resolveSelections(config)
  const previewImage = resolvePreviewImage(config, selections)

  return (
    <section className="panel-card preview-panel">
      <div className="panel-card__header panel-card__header--centered">
        <p className="eyebrow">Your Preview</p>
        <h2>See your laptop take shape as you make each choice.</h2>
      </div>

      <div className="laptop-stage">
        <div
          className="laptop-stage__glow"
          style={{ backgroundColor: selections.color.accent }}
        />
        <div className="laptop-preview">
          <img
            key={`${previewImage.src}-${config.color}-${config.chassis}`}
            className="laptop-preview__image"
            src={previewImage.src}
            alt={previewImage.alt}
            style={{ filter: previewImage.filter }}
          />
        </div>
      </div>

      <div className="preview-specs">
        <div>
          <span>Finish</span>
          <strong>{selections.color.label}</strong>
        </div>
        <div>
          <span>Body Style</span>
          <strong>{selections.chassis.label}</strong>
        </div>
      </div>

      <p className="preview-note">{previewImage.note}</p>
    </section>
  )
}

export default LaptopPreview
