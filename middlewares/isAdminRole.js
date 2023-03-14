const isAdminRole = (req, res, next) => {
  if (!req.user) return res.status(500).json({ msg: 'Verify Role before verify token' })
  if (req.user.role !== 'ADMIN_ROLE') return res.status(401).json({ msg: 'Needs admin role to perform this action' })

  next()
}

module.exports = {
  isAdminRole
}
