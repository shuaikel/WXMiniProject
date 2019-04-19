const validList = {
  /** 手机号规则  */
  MOBILE: /^1[345789]\d{9}$/,
  /** 密码规则（6-16位字母、数字） */
  PASSWORD_PATTERN: "^[0-9A-Za-z]{6,16}$",
  /** 邮政编码规则 */
  POSTCODE_PATTERN: "[1-9]\\d{5}",
  /** 邮箱规则 */
  EMAIL_PATTERN: "^([a-z0-9A-Z]+[-|_|\\.]?)+[a-z0-9A-Z]@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-zA-Z]{2,}$",
  /** 年龄规则 1-120之间  */
  AGE_PATTERN: "^(?:[1-9][0-9]?|1[01][0-9]|120)$",
  /** 身份证规则 */
  IDCARD_PATTERN: /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
  /** URL规则，http、www、ftp */
  URL_PATTERN: "http(s)?://([\\w-]+\\.)+[\\w-]+(/[\\w- ./?%&=]*)?",
  /** QQ规则 */
  QQ_PATTERN: "^[1-9][0-9]{4,13}$",
  /** 全汉字规则 */
  CHINESE_PATTERN: "^[\u4E00-\u9FA5]+$",
  /** 全字母规则 */
  STR_ENG_PATTERN: "^[A-Za-z]+$",
  /** 整数规则 */
  INTEGER_PATTERN: "^-?[0-9]+$",
  /** 正整数规则 */
  POSITIVE_INTEGER_PATTERN: "^\\+?[1-9][0-9]*$",
}
export default validList;