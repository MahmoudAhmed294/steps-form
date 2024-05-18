import { zodResolver } from '@hookform/resolvers/zod';
import { Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Input from 'src/components/input';
import Select from 'src/components/select';
import { useStepControl } from 'src/hooks/useSteps';
import useStepForm from 'src/hooks/useStepForm';
import { useEffect } from 'react';

const schema = z
  .object({
    company_avatar: z.object()
  })
  .required({
    company_avatar: true,
  });

export type ValidationAddressSchemaType = z.infer<typeof schema>;

const Index = () => {
  const { goToStep } = useStepControl();
  const { updateFormData, formData } = useStepForm();
  useEffect(() => {
    if (formData[1]) {
      for (const key in formData[1]) {
        // @ts-expect-error type unknown
        setValue(key, formData[1][key]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<ValidationAddressSchemaType>({
    resolver: zodResolver(schema),
  });

  const saveCompanyValues = (data: ValidationAddressSchemaType) => {
    if (isValid) {
      updateFormData(1, data);
      goToStep(2);
    }
  };

  return (
    <form onSubmit={handleSubmit(saveCompanyValues)}>
      <div className='form'>
        <h5 className='mb-6  text-center text-gray-400'>
          entering this information correctly will facilitate the company
          verification process
        </h5>
        <Grid container spacing={2}></Grid>
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
            onClick={() => goToStep(0)}
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

export default Index;
