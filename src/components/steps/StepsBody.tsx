import React from 'react';
import { useStepControl } from 'src/hooks/useSteps';
import SignUpStep from 'src/components/signUpStep';
import AddressStep from 'src/components/addressStep';
import UploadImageStep from 'src/components/uploadImageStep';
import ConfirmStep from 'src/components/confirmStep';

const stepsCompany: {
  [key: number]: {
    component: React.JSX.Element;
    title: string;
  };
} = {
  0: { component: <SignUpStep />, title: 'Tell us more about you' },
  1: { component: <AddressStep />, title: 'Verify your company' },
  2: { component: <UploadImageStep />, title: 'upload Company Logo' },
  3: { component: <ConfirmStep />, title: "you're all set. Ready?" },
};

const StepsBody = () => {
  const { currentStep } = useStepControl();

  return (
    <div>
      <h1 className='mb-3 text-center text-xl font-bold text-gray-600'>
        {stepsCompany[currentStep].title}
      </h1>
      <div>{stepsCompany[currentStep]?.component}</div>
    </div>
  );
};

export default StepsBody;
