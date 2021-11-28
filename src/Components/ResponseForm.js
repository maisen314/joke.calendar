import  classes from './ResponseForm.module.css';
import {useRef} from 'react';
import {useParams} from 'react-router-dom';

import Card from './ui/Card';

function ResponseForm(props){
    const nameRef = useRef();
    const pwdRef = useRef();
    const messageRef = useRef();
    const questionRef = useRef();
    const {door} = useParams();

    function submitHandler(event){
        event.preventDefault();
        
        const submittedForm = {
            name: nameRef.current.value,
            password: pwdRef.current.value,
            answer: messageRef.current.value,
            question: getTodaysQuestion(door),
            submittedAt: new Date()
        };
        console.log(submittedForm);
        props.onSubmittedDoor(submittedForm);
    }

    function getTodaysQuestion(door){
        const message = `Spørsmål ${door}`;
        return message;
    }

    return <Card>
        <form className={classes.form} onSubmit={submitHandler}>
            <h2>Dagens spørsmål</h2>
            <div id='question' ref={questionRef}> 
                {getTodaysQuestion(door)}
            </div>
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
                {/* <button type='button' onClick={niceMessageHandler}>Generer en fin melding </button> */}
                <textarea id='message' rows='5' ref={messageRef}/>
            </div>
            <div className={classes.actions}>
                <button>Send inn</button>
            </div>
        </form>
    </Card>
}

export default ResponseForm;