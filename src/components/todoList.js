
import { useEffect, useState } from "react"

// IMG
// import Corbeille from '../../assets/corbeille.png'

// CSS
import './style.css'

const TodoList = () => {
  
  const [todo, setTodo] = useState({
    array: [],
    tache: ''
  })
  
  const [store, setStore] = useState([]); // ce state contiendra les données du localStorage.

  /*
    On call la methode getItemLocalStorage(), qui se chargera de mettre à jour notre state "store"
    en fonction de notre state todo.array
  */
  useEffect( () => {
    getItemLocalStorage()
  }, [todo.array]) // Cet useEffect dépend de todo.array, Il s'enclenchera à chaque fois que todo.array subira une mise à jour.

  /*
    Cet useEffect s'enclenche à l'ouverture du component pour récupèrer l'objet dans le localStorage et mettre à jour
    notre state todo.array 
  */
  useEffect(() => {
    setTodo({array: getItemLocalStorage()})
  }, []) // Dépendance vide. Cet useEffect s'enclenche uniquement à l'ouverture du component


  const delteItem = (idItem) => {
    const newArray = [...todo.array] // on crée une copie de notre todo.array pour eviter de modifier le tableau initiale (sécurité)
    const arrayAfterDelete = newArray.filter((value, index ) => { 
    // Utiliser la méthode filter pour supprimer un élément de notre array

      // si index est différent de idItem tu renvoie le tableau.
      if(index !== idItem) return value
    })
    setTodo({array: arrayAfterDelete}) // On remet à jour le tableau initial
    save(arrayAfterDelete)
  }

  const update = (idItem) => {
    const newArray = [...todo.array] // on crée une copie de notre todo.array pour eviter de modifier le tableau initiale (sécurité)
    const arrayAfterUpdate = newArray.filter((value, index) => {
      if(index === idItem ) { 
        /*
          isActive doit être different de lui même.
          donc si isActive est = à true alors il deviendra = à false et vice-versa. 
        */
        value.isActive = !value.isActive 
      }
      return value
    })
    setTodo({array: arrayAfterUpdate}) // On met à jour todo.array
    save(arrayAfterUpdate) // On call la methode save qui mettra à jour notre state "store". Puis elle enregistrera notre todo.array en loc
  }

  const save = (array) => {
    setStore(array)
    localStorage.setItem('array', JSON.stringify(array)) // on convertit nos données en Json pour pouvoir les stocker dans le localStorage.
  }

  const getItemLocalStorage = () => {
    const data = localStorage.getItem('array') // on récupére le contenu du tableau dans le store
    const dataParsed = JSON.parse(data) // on parse le JSON string en Javascript 
    if(typeof dataParsed === "object") // si notre data est bien un objet alors on met à jour le store
    {
      setStore(dataParsed)
    }else{ // sinon on renvoie un tableau vide
      return [] 
    }
    return dataParsed
  }

  const handleChange = (event) => {
    const { name, value } = event.target 
    setTodo(todo => ({...todo, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    /* 
      On crée un objet qui va contenir le name de l'item et son statut
      Le statut nous permettra d'activer la tâche ou bien de la 
      désactiver grâce à un boolean.
      Ce qui nous permettra par la suite.
    */
    const objet = {
      name: todo.item,
      isActive: true
    }


    todo.array.push(objet) // on push l'objet dans l'array
    save(todo.array) // on save on array dans le storage

    e.target.reset() // on reset l'input
    setTodo(todo => ({...todo, tache: ''}))
  }

  return(
    <div>
      <h1>Todo List 🚀</h1>
      {store && store.map((value, index) => {
        return(
          <div key={index} className="items">
            {/* Si le isActive de la tâche est = à true alors la class de notre div est égal à rien sinon elle sera égale à barree */}
            <p className={value.isActive ? "" : "barree"}  onClick={() => update(index)} >{value.name}</p>
            <img src="" onClick={() => delteItem(index)} />
          </div>
        )
      })}
      <form onSubmit={handleSubmit} >
        <input 
          type="text" 
          placeholder="Add item"
          name="item"
          onChange={handleChange}
          />
          <button>valider</button>
      </form>
    </div>
  )
}
export default TodoList;