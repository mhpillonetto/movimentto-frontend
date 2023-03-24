import React, { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Constants from '../../data/constants'
import { createNewUser } from '../../services/Auth/createNewUser'
import User from '../../model/User/User'
import MvtSelect from '../select/select'
import TextInput from '../input/TextInput'

const userType = Constants.userType

const RegisterForm = () => {
  const navigate = useNavigate();

  const emptyUser = {} as User

  const [formState, setFormState] = useState<User>(emptyUser)

  const [selectedUserType, setSelectedUserType] = useState(userType.transportadora)

  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const targetInput = event.currentTarget

    const { value, name } = targetInput

    setFormState({
      ...formState,
      [name]: value,
    })
  }, [formState])



  const handleSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const { username, email, password, phoneNumber } = formState;
    const userType = selectedUserType;

    if (!email || !username || !password || !userType || !phoneNumber) {
      window.alert("Preencha todos os campos")
      return
    }

    const newUser = {
      username,
      email,
      password,
      userType,
      phoneNumber
    }

    try {
      await createNewUser(newUser)
      navigate('/inicio', { replace: true })

    } catch (error) {
      console.log(error);
      window.alert("Erro no cadastro")
    }

  }, [formState]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <TextInput
          value={formState.username}
          handleChange={handleInputChange}
          fieldName='username'
          label='Nome de usuário'
          required={true}
        />
      </div>

      <div className="mb-3">
        <TextInput
          value={formState.email}
          handleChange={handleInputChange}
          fieldName='email'
          label='E-mail'
          required={true}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Senha
        </label>
        <input
          type="password"
          className="form-control"
          id="password"
          name="password"
          required
          value={formState.password}
          onChange={handleInputChange}
        />
      </div>

      <TextInput
        value={formState.phoneNumber}
        handleChange={handleInputChange}
        fieldName='phoneNumber'
        label='Telefone Celular (com DDD)'
        required={true}
      />

      <div>
        <label htmlFor="phoneNumberInput" className="form-label mt-3">
          Tipo de Usuário
        </label>
        <MvtSelect defaultValue="" selected={selectedUserType} options={[userType.motorista, userType.operador, userType.transportadora]} setSelected={setSelectedUserType} />
      </div>

      <button type="submit" className="btn btn-primary mt-3">
        Enviar
      </button>
    </form>
  )
}

export default RegisterForm
