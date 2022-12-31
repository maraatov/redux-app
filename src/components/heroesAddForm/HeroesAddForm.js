
import {useHttp} from '../../hooks/http.hook';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { heroCreated } from '../heroesList/heroesSlice';

const HeroesAddForm = () => {
    const {filters, filtersLoadingStatus} = useSelector(state => state.filters);
    const {request} = useHttp();
    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [element, setElement] = useState('');


    const onSubmitHandler = (e) => {
        e.preventDefault();
        const newHero = {
            id: uuidv4(),
            name,
            description,
            element,
        }

        request("http://localhost:3001/heroes", "POST", JSON.stringify(newHero))
        .then(dispatch(heroCreated(newHero)))
        .catch(err => console.log(err));

        setName('');
        setDescription('');
        setElement('');
    }

    const renderFilters = (filters, filtersLoadingStatus) => {
        if (filtersLoadingStatus === "loading") {
            return <option>Загрузка элементов</option>
        } else if (filtersLoadingStatus === "error") {
            return <option>Ошибка загрузки</option>
        }
        if (filters && filters.length > 0 ) {
            return filters.map(({name, label}) => {
                // if (name === 'all') { return null };
                return <option key={name} value={name}>{label}</option>
            })
        }
    }

    return (
        <form className="border p-4 shadow-lg rounded" onSubmit={onSubmitHandler}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="Как меня зовут?"/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    name="text" 
                    className="form-control" 
                    id="text" 
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    value={element}
                    onChange={(e) => setElement(e.target.value)}
                    required
                    className="form-select" 
                    id="element" 
                    name="element">
                    {renderFilters(filters, filtersLoadingStatus)}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}



export default HeroesAddForm;