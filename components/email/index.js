

// email template automatically generated
export default function email(emailAddr, emailSubject, emailBody='' ){

  const emailStr = `mailto:${emailAddr}?subject=${emailSubject}&body=${emailBody}`
    .replace(' ', '%20')
    .replace('\n', '%0A')

    return window.location.href = emailStr
}
