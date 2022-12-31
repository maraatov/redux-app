import { useHttp } from "../../hooks/http.hook";
import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";

// import {fetchHeroes} from "../../actions";
import {heroDeleted, fetchHeroes} from "./heroesSlice"
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from "../spinner/Spinner";

const HeroesList = () => {
  const filteredHeroesSelector = createSelector(
    (state) => state.filters.activeFilter,
    (state) => state.heroes.heroes,
    (filter, heroes) =>{
      if (filter === "all") {
        return heroes;
      }
      return heroes.filter((item) => {
        return item.element === filter;
      });
    });
    

  const filteredHeroes = useSelector(filteredHeroesSelector);
  const heroesLoadingStatus = useSelector((state) => state.heroesLoadingStatus);
  const dispatch = useDispatch();
  const { request } = useHttp();

  const onDelete = useCallback(
    (id) => {
      request(`http://localhost:3001/heroes/${id}`, "DELETE")
        .then(dispatch(heroDeleted(id)))
        .catch((err) => console.log(err));
    },
    [request, dispatch]
  );

  useEffect(() => {
    dispatch(fetchHeroes());
  }, []);

  if (heroesLoadingStatus === "loading") {
    return <Spinner />;
  } else if (heroesLoadingStatus === "error") {
    return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
  }

  console.log(filteredHeroes);

  const renderHeroesList = (arr) => {
    if (arr && arr.length === 0) {
      return <h5 className="text-center mt-5">Героев пока нет</h5>;
    }
    return arr?.map(({ id, ...props }) => {
      return (
        <HeroesListItem key={id} onDelete={() => onDelete(id)} {...props} />
      );
    });
  };

  console.log(filteredHeroes.length);

  const elements = renderHeroesList(filteredHeroes);
  // console.log(elements)
  return <ul>{elements}</ul>;
};

export default HeroesList;
