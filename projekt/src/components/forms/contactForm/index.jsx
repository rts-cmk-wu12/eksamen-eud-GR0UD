export default function ContactForm() {
  return (
    <div className='contact-form'>
      <form className='contact-form__container'>
        <div className='contact-form__name-row'>
          <div className='contact-form__field contact-form__field--half'>
            <label htmlFor='firstName' className='contact-form__label'>
              First Name
            </label>
            <input
              type='text'
              id='firstName'
              name='firstName'
              className='contact-form__input'
              placeholder='John'
              required
            />
          </div>

          <div className='contact-form__field contact-form__field--half'>
            <label htmlFor='lastName' className='contact-form__label'>
              Last Name
            </label>
            <input
              type='text'
              id='lastName'
              name='lastName'
              className='contact-form__input'
              placeholder='Doe'
              required
            />
          </div>
        </div>

        <div className='contact-form__field'>
          <label htmlFor='email' className='contact-form__label'>
            Email
          </label>
          <input
            type='email'
            id='email'
            name='email'
            className='contact-form__input'
            placeholder='email@example.com'
            required
          />
        </div>

        <div className='contact-form__field'>
          <label htmlFor='subject' className='contact-form__label'>
            Subject
          </label>
          <input
            type='text'
            id='subject'
            name='subject'
            className='contact-form__input'
            placeholder='How can we help you?'
            required
          />
        </div>

        <div className='contact-form__field'>
          <label htmlFor='message' className='contact-form__label'>
            Message
          </label>
          <textarea
            id='message'
            name='message'
            className='contact-form__textarea'
            placeholder='Tell us more about your inquiry...'
            rows='5'
            required
          />
        </div>

        <button type='submit' className='contact-form__submit-btn'>
          Send Message
        </button>
      </form>
    </div>
  );
}
