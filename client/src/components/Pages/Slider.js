import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import classes from './styles/slider.module.css';

function Slider() {
  return (
    <Carousel>
      <Carousel.Item interval={1000} className={classes.item}>
        <img
          className={classes.image}
          src={require('../../images/slide3.jpg')}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3><strong style={{fontSize: '40px'}}>Fly to Incredible India with Vistara Airways</strong></h3>
          <p>Explore India's rich culture, stunning landscapes, and vibrant cities with Vistara Airways.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item interval={500} className={classes.item}>
        <img
          className={classes.image}
          src={require('../../images/slider1.jpg')}
          alt="Second slide"
        />
        <Carousel.Caption>
          <h3><strong style={{fontSize: '40px'}}>Discover the wonders of the world</strong></h3>
          <p>Embark on unforgettable journeys and explore global destinations with Vistara Airways.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item interval={500} className={classes.item}>
        <img
          className={classes.image}
          src={require('../../images/slider2.jpg')}
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3><strong style={{fontSize: '40px'}}>Extra legroom, extra space, extra comfort</strong></h3>
          <p>
            Enjoy a more comfortable flight experience with our premium seating options.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Slider;
