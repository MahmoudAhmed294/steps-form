import React from 'react';
import '../input/style.css';

interface IProps {
  label?: string;
  className?: string;
  errorMessage?: string | undefined;
  selectProps?: React.DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  >;
  placeholder?: string;
  inOtherComponent?: boolean;
  listOption: { id: number; label: string }[];
}

const Select = ({
  label,
  className,
  errorMessage,
  selectProps,
  placeholder,
  listOption,
  inOtherComponent,
}: IProps) => {
  return (
    <div
      className={`flex w-full flex-col ${className ?? ''} ${inOtherComponent ? '' : 'mb-2'}   `}
    >
      <div
        className={`input flex-col  ${errorMessage ? 'error' : ''} ${inOtherComponent && 'border-none'}`}
      >
        <div className={`flex ${inOtherComponent ? '' : 'pt-3'} flex-col`}>
          <label htmlFor={selectProps?.id}>{label}</label>
          <div className='flex  items-center justify-between'>
            <select
              {...selectProps}
              className={`${!placeholder && 'h-[52px]'}`}
            >
              {placeholder && (
                <option value='' className='text-gray-400'>
                  {placeholder}
                </option>
              )}
              {listOption.map(value => (
                <option key={value.id} value={value.id}>
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
