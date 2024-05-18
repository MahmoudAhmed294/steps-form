import React from 'react';
import {
  PermIdentity,
  Apartment,
  PermMedia,
  VerifiedUserOutlined,
} from '@mui/icons-material';
import { useStepControl } from 'src/hooks/useSteps';

import './style.css';

interface Step {
  icon: React.ComponentType;
  label?: string;
}

const steps: Step[] = [
  { icon: PermIdentity },
  { icon: Apartment },
  { icon: PermMedia },
  { icon: VerifiedUserOutlined },
];

const StepsHeader: React.FC = () => {
  const { currentStep } = useStepControl();

  return (
    <div className='steps'>
      {/* @ts-expect-error  progress type  */}
      <div className='progress' progress={currentStep} />
      {steps.map((step, index) => (
        <div
          key={index}
          className={`icon cursor-pointer ${currentStep === index ? 'current' : currentStep > index && 'done'}`}
        >
          {step.icon && <step.icon />}
        </div>
      ))}
    </div>
  );
};

export default StepsHeader;
