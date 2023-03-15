import React, { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../../services/login'

interface IFormState {
  username: string
  password: string
}

const LoginForm = () => {

  const [formState, setFormState] = useState<IFormState>({
    username: "",
    password: ""
  })

  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const targetInput = event.currentTarget

    const { value, name } = targetInput

    setFormState({
      ...formState,
      [name]: value,
    })
  }, [formState])


  const navigate = useNavigate();

  const handleSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const { username, password } = formState;

    if (!username || !password) {
      window.alert("Fill all the required fields")
      return
    }

    try {
      await login(formState)
      navigate('/inicio', { replace: true })

    } catch (error) {
      console.log(error);
      window.alert("Usuário ou senha incorretos")
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
      <button type="submit" className="btn btn-primary">
        Enviar
      </button>
    </form>
  )
}

export default LoginForm
