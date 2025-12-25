const Notification = ({message, errorStatus}) => {
    if (message === null){
        return null;
    }
    const errorStyle = {
        color: "red",
    }

    return (
        <div className="notification" style={errorStatus ? errorStyle : {}} >
            {message}
        </div>
    )
}

export default Notification;