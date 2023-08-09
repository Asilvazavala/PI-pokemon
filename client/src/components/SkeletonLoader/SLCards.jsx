import ContentLoader from 'react-content-loader';
import { useFunctions } from '../../hooks/useFunctions';

export const SLCards = () => {
  const { isSmallScreen } = useFunctions();

  const skeletons = []
  for (let i = 0; i < 12; i++) {
    skeletons.push(
      <ContentLoader 
        key={i}
        speed={2}
        interval={0.25}
        width={isSmallScreen ? '45vw' : '23vw'}
        height={isSmallScreen ? '35vh' : '57vh'}
        backgroundColor="#e9e9e9"
        foregroundColor="#aaa"
      >
        <rect x={isSmallScreen ? '5vw' : 0} y="0" rx="20" ry="20" 
        width={isSmallScreen ? '40vw' : '21vw'} 
        height={isSmallScreen ? "30vh" : "50vh"} />
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
