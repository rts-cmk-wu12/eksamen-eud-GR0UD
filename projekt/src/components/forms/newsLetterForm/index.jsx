import { MdOutlineMailOutline } from "react-icons/md";

export default function NewsLetter() {
  return (
    <div className='newsletter'>
      <div className='newsletter__container'>
        <div className='newsletter__icon'>
          <MdOutlineMailOutline />
        </div>
        <h2 className='newsletter__title'>Stay Up To Date</h2>
        <p className='newsletter__subtitle'>
          For the latest news and updates from Command Shift, join our mailing
          list!
        </p>
        <form className='newsletter__form'>
          <input
            type='email'
            placeholder='hello@world.com'
            className='newsletter__input'
          />
          <button type='submit' className='newsletter__button'>
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
}
