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
        <div onClick={() => setHidden(!hidden)}>
            {
                !hidden ? children : <h3>{`Ampliar ${label}`}</h3>
            }
        </div>
    )
}

export default Hidden
