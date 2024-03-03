import { loadingConfigRepo } from './bootstrap';
import register from './register';
import axios from 'axios';

jest.mock('axios');

describe('loading congi-repo', () => {
  it('should get register be with success', async () => {
    const payload = { data: { app: { authCredentials: {}, host: {} } } };
    process.env.APP_ENVIRONMENT = 'dev';
    process.env.APP_NAME = 'test';
    axios.get = jest
      .fn()
      .mockImplementationOnce(() => Promise.resolve(payload));

    await loadingConfigRepo();
    expect(register()).toEqual({
      env: 'dev',
      name: 'test',
      authCredentials: {},
      host: {},
    });
  });
});
