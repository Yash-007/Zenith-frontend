import './App.css'
import Layout from './components/layout/Layout'
import ChallengeList from './components/features/challenges/ChallengeList'

function App() {
  return (
    <Layout>
      <div className="space-y-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Elevate Your Life with Zenith
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your journey to personal growth starts here. Complete daily challenges across physical, mental, 
            and personal dimensions. Track your progress, earn rewards, and become your best self.
          </p>
        </div>

        <ChallengeList />
      </div>
    </Layout>
  )
}

export default App
