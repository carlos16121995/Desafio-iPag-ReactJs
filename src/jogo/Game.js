import React from 'react';
import MainLayout from '../layout/MainLayout';
import '../css/jogo.css';
import Board from './Board';


export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                pos: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true,
            ascendente: true,
            vencedor: Array(3).fill(null),
        };
    }

    toggleOrdem() {
        this.setState({
            ascendente: !this.state.ascendente
        });
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        const pos = current.pos.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        pos[this.state.stepNumber + 1] = i

        this.setState({
            history: history.concat([{
                squares: squares,
                pos: pos,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
            vencedor: Array(3).fill(null)
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }
    handleClickModal() {
        var element = document.getElementById("div-modal");
        element.classList.remove("container-resultado");
        element.classList.add("esconder");
    }    

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        let result;
        var classModal = "esconder"
        let status;
        if (winner != null) {
            if (winner[0]) {
                classModal = "container-resultado";
                result = <Mensagem msg="Parabéns, você venceu!" vencedor={winner[0]} onClick={()=>this.handleClickModal()}></Mensagem>;       
                let vencedor = winner[1];
                if (this.state.vencedor[0] === null) {
                    this.setState({
                        vencedor: vencedor,
                    });
                }
            }
        }
        else {
            const posicoes = current.squares.filter(Boolean);
            if (posicoes.length === 9){
                classModal = "container-resultado";
                result = <Mensagem msg="O jogo terminou em empate" vencedor="" onClick={()=>this.handleClickModal()}></Mensagem>; 
                
            } 
            else status = "Next player: " + (this.state.xIsNext ? "X" : "O");
        }


        const moves = history.map((step, move) => {
            let row = 0;
            let pos = current.pos[move];
            let cow = 0;
            if (pos < 3) row = 1;
            else if (pos < 6) row = 2;
            else row = 3;
            if (pos === 0 || pos === 3 || pos === 6) cow = 1;
            else if (pos === 1 || pos === 4 || pos === 7) cow = 2;
            else cow = 3;
            const desc = move ?
                'Vá para o movimento #' + move + ' (' + row + ',' + cow + ')' :
                'Começar de novo';
            let className = "botao-jogada ";
            if (move) {
                className = "botao-jogada";
            }
            else {
                className = "botao-inicio-jogada";
            }
            return (
                <li key={move}>
                    <button className={className} onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });
        if (!this.state.ascendente) {
            moves.sort(function (a, b) {
                return b.key - a.key;
            });
        }
        return (<MainLayout>
            <h1 className="proximo-jogador">{status}</h1>
            <div className="game">
                <div className="game-board">
                    <Board
                        vencedor={this.state.vencedor}
                        posicao={current.pos[this.state.stepNumber]}
                        squares={current.squares}
                        onClick={i => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">

                    <ul>{moves}</ul>
                    <i onClick={() => this.toggleOrdem()} className="fas fa-exchange-alt btn-troca"></i>
                </div>
            </div>
            <div id="div-modal" className={classModal}>{result}</div>
        </MainLayout>
        );
    }
}

function Mensagem (props){
    let msg = "";
    if(props.vencedor !== ""){
        msg = "Vencedor: " + props.vencedor; 
    }
    return(
        <div className="conteudo-resultado">
            <h1 className="titulo-modal">{props.msg}</h1>
            <p className="corpo-modal">{msg}</p>
            <button
            className="botao-jogar"
            onClick={props.onClick}
        >
            Fechar
        </button>
        </div>
    );
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return [squares[a], lines[i]];
        }
    }
    return null;
}