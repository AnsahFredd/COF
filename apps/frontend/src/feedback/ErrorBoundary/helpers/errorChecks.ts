export const isNetworkError = (error: Error): boolean => {
  const message = (error.message || '').toLowerCase();
  return (
    message.includes('networkerror') ||
    message.includes('failed to fetch') ||
    message.includes('network request failed') ||
    message.includes('timeout')
  );
};

export const isAuthError = (error: Error): boolean => {
  const message = (error.message || '').toLowerCase();
  return (
    message.includes('401') ||
    message.includes('unauthorized') ||
    message.includes('authentication') ||
    message.includes('forbidden')
  );
};

export const isPaymentError = (error: Error): boolean => {
  const message = (error.message || '').toLowerCase();
  return (
    message.includes('payment') ||
    message.includes('card') ||
    message.includes('billing') ||
    message.includes('transaction') ||
    message.includes('charge')
  );
};
