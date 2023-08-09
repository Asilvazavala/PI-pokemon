import ContentLoader from 'react-content-loader';
import { useFunctions } from '../../hooks/useFunctions';

export const SLDetails = () => {
  const { isSmallScreen } = useFunctions();

  const skeletons = []
  for (let i = 0; i < 1; i++) {
    skeletons.push(
      <ContentLoader 
        key={i}
        speed={2}
        interval={0.25}
        width={isSmallScreen ? '95vw' : '95vw'}
        height={isSmallScreen ? '85vh' : '75vh'}
        backgroundColor="#e9e9e9"
        foregroundColor="#aaa"
      >
        <rect x={'2vw'} 
        y={isSmallScreen ? '2vh' : '2vh'}  
        rx="10" ry="10"  
        width={isSmallScreen ? '70vw' : '70vw'} 
        height={isSmallScreen ? "6vh" : "8vh"} />

        <rect x={'2vw'}
        y={isSmallScreen ? '11vh' : '13vh'} 
        rx="10" ry="10" 
        width={isSmallScreen ? '50vw' : '48vw'} 
        height={isSmallScreen ? "6vh" : "8vh"} />

        <rect x={'2vw'}
        y={isSmallScreen ? '20vh' : '24vh'} 
        rx="10" ry="10" 
        width={isSmallScreen ? '90vw' : '92vw'} 
        height={isSmallScreen ? "65vh" : "50vh"} />
      </ContentLoader>
    )
  }

  return (
    <main>
      { 
        skeletons
      }
    </main>
  )
}
