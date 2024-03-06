export function validateEmail(email: string) {
  // 邮箱验证正则
  const reg = /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/
  return reg.test(email)
}
