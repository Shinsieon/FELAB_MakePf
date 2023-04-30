import kakaoLoginIcon from "./assets/images/kakao_login_small.png";
import configData from "./config.json";
const { Kakao } = window;

const loginWithKakao = () => {
  console.log("kakao button pressed");
  Kakao.Auth.authorize({
    redirectUri: configData.LOCAL_IP + ":3000/login/oauth",
    scope: "profile_nickname, account_email, profile_image, gender, age_range",
  });
};

function Login() {
  return (
    <div className="absolute bottom-0 left-0 right-0 top-0 grid place-items-center">
      <div className="absolute flex flex-column w-1/3 h-auto z-30">
        <h1 className="z-50">Foliogram</h1>

        <div className="bg-white z-40 opacity-20 rounded-xl md:w-full md:h-96"></div>
        <div className="absolute text-left md:w-full md:h-96 z-50 flex flex-column my-20">
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
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="******************"
                />
              </div>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline md:w-full"
                type="button"
              >
                로그인
              </button>
              <button
                className="bg-[#F7E600] text-[#3A1D1D] font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline md:w-full mt-2"
                type="button"
                onClick={loginWithKakao}
              >
                카카오톡으로 로그인하기
              </button>
              <div className="my-2">
                <p className="text-xs my-2">
                  최초 회원가입 시 이용약관, 개인정보처리방침에 동의하게 됩니다.
                </p>
              </div>
            </form>
            <p className="text-center text-gray-500 text-xs"></p>
          </div>
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

export default Login;
