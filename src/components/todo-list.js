import React, { useState } from 'react';


function TodoList()
{
    const [input, setInput] = useState({task:''});
    const [array, setArray] = useState([]);

    const addTask = (input) => {
        const copy = [...array];
        copy = [...copy, {id: array.length + 1, task: input, complete: false}];
        setArray(copy);
    }

    copy.push({id: array.length + 1, task: input, complete: false});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
    
        setInput(values => ({...values, [name]: value}));
    };

    const handleSubmit = (event) =>{
        event.preventDefault();
        array.push(input.task);
        setInput("");
        console.log(array);
    };
    
    const deleteArray = (index) => () =>
        setArray((array) => array.filter((_, i) => i !== index));

    return(
        <div>
            <div>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        id="task"
                        name="task"
                        placeholder="New task"
                        value={input.task || ""} 
                        onChange={handleChange}
                    />
                    <input type="submit" />
                </form>
            </div>
            <div>
                {array.map((array, index) => {
                    return (
                        <div key={array}>{array}<button onClick={deleteArray(index)}>Delete</button></div>
                    )
                })}
            </div>
        </div>
    )
}
export default TodoList;

