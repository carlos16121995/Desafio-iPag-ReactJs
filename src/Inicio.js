import React from 'react';
import MainLayout from './layout/MainLayout';
import { Link } from "react-router-dom";
import imagem from './imagem/Jogo_da_velha.png'

export default class Inicio extends React.Component {

    render() {
        return <MainLayout>
            <img className="imagem-tic-tac-toe" src={imagem} />
            <h1 className="titulo-desafio">Desafio iPag ReactJs</h1>
            <Link className="botao-jogar" to="/Game">Jogar Agora</Link>
        </MainLayout>
    }
}