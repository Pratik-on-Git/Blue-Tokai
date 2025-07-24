import React from "react";

const AboutMore = () => (
  <section className="about-more-root" style={{ zIndex: "1000" }}>
    <h3 className="about-more-title" style={{ textAlign: "center", color: "white", marginTop: "1.2rem", textTransform: "uppercase", fontSize: "1.2rem", fontWeight: "300", letterSpacing: "0.1em", }}>
      Scroll Here
    </h3>
    <div className="about-section">
      <h2 className="about-heading">
        Beliefs <span className="heading-arrow">→</span>
      </h2>
      <p className="about-lead">
        Our mission since we started has stayed simple: introduce our customers to the estates we directly buy our great tasting coffee from, roast the beans with care, and make high quality coffee more accessible through our cafes and our website. The coffee we roast is the coffee we like to drink, and we hope you like it too.
      </p>
      <p className="about-lead">At Blue Tokai Coffee Roasters, we follow a simple set of beliefs.</p>
      <div className="about-block">
        <h3 className="about-subheading">Transparency is much more than just where we get our beans from.</h3>
        <p>
          The first thing we did when we started our company was to highlight our award winning farms. This idea of transparency organically evolved to the way we worked in other areas too - our baristas are always present to discuss brewing tips, our customer service team are there to walk you through your coffee questions, and our roasting team to show you how they work.
        </p>
      </div>
      <div className="about-block">
        <h3 className="about-subheading">A culture of constant learning is the key to always pushing coffee forward.</h3>
        <p>
          We are consistently researching, testing and implementing best practices throughout our business to raise the bar. Making refractometers essential for our cafe brewing, holding advanced sensory learnings for junior roasters, and experimenting with processing at the farm level are just some of the ways that our highly skilled team is constantly evolving the way Indian coffee is treated, experienced or communicated about.
        </p>
      </div>
      <div className="about-block">
        <h3 className="about-subheading">Sourcing the best coffee beans does not guarantee good coffee.</h3>
        <p>
          Although we have a dedicated sourcing team for green beans and have invested in establishing quality roasting parameters, we know that a lot more steps still have to fall into place to brew a good cup. This is why we have worked hard to create coffee training centres to impart leading procedures such as equipping baristas with assessing and reporting tools for precision brewing, and cupping every single batch that is roasted to ensure consistent quality.
        </p>
      </div>
    </div>
    <div className="about-section">
      <h2 className="about-heading">
        Roasteries <span className="heading-arrow">→</span>
      </h2>
      <p className="about-lead">
        When we started roasting in 2013, we had a small 1kg machine that had us roasting for twelve to fourteen hours straight on most nights because of how small it was. Though we have grown, in the size of our roasting machines (we now roast on two 12kg and one 25kg Probat machines), and the team of roasters, we continue to spend as much time, energy and resources on constantly pushing our roasting quality forward.
      </p>
      <div className="about-block">
        <p>
          We are consistently researching, testing and implementing best practices throughout our business to raise the bar. Evaluating hundreds of green bean samples by cupping them every harvest season, before making our final selections is standard procedure at Blue Tokai Coffee Roasters. Conducting advanced sensory trainings for our roasters, and experimenting with processing methods at the farm level are just some of the ways that our highly skilled team is constantly evolving.
        </p>
        <p>
          Although we have a dedicated sourcing team for green beans and have invested in establishing quality roasting parameters, we know that a lot more steps still have to fall into place to brew a good cup. This is why we work closely with our Q-Grade certified Director of Coffee to create industry leading procedures such as cupping every single batch that is roasted to ensure consistent quality.
        </p>
        <p>
          Our belief in transparency extends to our roasteries in Gurgaon, Mumbai and Bangalore, and we encourage our customers to visit us. To take the interaction with your coffee a level further, we will soon be running on-going tours of the roastery. We roast from Monday to Friday and look forward to having you drop by to see some of your favourite beans being roasted.
        </p>
      </div>
    </div>
    <div className="about-section">
      <h2 className="about-heading">
        Farms <span className="heading-arrow">→</span>
      </h2>
      <p className="about-lead">
        When we first started in 2013, we worked with a handful of producers who shared our belief that India was ripe for a specialty coffee revolution. After 11 years, we're glad to have had that belief turn into a blooming industry, with more Indians enjoying homegrown specialty coffee than ever before.
      </p>
      <div className="about-block">
        <p>
          Now, we hold long-standing relationships with over 80 of India's best farms, each raising the bar for what a cup of carefully grown coffee can be. We're honoured to source from them, and bring you the coffee they grow, along with the stories of the love and care with which it comes to be.
        </p>
      </div>
    </div>
  </section>
);

export default AboutMore; 