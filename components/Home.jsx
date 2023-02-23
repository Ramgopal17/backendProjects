import React from 'react'
import vg from "../assets/2.webp"

import {
    AiFillGoogleCircle,
    AiFillAmazonCircle,
    AiFillYoutube,
    AiFillInstagram,
} from "react-icons/ai";

const Home = () => {
    return (<>
        <div className='home' id="home">
            <main>
                <h1>TechyStar</h1>
                <p>Solution to all your Problems</p>
            </main>
        </div>
        <div className='home2'>
            <img src={vg} alt="Graphics" />

            <div>
                <p>
                    We are your one and only solution to the tech problems
                    you face
                    every day.We are leading tech company whose aim is to increase
                    the problem solving ablity in children

                </p>
            </div>
        </div>

        <div className="home3" id="about">
            <div>
                <h1>Who we are ?</h1>
                
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam  doloribus cumque illum magnam commodi! Magni ipsum non inventore voluptatibus. Id a ipsum repellendus sequi! Omnis dicta inventore deserunt aliquid! Animi, minus perferendis laborum veritatis fuga vel voluptate? Consectetur, veniam architecto nihil incidunt quam adipisci laborum natus soluta cupiditate tempora reprehenderit distinctio cum fuga et delectus omnis. Rem incidunt fugit ratione enim et aperiam nihil sint animi? Incidunt corrupti vitae, sint molestiae quod officia cumque ipsum dolorum reprehenderit odio, totam iste blanditiis optio delectus nobis explicabo autem quas neque nostrum impedit? Eius quasi natus sint animi eum enim asperiores eos.</p>
            </div>

        </div>
        <div className="home4" id="brands">
            <div>
                <h1>Brands</h1>
                <article>
                    <div style={{animationDelay:"0.3s"}}>
                    <AiFillGoogleCircle/>
                    <p>Google</p>
                    </div>
                    <div style={{animationDelay:"0.5s"}}>
                    <AiFillAmazonCircle/>
                    <p>Amazon</p>
                    </div>
                    <div style={{animationDelay:"0.7s"}}>
                    <AiFillYoutube/>
                    <p>Youtube</p>
                    </div>

                    <div style={{animationDelay:"0.1s"}}>
                    <AiFillInstagram/>
                    <p>Instagram</p>
                    </div>
                </article>

            </div>
        </div>
    </>
    )
}

export default Home