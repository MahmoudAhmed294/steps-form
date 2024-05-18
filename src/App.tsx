import { BrowserRouter, Route, Routes } from 'react-router-dom';
import StepperPage from 'src/components/stepperPage';
import Success from 'src/components/succsess';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<StepperPage />} path='/' />
        <Route element={<Success />} path='/success' />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
