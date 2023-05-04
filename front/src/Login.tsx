import axios from "axios";
import kakaoLoginIcon from "./assets/images/kakao_login_medium_narrow.png";
import configData from "./config.json";
import { setRefreshToken } from "./Cookie";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const { Kakao } = window;

const loginWithKakao = () => {
  Kakao.Auth.authorize({
    redirectUri: configData.LOCAL_IP + ":3000/login/oauth",
    scope: "profile_nickname, account_email, profile_image, gender, age_range",
  });
};

const loginWithEmail = ({
  email,
  password,
  callback,
}: {
  email: string;
  password: string;
  callback: Function;
}) => {
  axios
    .post("http://localhost:8000/loginWithEmail", {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({ email, password }),
    })
    .then((response) => {
      console.log(response);
      callback(response);
    });
};

function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [age, setAge] = useState("10");
  const [gender, setGender] = useState("M");
  const handleEmailChange = (email: string) => {
    setEmail(email);
  };
  const handlePwChange = (pw: string) => {
    setPassword(pw);
  };
  const handleAgeChange = (value: string) => {
    setAge(value);
  };
  const handleGenderChange = (value: string) => {
    setGender(value);
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 top-0 grid place-items-center">
      <div className="absolute flex flex-column w-1/3 h-auto z-30">
        <h1 className="z-50">Foliogram</h1>

        <div className="bg-white z-40 opacity-20 rounded-xl md:w-full md:h-96"></div>
        <div className="absolute text-left md:w-full md:h-96 z-50 flex flex-column my-20">
          {isRegister ? (
            <UserRegister
              setIsRegister={setIsRegister}
              handleAgeChange={handleAgeChange}
              handleGenderChange={handleGenderChange}
            ></UserRegister>
          ) : (
            <UserLogin
              setIsRegister={setIsRegister}
              onEmailChange={handleEmailChange}
              onPwChange={handlePwChange}
            ></UserLogin>
          )}
        </div>
      </div>

      <div
        id="pinkCircle"
        className="absolute w-80 h-80 top-30 left-1/2 bg-pink-200 opacity-90 blur-md rounded-full z-10"
      ></div>
      <div
        id="blueCircle"
        className="absolute w-96 h-96 top-48 left-1/4 bg-blue-200 opacity-60 blur-md rounded-full z-20"
      ></div>
    </div>
  );
}

function UserRegister({
  setIsRegister,
  handleAgeChange,
  handleGenderChange,
}: {
  setIsRegister: Function;
  handleAgeChange: Function;
  handleGenderChange: Function;
}) {
  const radioChange = (value: string, name: string) => {
    if (name === "ageRadio") {
      handleAgeChange(value);
    } else handleGenderChange(value);
  };
  return (
    <div className="w-full">
      <h4 className="font-bold px-6">Create and account</h4>

      <form className="px-6 pt-3 pb-8 w-full">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="userName"
          >
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
            id="userName"
            type="text"
            placeholder="이름"
          />
          <div className="mb-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="userEmail"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline md-2"
              id="userEmail"
              type="email"
              placeholder="user email"
              required
            />
          </div>
          <div className="mb-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
            />
          </div>
        </div>
        <div className="flex items-center w-full h-10 mb-2">
          <RadioComp
            id="genderRadio_M"
            name="genderRadio"
            label="남성"
            checked={true}
            onChange={radioChange}
          ></RadioComp>
          <RadioComp
            id="genderRadio_F"
            name="genderRadio"
            label="여성"
            checked={false}
            onChange={radioChange}
          ></RadioComp>
        </div>
        <div className="flex items-center w-full h-10">
          <RadioComp
            id="10"
            name="ageRadio"
            label="10대"
            checked={false}
            onChange={radioChange}
          ></RadioComp>
          <RadioComp
            id="20"
            name="ageRadio"
            label="20대"
            checked={false}
            onChange={radioChange}
          ></RadioComp>
          <RadioComp
            id="30"
            name="ageRadio"
            label="30대"
            checked={false}
            onChange={radioChange}
          ></RadioComp>
          <RadioComp
            id="40"
            name="ageRadio"
            label="40대"
            checked={false}
            onChange={radioChange}
          ></RadioComp>
          <RadioComp
            id="50"
            name="ageRadio"
            label="50대"
            checked={false}
            onChange={radioChange}
          ></RadioComp>
        </div>
        <a
          className="text-right cursor-pointer text-sm"
          onClick={() => {
            setIsRegister(false);
          }}
        >
          {" "}
          로그인으로 이동하기
        </a>
      </form>
      <p className="text-center text-gray-500 text-xs"></p>
    </div>
  );
}

function UserLogin({
  setIsRegister,
  onEmailChange,
  onPwChange,
}: {
  setIsRegister: Function;
  onEmailChange: Function;
  onPwChange: Function;
}) {
  var email = "";
  var password = "";
  const [a, setA] = useState("");
  const handleInputChange = (e: any) => {
    console.log("asd");

    if (e.target.id === "userEmail") onEmailChange(e.target.value);
    else onPwChange(e.target.value);
    setA("asd");
  };
  return (
    <div>
      <h4 className="font-bold px-6">Sign in to your account</h4>
      <div className="w-full">
        <form className="px-6 pt-6 pb-8 w-full">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="userEmail"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="userEmail"
              type="text"
              placeholder="user email"
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-600 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center justify-between h-12">
            <button
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-64 h-full"
              type="button"
              onClick={() => {
                loginWithEmail({
                  email: email,
                  password: password,

                  callback: (response: any) => {
                    //setRefreshToken(response.json.refresh_token);
                    //dispatchEvent(response.json.access_token);
                  },
                });
              }}
            >
              로그인
            </button>
            <img
              src={kakaoLoginIcon}
              onClick={loginWithKakao}
              className="my-2 cursor-pointer w-32 h-full mx-1"
              alt="kakao login"
            />
          </div>
          <a
            className="text-right cursor-pointer text-sm"
            onClick={() => {
              setIsRegister(true);
            }}
          >
            {" "}
            회원가입
          </a>
          <div className="my-2">
            <p className="text-xs my-2">
              최초 회원가입 시 이용약관, 개인정보처리방침에 동의하게 됩니다.
            </p>
          </div>
        </form>
        <p className="text-center text-gray-500 text-xs"></p>
      </div>
    </div>
  );
}

function RadioComp({
  id,
  name,
  label,
  checked,
  onChange,
}: {
  id: string;
  name: string;
  label: string;
  checked: boolean;
  onChange: Function;
}) {
  const handleChange = (e: any) => {
    onChange(e.target.value, e.target.name);
  };
  return (
    <div className="flex items-center pl-4 bg-gray-800 rounded w-full h-full mx-1">
      <input
        defaultChecked={checked}
        id={id}
        type="radio"
        value={id}
        name={name}
        className="peer text-white"
        onChange={handleChange}
      />
      <label
        htmlFor={id}
        className="w-auto py-4 ml-2 text-sm font-medium text-white"
      >
        {label}
      </label>
    </div>
  );
}

export default Login;
