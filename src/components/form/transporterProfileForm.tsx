import React, { useCallback, useEffect, useState } from 'react'
import Constants from '../../data/constants'
import Transporter from '../../model/User/Transporter'
import { useNavigate } from 'react-router-dom'
import { editUser } from '../../services/User/editUser'
import { getUserByUsername } from '../../services/User/getUserByUsername'

const userType = Constants.userType

const TransporterProfileForm = () => {
    const navigate = useNavigate()

    //getUser assincrono para setar o objeto com os valores ja existentes
    const [formState, setFormState] = useState<Transporter>({
        username: localStorage?.getItem("userName") || "",
        email: "",
        cnpj: "",
        contactName: "",
        contactPhoneNumber: "",
        website: "",
        cep: ""
    })

    useEffect(() => {
        getUserByUsername(formState?.username)
            .then(currentUser => setFormState(currentUser))
    }, [])

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
        try {
            await editUser(formState)
            navigate('/inicio', { replace: true })
        } catch (error) {
            console.log(error)
        }

    }, [formState])

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="usernameInput" className="form-label">
                    Nome de usuário
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    required
                    disabled
                    value={formState.username}
                    onChange={handleInputChange}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="emailInput" className="form-label">
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
                <label htmlFor="cnpjInput" className="form-label">
                    CNPJ
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="cnpj"
                    name="cnpj"
                    value={formState.cnpj}
                    onChange={handleInputChange}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="contactNameInput" className="form-label">
                    Nome do responsável
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="contactName"
                    name="contactName"
                    value={formState.contactName}
                    onChange={handleInputChange}
                />
                <label htmlFor="contactPhoneNumberInput" className="form-label">
                    Telefone do responsável
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="contactPhoneNumber"
                    name="contactPhoneNumber"
                    value={formState.contactPhoneNumber}
                    onChange={handleInputChange}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="websiteInput" className="form-label">
                    Website
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="website"
                    name="website"
                    value={formState.website}
                    onChange={handleInputChange}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="cepInput" className="form-label">
                    CEP
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="cep"
                    name="cep"
                    value={formState.cep}
                    onChange={handleInputChange}
                />
            </div>

            <button type="submit" className="btn btn-primary">
                Salvar
            </button>
        </form>
    )
}

export default TransporterProfileForm
