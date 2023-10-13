import { X } from 'phosphor-react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useFirebase } from 'react-redux-firebase';
import { useNavigate } from 'react-router-dom';
import { useCreateAccountMutation } from '../../service/createAccount';
import { showSignInModal, showSignUpModal } from '../../store/modalReducer';

const SignUpModal = () => {
  const [mailLoading, setMailLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [userData, setUserData] = useState({
    fullname: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState({
    message: '',
    field: '',
  });
  const [errorTip, setErrorTip] = useState(false);
  const firebase = useFirebase();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [createAccount, response] = useCreateAccountMutation();

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateUserData = () => {
    const { email, password, fullname } = userData;
    if (!fullname) {
      setError({ message: 'Please enter your full name', field: 'fullname' });
      setErrorTip(true);
      return false;
    } else if (!password) {
      setError({ message: 'Please enter your password', field: 'password' });
      setErrorTip(true);
      return false;
    } else if (password.length < 8) {
      setError({
        message: 'Password must have a minimum of 8 characters',
        field: 'password',
      });
      setErrorTip(true);
      return false;
    } else if (!email) {
      setError({ message: 'Please enter your email', field: 'email' });
      setErrorTip(true);
      return false;
    }
    const emailPattern = /^[a-zA-Z0-9]+@[a-z]+\.[a-z]{2,3}$/;
    const isMatch = email.match(emailPattern);
    if (!isMatch) {
      setError({ message: 'Invalid email', field: 'email' });
      setErrorTip(true);
      return false;
    }
    setError({ message: '', field: '' });
    return true;
  };

  const signUpWithGoogle = () => {
    setGoogleLoading(true);
    firebase
      .login({
        provider: 'google',
        type: 'popup',
      })
      .then((result) => {
        createAccount({
          name: result.profile.displayName,
          email: result.profile.email,
        })
          .unwrap()
          .then((response) => {
            console.log(response);
            setGoogleLoading(false);
            alert(`Account id: ${response.data.id} ${response.data.name}`);
          })
          .catch((err) => {
            console.error(err);
            setGoogleLoading(false);
          });
      })
      .catch((err) => {
        console.error(err);
        setGoogleLoading(false);
      });
  };

  const signUpWithEmail = ({ email, password, fullname }) => {
    if (validateUserData()) {
      setMailLoading(true);
      firebase
        .createUser(
          {
            email,
            password,
          },
          {
            fullname,
            email,
          }
        )
        .then((result) => {
          createAccount({
            name: fullname,
            email,
          })
            .unwrap()
            .then((response) => {
              console.log(response);
              alert(`Account id: ${response.data.id} ${response.data.name}`);
              setMailLoading(false);
            })
            .catch((err) => {
              console.error(err);
              setMailLoading(false);
            });
        })
        .catch((err) => {
          console.error(err);
          setMailLoading(false);
        });
    }
  };

  return (
    <div
      className="bg-black/80 top-0 left-0 fixed z-10 animate-modalopen
      w-full h-full flex flex-row justify-center items-center backdrop-blur-md"
      onClick={() => dispatch(showSignUpModal(false))}
    >
      <div
        className="relative mx-auto w-[350px] py-5 z-50 font-epilogue flex flex-col justify-center items-center
        bg-white rounded-lg md:w-[400px]"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="font-semibold text-2xl px-12 text-center text-slate-900">
          Supercharge your payments now
        </h3>
        <p className="text-slate-700 text-center text-sm px-12 mt-2">
          Join PayPaddy to start sending and receiving payouts instantly
        </p>

        <button
          type="button"
          onClick={signUpWithGoogle}
          className="w-[80%] text-slate-900 mt-6 bg-gray-200
          hover:shadow-md focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50
          font-medium rounded-lg text-md py-2.5 text-center inline-flex justify-center items-center
          dark:focus:ring-[#4285F4]/55"
        >
          {googleLoading && (
            <svg
              className="inline mr-2 w-4 h-4 text-gray-700 animate-spin dark:text-gray-400 fill-white"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          )}
          <svg
            className="mr-2 w-4 h-4"
            aria-hidden="true"
            focusable="false"
            data-prefix="fab"
            data-icon="google"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 488 512"
          >
            <path
              fill="currentColor"
              d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
            ></path>
          </svg>
          Sign up with Google
        </button>

        <div className="w-[85%] bg-gray-200 my-4 h-px"></div>

        <h3 className="font-epilogue font-medium text-sm text-slate-700">
          or sign up with email
        </h3>

        <div
          className={`${
            errorTip ? 'block' : 'hidden'
          } w-[80%] flex flex-row justify-between bg-red-100 mx-8 ring-2 ring-red-400
            rounded-lg p-3 my-3`}
        >
          <p className="text-center text-sm">
            {error.message}
          </p>
          <button onClick={() => setErrorTip((prev) => !prev)}>
            <X size={16} weight="bold" />
          </button>
        </div>

        <form className="w-full px-8 mt-2 md:px-12">
          <div className="flex flex-col w-full">
            <span className="block text-sm font-medium text-slate-700">
              Full name
            </span>
            <input
              type="text"
              placeholder="John Doe"
              name="fullname"
              onChange={handleFormChange}
              className={`px-3 py-2 bg-white border shadow-sm ${
                error.field === 'fullname' ? 'border-red-400' : 'border-slate-300'
              } focus:outline-none
              focus:border-purple-500 w-full rounded-md sm:text-sm focus:ring-1`}
            />

            <span className="block text-sm font-medium text-slate-700 mt-2">
              Email
            </span>
            <input
              type="email"
              placeholder="user@mail.com"
              name="email"
              onChange={handleFormChange}
              className={`px-3 py-2 bg-white border shadow-sm ${
                error.field === 'email' ? 'border-red-400' : 'border-slate-300'
              } focus:outline-none
              focus:border-purple-500 w-full rounded-md sm:text-sm focus:ring-1`}
            />

            <span className="block text-sm font-medium text-slate-700 mt-2">
              Password
            </span>
            <input
              type="password"
              placeholder="Password (min. 8 characters)"
              name="password"
              onChange={handleFormChange}
              className={`px-3 py-2 bg-white border shadow-sm ${
                error.field === 'password' ? 'border-red-400' : 'border-slate-300'
              } focus:outline-none
              focus:border-purple-500 w-full rounded-md sm:text-sm focus:ring-1`}
            />

            <button
              aria-label="Signup button"
              onClick={(e) => {
                e.preventDefault();
                signUpWithEmail({
                  email: userData.email,
                  password: userData.password,
                  fullname: userData.fullname,
                });
              }}
              className="font-epilogue font-medium rounded-lg mt-5 py-2 px-6 group ring-gray-400
              focus:ring-4 focus:outline-none focus:ring-purple-500/50
              bg-gradient-to-r from-purple-600 to-blue-500 text-white inline-flex justify-center items-center
              hover:ring-purple-500 hover:shadow-md hover:opacity-70 transition-all"
            >
              {mailLoading && (
                <svg
                  className="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-400 fill-white"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              )}
              Sign up
            </button>

            <button onClick={() => dispatch(showSignInModal(true))} className="text-sm mt-5 py-2">
              Already joined? <span className="text-slate-900 font-bold">Login now</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpModal;
