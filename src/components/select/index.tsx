import React from 'react';
import '../input/style.css';

interface IProps {
  label: string;
  className?: string;
  errorMessage?: string | undefined;
  selectProps?: React.DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  >;
  placeholder: string;
  listOption: { key: string; label: string }[];
}

const Select = ({
  label,
  className,
  errorMessage,
  selectProps,
  placeholder,
  listOption,
}: IProps) => {
  return (
    <div className={`flex w-full flex-col ${className ?? ''} mb-2 `}>
      <div className={`input flex-col  ${errorMessage ? 'error' : ''}`}>
        <div className='flex flex-col pt-3'>
          <label htmlFor={selectProps?.id}>{label}</label>
          <div className='flex  items-center justify-between'>
            <select {...selectProps} defaultValue={''}>
              <option value='' className='text-gray-400'>
                {placeholder}
              </option>
              {listOption.map(value => (
                <option key={value.key} value={value.key}>
                  {value.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      {errorMessage && (
        <p className='ml-2 text-xs text-[#ff5f59]'>{errorMessage}</p>
      )}
    </div>
  );
};
export default Select;
