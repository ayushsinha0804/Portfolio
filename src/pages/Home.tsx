import ProjectBelt from '../components/ProjectBelt'
import { useDocumentTitle } from '../lib/title'

export default function Home() {
  useDocumentTitle('Ayush Sinha — Full-stack developer')
  return (
    <main id="main" className="home">
      <h1 className="visually-hidden">Ayush Sinha — full-stack developer building across backend, frontend and deployment</h1>
      <ProjectBelt />
    </main>
  )
}
