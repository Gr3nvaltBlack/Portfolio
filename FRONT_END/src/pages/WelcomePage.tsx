import { PiStarFill } from "react-icons/pi";
import { PiStarFourFill } from "react-icons/pi";
import TextType from '../components/Text_Type/TextType';
import { NavLink } from "react-router-dom";
import { GoStarFill } from "react-icons/go";
import { GoBook } from "react-icons/go";
import { FaUsers } from "react-icons/fa6";
import { FiTrendingUp } from "react-icons/fi";
import './welcomepage.css'

const WelcomePage = () => {
    return (
        <div className="page-container">
            <div className="firt-presentation">

                <div className="presentation-center">

                    <div className="intro-netfeed">

                        <div className="first-content">
                            <span>
                                <PiStarFill className="star"/>
                                Join our passionate chefs
                            </span>
                        </div>

                        <h1>Share your culinary passion</h1>
                        <TextType 
                            text={["Discover recipes, share your creations and connect with a community of chefs from around the world"]}
                            typingSpeed={75}
                            pauseDuration={1500}
                            showCursor={true}
                            cursorCharacter="|"
                            className="text-slice"
                        />

                        <div className="first-content-button">
                            <button className="start">
                                <NavLink to={'/register'}>
                                    Start for free →
                                </NavLink>
                            </button>
                            <button className="learn">learn more</button>
                        </div>
                        <div className="first-content-note">
                            <div className="note-stars">
                                <GoStarFill /><GoStarFill /><GoStarFill /><GoStarFill />
                            </div>
                            <p>Average rating of 4/5</p>
                        </div>
                    </div>
                    <div className="banner">
                        <img src="/cakes_banner.jpg" className="banner_back3"/>
                        <img src="/cakes_banner.jpg" className="banner_back2"/>
                        <img src="/cakes_banner.jpg" className="banner_back"/>
                        <PiStarFourFill className="cake_star1" />
                        <PiStarFourFill className="cake_star2" />
                        <PiStarFourFill className="cake_star3" />
                    </div>
                    
                </div>
            </div>


            <section className="first-section" >
                <img src="/cake_linear.png" className="cake_linear2" />
                <img src="/cake_linear.png" className="cake_linear" />
                <img src="/cake.png" className="cake1" />
                <img src="/cake.png" className="cake2" />
                <img src="/cake.png" className="cake3" />
                <img src="/cake.png" className="cake4" />
                <div className="section-div">
                    <div className="section-question">
                        <h2>Why join NetFeed ?</h2>
                        <p>Everything you need to live your culinary passion</p>
                    </div>

                    <div className="section-reason">
                        <div className="reason-form">
                            <div className="logo-form"><GoBook/></div>
                            <h3>Thousands of recipes</h3>
                            <p>
                                Explore an endless library of recipes created by chefs from around the world.
                                From traditional cuisine to fusion creations.
                            </p>
                        </div>
                        <div className="reason-form">
                            <div className="logo-form"><FaUsers/></div>
                            <h3>Active community</h3>
                            <p>
                                Connect with other enthusiasts,
                                share your tips and learn from the best chefs in the community.
                            </p>
                        </div>
                        <div className="reason-form">
                            <div className="logo-form"><FiTrendingUp/></div>
                            <h3>Culinary trends</h3>
                            <p>
                                Stay up-to-date with the latest trends,
                                techniques and innovations in the culinary world.
                            </p>
                        </div>
                    </div>
                </div>
            </section>


            <section className="second-section">
                <img src="/cake.png" className="cake5" />
                <div className="second-section-div">
                    <div className="HoWork">
                        <h2>How does it work?</h2>
                        <p>Join the community in 3 easy steps</p>
                    </div>

                    <div className="ToWork">
                        <div className="work">
                            <div className="stepToFollow"><span>I</span></div>
                            <h3>Create your profile</h3>
                            <p>Sign up for free and personalize your chef profile in seconds.</p>
                        </div>
                        <div className="work">
                            <div className="stepToFollow"><span>II</span></div>
                            <h3>Share your recipes</h3>
                            <p>Publish your culinary creations with photos and detailed recipes.</p>
                        </div>
                        <div className="work">
                            <div className="stepToFollow"><span>III </span></div>
                            <h3>Connect and inspire</h3>
                            <p>Follow other chefs, comment, and be inspired by the community.</p>
                        </div>
                    </div>
                </div>
            </section>

            <div className="cake_pattern">
            </div>


            <section className="third-section">

                <div className="third-section-div">
                    <h2>What they say about us</h2>
                    <div className="Theysay">
                        <div className="say">
                            <div className="header">
                                <img src="https://www.pngall.com/wp-content/uploads/5/Profile-PNG-High-Quality-Image.png" alt="" />
                                <h4>Marco</h4>
                            </div>
                            <div className="note-person">
                                <GoStarFill /><GoStarFill /><GoStarFill /><GoStarFill />
                            </div>
                            <p>NetFeed has transformed the way I share my creations.
                                The community is incredible! 🥐</p>
                        </div>
                        <div className="say">
                            <div className="header">
                                <img src="https://www.pngall.com/wp-content/uploads/5/Profile-PNG-High-Quality-Image.png" alt="" />
                                <h4>Jhon Doe</h4>
                            </div>
                            <div className="note-person">
                                <GoStarFill /><GoStarFill /><GoStarFill /><GoStarFill />
                            </div>
                            <p>A perfect platform for discovering and sharing authentic recipes.
                                 I recommend it! 🍜</p>
                        </div>
                        <div className="say">
                            <div className="header">
                                <img src="https://www.pngall.com/wp-content/uploads/5/Profile-PNG-High-Quality-Image.png" alt="" />
                                <h4>Helène</h4>
                            </div>
                            <div className="note-person">
                                <GoStarFill /><GoStarFill /><GoStarFill /><GoStarFill /><GoStarFill />
                            </div>
                            <p>My subscribers have doubled since I joined FoodShare.
                                A passionate community! 💚</p>
                        </div>
                    </div>
                </div>
            </section>

            <div className="last-presentation">
                <div className="Optionnel">
                    <h2>Ready to join the community?</h2>
                    <p>Sign up for free and start sharing your recipes today!</p>
                    <div className="for-button">
                        <button className="start">
                                    <NavLink to={'/register'}>
                                        Start for free →
                                    </NavLink>
                        </button>
                        <button className="log">
                            <NavLink to={'/login'}>
                                Login
                            </NavLink>
                        </button>
                    </div>
                    <div className="more">
                        <div className="blabla">100% Free</div>
                        <div className="blabla">No bank card</div>
                        <div className="blabla">10k+ members</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WelcomePage;