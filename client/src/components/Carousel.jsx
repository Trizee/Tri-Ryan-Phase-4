import Carousel from 'react-bootstrap/Carousel'
import React from 'react'; 
import 'bootstrap/dist/css/bootstrap.css'; 

function Caro() {

        return ( 

            <div style={{ display: 'block', width: 'auto', height:'auto',}}> 
              <h4>React-Bootstrap Carousel Component</h4> 
              <Carousel> 
                
                <Carousel.Item interval={2500}> 
                  <img 
                    className="d-block w-100"
        src="https://img.freepik.com/free-vector/celebration-background-with-colorful-party-flag-falling-confetti_1314-2538.jpg?w=2000"
                    alt="Image One"
                    style={{maxHeight:'500px',objectFit:'cover'}}
                  /> 
                  <Carousel.Caption> 
                    <h4>Sample Text for Image Two</h4> 
                  </Carousel.Caption> 
                </Carousel.Item> 
                
                <Carousel.Item interval={2000}> 
                  <img 
                    className="d-block w-100"
        src="https://images.pexels.com/photos/3249760/pexels-photo-3249760.jpeg?cs=srgb&dl=pexels-edoardo-tommasini-3249760.jpg&fm=jpg"
                    alt="Image Two"
                    style={{maxHeight:'500px',objectFit:'cover'}}
                  /> 
                  <Carousel.Caption> 
                    <h4>Sample Text for Image Two</h4> 
                  </Carousel.Caption> 
                </Carousel.Item> 
              </Carousel> 
            </div> 
          ); 
        }
  
  export default Caro;