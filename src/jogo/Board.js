import React from 'react';
import '../css/jogo.css';

function Square(props) {
    return (
        <button
            className={props.className}
            onClick={props.onClick}
        >
            {props.value}
        </button>
    );
}


const totalRows = 3;
const squaresPerRow = 3;

export default class Board extends React.Component {
    
    renderSquare(i) {
        let className = "square ";
        if ((this.props.posicao) === (i)) {
            className += " negrito";
        }
        if(this.props.vencedor[0] === i || this.props.vencedor[1] === i || this.props.vencedor[2] === i){
            className += " vencedor";
        }
        return (
            <Square
                className={className}
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }
    renderRow(row) {
        const squares = [];
        const offset = row * squaresPerRow;
        for (let s = 0; s < squaresPerRow; s++) {
          squares.push(
            this.renderSquare(offset + s)
          );
        }
        return (
          <div className="board-row">
            {squares}
          </div>
        )
      }
    
      render() {
        const rows = [];
        for (let r = 0; r < totalRows; r++) {
          rows.push(
            this.renderRow(r)
          );
        }
        return <div>{rows}</div>;
      }
}