import React , {useState} from 'react'
import Register from './register'
import FormSuccess from "./FormSuccess"

function Form() {

    const [isSubmitted, setIsSubmitted] = useState(false);

    function setSubmitForm() {
        setIsSubmitted(true);
    }

    return (
        <>
        {!isSubmitted ? <Register submitForm={setSubmitForm}/> : <FormSuccess/>}
        </>
    )
}

export default Form
