import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.css"; // requires a loader
import "../../css/home.css";
import { Carousel } from 'react-responsive-carousel';

class DemoCarousel extends Component {
    render() {
        return (
            <div  className="mb-5 p-5" style={{"height":"65vh"}}>
                <Carousel autoPlay={true} dynamicHeight={false} interval={5000} infiniteLoop={true}
                    labels={{ leftArrow: 'previous slide / item', rightArrow: 'next slide / item', item: 'slide item' }}
                    showThumbs={false} className="container"
                >
                    <div>
                        <img classname="sliderimages" src="images/1.jpg" />
                        <p className="legend">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est saepe ad ut et! Esse nesciunt vero quasi aspernatur ex dolore dicta voluptatem, voluptate doloribus iste, ipsam in. Accusantium, porro inventore?</p>
                    </div>
                    <div>
                        <img classname="sliderimages" src="images/2.jpg" />
                        <p className="legend">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla corporis ab placeat repudiandae veniam sunt nostrum eum soluta sapiente explicabo dolorem, inventore deleniti ut fuga illum hic vitae asperiores. Molestias!</p>
                    </div>
                    <div>
                        <img classname="sliderimages" src="images/3.jpg" />
                        <p className="legend">Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi nam, eaque dignissimos perspiciatis repellat iusto molestias nostrum illo accusamus quae, quas, sit est minima sapiente beatae. Aspernatur cumque doloremque expedita.</p>
                    </div>
                </Carousel>
            </div>

        );
    }
};

export default DemoCarousel;