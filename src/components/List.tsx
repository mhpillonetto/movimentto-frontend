import { ReactNode } from "react"

//T is a placeholder for a generic type
interface ListProps<T> {
    items: T[],
    render: (item: T) => ReactNode
}

//<T,> equals <T extends{}>
const List = <T,>({ items, render }: ListProps<T>) => {
    return (
        <ul>
            {items.map((item, i) => (
                <li key={i}>
                    {render(item)}
                </li>
            ))}
        </ul>
    )
}

export default List
