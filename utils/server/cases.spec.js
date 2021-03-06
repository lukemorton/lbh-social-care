import axios from 'axios';

import * as casesAPI from './cases';

jest.mock('axios');

const { ENDPOINT_API, AWS_KEY } = process.env;

describe('cases APIs', () => {
  describe('getCases', () => {
    it('should work properly', async () => {
      axios.get.mockResolvedValue({ data: { foo: 123, cases: 'bar' } });
      const data = await casesAPI.getCases({
        foo: 'bar',
      });
      expect(axios.get).toHaveBeenCalled();
      expect(axios.get.mock.calls[0][0]).toEqual(`${ENDPOINT_API}/cases`);
      expect(axios.get.mock.calls[0][1].headers).toEqual({
        'x-api-key': AWS_KEY,
      });
      expect(data).toEqual({ foo: 123, cases: 'bar' });
    });
  });

  describe('getResidentCases', () => {
    it('should work properly', async () => {
      axios.get.mockResolvedValue({ data: { foo: 123, cases: 'bar' } });
      const data = await casesAPI.getResidentCases(123);
      expect(axios.get).toHaveBeenCalled();
      expect(axios.get.mock.calls[0][0]).toEqual(`${ENDPOINT_API}/cases`);
      expect(axios.get.mock.calls[0][1].headers).toEqual({
        'x-api-key': AWS_KEY,
      });
      expect(axios.get.mock.calls[0][1].params).toEqual({
        mosaic_id: 123,
      });
      expect(data).toEqual('bar');
    });
  });

  describe('addCase', () => {
    it('should work properly', async () => {
      axios.post.mockResolvedValue({ data: { _id: 'foobar' } });
      const data = await casesAPI.addCase({ foo: 'bar' });
      expect(axios.post).toHaveBeenCalled();
      expect(axios.post.mock.calls[0][0]).toEqual(`${ENDPOINT_API}/cases`);
      expect(axios.post.mock.calls[0][1]).toEqual({ foo: 'bar' });
      expect(axios.post.mock.calls[0][2].headers).toEqual({
        'Content-Type': 'application/json',
        'x-api-key': AWS_KEY,
      });
      expect(data).toEqual({ ref: 'foobar' });
    });
  });
});
