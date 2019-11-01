export default ({ user }) => ({
  avatarURL: user.avatarUrl,
  name: user.name,
  location: user.location,
  login: user.login,
  projectsURL: user.projectsUrl,
  status: user.status
})
