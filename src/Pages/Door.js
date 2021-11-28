import {useParams} from 'react-router-dom';

function Door() {
    let { door } = useParams();
    if (door > 24 || door < 0){
        return <div>Julen varer ikke så lenge.</div>
    }
    return <div>Du er på luke {door}</div>
}

export default Door;