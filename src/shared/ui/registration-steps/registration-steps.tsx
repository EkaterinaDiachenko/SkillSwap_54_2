import clsx from 'clsx';
import styles from './registration-steps.module.css';

export interface RegistrationStepsProps {
  /** Номер текущего шага (от 1 до totalSteps) */
  currentStep: number;
  /** Общее количество шагов */
  totalSteps: number;
  /** Дополнительный CSS-класс */
  className?: string;
}

/**
 * Компонент-индикатор шагов регистрации
 * Отображает заголовок с номером текущего шага и прогресс-линии
 */
export const RegistrationSteps = ({
  currentStep,
  totalSteps,
  className,
}: RegistrationStepsProps) => {
  // Валидация пропсов
  if (currentStep < 1 || currentStep > totalSteps) {
    console.warn(
      `RegistrationSteps: currentStep (${currentStep}) должен быть между 1 и ${totalSteps}`
    );
  }

  // Определение состояния каждой линии
  const getLineState = (index: number) => {
    const stepNumber = index + 1;
    if (stepNumber < currentStep) return 'completed';
    if (stepNumber === currentStep) return 'active';
    return 'incomplete';
  };

  return (
    <div
      className={clsx(styles.container, className)}
      role="progressbar"
      aria-valuenow={currentStep}
      aria-valuemin={1}
      aria-valuemax={totalSteps}
      aria-label={`Шаг ${currentStep} из ${totalSteps}`}
    >
      {/* Заголовок */}
      <h4 className={styles.title}>
        Шаг {currentStep} из {totalSteps}
      </h4>

      {/* Линии прогресса */}
      <div className={styles.linesWrapper} role="presentation">
        {Array.from({ length: totalSteps }, (_, index) => {
          const state = getLineState(index);
          return (
            <div
              key={index}
              className={clsx(styles.line, {
                [styles.lineCompleted]: state === 'completed',
                [styles.lineActive]: state === 'active',
                [styles.lineIncomplete]: state === 'incomplete',
              })}
              aria-label={`Шаг ${index + 1} ${state === 'completed' ? 'завершен' : state === 'active' ? 'текущий' : 'не начат'}`}
            />
          );
        })}
      </div>
    </div>
  );
};