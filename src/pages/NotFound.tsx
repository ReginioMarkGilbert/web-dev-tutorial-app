import react from 'react';
import { useNavigate } from 'react-router-dom';

export default const notFound = () => {
   const navigate = useNavigate();

   return (
      <div className=''>
         <h1>404 Not Found</h1>
      </div>
   )
};

