import Banner from '../Components/Banner'
import CategoryCarousel from '../Components/category'
import NewsletterBanner from '../Components/Contect'
import Demand from '../Components/Demand'
import Featured from '../Components/Featured'
import Featured_Product from '../Components/Featured_Product'
import Hero from '../Components/Hero'
import LatestProducts from '../Components/Just_Arrive'
import LatestBlog from '../Components/Latest-blog'
import PopularProducts from '../Components/Popular'
import Selling from '../Components/Selling'
import Services from '../Components/Services'
const Home = () => {
  return (
    <div>
       <Hero/>
     <CategoryCarousel/>
     <Selling/>
     <Featured_Product/>
     <NewsletterBanner/>
     <Featured/>
     <PopularProducts/>
     <LatestProducts/>
     <LatestBlog/>
     <Banner/>
     <Demand/>
     <Services/>
    </div>
  )
}

export default Home
