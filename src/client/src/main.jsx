import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import QuizForm from './components/QuizForm.jsx'
import {QuizFormProvider} from './context/QuizFormContext.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>
  },
  {
    path: '/create/quiz',
    element:
    <>
      <QuizFormProvider>
        <QuizForm/>
      </QuizFormProvider>
    </>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
