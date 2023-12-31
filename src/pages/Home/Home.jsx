import './Home.css'
//import supabase from "../config/SupabaseClient";
import { motion, AnimatePresence} from "framer-motion";
import "../../assets/gg.png";


function Home() {

  return (
    <div className="HomePage">
      <div className="hj">
      </div>
      <div className="man"> </div>
       <div className="AboutUs">
         <h1 style={{color:'black'}}>About Us</h1>
        
         <p style={{color:'black'}}>At &apos;HAPPILY INSURED&apos;, we are redefining the insurance management landscape, one policy at a time. As a forward-thinking startup in the world of insurance, we bring innovation, expertise, and a commitment to customer satisfaction to the forefront of our operations.</p>
       </div>
    
      <div className="grid">
      <div className="OurMission">
        <h1>Our Mission:</h1>
        <p>Our mission is simple: to make insurance easy, accessible, and tailored to your unique needs. We understand that insurance can be a complex and overwhelming aspect of life and business, and our goal is to simplify the process, provide personalized solutions, and ensure you have peace of mind when it comes to your coverage.</p>
      </div>
      <div className="WhoWeAre">
        <h1 style={{color:'white'}}>Who We Are : </h1>
        <p style={{color:'white'}}>We are a dedicated team of insurance professionals, tech enthusiasts, and customer-centric experts who have come together with a shared vision. Our founders have years of experience in the insurance industry, and they&apos;ve seen firsthand the challenges and pain points that policyholders encounter. This drove us to create a company that puts you, the client, first.</p>
      </div>
      <div className="OurVision">
        <h1 style={{color:'white'}}>Our Vision : </h1>
        <p style={{color:'white'}}>We envision a future where everyone can confidently navigate the world of insurance. A future where insurance is not a hassle but a resource that protects and empowers individuals and businesses. We are committed to making this vision a reality.

        Thank you for considering &apos;HAPPILY INSURED&apos; as your insurance partner. We look forward to serving you and helping you secure the future you deserve. Together, we can build a safer and more secure tomorrow.</p>
      </div>
      </div>
    </div>
    
    
  )
}

export default Home
