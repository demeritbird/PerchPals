import { ErrorResponse, SuccessReponse } from '@/hooks/useAxios';
import { http, HttpResponse, passthrough } from 'msw';
import { LoginRequest } from 'src/routes/AuthPage/layouts/LoginPanel/LoginPanel';
import { SignupRequest } from '@/routes/AuthPage/layouts/SignupPanel/SignupPanel';
import { logValidity } from 'src/utils/helpers';
import { Validity } from 'src/utils/types';

const SERVER_URL = 'http://127.0.0.1:3001';
const TAG = '** Mock Handlers';

const errorJSON = ({ statusCode, message }: { statusCode: number; message: string }) => {
  return HttpResponse.json<ErrorResponse>(
    {
      status: 'error',
      error: {
        statusCode: statusCode,
        status: 'error',
        isOperational: 'true',
      },
      message,
    },
    { status: statusCode }
  );
};

const loginHandler = http.post<never, LoginRequest>(
  `${SERVER_URL}/api/v1/users/login`,
  async ({ request }) => {
    const MOCK_EMAIL = 'admin@example.com';
    const MOCK_PASSWORD = 'test1234';

    const { email, password } = await request.clone().json();

    if (email !== MOCK_EMAIL) {
      logValidity(TAG, Validity.FAIL, `Wrong Email used for tests, please use ${MOCK_EMAIL}`);
      return passthrough();
    }

    if (!(password === MOCK_PASSWORD)) {
      return errorJSON({ statusCode: 401, message: 'incorrect email or password!' });
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

const signupHandler = http.post<never, SignupRequest>(
  `${SERVER_URL}/api/v1/users/signup`,
  async ({ request }) => {
    const { email, name, password, passwordConfirm } = await request.clone().json();

    // empty fields
    if (!(email || name || password || passwordConfirm)) {
      return errorJSON({
        statusCode: 400,
        message:
          'Could not signup as there were invalid or missing credentials. Please try again',
      });
    }

    // invalid email fileString
    if (!email.includes('@')) {
      return errorJSON({
        statusCode: 400,
        message:
          'Could not signup as there were invalid or missing credentials. Please try again',
      });
    }

    // password does not match w passwordConfirm
    if (password !== passwordConfirm) {
      return errorJSON({
        statusCode: 400,
        message:
          'Could not signup as there were invalid or missing credentials. Please try again',
      });
    }

    return HttpResponse.json<SuccessReponse>({
      status: 'success',
      token: 'token',
      data: {
        user: {
          name: 'newuser',
          email: 'newuser@example.com',
          photo: 'default-user-base64.jpeg',
          active: 'pending',
          _id: '69ab674c3b7805d08c1080ed',
          created_at: '2025-04-28T00:00:00.000Z',
          updated_at: '2025-04-28T00:00:00.000Z',
          __v: 0,
          activationToken: '82410bb2e8ed6f84c7e3542ca51523634fbbed0fbc18e43b8cd619df2a661e7d',
        },
      },
    });
  }
);

const handlers = [loginHandler, signupHandler];
export default handlers;
