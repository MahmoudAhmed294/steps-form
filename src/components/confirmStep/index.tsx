import mailbox from 'src/assets/mailbox.svg';
import './confirm.css';
import { Grid } from '@mui/material';
import { useStepControl } from 'src/hooks/useSteps';
import useStepForm from 'src/hooks/useStepForm';
import { FormEvent } from 'react';
import useSWR from 'swr';
import { useNavigate } from 'react-router-dom';

const url = 'https://id.safav2.io.safavisa.com/register';

const ConfirmForm = () => {
  const navigate = useNavigate();
  const fetcher = (url: string) =>
    fetch(url, { method: 'post' }).then(res => res.json());

  const { goToStep } = useStepControl();
  const { formData } = useStepForm();
  const { mutate } = useSWR(url, fetcher);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const collectData: any = { ...formData[0], ...formData[1], ...formData[2] };

    for (const key in collectData) {
      console.log(key, collectData[key]);
      if (key === 'company_avatar') {
        form.append(key, collectData[key][0]);
      } else {
        form.append(key, collectData[key]);
      }
    }
    mutate(form).then(() => {
      navigate('/success');
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='confirmForm form'>
        <img src={mailbox} />
        <p>We will send a message for this e-mail</p>
        <p>example@exapmle.com</p>
      </div>
      <Grid
        container
        spacing={2}
        justifyContent='flex-end'
        alignItems={'center'}
        className='pt-5'
      >
        <Grid item xs={6} lg={2}>
          <button
            className='btn bg-gray-300'
            type='button'
            onClick={() => goToStep(2)}
          >
            back
          </button>
        </Grid>
        <Grid item xs={6} lg={4}>
          <button className='btn btn-primary' type='submit'>
            submit
          </button>
        </Grid>
      </Grid>
    </form>
  );
};
export default ConfirmForm;
