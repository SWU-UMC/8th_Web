interface ListProps {
    tech: string;
}

const List = (props: ListProps) => {
    return (
        <li style={{listStyle: 'none'}}>
        {props.tech}
        </li>
    );
};

export default List
