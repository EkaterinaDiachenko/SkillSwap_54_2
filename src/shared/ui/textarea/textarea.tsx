import { forwardRef, useRef, useId, useImperativeHandle } from "react";
import { type TextareaHTMLAttributes } from 'react';
import { IconButton } from "../icon-button";
import { Icon } from "../icon";
import clsx from "clsx";
import styles from './textarea.module.css'

export type TextareaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'value' | 'onChange' | 'className'> & {
  label?: string;
  error?: string;
  className?: string;
  value: string;
  onChange: (newValue: string) => void;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea({
  label,
  placeholder,
  maxLength,
  disabled,
  error,
  className,
  id,
  value,
  onChange,
  ...rest
}, ref) {
  const generatedId = useId();
  const textareaId = id ?? generatedId;
  const helperId = `${textareaId}-helper`;
  const hasValue = value.length > 0;
  const hasError = Boolean(error);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  useImperativeHandle(ref, () => textAreaRef.current!, [])

  const handleClear = () => {
    onChange('');
    textAreaRef.current?.focus();
  }

  return (
    <div className={clsx(styles.root, className)}>
      {label && (<label htmlFor={textareaId} className={styles.label}>{label}</label>
      )}
      <div className={clsx(
        styles.field,
        hasError && styles.fieldError,
        disabled && styles.fieldDisabled,
      )}
      >
        <textarea {...rest} ref={textAreaRef} id={textareaId} aria-describedby={error ? helperId : undefined} placeholder={placeholder} maxLength={maxLength} disabled={disabled} className={styles.textarea} aria-invalid={error ? true : undefined} onChange={(event) => onChange(event.target.value)} value={value} />
        <Icon name='edit' className={styles.icon} />
        {(hasValue && !disabled) && (
          <IconButton onClick={handleClear} aria-label="Очистить текст" iconName="cross" className={styles.buttonReset} />
        )}
      </div>
      {(error || maxLength !== undefined) && (
        <div className={styles.bottomRow}>
          {error && (
            <span className={styles.errorText} id={helperId}>
              {error}
            </span>
          )}
          {maxLength !== undefined && (
            <span className={styles.counter}>
              {value.length} / {maxLength}
            </span>
          )}
        </div>
      )}
    </div>
  )
})

