import { createContext } from 'react';
import {ValidationSchemaType} from 'src/components/signUpStep'
export interface IContextValue {
  currentStep: number;
  setCurrentStep: (newProgress: number) => void;
  formData: {
    0: ValidationSchemaType | undefined;
    1: Record<string, string>;
    2: Record<string, string>;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateFormData: (step: number, data: any) => void;
}

export const StateContext = createContext<IContextValue>({
  currentStep: 0,
  setCurrentStep: () => {},
  formData: {
    0: undefined,
    1: {},
    2: {},
  },
  updateFormData: () => {},
});
