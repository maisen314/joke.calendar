import  classes from './ResponseForm.module.css';
import {useEffect, useRef, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import img1 from '../img/1desember.jpeg';
import img2 from '../img/2desember.jpeg';

import Card from './ui/Card';



function ResponseForm(props){
    const navigate = useNavigate();
    const nameRef = useRef();
    const pwdRef = useRef();
    const messageRef = useRef();
    const questionRef = useRef();
    const {door} = useParams();
    const [question, setQuestion] = useState("");
    const today = new Date();
    const trueDoor = today.getDate().toString();
    
    useEffect(() => {
        if (trueDoor !== door){
            navigate("/")
        } else{
            openDoor(door)
        }
       
    },[door,trueDoor,navigate])
    
    function submitHandler(event){
        event.preventDefault();
        
        const submittedForm = {
            username: nameRef.current.value,
            password: pwdRef.current.value,
            answer: messageRef.current.value,
            question: questionRef.current.value,
            door: door,
            submittedAt: new Date()
        };
        console.log(submittedForm);
        props.onSubmittedDoor(submittedForm);
    }

    
    function openDoor(doorNo){
        fetch(
            `https://adventofjokes-default-rtdb.europe-west1.firebasedatabase.app/openedDoors/${doorNo}.json`
          ).then((response) => {
            console.log(response)
            return response?.json()
          }).then((data) => {
                if (data){
                    console.log("openeddata", data)
                    var keys = Object.keys(data);
                    setQuestion(data[keys[0]].question)
                } else{
                    fetch(
                        `https://adventofjokes-default-rtdb.europe-west1.firebasedatabase.app/doorIds.json`
                      ).then((response) => {
                        return response?.json()
                      }).then((data) => {
                            var keys = Object.keys(data);
                            var randomId = keys[Math.floor(Math.random()*keys.length)];
                            console.log(keys);
                            console.log("randomid",randomId);
                            fetch(
                                `https://adventofjokes-default-rtdb.europe-west1.firebasedatabase.app/doorsQ/${randomId}.json`
                            ).then((response) => {
                                return response?.json()
                            }).then((data)=>{
                                var keys = Object.keys(data);
                                var q = data[keys[0]].question
                                setQuestion(q)
                                fetch(
                                    `https://adventofjokes-default-rtdb.europe-west1.firebasedatabase.app/openedDoors/${doorNo}.json`,
                                    {
                                      method: "POST",
                                      body: JSON.stringify({"question": q, "id": randomId}),
                                      headers: {
                                        "Content-Type": "application/json",
                                      },
                                    }
                                )
                            }).then(
                                    fetch(
                                        `https://adventofjokes-default-rtdb.europe-west1.firebasedatabase.app/doorIds/${randomId}.json`,
                                        {
                                          method: "DELETE",
                                        }
                                    )
                                ).catch((err) => {setQuestion(err)})

                    })
                }  
          })
    }

    function Question(props) {
        if (question === "Rebus1"){
            return (
                <div id='question' ref={questionRef}> 
                <img alt="rebus 1" src={img1} width="400px"></img>
                </div>
            )
        } else if (question === "Rebus2"){
            return (
                <div id='question' ref={questionRef}> 
                <img alt="rebus 2" src={img2} width="400px"></img>
                </div>
            )
        } else {
            return (
                <div id='question' ref={questionRef}> 
                        Spørsmål: {question}
                </div>)
        }
        
    }

    return <Card>
        <form className={classes.form} onSubmit={submitHandler}>
            <h2>Dagens spørsmål</h2>
            <Question />
            <h3>Send inn ditt svar her</h3>
            <div className={classes.control}>
                <label htmlFor='name'>Brukernavn</label>
                <input type='text' id='name' required ref={nameRef}/>
            </div>
            <div className={classes.control}>
                <label htmlFor='password'>Passord</label>
                <input type='password' id='password' required ref={pwdRef}/>
            </div>
            <div className={classes.control}>
                <label htmlFor='answer'>Ditt svar på luke nr. {door}</label>
                <textarea id='message' rows='5' ref={messageRef}/>
            </div>
            <div className={classes.actions}>
                <button>Send inn</button>
            </div>
        </form>
    </Card>
        
}

export default ResponseForm;