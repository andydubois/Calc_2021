import React, { useState } from 'react';
import { evaluate, round } from "mathjs";
import axios from 'axios';

interface StateProps {
    id: number;
    input: string;
    result: string;
    data: []
}


const Calc = () => {
    //State hooks
    const [input, setInput] = useState("0");
    const [result, setResult] = useState("");
    const [equations, setEquations] = useState<StateProps[]>([]);
    const getEndpoint = "http://localhost:8080/math/equations"





    React.useEffect(() => {
        axios.get(getEndpoint, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => {
            console.log(response.data.data)
            setEquations(response.data.data)
            console.log(equations)
        }).catch(err => {
            console.log("get error", err)
        })
    }, [])





    const handleInput = (event: React.MouseEvent) => {
        if (input === "0") {
            setInput((event.target as HTMLButtonElement).value);
        } else if (input === "error") {
            setInput("0")
        } else {
            setInput(input + (event.target as HTMLButtonElement).value)
        }

    };

    const clearInput = () => {
        console.log("clear");
        setInput("0")
    };

    const backspace = () => {
        try {
            setInput(input.slice(0, -1))
        } catch (error) {
            setInput("ERROR")
        }
    }

    const evalExpression = () => {
        const final = round(evaluate(input))
        try {
            setResult(final)
            console.log("the result is:", result)
        } catch (error) {
            setInput("ERROR")
        }
        setInput(final)
    }

    return (
        <div>
            <h2>Calculator 2021</h2>
            <p>{input}</p>
            <button
                // className={this.props.classes.numButtons}
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => handleInput(event)}
                value='1'>
                1
          </button>
            <button
                // className={this.props.classes.numButtons}
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => handleInput(event)}
                value='2'>
                2
          </button>
            <button
                // className={this.props.classes.numButtons}
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => handleInput(event)}
                value='3'>
                3
          </button>
            <button
                // className={this.props.classes.numButtons}
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => handleInput(event)} value='+'>
                +
          </button>
            <br />
            <button
                // className={this.props.classes.numButtons}
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => handleInput(event)} value='4'>
                4
          </button>
            <button
                // className={this.props.classes.numButtons}
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => handleInput(event)} value='5'>
                5
          </button>
            <button
                // className={this.props.classes.numButtons}
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => handleInput(event)} value='6'>
                6
          </button>
            <button
                // className={this.props.classes.numButtons}
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => handleInput(event)} value='-'>
                -
          </button>
            <br />
            <button
                // className={this.props.classes.numButtons}
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => handleInput(event)} value='7'>
                7
          </button>
            <button
                // className={this.props.classes.numButtons}
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => handleInput(event)} value='8'>
                8
          </button>
            <button
                // className={this.props.classes.numButtons}
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => handleInput(event)} value='9'>
                9
          </button>
            <button
                // className={this.props.classes.numButtons}
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => handleInput(event)} value='/'>
                ÷
          </button>
            <br />
            <button
                // className={this.props.classes.numButtons}
                onClick={clearInput}
                value=''>
                C
          </button>
            <button
                // className={this.props.classes.numButtons}
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => handleInput(event)} value='0'>
                0
          </button>
            <button
                // className={this.props.classes.numButtons}
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => handleInput(event)} value='.'>
                .
          </button>
            <button
                // className={this.props.classes.numButtons}
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => handleInput(event)} value='*'>
                x
          </button>
            <br />
            <button
                // className={this.props.classes.backButton}`
                onClick={backspace} value=''>
                Back
          </button>
            <button
                // className={this.props.classes.equalsButton}
                onClick={evalExpression}
                value='='>
                =
          </button>
            <ul>
                {equations.map(equation => {
                    return (<li key={equation.id}>{equation.input}={equation.result}</li>)
                })}
            </ul>
        </div>
    );
}

export default Calc;


// {equationReducer.map((equation: Equation, index: number) => {
//     return <li key={index}>{equation.input} {equation.result}</li>;