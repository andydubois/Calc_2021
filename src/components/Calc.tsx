import React, { useState, useEffect } from 'react';
import { evaluate, round } from "mathjs";
import axios from 'axios';
import * as CSS from "./CalcStyles"


//set state props for component
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

    //array holding equation data to be dispalyed on DOM
    const [equations, setEquations] = useState<StateProps[]>([]);

    //API ENDPOINTS
    //GET URL
    const getEndpoint = "http://localhost:8080/math/equations"
    //POST URL
    const postEndpoint = "http://localhost:8080/math/add"

    //Acting as componentDidMount, sends GET request on page load so DOM is populated
    useEffect(() => {
        fetchEquations()
    }, [])


    //GET request runs every 5 seconds to update equations list
    useEffect(() => {
        const interval = setInterval(() => {
            fetchEquations();
        }, 3000);
        return () => clearInterval(interval);
    }, [equations]);


    //CALCULATOR BUTTON FUNCTIONS

    //GET equations function
    const fetchEquations = () => {
        axios.get(getEndpoint, {
            //set headers for GET
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => {
            console.log("GET successful, setting equations array")
            // console.log("GET request response.data.data", response.data.data)
            setEquations(response.data.data)
            // console.log("Equations array", equations)
        }).catch(err => {
            console.log("get error", err)
        })
    }

    //POST equations functions
    const postEquation = (final: string) => {
        axios.post(postEndpoint, {
            input: input,
            result: final
        })
            .then(response => {
                console.log("Response from server after POST:", response)
            })
            .catch(err => {
                console.log("Error in post", err)
            })
        //GET request to retrieve newly posted equation
        fetchEquations()
    }

    //handle value from button push on calculator
    const handleInput = (event: React.MouseEvent) => {
        if (input === "0") {
            setInput((event.target as HTMLButtonElement).value);
        } else if (input === "error") {
            setInput("0")
        } else {
            setInput(input + (event.target as HTMLButtonElement).value)
        }

    };

    //clears input back to 0
    const clearInput = () => {
        console.log("clear");
        setInput("0")
    };

    //takes last entered character off of input string
    const backspace = () => {
        try {
            setInput(input.slice(0, -1))
        } catch (error) {
            setInput("ERROR")
        }
    }

    //evaluates input string 
    const evalExpression = () => {
        //set final variable equal to solved equation to avoid async state
        const final = round(evaluate(input), 5).toString()
        try {
            setResult(final)
            console.log("the result is:", result)
        } catch (error) {
            setInput("ERROR")
        }
        setInput(final)
        postEquation(final)
        //GET request to retrieve newly posted equation
        fetchEquations()
    }




    return (
        <div style={CSS.calcDiv}>
            <h2>Calculator 2021</h2>
            <p style={CSS.calcDisplay}>{input}</p>
            <button
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => handleInput(event)}
                value='1'
                style={CSS.numButtons}>
                1
          </button>
            <button
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => handleInput(event)}
                value='2' style={CSS.numButtons}>
                2
          </button>
            <button
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => handleInput(event)}
                value='3' style={CSS.numButtons}>
                3
          </button>
            <button
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => handleInput(event)} value='+' style={CSS.numButtons}>
                +
          </button>
            <br />
            <button
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => handleInput(event)} value='4' style={CSS.numButtons}>
                4
          </button>
            <button
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => handleInput(event)} value='5' style={CSS.numButtons}>
                5
          </button>
            <button
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => handleInput(event)} value='6' style={CSS.numButtons}>
                6
          </button>
            <button
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => handleInput(event)} value='-' style={CSS.numButtons}>
                -
          </button>
            <br />
            <button
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => handleInput(event)} value='7' style={CSS.numButtons}>
                7
          </button>
            <button
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => handleInput(event)} value='8' style={CSS.numButtons}>
                8
          </button>
            <button
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => handleInput(event)} value='9' style={CSS.numButtons}>
                9
          </button>
            <button
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => handleInput(event)} value='/' style={CSS.numButtons}>
                ÷
          </button>
            <br />
            <button
                onClick={clearInput}
                value='' style={CSS.numButtons}>
                C
          </button>
            <button
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => handleInput(event)} value='0' style={CSS.numButtons}>
                0
          </button>
            <button
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => handleInput(event)} value='.' style={CSS.numButtons}>
                .
          </button>
            <button
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => handleInput(event)} value='*' style={CSS.numButtons}>
                x
          </button>
            <br />
            <button
                onClick={backspace} value='' style={CSS.backButton}>
                Back
          </button>
            <button
                onClick={evalExpression}
                value='=' style={CSS.equalsButton}>
                =
          </button>
            <div>
                <ul style={CSS.equationList}>
                    {equations.map(equation => {
                        return (<li key={equation.id} style={CSS.listItem}>{equation.input}   =  <span style={CSS.answers}>{equation.result}</span></li>)
                    })}
                </ul>
            </div>
            <hr />
        </div>
    );
}

export default Calc;


