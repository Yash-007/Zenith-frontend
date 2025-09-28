import './App.css'
import Layout from './components/layout/Layout'
import ChallengeList from './components/features/challenges/ChallengeList'

function App() {
  return (
    <Layout>
      <div>
        <div className="bg-gradient-to-b from-primary-100 via-secondary-50 to-white py-12 mb-8">
          <div className="text-center max-w-4xl mx-auto px-4">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Elevate Your Life with Zenith
            </h1>
            <p className="text-xl text-gray-600">
              Your journey to personal growth starts here. Complete daily challenges across physical, mental, 
              and personal dimensions. Track your progress, earn rewards, and become your best self.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4">
          <ChallengeList />
        </div>
      </div>
    </Layout>
  )
}

export default App
