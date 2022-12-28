import React from 'react'
import Card from '../components/Card';
import PrimaryButton from '../components/PrimaryButton';

const CardsSection = ({ cards, isShowMoreDisabled, setPage }) => {

  return (
    <section id="users" className="cardsSection__container">
      <h2 className="cardsSection__title">Working with GET request</h2>
      <div className="cardsSection__wrapper">
        {cards && cards.length ? cards.map(card => <Card key={card.id} {...card} />) : <h3>No cards founded</h3>}
      </div>
      <PrimaryButton
        customStyles={{ width: "120px" }}
        btnText="Show more"
        onClick={() => setPage((currentPage) => currentPage + 1)}
        disabled={isShowMoreDisabled}
      />
    </section>
  )
}

export default CardsSection;
