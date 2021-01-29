import React from 'react';
import * as CSS from "./CalcStyles"

interface EquationProps {
    equations: ArrayProps[]
}

interface ArrayProps {
    id?: number;
    input?: string;
    result?: string;
}

const EquationList = ({ equations }: EquationProps) => {
    return (
        <>
            {equations.length && (equations.map(equation => {
                return (<li key={equation.id} style={CSS.listItem}>{equation.input}   =  <span style={CSS.answers}>{equation.result}</span></li>)
            }))}

        </>
    );
};

export default EquationList;