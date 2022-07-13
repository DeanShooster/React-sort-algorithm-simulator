import {IoMdClose} from 'react-icons/io';
import {BsEmojiSmile} from 'react-icons/bs';

const AboutModal = ( {closeModal} ) => {
    return (
        <div className="about-modal">
            <IoMdClose className="close-about-modal" onClick={closeModal}/>
            <h3>About the Emulator</h3>
            <p>This Simulator visually shows how basic and advanced sorting algorithms and generic seek/solve algorithms works.</p>
            <p>Most visually examples are done on arrays, matrixes of integers.</p>
            <BsEmojiSmile className='smiley'/>
        </div>
    )
}

export default AboutModal;