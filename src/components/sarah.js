import React, { useState, useEffect } from 'react';


function TodoList()
{
    const [input, setInput] = useState({task:''});
    const [array, setArray] = useState([]);

    useEffect(() => {
        const array = JSON.parse(localStorage.getItem('array'));
        if (array) {
         setArray(array);
        }
      }, []);

    //   useEffect(() => {
    //     localStorage.setArray('array', JSON.stringify(array));
    //   }, [array]);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        // OR on destructure notre objet event.target
        // Exemple : const { name, value } = event.target

    
        setInput(values => ({...values, [name]: value}));
    };

    const handleSubmit = (event) =>{
        event.preventDefault();
        array.push(input.task);
        setInput("");
        
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
                        // On pourrait avoir deux noms de tâches identiques du coup on mettra plutôt index pour être
                        // sur d'avoir ⬇️ une key unique.
                        // <div key={index}>{array}<button onClick={deleteArray(index)}>Delete</button></div>

                    )
                })}
            </div>
        </div>
    )
}
export default TodoList;