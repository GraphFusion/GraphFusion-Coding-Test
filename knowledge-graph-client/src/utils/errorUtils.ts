export const validateField = (
  value: string | number | null,
  fieldName: string,
  setError: React.Dispatch<React.SetStateAction<string>>
) => {
  if (!value) {
    setError(`${fieldName} is required`);
    return false;
  }
  setError('');
  return true;
};
