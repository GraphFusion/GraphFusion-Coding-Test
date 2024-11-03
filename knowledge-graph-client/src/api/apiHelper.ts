export const postData = async <T, R>(
  url: string,
  data: T,
  addItem: (item: R) => void,
  clearInputs: () => void,
  onClose: () => void,
  setLoading: (loading: boolean) => void,
  setError: (error: string) => void
) => {
  try {
    setLoading(true);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to add item');
    }

    const result: R = await response.json();

    // Add the new item to the Zustand store
    addItem(result);

    clearInputs();
    onClose();
  } catch (error) {
    if (error instanceof Error) {
      setError(error.message);
    } else {
      setError('An unknown error occurred');
    }
  } finally {
    setLoading(false);
  }
};
