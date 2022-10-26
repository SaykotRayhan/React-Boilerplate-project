export const API = {
  baseUrl: 'http://127.0.0.1:8000',
  auth: {
    login: '/login/',
    logout: '/logout',
    registration: '/registration',
    refreshToken: '/token/refresh/',
  },
  portfolio: {
    getPortfolioDetails: '/portfolio/',
    getProject: '/portfolio/project/',
  },
}
