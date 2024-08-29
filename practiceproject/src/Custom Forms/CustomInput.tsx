import { forwardRef, useImperativeHandle, useRef, useState } from "react";

interface Props {
    id: string;
    label: string;
    type: string;
    name: string;
    defaultValue?: string | number | null;
}

const CustomInput = forwardRef(function CustomInput({ id, label, type, name, defaultValue }: Props, ref) {
    const userInput = useRef<HTMLInputElement>()
    const [ error, setError ] = useState('')

    useImperativeHandle(ref, () => {
        return {
            getValue() {
                return userInput.current.value
            },
            focus() {
                userInput.current.focus()
            },
            setRequiredError() {
                setError("Field is required")
            },
            setSpecificError(error: string) {
                setError(error)
            },
            getError() {
                return error;
            }
        }
    })

    function inputChangeHandler() {
        setError('')
    }

    return (
        <div className='mb-3 d-flex flex-column col-8 col-lg-4'>
            <label htmlFor={id} className="form-label">{label}</label>
            <input id={id} className="form-control" type={type} name={name} ref={userInput} onChange={inputChangeHandler} defaultValue={defaultValue} />
            {error && <span className="text-danger ">{error}</span>}
        </div>
    )
})

export default CustomInput


// step={name === 'price' ? '0.01' : undefined}