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
    company_name: z.string().min(3).max(100).trim(),
    lang: z.string().min(1, 'please select language'),
    company_address: z.string().min(8).max(100),
    company_business_email: z.string().email().trim(),
    company_phone: z.string().min(11).max(11),
    company_extra_data_phone: z.string().min(11).max(11),
    company_city_id: z.string().min(1, 'please select city'),
    company_country_id: z.string().min(1, 'please select country'),
  })
  .required({
    company_address: true,
    company_name: true,
    company_phone: true,
    company_country_id: true,
    company_city_id: true,
    company_business_email: true,
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
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <div className='flex'>
              <Input
                label='company Name'
                inputProps={{
                  ...register('company_name'),
                  placeholder: 'Enter your company name',
                }}
                errorMessage={errors?.company_name?.message}
                right={
                  <Select
                    inOtherComponent
                    errorMessage={errors?.lang?.message}
                    selectProps={{
                      ...register('lang'),
                      defaultValue: 1,
                    }}
                    listOption={[
                      {
                        id: 1,
                        label: 'english',
                      },
                      {
                        id: 2,
                        label: 'arabic',
                      },
                    ]}
                  />
                }
              />
            </div>
          </Grid>
          <Grid item xs={12}>
            <Input
              label='company address'
              inputProps={{
                ...register('company_address'),
                placeholder: 'Enter your company address',
              }}
              errorMessage={errors?.company_address?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              label='company email'
              inputProps={{
                ...register('company_business_email'),
                placeholder: 'Enter your company email',
              }}
              errorMessage={errors?.company_business_email?.message}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <Select
              label='Country'
              errorMessage={errors?.company_country_id?.message}
              selectProps={{
                ...register('company_country_id'),
              }}
              placeholder='choose your country'
              listOption={[
                {
                  id: 20,
                  label: 'Egypt',
                },
                {
                  id: 30,
                  label: 'Japan',
                },
                {
                  id: 40,
                  label: 'Yemen',
                },
              ]}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <Select
              label='City'
              errorMessage={errors?.company_city_id?.message}
              selectProps={{
                ...register('company_city_id'),
              }}
              placeholder='choose your city'
              listOption={[
                {
                  id: 1,
                  label: 'cairo',
                },
                {
                  id: 2,
                  label: 'alexandria',
                },
                {
                  id: 3,
                  label: 'giza',
                },
              ]}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <Input
              label='company Phone number'
              errorMessage={errors?.company_phone?.message}
              inputProps={{
                ...register('company_phone'),
                placeholder: 'Enter your company phone number',
              }}
              left={'+20'}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <Input
              label='company extra Phone number'
              errorMessage={errors?.['company_extra_data_phone']?.message}
              inputProps={{
                ...register('company_extra_data_phone'),
                placeholder: 'Enter your company extra phone number',
              }}
              left={'+20'}
            />
          </Grid>
        </Grid>
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
            next
          </button>
        </Grid>
      </Grid>
    </form>
  );
};

export default Index;
