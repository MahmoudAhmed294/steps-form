import React, { useContext } from 'react';
import { StateContext } from 'src/context/context';

export interface Step {
  icon: React.ComponentType;
  label?: string;
}

type StepControl = {
  currentStep: number;
  setCurrentStep: (newStep: number) => void;
  goToStep: (step: number) => void;
  isLastStep: boolean;
  isFirstStep: boolean;
};

export const useStepControl = (totalSteps: number = 4): StepControl => {
  const { currentStep, setCurrentStep } = useContext(StateContext);

  const goToStep = (step: number) => {
    if (step >= 0 && step < totalSteps) {
      setCurrentStep(step);
    } else {
      console.warn('Invalid step number. Ignoring.');
    }
  };

  return {
    currentStep,
    setCurrentStep,
    goToStep,
    isLastStep: currentStep === totalSteps - 1,
    isFirstStep: currentStep === 0,
  };
};
