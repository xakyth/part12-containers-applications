import NOTIFICATION_TYPE from '../constants/NotificationType'

const Notification = ({ notification }) => {
  if (notification === null) {
    return null
  }
  const { type, message } = notification
  const inlineStyle = {
    fontSize: '25px',
    fontWeight: 'bold',
    color: 'blue',
    backgroundColor: '#d1ceca',
    margin: '0',
    border: '0.3rem solid',
    borderRadius: '10px',
    padding: '5px 10px',
  }
  switch (type) {
  case NOTIFICATION_TYPE.ERROR:
    inlineStyle.color = 'red'
    break
  case NOTIFICATION_TYPE.INFO:
    inlineStyle.color = 'blue'
    break
  case NOTIFICATION_TYPE.SUCCESS:
    inlineStyle.color = 'green'
  }
  return (
    <div>
      <p style={inlineStyle}>{message}</p>
    </div>
  )
}

export default Notification