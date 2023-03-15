import React, { useCallback, useState } from 'react'
import Constants from '../../data/constants'
import { createNewUser } from '../../services/createNewUser'
import UserTypeSelect from '../select/userTypeSelect'
import Transporter from '../../model/Transporter'
import { useNavigate } from 'react-router-dom'
import { editUser } from '../../services/editUser'
import { getUserByUsername } from '../../services/getUserByUsername'
import User from '../../model/User'

const userType = Constants.userType

const EditProfileForm = () => {
    const navigate = useNavigate()    

    console.log(localStorage);
    
    //getUser assincrono para setar o objeto com os valores ja existentes
    const [formState, setFormState] = useState<Transporter>({
        username: localStorage?.getItem("userName") || "",
        email: localStorage?.getItem("email") || "",
        cnpj: "",
        contactName: "",
        contactPhoneNumber: "",
        website: "",
        cep: ""
    })



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

        const { username, email, cnpj, contactName, contactPhoneNumber, website, cep } = formState;

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

export default EditProfileForm
