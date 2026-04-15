import { ErrorResponse, SuccessReponse } from '@/hooks/useAxios';
import { http, HttpResponse, passthrough } from 'msw';
import { LoginRequest } from 'src/routes/AuthPage/layouts/LoginPanel/LoginPanel';
import { SignupRequest } from '@/routes/AuthPage/layouts/SignupPanel/SignupPanel';
import { logValidity } from 'src/utils/helpers';
import { Validity } from 'src/utils/types';
import { ConfirmActivateRequest } from '@/routes/AuthPage/layouts/ActivatePanel/ActivatePanel';
import { ForgetPasswordRequest } from '@/routes/AuthPage/layouts/ForgetPasswordPanel/ForgetPasswordPanel';
import { ResetPasswordRequest } from '@/routes/AuthPage/layouts/ResetPasswordPanel/ResetPasswordPanel';

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

const confirmActivationHandler = http.patch<{ id: string }, ConfirmActivateRequest>(
  `${SERVER_URL}/api/v1/users/:id/confirmActivate`,
  async ({ request, params }) => {
    const USER_TO_ACTIVATE = '123';
    const TOKEN_TO_ACTIVATE = 'alyssa';

    const { id } = params;
    const { token } = await request.clone().json();

    if (!id || id !== USER_TO_ACTIVATE) {
      return errorJSON({
        statusCode: 404,
        message: 'There is no user with these credentials.',
      });
    }

    // no token
    if (!token || token !== TOKEN_TO_ACTIVATE) {
      return errorJSON({
        statusCode: 400,
        message: 'Incorrect activation token was provided.',
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
          active: 'active',
          _id: '69ab674c3b7805d08c1080ed',
          created_at: '2025-04-28T00:00:00.000Z',
          updated_at: '2025-04-28T00:00:00.000Z',
          __v: 0,
        },
      },
    });
  }
);

const forgetPasswordHandler = http.post<never, ForgetPasswordRequest>(
  `${SERVER_URL}/api/v1/forgetPassword`,
  async ({ request }) => {
    const MOCK_EMAIL = 'admin@example.com';
    const MOCK_RETURN_RESET_TOKEN = '123456';

    const { email } = await request.clone().json();

    if (email !== MOCK_EMAIL) {
      return errorJSON({ statusCode: 404, message: 'There is no user with email address.' });
    }

    return HttpResponse.json<SuccessReponse>({
      status: 'success',
      data: {
        resetToken: MOCK_RETURN_RESET_TOKEN,
      },
    });
  }
);

const resetPasswordHandler = http.post<never, ResetPasswordRequest>(
  `${SERVER_URL}/api/v1/resetPassword/:resetToken`,
  async ({ request, params }) => {
    const { password, passwordConfirm } = await request.clone().json();
    const { resetToken } = params;

    if (!resetToken) {
      return errorJSON({
        statusCode: 400,
        message: 'Password Reset Token is invalid or has expired',
      });
    }

    if (password !== passwordConfirm) {
      return errorJSON({
        statusCode: 400,
        message: 'Password is not the same as password confirm',
      });
    }

    return HttpResponse.json<SuccessReponse>({
      status: 'success',
      data: {},
    });
  }
);

const handlers = [
  loginHandler,
  signupHandler,
  confirmActivationHandler,
  forgetPasswordHandler,
  resetPasswordHandler,
];
export default handlers;
