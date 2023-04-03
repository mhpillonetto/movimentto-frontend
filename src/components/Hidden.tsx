import React, { ReactChild, ReactFragment, ReactPortal, useState } from 'react'

type ReactNode = ReactChild | ReactFragment | ReactPortal | boolean | null | undefined;

type HiddenProps = {
    label: string
    children: ReactNode
    defaultHide?: boolean
}

const Hidden = (props: HiddenProps) => {
    const { children, label, defaultHide } = props
    const [hidden, setHidden] = useState(defaultHide)

    return (
        <div >
            <a onClick={() => setHidden(!hidden)}>
                { hidden ? <a className="float-left">{`Ampliar ${label}`}</a> : <a className="float-left">{`Esconder ${label}`}</a>}
            </a>
            {
                !hidden ? children : null
            }
        </div>
    )
}

export default Hidden
