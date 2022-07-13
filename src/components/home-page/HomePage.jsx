import './home-page.scss';

import IntroAnimation from './intro-animation/IntroAnimation';

const HomePage = () => {
    return (
        <section className='home-page-container'>
            <div className='home-title-promo-container'>
                <h2>M a i n</h2>
                <p>Visual Simulator of mainstream sort algorithms and general algorithms.</p>
            </div>
            <IntroAnimation />
        </section>
    )
}

export default HomePage;