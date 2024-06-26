import { zodResolver } from '@hookform/resolvers/zod';
import { Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Input from 'src/components/input';
import Select from 'src/components/select';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { useStepControl } from 'src/hooks/useSteps';
import useStepForm from 'src/hooks/useStepForm';
import { useEffect } from 'react';

const schema = z
  .object({
    user_email: z.string().email().trim(),
    user_password: z.string().min(8).max(32),
    user_password_confirmation: z.string().min(8).max(32),
    user_full_name: z.string().min(3).max(100).trim(),
    user_phone: z.string().min(11).max(11).trim(),
    user_nationality: z.string().trim().min(1, 'please select country'),
  })
  .required({
    user_nationality: true,
    user_full_name: true,
    user_phone: true,
    user_password_confirmation: true,
    user_password: true,
    user_email: true,
  });

export type ValidationSchemaType = z.infer<typeof schema>;

const Index = () => {
  const { goToStep } = useStepControl();
  const { updateFormData, formData } = useStepForm();
  useEffect(() => {
    if (formData[0]) {
      for (const key in formData[0]) {
        // @ts-expect-error type unknown
        setValue(key, formData[0][key]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
    setError,
  } = useForm<ValidationSchemaType>({
    resolver: zodResolver(schema),
  });

  const saveSignUpValues = (data: ValidationSchemaType) => {
    if (data.user_password_confirmation !== data.user_password) {
      setError('user_password_confirmation', {
        message: 'Passwords do not match',
      });
    }
    else if (isValid) {
      updateFormData(0, data);
      goToStep(1);
    }
  };

  return (
    <form onSubmit={handleSubmit(saveSignUpValues)}>
      <div className='form'>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Input
              label='Full Name'
              inputProps={{
                ...register('user_full_name'),
                placeholder: 'Enter your full Name',
              }}
              errorMessage={errors?.user_full_name?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              label='Business email'
              inputProps={{
                ...register('user_email'),
                placeholder: 'Enter your Business email',
              }}
              errorMessage={errors?.user_email?.message}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <Select
              label='Country'
              errorMessage={errors?.user_nationality?.message}
              selectProps={{
                ...register('user_nationality'),
              }}
              placeholder='choose your country'
              listOption={[
                {
                  id: 20,
                  label: 'Egypt',
                },
                {
                  id: 10,
                  label: 'Japan',
                },
                {
                  id: 30,
                  label: 'Yemen',
                },
              ]}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <Input
              label='Phone number'
              errorMessage={errors?.user_phone?.message}
              inputProps={{
                ...register('user_phone'),
                placeholder: 'Enter your phone number',
              }}
              left={'+20'}
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              label='password'
              errorMessage={errors?.user_password?.message}
              inputProps={{
                ...register('user_password'),
                placeholder: 'Enter your password',
                type: 'password',
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              label='Repeat password'
              errorMessage={errors?.user_password_confirmation?.message}
              inputProps={{
                ...register('user_password_confirmation', {
                  required: true,
                  validate: value =>
                    value === watch('user_password') ||
                    'Passwords do not match',
                }),
                placeholder: 'Repeat  your password',
                type: 'password',
              }}
            />
          </Grid>
        </Grid>
      </div>
      <Grid container justifyContent='space-between' className='mt-3'>
        <Grid item xs={6} lg={4}>
          <button
            className='flex items-center justify-center text-[#333]'
            type='button'
            disabled
          >
            <ArrowLeftIcon sx={{ fill: '#333' }} />
            <span>back to login</span>
          </button>
        </Grid>
        <Grid item xs={6} lg={2}>
          <button className='btn btn-primary' type='submit'>
            next
          </button>
        </Grid>
      </Grid>
    </form>
  );
};

export default Index;
