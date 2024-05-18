/* eslint-disable @typescript-eslint/no-explicit-any */
import './style.css';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
interface IProps {
  label: string;
  className?: string;
  errorMessage?: string | undefined;
  inputProps?: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
  left?: string | React.ReactNode;
  right?: string | React.ReactNode;
}

const Input = ({
  label,
  className,
  errorMessage,
  inputProps,
  left,
  right,
}: IProps) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className={`flex w-full flex-col ${className ?? ''} mb-2 `}>
      <div
        className={`input ${left ? 'flex-row' : 'flex-col'} ${errorMessage ? 'error' : ''} `}
      >
        {left && <div className='left'>{left}</div>}
        <div className='flex items-center justify-between'>
          <div className='flex w-full flex-col pt-3'>
            <label htmlFor={inputProps?.id} className='w-fit'>
              {label}
            </label>
            <div className='flex items-center justify-between'>
              <input
                {...inputProps}
                type={isVisible ? 'text' : inputProps?.type}
              />
              {inputProps?.type === 'password' && (
                <button
                  className='mr-4'
                  onClick={() => setIsVisible(prev => !prev)}
                >
                  {isVisible ? (
                    <VisibilityOffIcon sx={{ fill: '#777' }} />
                  ) : (
                    <VisibilityIcon sx={{ fill: '#777' }} />
                  )}
                </button>
              )}
            </div>
          </div>
          {right && <div className='w-2/12 border-l'>{right}</div>}
        </div>
      </div>
      {errorMessage && (
        <p className='ml-2 text-xs  text-[#ff5f59]'>{errorMessage}</p>
      )}
    </div>
  );
};
export default Input;
