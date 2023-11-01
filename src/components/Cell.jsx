import './Cell.css'

const Cell = (props) => {
    return (
        <div className="cell">
            {props.date}
        </div>
    )
}

export default Cell;