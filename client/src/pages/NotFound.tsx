import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Home, Search, BookOpen, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

const NotFound = () => {
   const navigate = useNavigate();

   return (
      <div className='min-h-screen bg-gradient-to-b from-background to-muted flex items-center justify-center p-4'>
         <div className='container mx-auto max-w-4xl'>
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5 }}
               className='text-center space-y-8'
            >
               <div className='relative'>
                  <div className='text-9xl md:text-[12rem] font-bold text-primary/10 select-none'>
                     404
                  </div>
               </div>

               <div className='flex justify-center'>
                  <div className='bg-primary/10 w-24 h-24 rounded-full flex items-center justify-center'>
                     <AlertTriangle className='h-12 w-12 text-primary'/>
                  </div>
               </div>

               <div className='space-y-4'>
                  <h1 className='text-3xl md:text-5xl font-bold tracking-tight'>
                     Oops! Page Not Found
                  </h1>
                  <p className='text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto'>
                     The page you're looking for seems to have wandered off. Don't worry, even the best developers encounter 404s!
                  </p>
               </div>

               <div className='flex justify-center mt-12'>
                  <Card className='hover:shadow-lg transition-all duration-200 border-2 w-full max-w-md'>
                     <CardHeader>
                        <CardTitle className='text-center'>What would you like to do?</CardTitle>
                        <CardDescription className='text-center'>
                           Choose an option to get back on track
                        </CardDescription>
                     </CardHeader>
                     <CardContent className='space-y-3'>
                        <Button
                           onClick={() => navigate('/')}
                           className='w-full'
                           variant='default'
                        >
                           <Home className='h-4 w-4 mr-2' />
                           Take Me Home
                        </Button>

                        {/* <Button
                           onClick={() => navigate(-1)}
                           className='w-full'
                           variant='outline'
                        >
                           <ArrowLeft className='h-4 w-4 mr-2' />
                           Go Back
                        </Button> */}

                        <Button
                           onClick={() => navigate('/tutorials')}
                           className='w-full'
                           variant='secondary'
                        >
                           <BookOpen className='h-4 w-4 mr-2' />
                           Browse Tutorials
                        </Button>
                     </CardContent>
                  </Card>
               </div>

            </motion.div>

         </div>
      </div>
   )
};

export default NotFound;