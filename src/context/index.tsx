import React, { useState } from 'react';
import { StateContext, IContextValue } from 'src/context/context';

function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [stepState, setStepState] = useState<Pick<IContextValue, 'formData'>>({
    formData: {
      0: undefined,
      1: {},
      2: {},
    },
  });

  const updateProgress = (newProgress: number) => {
    setCurrentStep(newProgress);
  };

  const updateFormData = (
    step: number,
    data: Pick<IContextValue, 'formData'>,
  ) => {
    console.log(data);

    setStepState(prevState => ({
      ...prevState,
      formData: {
        ...prevState.formData,
        [step]: data,
      },
    }));
  };

  const contextValue: IContextValue = {
    currentStep,
    setCurrentStep: updateProgress,
    formData: stepState.formData,
    updateFormData,
  };

  return (
    <StateContext.Provider value={contextValue}>
      {children}
    </StateContext.Provider>
  );
}

export default ProgressProvider;
