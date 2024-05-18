import { Link } from 'react-router-dom';
import mailbox from 'src/assets/mailbox.svg';

const Success = () => {
  return (
    <div className='flex h-screen w-full items-center justify-center'>
      <div className='form success w-8/12 bg-white text-center'>
        <img src={mailbox} alt='mail img' className='m-auto' />
        <p>
          <span className='text-[18px] font-bold'>
            Congratz, you successfully your account.
          </span>
          <br />
          we just send you a confirmation email
          <br />
          please check your E-mail
        </p>

        <p>
          Didn't receive it?
          <br />
          Check your Spam folder or{' '}
          <Link to='/' className='text-red-500 underline'>
            Resend Email
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Success;
