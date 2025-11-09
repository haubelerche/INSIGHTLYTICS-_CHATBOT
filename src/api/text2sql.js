
import { apiCall } from './client';

export const queryWithNLToSQL = async (naturalLanguageQuery) => {
  return apiCall('/api/text2sql', {
    method: 'POST',
    body: JSON.stringify({ query: naturalLanguageQuery }),
  });
};

export default queryWithNLToSQL;
