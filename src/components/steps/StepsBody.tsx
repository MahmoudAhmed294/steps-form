import React, { useMemo } from 'react';
import { useStepControl } from 'src/hooks/useSteps';
import SignUpStep from 'src/components/signUpStep';
import AddressStep from 'src/components/addressStep';
import UploadImageStep from 'src/components/uploadImageStep';
import ConfirmStep from 'src/components/confirmStep';

const StepsBody = () => {
  const memoStepsCompany: {
    [key: number]: {
      component: React.JSX.Element;
      title: string;
    };
  } = useMemo(() => {
    return {
      0: { component: <SignUpStep />, title: 'Tell us more about you' },
      1: { component: <AddressStep />, title: 'Verify your company' },
      2: { component: <UploadImageStep />, title: 'upload Company Logo' },
      3: { component: <ConfirmStep />, title: "you're all set. Ready?" },
    };
  }, []);
  const { currentStep } = useStepControl();

  return (
    <div>
      <h1 className='mb-3 text-center text-xl font-bold text-gray-600'>
        {memoStepsCompany[currentStep].title}
      </h1>
      <div>{memoStepsCompany[currentStep].component}</div>
    </div>
  );
};

export default StepsBody;
