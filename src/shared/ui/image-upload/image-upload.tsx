import React, { useRef, useState, useEffect, useCallback } from 'react';
import clsx from 'clsx';
import { IconButton } from '@/shared/ui/icon-button';
import { Button } from '@/shared/ui/button';
import styles from './image-upload.module.css';

export interface ImageFile extends File {
  preview?: string;
  id?: string;
}

export interface ImageUploadProps {
  label?: string;
  placeholder?: string;
  multiple?: boolean;
  initialImages?: ImageFile[];
  disabled?: boolean;
  error?: string;
  onChange?: (files: ImageFile[]) => void;
  onRemove?: (file: ImageFile, index: number) => void;
  className?: string;
}

export function ImageUpload({
  label,
  placeholder = 'Перетащите или выберите изображения навыка',
  multiple = true,
  initialImages = [],
  disabled = false,
  error,
  onChange,
  onRemove,
  className,
}: ImageUploadProps) {
  const [images, setImages] = useState<ImageFile[]>(initialImages);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setImages(initialImages);
  }, [initialImages]);

  useEffect(() => {
    return () => {
      images.forEach((file) => {
        if (file.preview) {
          URL.revokeObjectURL(file.preview);
        }
      });
    };
  }, [images]);

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (!files || files.length === 0) return;

      const newFiles: ImageFile[] = Array.from(files).map((file) => {
        const imageFile = file as ImageFile;
        imageFile.preview = URL.createObjectURL(file);
        imageFile.id = `${file.name}-${Date.now()}-${Math.random()}`;
        return imageFile;
      });

      const updatedImages = multiple ? [...images, ...newFiles] : newFiles;
      setImages(updatedImages);
      onChange?.(updatedImages);

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    },
    [images, multiple, onChange]
  );

  const handleRemove = useCallback(
    (index: number) => {
      const fileToRemove = images[index];
      if (fileToRemove?.preview) {
        URL.revokeObjectURL(fileToRemove.preview);
      }

      const updatedImages = images.filter((_, i) => i !== index);
      setImages(updatedImages);
      onChange?.(updatedImages);
      onRemove?.(fileToRemove, index);
    },
    [images, onChange, onRemove]
  );

  const handleButtonClick = useCallback(() => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  }, [disabled]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      setIsDragging(true);
    }
  }, [disabled]);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      if (disabled) return;

      const files = e.dataTransfer.files;
      if (!files || files.length === 0) return;

      const newFiles: ImageFile[] = Array.from(files).map((file) => {
        const imageFile = file as ImageFile;
        imageFile.preview = URL.createObjectURL(file);
        imageFile.id = `${file.name}-${Date.now()}-${Math.random()}`;
        return imageFile;
      });

      const updatedImages = multiple ? [...images, ...newFiles] : newFiles;
      setImages(updatedImages);
      onChange?.(updatedImages);
    },
    [images, multiple, onChange, disabled]
  );

  const dropzoneClasses = clsx(
    styles.dropzone,
    {
      [styles.dragging]: isDragging,
      [styles.disabled]: disabled,
      [styles.error]: error,
    },
    className
  );

  return (
    <div className={styles.container}>
      {label && <label className={styles.label}>{label}</label>}

      <div
        className={dropzoneClasses}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple={multiple}
          onChange={handleFileChange}
          disabled={disabled}
          className={styles.hiddenInput}
        />

        <div className={styles.content}>
          <div className={styles.placeholder}>
            <span>{placeholder}</span>
          </div>

          <div className={styles.actions}>
            <IconButton
              iconName="like"
              aria-label="Загрузить изображения"
              disabled={disabled}
              onClick={handleButtonClick}
              className={styles.iconButton}
            />
            <Button
              variant="quaternary"
              disabled={disabled}
              onClick={handleButtonClick}
              className={styles.selectButton}
            >
              Выбрать изображения
            </Button>
          </div>
        </div>

        {images.length > 0 && (
          <div className={styles.previewList}>
            {images.map((file, index) => (
              <div key={file.id || index} className={styles.previewItem}>
                <img
                  src={file.preview}
                  alt={file.name || 'Превью изображения'}
                  className={styles.previewImage}
                />
                <IconButton
                  iconName="eye"
                  aria-label={`Удалить изображение ${file.name || index + 1}`}
                  onClick={() => handleRemove(index)}
                  disabled={disabled}
                  className={styles.removeButton}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
}