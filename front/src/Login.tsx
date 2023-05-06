import axios from "axios";
import kakaoLoginIcon from "./assets/images/kakao_logo.png";
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

const registerWithEmail = ({
  name,
  email,
  password,
  age,
  gender,
}: {
  name: string;
  email: string;
  password: string;
  age: string;
  gender: string;
}) => {
  axios
    .post("http://localhost:8000/registerWithEmail", {
      name: name,
      email: email,
      password: password,
      age: age,
      gender: gender,
    })
    .then((response) => {
      if (response && response.data) {
        if (response.data.accessToken) {
          setRefreshToken(response.data.refreshToken);
          dispatchEvent(response.data.accessToken);
        } else {
          switch (response.data) {
            case 4:
              alert("이미 가입된 사용자입니다.");
          }
        }
      }
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
      email: email,
      password: password,
    })
    .then((response) => {
      console.log(response);
      callback(response);
    });
};

function Login() {
  const dispatch = useDispatch();

  const [isRegister, setIsRegister] = useState(false);

  return (
    <div className="absolute bottom-0 left-0 right-0 top-0 grid place-items-center">
      <div className="absolute flex flex-column md:w-[400px] h-auto z-30">
        <h1 className="z-50">Foliogram</h1>
        <div className="bg-white z-40 bg-opacity-50 rounded-xl text-left md:w-full h-full flex flex-column pt-10">
          {isRegister ? (
            <UserRegister setIsRegister={setIsRegister}></UserRegister>
          ) : (
            <UserLogin setIsRegister={setIsRegister}></UserLogin>
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

function UserRegister({ setIsRegister }: { setIsRegister: Function }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, onPwChange] = useState("");
  const [age, setAge] = useState("10");
  const [gender, setGender] = useState("M");

  const handleAgeChange = (value: string) => {
    setAge(value);
  };
  const handleGenderChange = (value: string) => {
    if (value === "genderRadio_M") value = "M";
    else value = "F";
    setGender(value);
  };
  const handleInputChange = (e: any) => {
    if (e.target.id === "userEmail") setEmail(e.target.value);
    else if (e.target.id === "userName") setName(e.target.value);
    else {
      onPwChange(e.target.value);
    }
  };
  const radioChange = (value: string, name: string) => {
    if (name === "ageRadio") {
      handleAgeChange(value);
    } else handleGenderChange(value);
  };
  return (
    <div className="w-full">
      <h4 className="font-bold px-6">Create and account</h4>

      <form
        className="px-6 pt-3 pb-8 w-full"
        onSubmit={(e: any) => {
          e.preventDefault();
          registerWithEmail({
            name: name,
            email: email,
            password: password,
            age: age,
            gender: gender,
          });
        }}
      >
        <div className="mb-4">
          <div className="mb-2">
            <TitleLabel label="이름" htmlFor="userName"></TitleLabel>
            <InputComp
              id="userName"
              type="text"
              placeholder="이름을 입력해주세요"
              handleChange={handleInputChange}
            ></InputComp>
          </div>
          <div className="mb-2">
            <TitleLabel label="이메일" htmlFor="userEmail"></TitleLabel>
            <InputComp
              id="userEmail"
              type="email"
              placeholder="이메일을 입력해주세요"
              handleChange={handleInputChange}
            ></InputComp>
          </div>
          <div className="mb-2">
            <TitleLabel label="비밀번호" htmlFor="password"></TitleLabel>
            <InputComp
              id="password"
              type="password"
              placeholder="*********"
              handleChange={handleInputChange}
            ></InputComp>
          </div>
          <div className="mb-2">
            <TitleLabel label="성별" htmlFor=""></TitleLabel>

            <ul className="flex justify-center h-10 mb-2 p-0">
              <RadioComp
                id="genderRadio_M"
                name="genderRadio"
                label="남성"
                onChange={radioChange}
              ></RadioComp>
              <RadioComp
                id="genderRadio_F"
                name="genderRadio"
                label="여성"
                onChange={radioChange}
              ></RadioComp>
            </ul>
          </div>
          <div className="mb-2">
            <TitleLabel label="연령대" htmlFor=""></TitleLabel>
            <ul className="flex justify-center h-10 mb-2 p-0">
              <RadioComp
                id="10"
                name="ageRadio"
                label="10대"
                onChange={radioChange}
              ></RadioComp>
              <RadioComp
                id="20"
                name="ageRadio"
                label="20대"
                onChange={radioChange}
              ></RadioComp>
              <RadioComp
                id="30"
                name="ageRadio"
                label="30대"
                onChange={radioChange}
              ></RadioComp>
              <RadioComp
                id="40"
                name="ageRadio"
                label="40대"
                onChange={radioChange}
              ></RadioComp>
              <RadioComp
                id="50"
                name="ageRadio"
                label="50대"
                onChange={radioChange}
              ></RadioComp>
            </ul>
          </div>
        </div>

        <div className="flex items-center justify-between h-12">
          <button
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full h-full"
            type="submit"
          >
            회원가입
          </button>
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

function UserLogin({ setIsRegister }: { setIsRegister: Function }) {
  const [email, setEmail] = useState("");
  const [password, setPw] = useState("");
  const handleInputChange = (e: any) => {
    if (e.target.id === "userEmail") setEmail(e.target.value);
    else setPw(e.target.value);
  };
  return (
    <div>
      <h4 className="font-bold px-6">Sign in to your account</h4>
      <div className="w-full">
        <form
          className="px-6 pt-6 pb-8 w-full"
          onSubmit={(e: any) => {
            e.preventDefault();
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
          <div className="mb-4">
            <TitleLabel label="이메일" htmlFor="userEmail"></TitleLabel>
            <InputComp
              id="userEmail"
              type="email"
              placeholder="이메일을 입력해주세요"
              handleChange={handleInputChange}
            ></InputComp>
          </div>
          <div className="mb-4">
            <TitleLabel label="비밀번호" htmlFor="password"></TitleLabel>
            <InputComp
              id="password"
              type="password"
              placeholder="*********"
              handleChange={handleInputChange}
            ></InputComp>
          </div>
          <div className="flex items-center justify-between h-12">
            <button
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex-initial w-5/6 h-full"
              type="submit"
            >
              로그인
            </button>
            <img
              src={kakaoLoginIcon}
              onClick={loginWithKakao}
              className="my-2 cursor-pointer w-10 h-full mx-1"
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
  onChange,
}: {
  id: string;
  name: string;
  label: string;
  onChange: Function;
}) {
  const handleChange = (e: any) => {
    onChange(e.target.value, e.target.name);
  };
  return (
    <div className="items-center rounded w-full h-full peer-checked:text-black text-gray-700 text-xs p-1">
      <li className="relative">
        <input
          className="sr-only peer w-full h-full"
          type="radio"
          value={id}
          name={name}
          id={id}
          onChange={handleChange}
        />
        <label
          className="w-full bg-white border p-2 border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-green-500 peer-checked:ring-2 peer-checked:border-transparent"
          htmlFor={id}
        >
          {label}
        </label>
      </li>
    </div>
  );
}

function TitleLabel({ label, htmlFor }: { label: string; htmlFor: string }) {
  return (
    <label
      className="block text-gray-700 text-sm font-bold mb-2"
      htmlFor={htmlFor}
    >
      {label}
    </label>
  );
}
function InputComp({
  id,
  type,
  placeholder,
  handleChange,
}: {
  id: string;
  type: string;
  placeholder: string;
  handleChange: any;
}) {
  return (
    <input
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-lg"
      id={id}
      type={type}
      required
      placeholder={placeholder}
      onChange={handleChange}
    />
  );
}

export default Login;
