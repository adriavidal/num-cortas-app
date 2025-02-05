const BASE_URL = process.env.REACT_APP_API_URL || 'https://gigawide.zerovoz.com';

export const api = {
    async getToken(initialToken) {
        try {
          const response = await fetch(`${BASE_URL}/get_token/${initialToken}`, {
            method: 'GET',
            headers: {
              'Accept': 'application/json'
            },
            mode: 'no-cors',
            credentials: 'omit'
          });
    
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        } catch (error) {
          console.error('getToken Error:', error);
          throw error;
        }
  },

  async getNumCortas(temporalToken) {
    try {
      const response = await fetch(`${BASE_URL}/num-corta/${temporalToken}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        mode: 'no-cors',
        credentials: 'omit'
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
      
    } catch (error) {
      console.error('getNumCortas Error:', error);
      throw new Error('Failed to fetch numCortas: ' + error.message);
    }
  }
};