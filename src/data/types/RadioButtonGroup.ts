export interface IOption {
    label: string
    name?: string
    disabled?: boolean
    value: string
 }
 
 export interface IOptionGroup {
    label: string
    options: IOption[]
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
 }