import React, { useCallback, useEffect, useState } from 'react'
import Constants from '../../data/constants'
import Transporter from '../../model/User/Transporter'
import { useNavigate } from 'react-router-dom'
import { editUser } from '../../services/User/editUser'
import { getUserByUsername } from '../../services/User/getUserByUsername'
import TextInput from '../input/TextInput'

const TransporterProfileForm = () => {
    const navigate = useNavigate()

    const emptyTransporter = { username: localStorage.userName } as Transporter

    const [formState, setFormState] = useState<Transporter>(emptyTransporter)

    useEffect(() => {
        getUserByUsername(formState?.username)
            .then(currentUser => setFormState(currentUser))
            .catch(error => console.log(error))
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
                <TextInput
                    value={formState.username}
                    handleChange={handleInputChange}
                    fieldName='username'
                    label='Nome de Usuário'
                    required={true}
                    disabled={true}
                />
            </div>

            <div className="mb-3">
                <TextInput
                    value={formState.displayName}
                    handleChange={handleInputChange}
                    fieldName='displayName'
                    label='Nome da Empresa'
                    required={false}
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
                <TextInput
                    value={formState.cnpj}
                    handleChange={handleInputChange}
                    fieldName='cnpj'
                    label='CNPJ'
                />
            </div>

            <div className="d-flex justify-content-between mb-3">
                <div>
                    <TextInput
                        value={formState.contactName}
                        handleChange={handleInputChange}
                        fieldName='contactName'
                        label='Nome do responsável'
                    />
                </div>
                <div>
                    <TextInput
                        value={formState.phoneNumber}
                        handleChange={handleInputChange}
                        fieldName='phoneNumber'
                        label='Telefone do responsável'
                    />
                </div>


            </div>

            <div className="mb-3">
                <TextInput
                    value={formState.website}
                    handleChange={handleInputChange}
                    fieldName='website'
                    label='Website'
                />
            </div>

            <div className="mb-3">
                <TextInput
                    value={formState.cep}
                    handleChange={handleInputChange}
                    fieldName='cep'
                    label='CEP'
                />
            </div>

            <div className="mb-3">
                <TextInput
                    value={formState.address}
                    handleChange={handleInputChange}
                    fieldName='address'
                    label='Endereço'
                />
            </div>

            <button type="submit" className="btn btn-primary">
                Salvar
            </button>
        </form>
    )
}

export default TransporterProfileForm
