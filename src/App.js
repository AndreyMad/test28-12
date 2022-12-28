import React, { useEffect, useState } from 'react';
import './App.scss';
import Header from './components/Header';
import MainSection from './sections/MainSection';
import CardsSection from './sections/CardsSection';
import FormSection from './sections/FormSection';
import { getCardsApi } from './api/api';
import Loader from './components/Loader';

const App = () => {
  const [page, setPage] = useState(1);
  const [cards, setCards] = useState([]);
  const [isShowMoreDisabled, setIsShowMoreDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getCards = async () => {
    setIsLoading(true);
    const { data: { users, total_pages } } = await getCardsApi({ page: page });

    if (total_pages === page) {
      setIsShowMoreDisabled(true);
    }
    setCards((prevCards) => {
      return prevCards ? [...prevCards, ...users] : users;
    });
    setIsLoading(false);
  };

  const updateCards = async () => {
    setCards([]);
    setIsLoading(true);
    setPage(1)
    const { data: { users} } = await getCardsApi({ page: page });
    setCards(users);
    setIsLoading(false);
  }
  
  useEffect(() => {
    getCards();
  }, [page]);

  return (
    <div className="container">
      {isLoading ? <Loader /> : null}
      <Header />
      <MainSection />
      <CardsSection cards={cards} setPage={setPage} isShowMoreDisabled={isShowMoreDisabled} />
      <FormSection updateCards={updateCards} />
    </div>
  );
}

export default App;
