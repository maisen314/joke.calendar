import  classes from './ResponseForm.module.css';
import {useRef} from 'react';
import Card from './ui/Card';

function ResponseForm(props){
    const nameRef = useRef();
    const emailRef = useRef();
    const foodRef = useRef();
    const messageRef = useRef();
    
    function submitHandler(event){
        event.preventDefault();
        
        const submittedForm = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            food: foodRef.current.value,
            message: messageRef.current.value,
            sentAtUtc: new Date()
        };
        console.log(submittedForm);
        props.onRegisterGuest(submittedForm);
    }

    function niceMessageHandler(event){
        const message1 = "Dere er grei, vi er ikke lei \n";
        document.getElementById("message").value += message1;
    }

    return <Card>
        <form className={classes.form} onSubmit={submitHandler}>
            <div className={classes.control}>
                <label htmlFor='name'>Navn</label>
                <input type='text' id='name' required ref={nameRef}/>
            </div>
            <div className={classes.control}>
                <label htmlFor='email'>E-post</label>
                <input type='text' id='email' required ref={emailRef}/>
            </div>
            <div className={classes.control}>
                <label htmlFor='food'>Hva kan du spise?</label>
                <select id='food' required defaultValue={''} ref={foodRef}>
                    <option value='' disabled hidden>Vennligst velg</option>
                    <option value='all'>Alt</option>
                    <option value='greens'>Vegetar</option>
                    <option value='nothing'>Vegansk</option>
                    <option value='allergies'>Allergi</option>
                    <option value='pils'>Helst bare pils</option>
                </select>
            </div>
            <div className={classes.control}>
                <label htmlFor='message'>Noe annet? Ev. bare en hyggelig melding?</label>
                <button type='button' onClick={niceMessageHandler}>Generer en fin melding </button>
                <textarea id='message' rows='5' ref={messageRef}/>
            </div>
            <div className={classes.actions}>
                <button>Send inn</button>
            </div>
        </form>
    </Card>
}

export default ResponseForm;