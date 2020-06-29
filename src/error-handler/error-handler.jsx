import "./error-handler.scss"

function ErrorHandler (props) {
    const { errorObject } = props
    console.log(errorObject.message)
    return errorObject.message
}

export default ErrorHandler