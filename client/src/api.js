// import axios from 'axios';

// const API_URL = 'http://localhost:5000/notes';

// export const fetchNotes = async () => {
//   try {
//     const response = await axios.get(API_URL);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching notes:', error);
//     throw error;
//   }
// };

// export const addNote = async (newNote) => {
//   try {
//     const response = await axios.post(API_URL, newNote);
//     return response.data;
//   } catch (error) {
//     console.error('Error adding note:', error);
//     throw error;
//   }
// };

// export const deleteNote = async (id) => {
//   try {
//     await axios.delete(`${API_URL}/${id}`);
//   } catch (error) {
//     console.error('Error deleting note:', error);
//     throw error;
//   }
// };

// api.js

import axios from 'axios';

const API_URL = 'http://localhost:5000/notes';
const TODOS_API_URL = 'http://localhost:5000/todos';

export const fetchNotes = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching notes:', error);
    throw error;
  }
};

export const addNote = async (newNote) => {
  try {
    const response = await axios.post(API_URL, newNote);
    return response.data;
  } catch (error) {
    console.error('Error adding note:', error);
    throw error;
  }
};

export const deleteNote = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error('Error deleting note:', error);
    throw error;
  }
};

// To-Do API
export const fetchItems = async () => {
    try {
      const response = await axios.get(TODOS_API_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching items:', error);
      throw error;
    }
  };
  
  export const addItem = async (text) => {
    try {
      const response = await axios.post(TODOS_API_URL, { text });
      return response.data;
    } catch (error) {
      console.error('Error adding item:', error);
      throw error;
    }
  };
  
  export const deleteItem = async (id) => {
    try {
      await axios.delete(`${TODOS_API_URL}/${id}`);
    } catch (error) {
      console.error('Error deleting item:', error);
      throw error;
    }
  };
  
  export const deleteAllItems = async () => {
    try {
      await axios.delete(TODOS_API_URL);
    } catch (error) {
      console.error('Error deleting all items:', error);
      throw error;
    }
  };