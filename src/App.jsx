import { QuerySnapshot, addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore"
import './App.css'
import { db } from './config/fire'
import { useEffect, useState } from "react";

function App() {
  const [dataFetched, setDataFetched] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [docIdForDelete, setDocIdForDelete] = useState('');
  const [docIdForUpdate, setDocIdForUpdate] = useState('');
  const [newTodoName, setnewTodoName] = useState('');

  // useEffect(() => {
  //   callFirestoreGetDoc();
  // }, [dataFetched])


  const collectionRef = collection(db, "todos");

  const callFirestoreAddDoc = async (e) => {
    const myData = {
      name: name,
      description: description
    }
    try {
      const docRef = await addDoc(collectionRef, myData);
      console.log("Data sent successfully with id", docRef.id);
      setName('');
      setDescription('');
    } catch (err) {
      console.log("Error occured", err);
    }
  }

  const callFirestoreGetDoc = async (e) => {

    getDocs(collectionRef)
      .then((snapshot) => {
        console.log(snapshot.docs)
        let arr = []
        snapshot.docs.forEach((doc) => {
          arr.push({ ...doc.data(), id: doc.id })
        })
        console.log("fetched doc - ", arr);
        setDataFetched(arr);
      })
  }

  const callFirestoreDeleteDoc = async () => {
    console.log("Delete func. called");
    console.log("docIdForDelete :", docIdForDelete);
    const docRef = doc(db, "todos", docIdForDelete)
    deleteDoc(docRef)
      .then(() => {
        console.log("DOC DELETED SUCCESSFULLY");
        setDocIdForDelete('');
        // setDocIdForDelete(0);
      })
  }
  const callFirestoreUpdateDoc = () => {
    console.log("Update func. called");
    console.log("docIdForUpdate :", docIdForUpdate);
    const docRef = doc(db, "todos", docIdForUpdate)
    updateDoc(docRef, { name: newTodoName })
      .then(() => {
        console.log("Todo Updated Successfully");
        setnewTodoName('');
        setDocIdForUpdate('');
      })

  }

  const handleName = (e) => {
    console.log(e.target.value);
    setName(e.target.value);
  }

  const handleDescription = (e) => {
    console.log(e.target.value);
    setDescription(e.target.value);
  }

  const handleDocId = (e) => {
    console.log(e.target.value);
    setDocIdForDelete(e.target.value);
  }

  const handleDocIdUpdate = (e) => {
    console.log(e.target.value);
    setDocIdForUpdate(e.target.value);
  }

  const handleNewTodoName = (e) => {
    console.log(e.target.value);
    setnewTodoName(e.target.value);
  }

  return (
    <>
      <div className="project-title">
        <h1>TODOS CRUD USING FIREBASE</h1>
      </div>
      <div className="app">

        <div className="add-update-delete-div">
          <div className="">
            <label htmlFor="">Todo Name : </label><input type="text" value={name} onChange={handleName} />
          </div>
          <div className="">
            <label htmlFor="">Todo Description : </label><textarea value={description} onChange={handleDescription} />
          </div>

          <button onClick={callFirestoreAddDoc} className="btn">Add Todo</button>
        </div>

        <div className="fetched-todos-div">
          <div>
            <label className="your-todos-label"> Your Todos: </label>
          </div>
          {dataFetched.map((doc) => {
            return (
              <div key={doc.id}>
                <hr />
                <p className="COLOR-BLUE">doc id - {doc.id}</p>
                <p>name - {doc.name}</p>
                <p>description - {doc.description}</p>
                <hr />
              </div>
            )
          })}
          <button onClick={callFirestoreGetDoc} className="btn">Fetch Todos</button>

        </div>

        <div className="add-update-delete-div">
          <label htmlFor="">Todo(Document) ID:</label> <input type="text" onChange={handleDocId} value={docIdForDelete} />
          <button onClick={callFirestoreDeleteDoc} className="btn">Delete Todo</button>
        </div>

        <div className="add-update-delete-div">
          <label htmlFor="">Todo(Document) ID:</label> <input type="text" onChange={handleDocIdUpdate} value={docIdForUpdate} />
          <label htmlFor="">New Todo Name:</label> <input type="text" onChange={handleNewTodoName} value={newTodoName} />
          <button onClick={callFirestoreUpdateDoc} className="btn">Update Todo</button>
        </div>

      </div>
    </>
  )
}

export default App
