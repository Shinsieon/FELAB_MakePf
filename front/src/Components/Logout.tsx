import { RiLogoutBoxLine } from "react-icons/ri";

const logoutFunc = () => {
  window.Kakao.Auth.logout(() => {
    console.log("로그아웃 되었습니다.", window.Kakao.Auth.getAccessToken());
    localStorage.clear();
  });
};
function Logout() {
  return (
    <div style={{ margin: -2, cursor: "pointer" }}>
      <RiLogoutBoxLine
        onClick={logoutFunc}
        size="20"
        color="tomato"
      ></RiLogoutBoxLine>
    </div>
  );
}
export default Logout;
