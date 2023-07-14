import ContentLoader from 'react-content-loader';
import styles from './SkeletonLoader.module.css';

export const SkeletonLoader = () => {

  const skeletons = []
  for (let i = 0; i < 12; i++) {
    skeletons.push(
      <ContentLoader 
        key={i}
        speed={2}
        interval={0.25}
        width={300}
        height={350}
        viewBox="0 0 300 350"
        backgroundColor="#e9e9e9"
        foregroundColor="#aaa"
        style={{
          width: window.innerWidth < 500 ? '160px' : '',
          height: window.innerWidth < 500 ? '200px' : '',
          viewBox: window.innerWidth < 500 ? '0 0 160 200' : ''
        }}
      >
        <rect className={styles.skeleton} x="10" y="10" rx="10" ry="10" width="250" height="300" />
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
