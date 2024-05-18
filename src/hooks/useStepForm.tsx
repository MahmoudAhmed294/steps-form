import { useContext } from 'react';
import { StateContext } from 'src/context/context';

const useStepForm = () => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error('useStepState must be used within a StepProvider');
  }

  return context;
};

export default useStepForm;
