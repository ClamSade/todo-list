import React, { useState } from 'react';


function TodoList({addtask})
{
    const [input, setInput] = useState({task:''});
    const [array, setArray] = useState([]);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
    
        setInput(values => ({...values, [name]: value}));
    };

    const handleSubmit = (event) =>{
        event.preventDefault();
        array.push(input.task);
        console.log(array);
    };

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
                {array.map(array => {
                    return (
                        <div key={array}>{array}</div>
                    )
                })}
            </div>
        </div>
    )
}
export default TodoList;

