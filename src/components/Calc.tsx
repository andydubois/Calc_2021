import React, { useState, useEffect } from 'react';
import { evaluate, round } from "mathjs";
import axios from 'axios';

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



    //GET request runs every 5 seconds to update equations list
    useEffect(() => {
        const interval = setInterval(() => {
            fetchEquations();
        }, 5000);
        return () => clearInterval(interval);
    }, []);


    //CALCULATOR BUTTON FUNCTIONS

    //GET equations function
    const fetchEquations = () => {
        axios.get(getEndpoint, {
            //set headers for GET
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => {
            console.log("GET request response.data.data", response.data.data)
            setEquations(response.data.data)
            console.log("Equations array", equations)
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
        <div>
            <h2>Calculator 2021</h2>
            <p>{input}</p>
            <button
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => handleInput(event)}
                value='1'>
                1
          </button>
            <button
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => handleInput(event)}
                value='2'>
                2
          </button>
            <button
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => handleInput(event)}
                value='3'>
                3
          </button>
            <button
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => handleInput(event)} value='+'>
                +
          </button>
            <br />
            <button
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => handleInput(event)} value='4'>
                4
          </button>
            <button
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => handleInput(event)} value='5'>
                5
          </button>
            <button
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => handleInput(event)} value='6'>
                6
          </button>
            <button
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => handleInput(event)} value='-'>
                -
          </button>
            <br />
            <button
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => handleInput(event)} value='7'>
                7
          </button>
            <button
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => handleInput(event)} value='8'>
                8
          </button>
            <button
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => handleInput(event)} value='9'>
                9
          </button>
            <button
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => handleInput(event)} value='/'>
                ÷
          </button>
            <br />
            <button
                onClick={clearInput}
                value=''>
                C
          </button>
            <button
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => handleInput(event)} value='0'>
                0
          </button>
            <button
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => handleInput(event)} value='.'>
                .
          </button>
            <button
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => handleInput(event)} value='*'>
                x
          </button>
            <br />
            <button
                onClick={backspace} value=''>
                Back
          </button>
            <button
                onClick={evalExpression}
                value='='>
                =
          </button>
            <ul // loop over equations array and render each entry as a list item in an unordered list
            >
                {equations.map(equation => {
                    return (<li key={equation.id}>{equation.input}={equation.result}</li>)
                })}
            </ul>
        </div>
    );
}

export default Calc;


