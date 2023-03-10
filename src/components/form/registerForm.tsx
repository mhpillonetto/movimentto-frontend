import axios from 'axios'
import React, { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Constants from '../../data/constants'
import { createNewUser } from '../../requests/createNewUser'
import UserTypeSelect from '../select/userTypeSelect'
import User from '../../model/User'

const userType = Constants.userType

const RegisterForm = () => {
  const navigate = useNavigate();

  const [formState, setFormState] = useState<User>({
    username: "",
    email: "",
    password: "",
    userType: userType.transportadora 
  })

  const [selectedUserType, setSelectedUserType] = useState(userType.transportadora)

  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const targetInput = event.currentTarget

    const { value, name } = targetInput

    setFormState({
      ...formState,
      [name]: value,
    })
  }, [formState])



  const handleSubmit = useCallback(async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const { username, email, password } = formState;

    if (!email || !username || !password) {
      window.alert("Fill all the required fields")
      return
    }
    try{
      await createNewUser(formState)
      navigate('/inicio', { replace: true })
    } catch(error) {
      console.log(error);
      
    }

  }, [formState]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="exampleInputUsername" className="form-label">
          Nome de usuário
        </label>
        <input
          type="text"
          className="form-control"
          id="username"
          name="username"
          required
          value={formState.username}
          onChange={handleInputChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          E-mail
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          required
          value={formState.email}
          onChange={handleInputChange}
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

      <UserTypeSelect selectedUserType={selectedUserType} setSelectedUserType={setSelectedUserType} />

      <button type="submit" className="btn btn-primary">
        Enviar
      </button>
    </form>
  )
}

export default RegisterForm
