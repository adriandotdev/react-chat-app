import { RegisterOptions, UseFormRegister, FieldErrors, UseFormGetValues } from 'react-hook-form'
import IRegister from '../interfaces/IRegister'

type InputFieldProps = {

    register: UseFormRegister<IRegister>,
    type: string,
    id: "givenName" | "middleName" | "lastName" | "username" | "password" | "confirmPassword",
    options: RegisterOptions,
    errors: FieldErrors<IRegister>,
    getValues: UseFormGetValues<IRegister>
}

function InputField({ register, type, id, options, errors, getValues }: InputFieldProps) {

    console.log(id + " : " + errors[id]?.message)
    return (
        <>
            <input
                {...register(id, options)}
                className={`form-control ${errors[id]?.message ? 'is-invalid' : getValues()[id] ? 'is-valid' : ''}`}
                type={type}
                name={id}
                id={id}
            />
            {errors[id]?.message && <small className="text-danger fw-bold">{errors[id]?.message}</small>}
        </>
    )
}

export default InputField