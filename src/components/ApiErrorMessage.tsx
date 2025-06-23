import { ApiErrorType } from '../types/Api';

type Props = {
  errorType: ApiErrorType;
};

export default function ApiErrorMessage({ errorType }: Props) 
{
  let message = 'An unexpected error occurred.';

  if (errorType === 'rate_limit') {
    message = 'GitHub rate limit reached. Please try again later.';
  } else if (errorType === 'network') {
    message = 'No response from server.';
  }

  return (
    <div style={{ color: 'white', padding: '1rem', textAlign: 'center' }}>
      {message}
    </div>
  );
}