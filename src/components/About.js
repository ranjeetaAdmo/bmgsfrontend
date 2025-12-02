import './styles/About.css';

const About = () => (
  <section className="container">
  <div className="row">
    <div className="col-lg-6 mb-4 mb-lg-0">
      <img
        src="/assets/team-meeting.png"
        alt="Team discussing at whiteboard"
        className="img-fluid rounded"
      />
    </div>
    <div className="col-lg-6">
      <h2 className="about-name mb-2">About Us</h2>
           <div className="about-subheading mb-2">
        We believe that learning is the key to unlocking potential and transforming lives. Our mission is simple: to provide high-quality, accessible, and practical education that helps learners of all ages build the skills they need to succeed in today's fast-changing world.
      </div>
      {/* <h4 className="about-heading mb-3">What We Offer</h4> */}

      <div className="about-subheading mb-2">
        <strong></strong> Each partner has multiple-decades worth of real-world experience, coupled with Japanese Lean and Toyota Production System (TPS) training, our experts stand distinguished as pioneers in operational efficiency and waste elimination. 
      </div>
      <div className="about-subheading mb-2">
        <strong></strong> Rooted in the principles developed by Toyota, these professionals excel at implementing strategies that optimize workflows, reduce inefficiencies, and maximize customer value. Their mastery lies in understanding the intricate interplay of processes, time management, and resource utilization, enabling organizations to achieve unparalleled levels of productivity. 
      </div>
    </div>
    <div className="col-lg-12 mt-3">
         <div className="about-subheading mb-2">
        <strong></strong> Equipped with in-depth knowledge of Kaizen (continuous improvement), JIT (Just-In-Time), and the elimination of Muda (waste), they provide actionable solutions that transform complex challenges into streamlined success stories.
      </div>
          <div className="about-subheading mb-2">
        <strong></strong>The accomplishments of Japanese-trained lean experts span industries, highlighting their ability to revolutionize manufacturing, logistics, and service operations. They are adept at fostering a culture of sustainability and adaptability, empowering teams to embrace change and innovation.
      </div>
         <div className="about-subheading mb-2">
        <strong></strong> Their contributions have proven instrumental in establishing globally recognized standards for operational excellence, making them invaluable assets to modern industry.
      </div>
    </div>
  </div>
</section>
);

export default About;