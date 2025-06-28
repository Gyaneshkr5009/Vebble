import ReusableButton from '../../../components/basic components/ReusableButton';
import { useNavigate } from 'react-router-dom';
import { StepBack } from 'lucide-react';

const PasswordChanger = () => {
  const navigate = useNavigate();

  return (
    <div className='min-h-screen container mx-auto px-4 pt-20 pb-2 max-w-5xl'>
      {/* Back Button */}
      <div className="pt-2 flex justify-start mb-4">
        <ReusableButton
          onClick={() => navigate('/settings')}
          icon={StepBack}
        >
          Back
        </ReusableButton>
      </div>
      <div className='justify-center items-center flex flex-col pt-20'>
         working on it .....
      </div>
    </div>
  )
}

export default PasswordChanger