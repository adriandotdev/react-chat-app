import { UseFormRegister } from 'react-hook-form'

interface IRegister {
    givenName: string,
    middleName: string,
    lastName: string,
    username: string,
    password: string,
    confirmPassword: string
}

type InputFieldProps = {

    register: UseFormRegister<IRegister>,
    type: string,
    id: string
}

function InputField({ register, type, id }: InputFieldProps) {
    return (
        <input {...register} className="form-control" type={type} name={id} id={id} />
    )
}

export default InputField