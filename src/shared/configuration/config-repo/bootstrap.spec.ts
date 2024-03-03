import axios from 'axios';
import { loadingConfigRepo } from './bootstrap';

jest.mock('axios');

describe('loadingConfigRepo', () => {
  it('should get config be with success', async () => {
    const payload = { data: { app: { authCredentials: {}, host: {} } } };
    axios.get = jest
      .fn()
      .mockImplementationOnce(() => Promise.resolve(payload));

    await loadingConfigRepo();
    expect(process.env['APP_CONFIG_REPO']).toEqual(
      JSON.stringify(payload.data.app),
    );
  });
  it('should get config be with fail', async () => {
    const payload = { error: { message: 'Error fail' } };
    axios.get = jest.fn().mockImplementationOnce(() => Promise.reject(payload));

    await loadingConfigRepo();
    expect(process.env['APP_CONFIG_REPO']).toBeNull;
  });
  it('Must not contain app attribute in config-repo', async () => {
    const payload = { authCredentials: {}, host: {} };
    axios.get = jest
      .fn()
      .mockImplementationOnce(() => Promise.resolve(payload));

    await loadingConfigRepo();
    expect(process.env['APP_CONFIG_REPO']).toBeNull;
  });
});
