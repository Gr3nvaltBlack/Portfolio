import './home.css'
import LeftNav from '../components/LeftNav'
import Thread from '../components/Thread';
// import NewPost from './NewPost';


const Home = () => {
    
    return (
        <>
            <div className="home-container">

                <div className="home-left">
                    <LeftNav className='nav-left'/>
                </div>

                <div className="home-center">
                    {/* <NewPost /> */}
                    <Thread />
                </div>

                <div className="home-right">
                    <h5>HELLO RIGHT</h5>
                </div>
            </div>
        </>
    );
};

export default Home;