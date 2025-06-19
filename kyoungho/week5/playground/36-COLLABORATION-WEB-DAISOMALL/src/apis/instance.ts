import { BASE_URL } from '@utils/constants/api/api';
import axios from 'axios';

export const instance = axios.create({
  baseURL: BASE_URL,
});
