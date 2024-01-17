import LoginPage from "./LoginPage.vue";
import RegisterPage from "./RegisterPage.vue";
import ChatPage from "./ChatPage.vue";
import ResetPasswordPage from "./ResetPasswordPage.vue";
import SettingsPage from "./SettingsPage.vue";
import UserInfoPage from "./UserInfoPage.vue";

export const routes = [
  { path: "/", component: LoginPage, name: "Main" },
  { path: "/auth", component: LoginPage, name: "Auth" },
  {
    path: "/registration",
    component: RegisterPage,
    name: "Registration",
  },
  {
    path: "/chat",
    component: ChatPage,
    name: "Chat",
  },
  {
    path: "/reset_password",
    component: ResetPasswordPage,
    name: "ResetPassword",
  },
  {
    path: "/settings",
    component: SettingsPage,
    name: "SettingsPage",
  },
  {
    path: "/user/:username",
    component: UserInfoPage,
    name: "UserInfo",
  },
];
