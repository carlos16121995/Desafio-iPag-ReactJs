import React from 'react';
import { Link } from "react-router-dom";

import '../css/mainLayout.css';
import imagem from '../imagem/Jogo_da_velha.png'

const MainLayout = (props) =>{

    let saida = 
        <React.Fragment>
            <header className="header">
            <img className="imagem-tic-tac-toe-menu" src={imagem} />
                <nav className="nav">
                    <Link to="/">Home</Link>
                    <Link to="/Game">Jogar</Link>
                    <a href="https://carloseduardoweb.com/">Sobre o desenvolvedor</a>
                </nav>
            </header>
            
            <section className="container-conteudo">
                {props.children}
            </section>
        </React.Fragment>
    return (saida);

}

export default MainLayout;
