import { createContext } from 'react';
import { ValidationAddressSchemaType } from 'src/components/addressStep';
import { ValidationSchemaType } from 'src/components/signUpStep';
import { ValidationUploadImageSchemaType } from 'src/components/uploadImageStep';
export interface IContextValue {
  currentStep: number;
  setCurrentStep: (newProgress: number) => void;
  formData: {
    0: ValidationSchemaType | undefined;
    1: ValidationAddressSchemaType | undefined;
    2: ValidationUploadImageSchemaType | undefined;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateFormData: (step: number, data: any) => void;
}

export const StateContext = createContext<IContextValue>({
  currentStep: 0,
  setCurrentStep: () => {},
  formData: {
    0: undefined,
    1: undefined,
    2: undefined,
  },
  updateFormData: () => {},
});
