import { TLink } from '../lib/site'
import RollText from '../components/RollText'
import Glyph from '../components/Glyph'

export default function NotFound() {
  return (
    <main id="main" className="not-found container">
      <Glyph name="pin" className="not-found__glyph" />
      <h1 className="display not-found__title">404</h1>
      <p className="not-found__text">This page wandered off the map.</p>
      <TLink to="/" className="pill"><RollText text="Back to index" /></TLink>
    </main>
  )
}
