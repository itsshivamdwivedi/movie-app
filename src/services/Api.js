import axios from 'axios';

const API_KEY = '430ae256';
const BASE_URL = 'https://www.omdbapi.com/';

export const fetchMovies = async (query, page = 1) => {
  try {
    const response = await axios.get(`${BASE_URL}`, {
      params: {
        s: query,
        apikey: API_KEY,
        page,
      },
    });
    return {
      movies: response.data.Search || [],
      totalResults: response.data.totalResults,
    };
  } catch (error) {
    console.error('Error fetching movies:', error);
    return {
      movies: [],
      totalResults: 0,
    };
  }
};

export const fetchMovieDetails = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}`, {
      params: {
        i: id,
        apikey: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
};
export const searchMovies = async (query, page = 1) => {
  try {
    const response = await axios.get(`${BASE_URL}`, {
      params: {
        s: query,
        apikey: API_KEY,
        page,
      },
    });
    return {
      movies: response.data.Search || [],
      totalResults: response.data.totalResults,
    };
  } catch (error) {
    console.error('Error searching movies:', error);
    return {
      movies: [],
      totalResults: 0,
    };
  }
};
