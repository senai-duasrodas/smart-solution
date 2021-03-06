import { get } from 'deep-object-js';
import router from '../routes/index';
import Axios from 'axios';
import { getToken } from '../utils/utils';

export default class Http {
  async get(endpoint, { headers = {} } = {}) {
    try {
      const response = await Axios({
        method: 'get',
        url: `${router.options.apiUrl}/${endpoint}`,
        headers: {
          'authorization': `Bearer ${getToken()}`,
          ...headers,
        },
      });

      await this.validateData(response);

      return response.data;
    } catch (err) {
      this.validateError(err);
      throw err;
    }
  }

  async post(endpoint, data, { headers = {} } = {}) {
    try {
      const response = await Axios({
        method: 'post',
        url: `${router.options.apiUrl}/${endpoint}`,
        data,
        headers: {
          'authorization': `Bearer ${getToken()}`,
          ...headers,
        },
      });

      await this.validateData(response);

      return response.data;
    } catch (err) {
      this.validateError(err);
      throw err;
    }
  }
  async delete(endpoint, id) {
    try {
      const response = await Axios({
        method: 'delete',
        url: `${router.options.apiUrl}/${endpoint}/${id}`,
        headers: {
          'authorization': `Bearer ${getToken()}`,
        },
      });

      await this.validateData(response);

      return response.data;
    } catch (err) {
      this.validateError(err);
      throw err;
    }
  }

  async update(endpoint, data, id) {
    try {
      const response = await Axios({
        method: 'put',
        url: `${router.options.apiUrl}/${endpoint}/${id}`,
        data,
        headers: {
          'authorization': `Bearer ${getToken()}`,
        },
      });

      this.validateData(response);

      return response.data;
    } catch (err) {
      this.validateError(err);
      throw err;
    }
  }

  async validateData(response) {
    try {
      if (!response || !response.data) throw 'Ops, ocorreu um erro com a requisição.';

      if (response.status !== 200) throw 'Ops, ocorreu um erro com a requisição.';
    } catch (err) {
      throw err;
    }
  }

  validateError(err) {
    try {
      if (!get(err, 'response.data.status', '')) return err;

      if (err.response.data.status === 401) {
        localStorage.removeItem('token');
        if (router.currentRoute.path === '/') return;
        router.replace('/');
      }
    } catch (err) {
      throw err;
    }
  }
}

