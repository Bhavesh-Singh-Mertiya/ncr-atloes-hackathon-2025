// const apibasePathDev = process.env.REACT_APP_API_URL;
const apibasePathDev = "http://localhost:4000/api";

export const adminApi = {
  login: `${apibasePathDev}/admin/login`,
  forgotPassword: `${apibasePathDev}/admin/forgot_password`,
  updatePassword: `${apibasePathDev}/admin/update_password`,
  changePassword: `${apibasePathDev}/admin/change_password`,
  logout: `${apibasePathDev}/v1/authentication/logout`,
  users: `${apibasePathDev}/v1/users`,
  uploadFile: `${apibasePathDev}/v1/upload`,
  globalSetting: `${apibasePathDev}/v1/general-settings`,
  profile: `${apibasePathDev}/v1/profile`,
  dashboardCount: `${apibasePathDev}/admin/dashboard`,
  adminChart: `${apibasePathDev}/admin/getChart`,

  feedback: "http://localhost:4000/api/admin/feedback",
};
