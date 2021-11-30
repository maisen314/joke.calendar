import  classes from './ResponseForm.module.css';
import {useRef} from 'react';

import Card from './ui/Card';

function AddDoorForm(props){
    const qRef = useRef();
    const aRef = useRef();

    function submitHandler(event){
        event.preventDefault();
        
        const submittedQnA = {
            id: Math.floor(Math.random() * 1000),
            question: qRef.current.value,
            answer: aRef.current.value,
            submittedAt: new Date()
        };
        try{
            props.onAddedQnA(submittedQnA);       
        }
        catch(err){
            console.log(err);
        }
        
    }

    return <Card>
        <form className={classes.form} onSubmit={submitHandler}>
            <h3>Spørsmål</h3>
            <div className={classes.control}>
                <label htmlFor='question'>Spørsmål</label>
                <input type='text' id='question' required ref={qRef}/>
            </div>
            <div className={classes.control}>
                <label htmlFor='answer'>Svar</label>
                <input type='text' id='answer' required ref={aRef}/>
            </div>
            <div id='error'> </div> 
            <div className={classes.actions}>
                <button>Send inn</button>
            </div>
            
        </form>
    </Card>
}

export default AddDoorForm;