import { Grid } from '@mui/material';
import Steps from 'src/components/steps';

const Index = () => {
  return (
    <div className=' container mx-auto flex h-full items-center justify-center p-8'>
      <Grid container justifyContent={'center'}>
        <Grid item xs={12} lg={8}>
          <div className=' h-full w-full'>
            <Steps />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Index;
