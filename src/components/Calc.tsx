import React, { useState } from 'react';
import { evaluate, round } from "mathjs";


const Calc = () => {
    const [input, setInput] = useState("0");
    const [result, setResult] = useState("");
    const [equations, setEquations] = useState([]);
    const getEndpoint = "http://localhost:8080/math/equations"





    React.useEffect(() => {
        console.log("fetch")
        fetch(getEndpoint)
            .then(response => response.json())
            .then(response => {
                setEquations(equations.concat(response.data))
                console.log(response)
            })
            .catch(console.error)
    })



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
                {equations}
            </ul>
        </div>
    );
}

export default Calc;


// {equationReducer.map((equation: Equation, index: number) => {
//     return <li key={index}>{equation.input} {equation.result}</li>;