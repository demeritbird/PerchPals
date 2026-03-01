import { ErrorResponse, SuccessReponse } from '@/hooks/useAxios';
import { http, HttpResponse, passthrough } from 'msw';
import { LoginRequest } from 'src/routes/AuthPage/layouts/LoginPanel/LoginPanel';
import { logValidity } from 'src/utils/helpers';
import { Validity } from 'src/utils/types';

const SERVER_URL = 'http://127.0.0.1:3001';
const TAG = '** Mock Handlers';

const loginHandler = http.post<never, LoginRequest>(
  `${SERVER_URL}/api/v1/users/login`,
  async ({ request }) => {
    const MOCK_EMAIL = 'admin@example.com';
    const MOCK_PASSWORD = 'test1234';

    const reqBody = await request.clone().json();

    if (reqBody.email !== MOCK_EMAIL) {
      logValidity(TAG, Validity.FAIL, `Wrong Email used for tests, please use ${MOCK_EMAIL}`);
      return passthrough();
    }

    if (!(reqBody.password === MOCK_PASSWORD)) {
      return HttpResponse.json<ErrorResponse>(
        {
          status: 'error',
          error: {
            statusCode: 401,
            status: 'error',
            isOperational: 'true',
          },
          message: 'incorrect email or password!',
        },
        { status: 401 }
      );
    }

    return HttpResponse.json<SuccessReponse>({
      status: 'success',
      token: 'token',
      data: {
        user: {
          _id: '6489ae95f606b55b0c2f51ca',
          name: 'admin',
          email: MOCK_EMAIL,
          photo: 'default-user-base64.jpeg',
          role: 'admin',
          active: 'active',
          created_at: '2025-04-28T00:00:00.000Z',
          updated_at: '2025-04-28T00:00:00.000Z',
          __v: 0,
        },
      },
    });
  }
);

export const handlers = [loginHandler];
