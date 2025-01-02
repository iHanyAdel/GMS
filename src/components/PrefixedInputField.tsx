import React, { useState, useRef, useEffect } from 'react';

interface PrefixedInputFieldProps {
  label: string;
  id: string;
  prefix: string;
  value: string;
  onChange: (value: string) => void;
  maxLength: number;
  required?: boolean;
  disabled?: boolean;
  validate?: (value: string) => boolean;
}

export function PrefixedInputField({
  label,
  id,
  prefix,
  value,
  onChange,
  maxLength,
  required = false,
  disabled = false,
  validate
}: PrefixedInputFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleContainerClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
      const length = inputRef.current.value.length;
      inputRef.current.setSelectionRange(length, length);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    const selectionStart = input.selectionStart || 0;
    const prefixLength = prefix.length;

    if (
      (e.key === 'Backspace' || e.key === 'Delete') &&
      selectionStart <= prefixLength
    ) {
      e.preventDefault();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (newValue.startsWith(prefix)) {
      const numericPart = newValue.slice(prefix.length);
      if ((!validate || validate(numericPart)) && numericPart.length <= maxLength) {
        onChange(numericPart);
      }
    }
  };

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}{required && <span className="text-red-500">*</span>}
      </label>
      <div
        className={`mt-1 flex items-center border rounded-md shadow-sm ${
          isFocused ? 'ring-1 ring-blue-500 border-blue-500' : 'border-gray-300'
        }`}
        onClick={handleContainerClick}
      >
        <input
          ref={inputRef}
          type="text"
          id={id}
          value={`${prefix}${value}`}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="block w-full px-3 py-2 rounded-md focus:outline-none bg-transparent"
          required={required}
          disabled={disabled}
          maxLength={prefix.length + maxLength}
        />
      </div>
    </div>
  );
}